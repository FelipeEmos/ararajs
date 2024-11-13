import Dialog from '@corvu/dialog'
import type { VoidComponent } from 'solid-js'

const DialogExample: VoidComponent = () => {
  return (
    <Dialog>
      <Dialog.Trigger class="my-auto rounded-lg bg-arara-100 px-4 py-3 text-lg font-medium transition-all duration-100 hover:bg-arara-200 active:translate-y-0.5">
        Open Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-50 min-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-arara-400 bg-arara-100 px-6 py-5 duration-200 arara-open:animate-in arara-open:fade-in-0 arara-open:zoom-in-95 arara-open:slide-in-from-left-1/2 arara-open:slide-in-from-top-[60%] arara-closed:animate-out arara-closed:fade-out-0 arara-closed:zoom-out-95 arara-closed:slide-out-to-left-1/2 arara-closed:slide-out-to-top-[60%]">
          <Dialog.Label class="text-lg font-bold">
            Nested dialog example
          </Dialog.Label>
          <div class="mt-3 flex justify-between">
            <Dialog.Close class="rounded-md bg-arara-200 px-3 py-2">
              Close
            </Dialog.Close>
            <Dialog>
              <Dialog.Trigger class="rounded-md bg-arara-300 px-3 py-2 font-bold">
                Open another dialog!
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Content class="fixed left-1/2 top-1/2 z-50 flex h-[150px] w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-4 rounded-lg border-2 border-arara-400 bg-arara-100 px-6 py-5 duration-200 arara-open:animate-in arara-open:fade-in-0 arara-open:zoom-in-95 arara-open:slide-in-from-left-1/2 arara-open:slide-in-from-top-[60%] arara-closed:animate-out arara-closed:fade-out-0 arara-closed:zoom-out-95 arara-closed:slide-out-to-left-1/2 arara-closed:slide-out-to-top-[60%]">
                  <Dialog.Label class="text-lg font-bold">
                    Hey! I'm a nested dialog 🐦‍⬛
                  </Dialog.Label>
                  <Dialog.Close class="rounded-md bg-arara-300 px-3 py-2">
                    Close me
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default DialogExample
