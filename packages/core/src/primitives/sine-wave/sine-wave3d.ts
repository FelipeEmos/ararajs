import {
  type Body3DAnimationOptions,
  type Body3DAnimationPass,
  createBody3DAnimation,
} from '../../physics/body-3d-animation'
import {
  defaultSineWaveOptions,
  type SineWaveOptions,
  sineWavePass,
} from './sine-wave'
import { type Dimension, getAxis } from '../../physics/physics'
import { type Accessor } from 'solid-js'
import { compose3DPass } from '../../composers/dimension-pass'
import { vec3 } from 'gl-matrix'

export type SineWave3DOptions = {
  offset: vec3
  frequency: vec3
  amplitude: vec3
  phase: vec3
}

function getOptionsInDimention(
  options:
    | Partial<SineWave3DOptions>
    | Accessor<Partial<SineWave3DOptions>>
    | undefined,
  dimension: Dimension,
): Partial<SineWaveOptions> {
  const opts = typeof options === 'function' ? options() : options
  if (!opts) {
    return {}
  }
  const axis = getAxis(dimension)
  const result: Partial<SineWaveOptions> = {}
  for (const k of Object.keys(opts)) {
    const key = k as keyof SineWaveOptions
    const value = opts[key]

    if (value) {
      result[key] = value[axis]
    }
  }
  return result
}

export function sineWave3DPass(
  options?: Partial<SineWave3DOptions> | Accessor<Partial<SineWave3DOptions>>,
): Body3DAnimationPass {
  return compose3DPass({
    x: sineWavePass({
      ...defaultSineWaveOptions,
      ...getOptionsInDimention(options, 'x'),
    }),
    y: sineWavePass({
      ...defaultSineWaveOptions,
      ...getOptionsInDimention(options, 'y'),
    }),
    z: sineWavePass({
      ...defaultSineWaveOptions,
      ...getOptionsInDimention(options, 'z'),
    }),
  })
}

export function createSineWave3D(
  options?: Partial<SineWave3DOptions> | Accessor<Partial<SineWave3DOptions>>,
  bodyAnimationOptions?: () => Body3DAnimationOptions,
) {
  return createBody3DAnimation(
    () => [sineWave3DPass(options)],
    bodyAnimationOptions,
  )
}
