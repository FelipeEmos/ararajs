import {
  type Body3DAnimationOptions,
  type Body3DAnimationPass,
  createBody3DAnimation,
} from '../../physics/body-3d-animation'
import {
  defaultSineWaveOptions,
  sinePass,
  type SineWaveOptions,
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

export function sine3DPass(
  options?: Partial<SineWave3DOptions> | Accessor<Partial<SineWave3DOptions>>,
): Body3DAnimationPass {
  return compose3DPass({
    x: sinePass({
      ...defaultSineWaveOptions,
      ...getOptionsInDimention(options, 'x'),
    }),
    y: sinePass({
      ...defaultSineWaveOptions,
      ...getOptionsInDimention(options, 'y'),
    }),
    z: sinePass({
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
    () => [sine3DPass(options)],
    bodyAnimationOptions,
  )
}
