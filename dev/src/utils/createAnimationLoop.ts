import { createSignal, Accessor, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";

// TODO: Include in solid-primitives???

export type onDrawCallback = (timeStamp: number, deltaTime: number) => void;

export type AnimationController = {
  running: Accessor<boolean>;
  start: VoidFunction;
  stop: VoidFunction;
  pause: VoidFunction;
};

export function createAnimationLoop(
  callback: onDrawCallback,
  options: {
    autoplay?: boolean | "on-mount";
  } = {
    autoplay: true,
  },
): AnimationController {
  if (isServer) {
    return {
      running: () => false,
      start: () => {},
      stop: () => {},
      pause: () => {},
    };
  }
  const [running, setRunning] = createSignal(false);
  let rafRequestID = 0;

  let lastTimestamp = 0;
  let lastPauseTimestamp = 0;
  const loop: FrameRequestCallback = (timestamp) => {
    rafRequestID = requestAnimationFrame(loop);

    const virtualTimestamp = timestamp + lastPauseTimestamp;
    const deltaTime = virtualTimestamp - lastTimestamp;
    lastTimestamp = virtualTimestamp;
    callback(virtualTimestamp, deltaTime);
  };
  const start = () => {
    if (running()) return;
    setRunning(true);
    rafRequestID = requestAnimationFrame(loop);
  };
  const pause = () => {
    setRunning(false);
    cancelAnimationFrame(rafRequestID);
  };
  const stop = () => {
    pause();
    lastPauseTimestamp = 0;
  };

  onCleanup(stop);

  if (options.autoplay === "on-mount") {
    onMount(start);
  } else if (options.autoplay === true) {
    start();
  }

  return {
    running,
    start,
    pause,
    stop,
  };
}
