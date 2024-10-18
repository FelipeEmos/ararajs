import {
  Accessor,
  createComputed,
  createMemo,
  createSignal,
  onCleanup,
} from "solid-js";
import { createStore, Store } from "solid-js/store";
import { KinematicBody } from "../physics/physics";
import { vec2 } from "gl-matrix";
import { createSineWave, SineWaveOptions } from "./sine";
import {
  AnimationController,
  AnimationControllerGenerator,
  useOrCreateAnimationController,
} from "../utils/createAnimationController";

export type Sine2DWaveOptions = {
  offset: vec2;
  frequency: vec2;
  amplitude: vec2;
  phase: vec2;
};

const defaultOptions: Sine2DWaveOptions = {
  offset: [0, 0],
  frequency: [1, 1],
  amplitude: [1, 1],
  phase: [0, 0],
};

function split2DOptions(
  options: Sine2DWaveOptions,
): [SineWaveOptions, SineWaveOptions] {
  const { offset, frequency, amplitude, phase } = options;
  return [
    {
      offset: offset[0],
      frequency: frequency[0],
      amplitude: amplitude[0],
      phase: phase[0],
    },
    {
      offset: offset[1],
      frequency: frequency[1],
      amplitude: amplitude[1],
      phase: phase[1],
    },
  ];
}

export function create2DSineWave(
  options: Accessor<Partial<Sine2DWaveOptions>> = () => defaultOptions,
  animationController?: AnimationControllerGenerator,
): [
  body: Store<KinematicBody<vec2>>,
  animationController: Accessor<AnimationController>,
] {
  const splittedOptions = () =>
    split2DOptions({
      ...defaultOptions,
      ...options(),
    });

  const controller = useOrCreateAnimationController(animationController);
  const [xSineWave] = createSineWave(() => splittedOptions()[0], controller);
  const [ySineWave] = createSineWave(() => splittedOptions()[1], controller);

  const [body, setBody] = createStore<KinematicBody<vec2>>({
    position: [xSineWave.position, ySineWave.position],
    velocity: [xSineWave.velocity, ySineWave.velocity],
    acceleration: [xSineWave.acceleration, ySineWave.acceleration],
  });

  createComputed(() => {
    setBody({
      position: [xSineWave.position, ySineWave.position],
      velocity: [xSineWave.velocity, ySineWave.velocity],
      acceleration: [xSineWave.acceleration, ySineWave.acceleration],
    });
  });

  return [body, controller];
}
