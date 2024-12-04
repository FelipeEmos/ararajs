import { cn } from '@lib/cn'
import { createElementSize } from '@solid-primitives/resize-observer'
import { createSignal } from 'solid-js'
import { createSineWave } from 'ararajs'

export function SineWaveDemo(props: {
  class?: string
  ballClass?: string
  frequency?: () => number
}) {
  const [body] = createSineWave(() => ({
    amplitude: 90,
    frequency: props.frequency?.() ?? 1,
  }))

  const [container, setContainer] = createSignal<HTMLDivElement>()
  const containerSize = createElementSize(container)
  const [ball, setBall] = createSignal<HTMLDivElement>()
  const ballSize = createElementSize(ball)

  const xOffset = () => {
    return (
      body.position +
      -(ballSize.width ?? 0) / 2 +
      (containerSize.width ?? 0) / 2
    )
  }

  return (
    <div
      class={cn(
        'w-full overflow-hidden rounded-lg p-8 shadow-inner',
        props.class,
      )}
      ref={setContainer}
    >
      <div
        class={cn('size-8 rounded-full bg-arara-bg shadow-xl', props.ballClass)}
        style={{
          transform: `translate(${xOffset()}px`,
        }}
        ref={setBall}
      />
    </div>
  )
}
