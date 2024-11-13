import {
  type Body2DAnimationOptions,
  type Body2DAnimationPass,
  createBody2DAnimation,
} from '../body-2d-animation'
import { defaultOptions, type SineWaveOptions, sineWavePass } from './sine'
import { type Dimension, getAxis } from '../physics'
import { type Accessor } from 'solid-js'
import { compose2DPass } from '../composers/dimension-pass'
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

export function sine2DWavePass(
  options?: Partial<Sine2DWaveOptions> | Accessor<Partial<Sine2DWaveOptions>>,
): Body2DAnimationPass {
  return compose2DPass({
    x: sineWavePass({
      ...defaultOptions,
      ...getOptionsInDimention(options, 'x'),
    }),
    y: sineWavePass({
      ...defaultOptions,
      ...getOptionsInDimention(options, 'y'),
    }),
  })
}

export function createSine2DWave(
  options?: Partial<Sine2DWaveOptions> | Accessor<Partial<Sine2DWaveOptions>>,
  bodyAnimationOptions?: () => Body2DAnimationOptions,
) {
  return createBody2DAnimation(
    () => [sine2DWavePass(options)],
    bodyAnimationOptions,
  )
}
