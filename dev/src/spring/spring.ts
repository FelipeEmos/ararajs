import { Accessor, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { Scalar, KinematicBody } from "../physics/physics";

type SpringOptions = {
  target: Scalar;
  initial: Scalar;
  damping: number;
  stiffness: number;
  mass: number;
};

const defaultOptions: SpringOptions = {
  target: 1,
  initial: 0,
  damping: 0.5,
  stiffness: 0.5,
  mass: 1,
};

export function createSpring(
  options: Accessor<Partial<SpringOptions>> = () => defaultOptions,
) {
  const [body, setBody] = createStore({
    position: options().initial ?? defaultOptions.initial,
    velocity: 0,
    acceleration: 0,
  } satisfies KinematicBody);

  let animationFrameLoop: number | undefined;

  let lastTime = performance.now();

  // TODO: use an animation loop inside the engine
  const onAnimationFrame = (currentTime: number) => {
    const { target, damping, stiffness, mass } = {
      ...defaultOptions,
      ...options(),
    };

    if (mass === 0) {
      // FIXME: Is this the best way to handle this in library code?
      throw new Error("Cannot create a spring with mass 0");
    }

    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    const delta = target - body.position;

    const acceleration = (delta * stiffness) / mass;
    const velocity = body.velocity + acceleration * deltaTime;
    const position = body.position + velocity * deltaTime;

    setBody({
      position,
      velocity,
      acceleration,
    });

    animationFrameLoop = requestAnimationFrame(onAnimationFrame);
  };

  animationFrameLoop = requestAnimationFrame(onAnimationFrame);
  onCleanup(() => cancelAnimationFrame(animationFrameLoop!));

  return body;
}
