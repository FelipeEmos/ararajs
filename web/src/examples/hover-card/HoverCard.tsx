import {
  createBodyAnimation,
  createSpring,
  createSpring2D,
  lerp,
  sineWavePass,
} from 'ararajs'

import { cn } from '@lib/cn'
import { createElementSize } from '@solid-primitives/resize-observer'

import { createSignal } from 'solid-js'
import { createMouseDistanceFromCenter } from './createMouseDistanceFromCenter'

export function HoverCard(props: { imgSrc: string; class: string }) {
  /*
  SPRING
  Ease transition from Hover into non hover state
  */
  const [isHovering, setIsHovering] = createSignal(false)
  const [effectPercentage] = createSpring(() => ({
    target: isHovering() ? 1 : 0,
    stiffness: 150,
    damping: 16,
  }))

  const [cardContainer, setCardContainer] = createSignal<HTMLDivElement>()
  const mouseDistanceFromCenter = createMouseDistanceFromCenter(cardContainer)

  /*
  SPRING
  Add some sort of delay to rotation point
  */
  const [rotationPoint] = createSpring2D(() => ({
    target: mouseDistanceFromCenter(),
    stiffness: 150,
    damping: 16,
  }))

  const raiseAmount = () => 1 + 0.1 * effectPercentage.position
  const heroRaiseAmount = () => 1.2 - 0.1 * effectPercentage.position

  const CARD_ROTATION = 0.05
  const roll = () =>
    CARD_ROTATION * effectPercentage.position * rotationPoint.position[1]
  const tilt = () =>
    CARD_ROTATION * effectPercentage.position * rotationPoint.position[0]

  const HERO_ROTATION = 0.05
  const heroRoll = () =>
    HERO_ROTATION * effectPercentage.position * rotationPoint.position[1]
  const heroTilt = () =>
    HERO_ROTATION * effectPercentage.position * rotationPoint.position[0]

  const [shiningEffectAnimation] = createBodyAnimation(() => [
    /*
    SINE WAVE
    Adds the periodic nature of the effect
    */
    sineWavePass({
      amplitude: 0.5,
      frequency: 0.2,
      phase: Math.PI / 2,
    }),
    /*
    CUSTOM PASS
    Manually filter only the upper movement
    */
    ({ body }) => {
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
  ])

  const [shiningEffectContainer, setShineEffectContainer] =
    createSignal<HTMLDivElement>()
  const shiningEffectContainerSize = createElementSize(shiningEffectContainer)

  const cardContainerSize = createElementSize(cardContainer)
  const shiningEffectTranslation = () => {
    const min = -(shiningEffectContainerSize.height ?? 0) - 30
    const max =
      (cardContainerSize.height ?? 0) + (shiningEffectContainerSize.height ?? 0)
    return lerp(shiningEffectAnimation.position, min, max)
  }

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
      ref={setCardContainer}
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
