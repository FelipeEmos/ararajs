import { vec2, vec3 } from 'gl-matrix'

export type Body = {
  position: number
  velocity: number
  acceleration: number
}

export type Body2D = {
  position: vec2
  velocity: vec2
  acceleration: vec2
}

export type Body3D = {
  position: vec3
  velocity: vec3
  acceleration: vec3
}

export type Dimension = 0 | 1 | 2 | 'x' | 'y' | 'z'
export function getAxis(dimension: Dimension): number {
  if (typeof dimension === 'number') return dimension
  if (dimension === 'x') return 0
  if (dimension === 'y') return 1
  return 2
}

export function sliceDimension(dimension: Dimension, body: Body2D): Body
export function sliceDimension(dimension: Dimension, body: Body3D): Body
export function sliceDimension(
  dimension: Dimension,
  body: Body3D | Body2D,
): Body {
  const axis = getAxis(dimension)
  return {
    position: body.position[axis]!,
    velocity: body.velocity[axis]!,
    acceleration: body.acceleration[axis]!,
  }
}
