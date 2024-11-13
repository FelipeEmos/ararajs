import {
  type Body2DAnimationOptions,
  type Body2DAnimationPass,
  createBody2DAnimation,
} from '../body-2d-animation'
import { type Accessor } from 'solid-js'
import { vec2 } from 'gl-matrix'

export type Spring2DOptions = {
  mass: number
  target: vec2
  initialPosition: vec2
  targetThreshold?: number
  damping: number
  stiffness: number
}

export const defaultOptions = {
  mass: 1,
  target: [1, 1],
  targetThreshold: 0.001,
  initialPosition: [0, 0],
  damping: 0.5,
  stiffness: 0.5,
} as const satisfies Spring2DOptions

export function spring2DPass(
  options?: Partial<Spring2DOptions> | Accessor<Partial<Spring2DOptions>>,
): Body2DAnimationPass {
  const distanceVector = vec2.create()
  const fricctionForce = vec2.create()
  const elasticForce = vec2.create()
  const sumForces = vec2.create()

  return ({ body, deltaTime }) => {
    const opts = typeof options === 'function' ? options() : options
    const { target, targetThreshold, damping, stiffness, mass } = {
      ...defaultOptions,
      ...opts,
    }

    const threshold = vec2.distance(target, body.position)
    if (Math.abs(threshold) < Math.abs(targetThreshold)) {
      return {
        position: target,
        velocity: [0, 0],
        acceleration: [0, 0],
      }
    }

    if (mass === 0) {
      // FIXME: Is this the best way to handle this in library code?
      throw new Error('Cannot create a spring2D animation with mass 0')
    }

    // Elastic
    vec2.sub(distanceVector, target, body.position)
    vec2.scale(elasticForce, distanceVector, stiffness)

    // Fricction
    vec2.scale(fricctionForce, body.velocity, -damping)

    // Resulting Force
    vec2.add(sumForces, elasticForce, fricctionForce)

    const acceleration = vec2.scale(vec2.create(), sumForces, 1 / mass)
    const velocity = vec2.scaleAndAdd(
      vec2.create(),
      body.velocity,
      acceleration,
      deltaTime / 1000,
    )

    const position = vec2.scaleAndAdd(
      vec2.create(),
      body.position,
      velocity,
      deltaTime / 1000,
    )

    return {
      position,
      velocity,
      acceleration,
    }
  }
}

export function createSpring2D(
  options?: Partial<Spring2DOptions> | Accessor<Partial<Spring2DOptions>>,
  bodyAnimationOptions?: () => Body2DAnimationOptions,
) {
  return createBody2DAnimation(
    () => [spring2DPass(options)],
    bodyAnimationOptions,
  )
}
