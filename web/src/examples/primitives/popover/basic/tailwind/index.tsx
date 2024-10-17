import { Gear } from '@examples/primitives/popover/icons'
import Popover from '@arara/popover'
import type { VoidComponent } from 'solid-js'

const PopoverExample: VoidComponent = () => {
  return (
    <Popover
      floatingOptions={{
        offset: 13,
        flip: true,
        shift: true,
      }}
    >
      <Popover.Trigger class="my-auto rounded-full bg-arara-100 p-3 transition-all duration-100 hover:bg-arara-200 active:translate-y-0.5">
        <Gear size="26" />
        <span class="sr-only">Settings</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="z-50 rounded-lg bg-arara-100 px-3 py-2 shadow-md arara-open:animate-in arara-open:fade-in-50 arara-open:slide-in-from-top-1 arara-closed:animate-out arara-closed:fade-out-50 arara-closed:slide-out-to-top-1">
          <Popover.Label class="font-bold">Settings</Popover.Label>
          <div class="grid grid-cols-[auto,1fr]">
            <label class="col-span-2 mt-2 grid grid-cols-subgrid">
              <span>Width</span>
              <input
                type="number"
                value="32"
                class="ml-10 w-20 rounded border-2 border-arara-400 bg-arara-200 px-2 py-1 text-sm"
              />
            </label>
            <label class="col-span-2 mt-2 grid grid-cols-subgrid">
              <span>Height</span>
              <input
                type="number"
                value="32"
                class="ml-10 w-20 rounded border-2 border-arara-400 bg-arara-200 px-2 py-1 text-sm"
              />
            </label>
          </div>
          <Popover.Arrow class="text-arara-100" />
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  )
}

export default PopoverExample
