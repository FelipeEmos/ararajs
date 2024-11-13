import { type Body, sliceDimension } from '../physics'
import { type Body2DAnimationPass } from '../body-2d-animation'
import { type Body3DAnimationPass } from '../body-3d-animation'
import { type BodyAnimationPass } from '../body-animation'

const BLANK_BODY = {
  position: 0,
  velocity: 0,
  acceleration: 0,
} as const satisfies Body

export function compose2DPass({
  x: xPass,
  y: yPass,
}: {
  x?: BodyAnimationPass
  y?: BodyAnimationPass
}): Body2DAnimationPass {
  return (world) => {
    const xRes =
      xPass?.({
        ...world,
        body: sliceDimension('x', world.body),
      }) ?? BLANK_BODY

    const yRes =
      yPass?.({
        ...world,
        body: sliceDimension('y', world.body),
      }) ?? BLANK_BODY

    return {
      position: [xRes.position, yRes.position],
      velocity: [xRes.velocity, yRes.velocity],
      acceleration: [xRes.acceleration, yRes.acceleration],
    }
  }
}

export function compose3DPass({
  x: xPass,
  y: yPass,
  z: zPass,
}: {
  x?: BodyAnimationPass
  y?: BodyAnimationPass
  z?: BodyAnimationPass
}): Body3DAnimationPass {
  return (world) => {
    const xRes =
      xPass?.({
        ...world,
        body: sliceDimension('x', world.body),
      }) ?? BLANK_BODY

    const yRes =
      yPass?.({
        ...world,
        body: sliceDimension('y', world.body),
      }) ?? BLANK_BODY

    const zRes =
      zPass?.({
        ...world,
        body: sliceDimension('z', world.body),
      }) ?? BLANK_BODY

    return {
      position: [xRes.position, yRes.position, zRes.position],
      velocity: [xRes.velocity, yRes.velocity, zRes.velocity],
      acceleration: [xRes.acceleration, yRes.acceleration, zRes.acceleration],
    }
  }
}
