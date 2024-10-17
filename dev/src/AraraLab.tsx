import { createMousePosition } from "@solid-primitives/mouse";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import { createSineWave } from "./utils/sine-wave";

export default function AraraLab() {
  const mouse = createMousePosition();

  const sineX = createSineWave(() => ({
    offset: mouse.x,
    frequency: 1,
    amplitude: 90,
    phase: Math.PI / 2,
  }));

  const sineY = createSineWave(() => ({
    offset: mouse.y,
    frequency: 2,
    amplitude: 90,
    phase: 0,
  }));

  const trailPos = () => {
    return {
      x: sineX.position - 0.1 * sineX.velocity,
      y: sineY.position - 0.1 * sineY.velocity,
    };
  };

  return (
    <div>
      <div>
        MOUSE: ({mouse.x}, {mouse.y})
      </div>
      <div
        class="absolute -z-20 size-20 rounded-full bg-blue-500 shadow-xl"
        style={{
          transform: `translate(${mouse.x - 40}px, ${mouse.y - 40}px)`,
        }}
      />
      <div
        class="absolute -z-20 size-8 rounded-full bg-green-500 shadow-xl"
        style={{
          transform: `translate(${sineX.position - 16}px, ${sineY.position - 16}px)`,
        }}
      />
      <div
        class="absolute -z-20 size-4 rounded-full bg-red-500 shadow-xl"
        style={{
          transform: `translate(${trailPos().x - 8}px, ${trailPos().y - 8}px)`,
        }}
      />
    </div>
  );
}
