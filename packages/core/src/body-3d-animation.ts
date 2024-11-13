import {
  type AnimationCallback,
  type AnimationController,
  type AnimationControllerGenerator,
  useOrCreateAnimationController,
  VOID_ANIMATION_CONTROLLER,
} from './animation'
import { createEffect, createMemo, untrack } from 'solid-js'
import { createStore, unwrap } from 'solid-js/store'
import { type Body3D } from './physics'

export type Body3DAnimationPass = (world: {
  body: Body3D
  currentTime: number
  deltaTime: number
}) => Body3D

export type Body3DAnimationOptions = {
  initialConditions?: Body3D
  animationController?: AnimationControllerGenerator
}

export function createBody3DAnimation(
  kinematicAnimationPasses: () => Body3DAnimationPass[],
  options?: () => Body3DAnimationOptions,
) {
  const [body, setBody3D] = createStore<Body3D>({
    position: [0, 0, 0],
    velocity: [0, 0, 0],
    acceleration: [0, 0, 0],
    // TODO: subscribe to Stop event and reset the body to intialConditions
    ...options?.().initialConditions,
  })

  const animationCallbacks = createMemo<AnimationCallback[]>(() => {
    const list: AnimationCallback[] = []

    for (const pass of kinematicAnimationPasses()) {
      const callback: AnimationCallback = (world) => {
        const beforePass = unwrap(body)
        const afterPass = pass({ body: beforePass, ...world })
        setBody3D(afterPass)
      }
      list.push(callback)
    }

    return list
  })

  const animationController = useOrCreateAnimationController(
    options?.().animationController,
  )

  type SyncEffectDependencies = {
    controller: AnimationController
    callbacks: AnimationCallback[]
  }

  createEffect<SyncEffectDependencies>(
    (lastEffect) => {
      const { controller: lastController, callbacks: lastCallbacks } =
        lastEffect
      untrack(() => {
        lastCallbacks.forEach((cb) => {
          lastController.remove(cb)
        })
      })

      const controller = animationController()
      const callbacks = animationCallbacks()
      untrack(() => {
        callbacks.forEach((cb) => {
          controller.add(cb)
        })
      })
      return { controller, callbacks }
    },
    {
      controller: VOID_ANIMATION_CONTROLLER,
      callbacks: [],
    },
  )

  return [body, animationController] as const
}
