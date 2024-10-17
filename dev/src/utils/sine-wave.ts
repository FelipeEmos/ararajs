import { Accessor, createSignal, onCleanup } from "solid-js";
import { KinematicBody } from "./physics";
import { createStore } from "solid-js/store";

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
  const [body, setBody] = createStore<KinematicBody<"1d">>({
    position: 0,
    velocity: 0,
    acceleration: 0,
  });

  let animationFrameLoop: number | undefined;

  // TODO: use an animation loop inside the engine
  const onAnimationFrame = (currentTime: number) => {
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

    animationFrameLoop = requestAnimationFrame(onAnimationFrame);
  };

  animationFrameLoop = requestAnimationFrame(onAnimationFrame);
  onCleanup(() => cancelAnimationFrame(animationFrameLoop!));

  return body;
}
