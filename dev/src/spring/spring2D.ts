import { Accessor, createEffect, createMemo, onCleanup } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { KinematicBody } from "../physics/physics";
import { vec2 } from "gl-matrix";
import {
  AnimationController,
  AnimationCallback,
  createAnimation,
  AnimationControllerGenerator,
} from "../utils/createAnimationController";

type Spring2DOptions = {
  target: vec2;
  initial: vec2;
  damping: number;
  stiffness: number;
  mass: number;
};

export const defaultOptions: Spring2DOptions = {
  target: [1, 1],
  initial: [0, 0],
  damping: 0.1,
  stiffness: 2,
  mass: 1,
};

export function create2DSpring(
  options: Accessor<Partial<Spring2DOptions>> = () => defaultOptions,
  animationController?: AnimationControllerGenerator,
): [
  body: Store<KinematicBody<vec2>>,
  animationController: Accessor<AnimationController>,
] {
  const [body, setBody] = createStore<KinematicBody<vec2>>({
    position: options().initial ?? defaultOptions.initial,
    velocity: [0, 0],
    acceleration: [0, 0],
  });

  const distanceVector = vec2.create();
  const fricctionForce = vec2.create();
  const elasticForce = vec2.create();
  const sumForces = vec2.create();

  const controller = createAnimation((_currentTime, deltaTime) => {
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
  }, animationController);

  return [body, controller];
}
