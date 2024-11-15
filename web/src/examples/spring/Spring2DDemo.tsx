import { createElementSize } from '@solid-primitives/resize-observer'
import { createSignal } from 'solid-js'
import { createSpring, createSpring2D, vec2 } from 'ararajs'
import { createMousePosition } from '@solid-primitives/mouse'
import { getDOMRootPosition } from './getDOMRootPosition'

export function Spring2DDemo() {
  const [container, setContainer] = createSignal<HTMLDivElement>()
  const containerSize = createElementSize(container)

  const [ball, setBall] = createSignal<HTMLDivElement>()
  const ballSize = createElementSize(ball)
  const padding = 32 // px

  const mouse = createMousePosition()
  const target = (): vec2 => {
    const origin = getDOMRootPosition(container())

    const rawTargetX =
      mouse.x - origin.left - padding - (ballSize.width ?? 0) / 2
    const minX = 0
    const maxX =
      (containerSize.width ?? 0) - (ballSize.width ?? 0) - 2 * padding
    const targetX = Math.max(minX, Math.min(rawTargetX, maxX))

    const rawTargetY =
      mouse.y - origin.top - padding - (ballSize.height ?? 0) / 2
    const minY = 0
    const maxY =
      (containerSize.height ?? 0) - (ballSize.height ?? 0) - 2 * padding
    const targetY = Math.max(minY, Math.min(rawTargetY, maxY))

    return [targetX, targetY]
  }

  const [body] = createSpring2D(() => ({
    target: target(),
    stiffness: 32,
    damping: 16,
  }))

  return (
    <div
      class="relative min-h-64 w-full overflow-hidden rounded-lg bg-arara-100 p-8 shadow-inner"
      ref={setContainer}
    >
      <div class="z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        Move Mouse
      </div>
      <div
        class="z-10 size-8 rounded-full bg-emerald-500 shadow-xl"
        style={{
          transform: `translate(${body.position[0]}px, ${body.position[1]}px)`,
        }}
        ref={setBall}
      />
      <div
        class="absolute left-8 top-8 size-8 rounded-full bg-rose-400 shadow-xl transition-opacity"
        style={{
          left: `${target()[0] + padding}px`,
          top: `${target()[1] + padding}px`,
        }}
      />
    </div>
  )
}
