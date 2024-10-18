import { Accessor, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { Scalar, KinematicBody } from "../physics/physics";
import {
  AnimationController,
  createAnimation,
  AnimationControllerGenerator,
} from "../utils/createAnimationController";

type SpringOptions = {
  target: Scalar;
  initial: Scalar;
  damping: number;
  stiffness: number;
  mass: number;
};

export const defaultOptions: SpringOptions = {
  target: 1,
  initial: 0,
  damping: 0.5,
  stiffness: 0.5,
  mass: 1,
};

export function createSpring(
  options: Accessor<Partial<SpringOptions>> = () => defaultOptions,
  animationController?: AnimationControllerGenerator,
): [
  body: Accessor<KinematicBody>,
  animationController: Accessor<AnimationController>,
] {
  const [body, setBody] = createStore<KinematicBody>({
    position: options().initial ?? defaultOptions.initial,
    velocity: 0,
    acceleration: 0,
  });

  const controller = createAnimation((currentTime, deltaTime) => {
    const { target, damping, stiffness, mass } = {
      ...defaultOptions,
      ...options(),
    };

    if (mass === 0) {
      // FIXME: Is this the best way to handle this in library code?
      throw new Error("Cannot create a spring with mass 0");
    }

    const delta = target - body.position;
    const elasticForce = delta * stiffness;
    const fricctionForce = body.velocity * -damping;

    const acceleration = (elasticForce + fricctionForce) / mass;
    const velocity = body.velocity + (acceleration * deltaTime) / 1000;
    const position = body.position + (velocity * deltaTime) / 1000;

    setBody({
      position,
      velocity,
      acceleration,
    });
  }, animationController);

  return [body, controller];
}
