import { Accessor, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { KinematicBody } from "../physics/physics";
// import * as Vector2 from "../physics/vector2";
import { vec2 } from "gl-matrix";
import { createAnimationLoop } from "../utils/createAnimationLoop";

type Spring2DOptions = {
  target: vec2;
  initial: vec2;
  damping: number;
  stiffness: number;
  mass: number;
};

const defaultOptions: Spring2DOptions = {
  target: [1, 1],
  initial: [0, 0],
  damping: 0.1,
  stiffness: 2,
  mass: 1,
};

export function create2DSpring(
  options: Accessor<Partial<Spring2DOptions>> = () => defaultOptions,
) {
  const initStore: KinematicBody<vec2> = {
    position: options().initial ?? defaultOptions.initial,
    velocity: [0, 0],
    acceleration: [0, 0],
  };
  const [body, setBody] = createStore(initStore);

  const distanceVector = vec2.create();
  const fricctionForce = vec2.create();
  const elasticForce = vec2.create();
  const sumForces = vec2.create();

  // NOTE: Maybe return the animtion controller?
  createAnimationLoop((currentTime, deltaTime) => {
    const { target, damping, stiffness, mass } = {
      ...defaultOptions,
      ...options(),
    };

    if (mass === 0) {
      // FIXME: Is this the best way to handle this in library code?
      throw new Error("Cannot create a spring with mass 0");
    }

    vec2.sub(distanceVector, target, body.position);
    vec2.scale(elasticForce, distanceVector, stiffness);
    vec2.scale(fricctionForce, body.velocity, -damping);

    vec2.add(sumForces, elasticForce, fricctionForce);

    console.log(
      "distanceVector: ",
      vec2.str(distanceVector),
      "elasticForce",
      vec2.str(elasticForce),
      "fricctionForce",
      vec2.str(fricctionForce),
      "sumForces",
      vec2.str(sumForces),
    );

    const acceleration = vec2.scale(vec2.create(), sumForces, 1 / mass);
    const velocity = vec2.scaleAndAdd(
      vec2.create(),
      body.velocity,
      acceleration,
      deltaTime / 1000,
    );
    const position = vec2.scaleAndAdd(
      vec2.create(),
      body.position,
      acceleration,
      deltaTime / 1000,
    );

    setBody({
      position,
      velocity,
      acceleration,
    });
  });

  return body;
}
