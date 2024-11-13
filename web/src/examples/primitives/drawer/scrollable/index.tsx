import { For, type VoidComponent } from 'solid-js'
import clsx from 'clsx'
import Drawer from '@corvu/drawer'

const DrawerScrollableExample: VoidComponent = () => {
  return (
    <Drawer>
      {(props) => (
        <>
          <div class="my-auto flex flex-col items-center">
            <p class="mb-2 rounded-lg bg-arara-300 px-2 py-1 font-bold">
              Scrollable example
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
              <div class="h-1 w-10 shrink-0 self-center rounded-full bg-arara-400" />
              <Drawer.Label class="mt-2 text-center text-xl font-bold">
                Drawer with a scrollable element
              </Drawer.Label>
              <div class="mt-3 grow divide-y divide-arara-400 overflow-y-auto">
                <For each={new Array(20)}>
                  {(_, idx) => (
                    <p
                      class={clsx('py-2 text-center font-bold', {
                        'bg-arara-200': idx() % 2 === 0,
                      })}
                    >
                      List item {idx() + 1}
                    </p>
                  )}
                </For>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </>
      )}
    </Drawer>
  )
}

export default DrawerScrollableExample
