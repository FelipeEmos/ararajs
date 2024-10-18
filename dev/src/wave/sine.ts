import { Accessor, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { createAnimationLoop } from "../utils/createAnimationLoop";
import { KinematicBody } from "../physics/physics";

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
) {
  const [body, setBody] = createStore<KinematicBody>({
    position: 0,
    velocity: 0,
    acceleration: 0,
  });

  createAnimationLoop((currentTime) => {
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
  });

  return body;
}
