import { createElementSize } from '@solid-primitives/resize-observer'
import { createSignal } from 'solid-js'
import { createSineWave } from 'ararajs'

export function SineWaveDemo() {
  const [body] = createSineWave({
    amplitude: 90,
  })

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
      class="w-full overflow-hidden rounded-lg p-8 shadow-inner"
      ref={setContainer}
    >
      <div
        class="size-8 rounded-full bg-arara-bg shadow-xl"
        style={{
          transform: `translate(${xOffset()}px`,
        }}
        ref={setBall}
      />
    </div>
  )
}
