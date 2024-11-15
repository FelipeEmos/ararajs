import { createElementSize } from '@solid-primitives/resize-observer'
import { createMousePosition } from '@solid-primitives/mouse'

import { getDOMRootPosition } from './getDOMRootPosition'
import { vec2 } from 'ararajs'
import { type Accessor } from 'solid-js'

export function createMouseDistanceFromCenter(
  container: Accessor<HTMLElement | undefined>,
) {
  const containerSize = createElementSize(container)
  const mouse = createMousePosition()

  const mouseDistanceFromCenter = (): vec2 => {
    const origin = getDOMRootPosition(container())

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

    return [relativeX, relativeY]
  }

  return mouseDistanceFromCenter
}
