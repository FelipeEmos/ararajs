import { createMousePosition } from "@solid-primitives/mouse";
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

import { create2DSpring } from "./spring/spring2D";
import { vec2 } from "gl-matrix";
import { create2DSineWave } from "./wave/sine2D";
import { createSineWave } from "./wave/sine";

export default function AraraLab() {
  const mouse = createMousePosition();

  // const sineX = createSineWave(() => ({
  //   offset: mouse.x,
  //   frequency: 1,
  //   amplitude: 90,
  //   phase: Math.PI / 2,
  // }));

  // const sineY = createSineWave(() => ({
  //   offset: mouse.y,
  //   frequency: 2,
  //   amplitude: 90,
  //   phase: 0,
  // }));

  const sine2D = create2DSineWave(() => ({
    offset: [mouse.x, mouse.y],
    frequency: [1, 2],
    amplitude: [90, 90],
    phase: [Math.PI / 2, 0],
  }));

  const velocityTrailingPos = () => {
    const { position, velocity } = sine2D();
    return vec2.scaleAndAdd(vec2.create(), position, velocity, -0.1);
  };

  const spring = create2DSpring(() => ({
    initial: [mouse.x, mouse.y],
    target: [mouse.x, mouse.y],
  }));

  const springCombined = create2DSpring(() => ({
    initial: [mouse.x, mouse.y],
    target: sine2D().position,
    stiffness: 4,
  }));

  const sineCombined = create2DSineWave(() => ({
    offset: spring.position,
    frequency: [1, 2],
    amplitude: [90, 90],
    phase: [Math.PI / 2, 0],
  }));

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
      {/* <div
        class="absolute -z-20 size-8 rounded-full bg-green-500 shadow-xl"
        style={{
          transform: `translate(${sineX.position - 16}px, ${sineY.position - 16}px)`,
        }}
      /> */}
      {/* <div
        class="absolute -z-20 size-8 rounded-full bg-black shadow-xl"
        style={{
          transform: `translate(${springCombined.position[0] - 16}px, ${springCombined.position[1] - 16}px)`,
        }}
      /> */}
      <div
        class="absolute -z-20 size-8 rounded-full bg-amber-600 shadow-xl"
        style={{
          transform: `translate(${sineCombined().position[0] - 16}px, ${sineCombined().position[1] - 16}px)`,
        }}
      />
      {/* <div
        class="absolute -z-20 size-8 rounded-full bg-green-500 shadow-xl"
        style={{
          transform: `translate(${sine2D().position[0] - 16}px, ${sine2D().position[1] - 16}px)`,
        }}
      /> */}
      {/* <div
        class="absolute -z-20 size-4 rounded-full bg-red-500 shadow-xl"
        style={{
          transform: `translate(${velocityTrailingPos()[0] - 8}px, ${velocityTrailingPos()[1] - 8}px)`,
        }}
      /> */}
      <div
        class="absolute -z-20 size-10 rounded-full bg-emerald-700 shadow-xl"
        style={{
          transform: `translate(${spring.position[0] - 20}px, ${spring.position[1] - 20}px)`,
        }}
      />
    </div>
  );
}
