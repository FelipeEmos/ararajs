import { Accessor, createSignal, onCleanup } from "solid-js";
import { Store } from "solid-js/store";
import { createStore } from "solid-js/store";
import { KinematicBody } from "../physics/physics";
import {
  AnimationController,
  AnimationControllerGenerator,
  createAnimation,
} from "../utils/createAnimationController";

export type SineWaveOptions = {
  offset: number;
  frequency: number;
  amplitude: number;
  phase: number;
};

const defaultOptions: SineWaveOptions = {
  offset: 0,
  frequency: 1,
  amplitude: 1,
  phase: 0,
};

export function createSineWave(
  options: Accessor<Partial<SineWaveOptions>> = () => defaultOptions,
  animationController?: AnimationControllerGenerator,
): [
  body: Store<KinematicBody>,
  animationController: Accessor<AnimationController>,
] {
  const [body, setBody] = createStore<KinematicBody>({
    position: 0,
    velocity: 0,
    acceleration: 0,
  });

  const controller = createAnimation((currentTime) => {
    const { offset, frequency, amplitude, phase } = {
      ...defaultOptions,
      ...options(),
    };

    const omega = 2 * Math.PI * frequency;
    const sine = Math.sin((omega * currentTime) / 1000 + phase);
    const cosine = Math.cos((omega * currentTime) / 1000 + phase);

    setBody({
      position: offset + amplitude * sine,
      velocity: amplitude * omega * cosine,
      acceleration: -amplitude * omega * omega * cosine,
    });
  }, animationController);

  return [body, controller];
}
