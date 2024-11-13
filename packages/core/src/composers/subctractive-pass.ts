import { vec2, vec3 } from 'gl-matrix'
import { type Body2DAnimationPass } from '../physics/body-2d-animation'
import { type Body3DAnimationPass } from '../physics/body-3d-animation'
import { type BodyAnimationPass } from '../physics/body-animation'

export function subtractivePass(rawPass: BodyAnimationPass): BodyAnimationPass {
  return (world) => {
    const { body } = world
    const rawResult = rawPass(world)
    return {
      position: body.position - rawResult.position,
      velocity: body.velocity - rawResult.velocity,
      acceleration: body.acceleration - rawResult.acceleration,
    }
  }
}

export function subtractive2DPass(
  rawPass: Body2DAnimationPass,
): Body2DAnimationPass {
  return (world) => {
    const { body } = world
    const rawResult = rawPass(world)
    return {
      position: vec2.sub([0, 0], body.position, rawResult.position),
      velocity: vec2.sub([0, 0], body.velocity, rawResult.velocity),
      acceleration: vec2.sub([0, 0], body.acceleration, rawResult.acceleration),
    }
  }
}

export function subtractive3DPass(
  rawPass: Body3DAnimationPass,
): Body3DAnimationPass {
  return (world) => {
    const { body } = world
    const rawResult = rawPass(world)
    return {
      position: vec3.sub([0, 0, 0], body.position, rawResult.position),
      velocity: vec3.sub([0, 0, 0], body.velocity, rawResult.velocity),
      acceleration: vec3.sub(
        [0, 0, 0],
        body.acceleration,
        rawResult.acceleration,
      ),
    }
  }
}
