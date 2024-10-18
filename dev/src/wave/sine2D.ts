import { Accessor, createMemo, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { createAnimationLoop } from "../utils/createAnimationLoop";
import { KinematicBody } from "../physics/physics";
import { vec2 } from "gl-matrix";
import { createSineWave, SineWaveOptions } from "./sine";

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

function mergeKinematicBody(
  body1: KinematicBody,
  body2: KinematicBody,
): KinematicBody<vec2> {
  return {
    position: [body1.position, body2.position],
    velocity: [body1.velocity, body2.velocity],
    acceleration: [body1.acceleration, body2.acceleration],
  };
}

export function create2DSineWave(
  options: Accessor<Partial<Sine2DWaveOptions>> = () => defaultOptions,
) {
  const splittedOptions = () =>
    split2DOptions({
      ...defaultOptions,
      ...options(),
    });

  const xSineWave = createSineWave(() => splittedOptions()[0]);
  const ySineWave = createSineWave(() => splittedOptions()[1]);

  return createMemo(() => mergeKinematicBody(xSineWave, ySineWave));
}
