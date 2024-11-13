import {
  type BodyAnimationOptions,
  type BodyAnimationPass,
  createBodyAnimation,
} from '../../physics/body-animation'
import { type Accessor } from 'solid-js'

export type SineWaveOptions = {
  offset: number
  frequency: number
  amplitude: number
  phase: number
}

export const defaultSineWaveOptions = {
  offset: 0,
  frequency: 1,
  amplitude: 1,
  phase: 0,
} as const satisfies SineWaveOptions

export function sinePass(
  options?: Partial<SineWaveOptions> | Accessor<Partial<SineWaveOptions>>,
): BodyAnimationPass {
  return ({ currentTime }) => {
    const opts = typeof options === 'function' ? options() : options
    const { offset, frequency, amplitude, phase } = {
      ...defaultSineWaveOptions,
      ...opts,
    }

    const omega = 2 * Math.PI * frequency
    const sine = Math.sin((omega * currentTime) / 1000 + phase)
    const cosine = Math.cos((omega * currentTime) / 1000 + phase)

    return {
      position: offset + amplitude * sine,
      velocity: amplitude * omega * cosine,
      acceleration: -amplitude * omega * omega * cosine,
    }
  }
}

export function createSineWave(
  options?: Partial<SineWaveOptions> | Accessor<Partial<SineWaveOptions>>,
  bodyAnimationOptions?: () => BodyAnimationOptions,
) {
  return createBodyAnimation(() => [sinePass(options)], bodyAnimationOptions)
}
