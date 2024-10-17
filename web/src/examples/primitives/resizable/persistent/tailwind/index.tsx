import { createSignal, type VoidComponent } from 'solid-js'
import { makePersisted } from '@solid-primitives/storage'
import Resizable from '@arara/resizable'

const ResizablePersistentExample: VoidComponent = () => {
  const [sizes, setSizes] = makePersisted(createSignal([]), {
    name: 'resizable-sizes',
  })

  return (
    <div class="size-full p-4">
      <Resizable sizes={sizes()} onSizesChange={setSizes} class="size-full">
        <Resizable.Panel
          initialSize={0.3}
          minSize={0.2}
          class="flex items-center justify-center overflow-hidden rounded-lg bg-arara-100"
        >
          {(props) => (
            <p class="text-center text-sm">
              Persistent size:
              <br />
              <span class="font-bold">{props.size}</span>
            </p>
          )}
        </Resizable.Panel>
        <Resizable.Handle
          aria-label="Resize Handle"
          class="group basis-3 px-[3px]"
        >
          <div class="size-full rounded transition-colors arara-group-active:bg-arara-300 arara-group-dragging:bg-arara-100" />
        </Resizable.Handle>
        <Resizable.Panel
          initialSize={0.4}
          minSize={0.2}
          class="flex items-center justify-center overflow-hidden rounded-lg bg-arara-100"
        >
          {(props) => (
            <p class="text-center text-sm">
              Persistent size:
              <br />
              <span class="font-bold">{props.size}</span>
            </p>
          )}
        </Resizable.Panel>
        <Resizable.Handle
          aria-label="Resize Handle"
          class="group basis-3 px-[3px]"
        >
          <div class="size-full rounded transition-colors arara-group-active:bg-arara-300 arara-group-dragging:bg-arara-100" />
        </Resizable.Handle>
        <Resizable.Panel
          initialSize={0.3}
          minSize={0.2}
          class="flex items-center justify-center overflow-hidden rounded-lg bg-arara-100"
        >
          {(props) => (
            <p class="text-center text-sm">
              Persistent size:
              <br />
              <span class="font-bold">{props.size}</span>
            </p>
          )}
        </Resizable.Panel>
      </Resizable>
    </div>
  )
}

export default ResizablePersistentExample
