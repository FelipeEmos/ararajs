import {
  type Body2DAnimationOptions,
  type Body2DAnimationPass,
  createBody2DAnimation,
} from '../../physics/body-2d-animation'
import {
  defaultSineWaveOptions,
  type SineWaveOptions,
  sineWavePass,
} from './sine-wave'
import { type Dimension, getAxis } from '../../physics/physics'
import { type Accessor } from 'solid-js'
import { compose2DPass } from '../../composers/dimension-pass'
import { vec2 } from 'gl-matrix'

export type Sine2DWaveOptions = {
  offset: vec2
  frequency: vec2
  amplitude: vec2
  phase: vec2
}

function getOptionsInDimention(
  options:
    | Partial<Sine2DWaveOptions>
    | Accessor<Partial<Sine2DWaveOptions>>
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

export function sineWave2DPass(
  options?: Partial<Sine2DWaveOptions> | Accessor<Partial<Sine2DWaveOptions>>,
): Body2DAnimationPass {
  return compose2DPass({
    x: sineWavePass({
      ...defaultSineWaveOptions,
      ...getOptionsInDimention(options, 'x'),
    }),
    y: sineWavePass({
      ...defaultSineWaveOptions,
      ...getOptionsInDimention(options, 'y'),
    }),
  })
}

export function createSineWave2D(
  options?: Partial<Sine2DWaveOptions> | Accessor<Partial<Sine2DWaveOptions>>,
  bodyAnimationOptions?: () => Body2DAnimationOptions,
) {
  return createBody2DAnimation(
    () => [sineWave2DPass(options)],
    bodyAnimationOptions,
  )
}
