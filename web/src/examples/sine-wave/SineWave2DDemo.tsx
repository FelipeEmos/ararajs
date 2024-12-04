import { cn } from '@lib/cn'
import { createElementSize } from '@solid-primitives/resize-observer'
import { createSignal } from 'solid-js'
import { createSineWave2D } from 'ararajs'

export function SineWave2DDemo(props: { class?: string; ballClass?: string }) {
  const [container, setContainer] = createSignal<HTMLDivElement>()
  const containerSize = createElementSize(container)

  const [ball, setBall] = createSignal<HTMLDivElement>()
  const ballSize = createElementSize(ball)

  const radius = 90
  const freq = 1
  const [body] = createSineWave2D({
    amplitude: [radius, radius],
    frequency: [freq, freq],
    phase: [Math.PI / 2, 0],
  })

  const xOffset = () => {
    return (
      body.position[0] +
      -(ballSize.width ?? 0) / 2 +
      (containerSize.width ?? 0) / 2
    )
  }

  const yOffset = () => {
    return (
      body.position[1] +
      -(ballSize.height ?? 0) / 2 +
      (containerSize.height ?? 0) / 2
    )
  }

  const paddingY = 32
  return (
    <div
      class={cn(
        'h-full w-full overflow-hidden rounded-lg shadow-inner',
        props.class,
      )}
      style={{
        'min-height': `${2 * radius + 2 * paddingY + (ballSize.height ?? 0)}px`,
      }}
      ref={setContainer}
    >
      <div
        class={cn(
          'size-10 rounded-full bg-arara-text/70 shadow-xl',
          props.ballClass,
        )}
        style={{
          transform: `translate(${xOffset()}px, ${yOffset()}px)`,
        }}
        ref={setBall}
      />
    </div>
  )
}
