import { createSignal } from 'solid-js'
import { SineWaveDemo } from './SineWaveDemo'
import { Slider } from '@kobalte/core/slider'

export function SliderSineWaveDemo(props: {
  class?: string
  ballClass?: string
}) {
  const [value, setValue] = createSignal([1])
  const frequency = () => value()[0]

  return (
    <>
      <SineWaveDemo {...props} frequency={frequency} />
      <Slider
        class="relative flex w-full touch-none select-none flex-col items-center"
        value={value()}
        onChange={setValue}
        minValue={0.1}
        maxValue={6}
        step={0.1}
      >
        <div class="flex w-full justify-between text-xl">
          <Slider.Label>Frequency</Slider.Label>
          <Slider.ValueLabel />
        </div>
        <Slider.Track class="relative my-4 h-2 w-full rounded-full bg-arara-text/20">
          <Slider.Fill class="absolute h-full rounded-full bg-arara-text" />
          <Slider.Thumb class="-top-1 block size-4 rounded-full bg-arara-text hover:shadow-arara-text focus:shadow-arara-text focus:outline-none">
            <Slider.Input />
          </Slider.Thumb>
        </Slider.Track>
      </Slider>
    </>
  )
}
