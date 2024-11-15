import {
  createBodyAnimation,
  createSpring,
  createSpring2D,
  lerp,
  sineWavePass,
  vec2,
} from '@ararajs/core'

import { createElementSize } from '@solid-primitives/resize-observer'
import { createMousePosition } from '@solid-primitives/mouse'

import { createSignal } from 'solid-js'
import { cn } from '@lib/cn'

function getRootPosition(element: HTMLElement | null | undefined): {
  top: number
  left: number
} {
  if (!element) {
    return { top: 0, left: 0 }
  }
  const parentPosition = getRootPosition(element.offsetParent as HTMLElement)
  return {
    top: element.offsetTop + parentPosition.top,
    left: element.offsetLeft + parentPosition.left,
  }
}

export function HoverCard(props: { imgSrc: string; class: string }) {
  const [container, setContainer] = createSignal<HTMLDivElement>()
  const containerSize = createElementSize(container)

  const mouse = createMousePosition()
  const mouseInsideCard = (): vec2 => {
    const origin = getRootPosition(container())

    const rawTargetX = mouse.x - origin.left
    const minX = 0
    const maxX = containerSize.width ?? 0
    const targetX = Math.max(minX, Math.min(rawTargetX, maxX))

    const rawTargetY = mouse.y - origin.top
    const minY = 0
    const maxY = containerSize.height ?? 0
    const targetY = Math.max(minY, Math.min(rawTargetY, maxY))

    const relativeX = targetX - (containerSize.width ?? 0) / 2
    const relativeY = targetY - (containerSize.height ?? 0) / 2

    // return [targetX, targetY];
    return [relativeX, relativeY]
  }

  const [mouseTweakAnimation] = createSpring2D(() => ({
    target: mouseInsideCard(),
    stiffness: 150,
    damping: 16,
  }))

  const [isHovering, setIsHovering] = createSignal(false)
  const [effectPercentage] = createSpring(() => ({
    target: isHovering() ? 1 : 0,
    stiffness: 150,
    damping: 16,
  }))

  const raiseAmount = () => 1 + 0.1 * effectPercentage.position
  const heroRaiseAmount = () => 1.2 - 0.1 * effectPercentage.position
  // const raiseAmount = () => 1;
  const CARD_ROTATION = 0.05
  const roll = () =>
    CARD_ROTATION * effectPercentage.position * mouseTweakAnimation.position[1]
  const tilt = () =>
    CARD_ROTATION * effectPercentage.position * mouseTweakAnimation.position[0]

  const HERO_ROTATION = 0.05
  const heroRoll = () =>
    HERO_ROTATION * effectPercentage.position * mouseTweakAnimation.position[1]
  const heroTilt = () =>
    HERO_ROTATION * effectPercentage.position * mouseTweakAnimation.position[0]

  const [shiningEffectContainer, setShineEffectContainer] =
    createSignal<HTMLDivElement>()
  const shiningEffectContainerSize = createElementSize(shiningEffectContainer)

  const frequency = 0.2
  const [shiningEffectAnimation] = createBodyAnimation(() => [
    sineWavePass({
      amplitude: 0.5,
      frequency,
      phase: Math.PI / 2,
    }),
    ({ body }) => {
      // Filter only upper movement
      if (body.velocity < 0) {
        return {
          position: 0,
          velocity: 0,
          acceleration: 0,
        }
      }
      return {
        ...body,
        position: body.position + 0.5,
      }
    },
    // TODO: Make it easier to control "pulses"
    // ({ body, currentTime }) => {
    //   const t = currentTime / 1000;
    //   const cycle = Math.floor(frequency * t);
    //   // Discard some cycles
    //   if (cycle % 2 === 0) {
    //     return body;
    //   }
    //   return {
    //     position: 1,
    //     velocity: 0,
    //     acceleration: 0,
    //   };
    // },
  ])

  const shiningEffectTranslation = () => {
    const min = -(shiningEffectContainerSize.height ?? 0) - 30
    const max =
      (containerSize.height ?? 0) + (shiningEffectContainerSize.height ?? 0)
    return lerp(shiningEffectAnimation.position, min, max)
  }

  // let teste = 0;
  // createEffect(() => {
  //   console.log(teste, "ShiningTranslation", shiningEffectTranslation());
  //   teste++;
  // });

  return (
    <div
      class={cn(
        'relative flex min-h-32 w-full flex-col overflow-hidden rounded-lg bg-gray-800 p-4 text-white shadow-lg',
        props.class,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transform: `scale(${raiseAmount()})
        rotateX(${roll()}deg)
        rotateY(${tilt()}deg)`,
      }}
      ref={setContainer}
    >
      <div
        class="absolute inset-x-0 top-0 z-10"
        style={{
          transform: `translateY(${shiningEffectTranslation()}px)`,
          opacity: effectPercentage.position * 0.3,
        }}
        ref={setShineEffectContainer}
      >
        <div class="mb-2 h-2 w-full bg-white" />
        <div class="h-4 w-full bg-white" />
      </div>
      <div class="relative w-full flex-1 overflow-hidden rounded-lg">
        <img
          src={props.imgSrc}
          class="z-0 size-full object-cover shadow-[inset_4px_4px_20px_20px_rgba(0,0,0,0.3)]"
          style={{
            transform: `scale(${heroRaiseAmount()})
            rotateX(${heroRoll()}deg)
            rotateY(${heroTilt()}deg)
            `,
          }}
        />
        <div class="pointer-events-none absolute -inset-2 shadow-[inset_4px_4px_20px_20px_rgba(0,0,0,0.3)] ring-[16px] ring-inset ring-black/10" />
      </div>
      <h3 class="font-thin">Hover Me</h3>
    </div>
  )
}
