import createPersistent from 'solid-persistent'
import Dialog from '@arara/dialog'
import type { VoidComponent } from 'solid-js'

const PersistentDialogExample: VoidComponent = () => {
  const persistedContent = createPersistent(DialogContent)

  return (
    <Dialog>
      <Dialog.Trigger class="my-auto rounded-lg bg-arara-100 px-4 py-3 text-lg font-medium transition-all duration-100 hover:bg-arara-200 active:translate-y-0.5">
        Open Persistent Dialog
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-50 max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-arara-400 bg-arara-100 px-6 py-5 duration-200 arara-open:animate-in arara-open:fade-in-0 arara-open:zoom-in-95 arara-open:slide-in-from-left-1/2 arara-open:slide-in-from-top-[60%] arara-closed:animate-out arara-closed:fade-out-0 arara-closed:zoom-out-95 arara-closed:slide-out-to-left-1/2 arara-closed:slide-out-to-top-[60%]">
          {persistedContent()}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

const DialogContent = () => (
  <>
    <Dialog.Label class="text-lg font-bold">
      Persistent dialog content
    </Dialog.Label>
    <Dialog.Description class="mt-2">
      This dialog will preserve the state inside the content,
      <br /> even after it gets unmounted from the DOM.
      <br /> Enter something in the input and reopen the dialog.
    </Dialog.Description>
    <input class="mt-4 rounded border border-arara-200 bg-arara-bg px-3 py-2 ring-2 ring-arara-400 focus-visible:border focus-visible:border-arara-200 focus-visible:ring-2 focus-visible:ring-arara-400" />
    <p class="mt-3 text-sm">
      💡 I'm an uncontrolled input, preserving my state because I never
      rerender!
    </p>
  </>
)

export default PersistentDialogExample
