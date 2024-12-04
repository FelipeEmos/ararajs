import { createElementSize } from '@solid-primitives/resize-observer'
import { createSignal } from 'solid-js'
import { createSpring2D, vec2 } from 'ararajs'
import { cn } from '@lib/cn'
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
      class="group relative min-h-64 w-full overflow-hidden rounded-lg bg-arara-text/90 p-8 shadow-inner"
      ref={setContainer}
    >
      <MoveMouseOverlay />

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

function MoveMouseOverlay() {
  return (
    <div class="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-arara-article-bg transition-opacity duration-500 group-hover:opacity-0">
      <PointerSVG class="ml-auto size-12 animate-bounce pb-0 text-arara-article-bg" />
      <div class="text-center text-xl transition-opacity">
        Move <span class="bg-arara-bg p-1 text-arara-text">Mouse</span>
      </div>
    </div>
  )
}

function PointerSVG(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={cn('size-32', props.class)}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12.586 12.586 19 19" />
      <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z" />
    </svg>
  )
}
