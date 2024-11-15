import { createElementSize } from '@solid-primitives/resize-observer'
import { createSignal } from 'solid-js'
import { createSpring } from 'ararajs'

export function SpringDemo() {
  const [container, setContainer] = createSignal<HTMLDivElement>()
  const containerSize = createElementSize(container)

  const [ball, setBall] = createSignal<HTMLDivElement>()
  const ballSize = createElementSize(ball)

  const [targetState, setTargetState] = createSignal(false)
  const target = () =>
    targetState() ? (ballSize.width ?? 0) : (containerSize.width ?? 0) - 120

  const [body] = createSpring(() => ({
    target: target(),
    stiffness: 66,
    damping: 16,
  }))

  return (
    <div
      class="relative w-full flex justify-center overflow-hidden bg-arara-100 p-8 border-4 border-arara-400 shadow-inner"
      ref={setContainer}
    >
      <button
        onClick={() => setTargetState(!targetState())}
        class="mt-6 rounded-lg bg-arara-300 px-4 py-3 text-lg font-medium transition-all duration-100 active:translate-y-0.5"
      >
        Toggle Target
      </button>
      <div
        class="absolute z-10 left-8 top-8 size-8 rounded-full bg-emerald-500 shadow-xl"
        style={{
          transform: `translate(${body.position}px`,
        }}
        ref={setBall}
      />
      <div
        class="absolute left-8 top-8 size-8 rounded-full bg-rose-400 shadow-xl"
        style={{
          transform: `translate(${target()}px`,
        }}
      />
    </div>
  )
}
