import Drawer from '@arara/drawer'
import type { VoidComponent } from 'solid-js'

const DrawerBreakPointExample: VoidComponent = () => {
  return (
    <Drawer breakPoints={[0.75]} velocityFunction={() => 1}>
      {(props) => (
        <>
          <div class="my-auto flex flex-col items-center">
            <p class="mb-2 rounded-lg bg-arara-300 px-2 py-1 font-bold">
              Breakpoints example
            </p>
            <Drawer.Trigger class="my-auto rounded-lg bg-arara-100 px-4 py-3 text-lg font-medium transition-all duration-100 hover:bg-arara-200 active:translate-y-0.5">
              Open Drawer
            </Drawer.Trigger>
          </div>
          <Drawer.Portal>
            <Drawer.Overlay
              class="fixed inset-0 z-50 arara-transitioning:transition-colors arara-transitioning:duration-500 arara-transitioning:ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                'background-color': `rgb(0 0 0 / ${
                  0.5 * props.openPercentage
                })`,
              }}
            />
            <Drawer.Content class="fixed inset-x-0 bottom-0 z-50 flex h-full max-h-[500px] flex-col rounded-t-lg border-t-4 border-arara-400 bg-arara-100 pt-3 after:absolute after:inset-x-0 after:top-[calc(100%-1px)] after:h-1/2 after:bg-inherit arara-transitioning:transition-transform arara-transitioning:duration-500 arara-transitioning:ease-[cubic-bezier(0.32,0.72,0,1)] md:select-none">
              <div class="h-1 w-10 self-center rounded-full bg-arara-400" />
              <Drawer.Label class="mt-2 text-center text-xl font-bold">
                I'm a drawer!
              </Drawer.Label>
              <Drawer.Description class="mt-1 text-center">
                I will close when I'm under <span class="font-bold">75%</span>{' '}
                of my height. <br /> My current height is:{' '}
                <span class="font-bold">
                  {(props.openPercentage * 100).toFixed(2)}%
                </span>
              </Drawer.Description>
            </Drawer.Content>
          </Drawer.Portal>
        </>
      )}
    </Drawer>
  )
}

export default DrawerBreakPointExample
