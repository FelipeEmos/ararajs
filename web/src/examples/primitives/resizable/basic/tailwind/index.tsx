import Resizable from '@arara/resizable'
import type { VoidComponent } from 'solid-js'

const ResizableExample: VoidComponent = () => {
  return (
    <div class="size-full p-10 @xl:p-20">
      <Resizable class="size-full">
        <Resizable.Panel
          initialSize={0.3}
          minSize={0.2}
          class="rounded-lg bg-arara-100"
        />
        <Resizable.Handle
          aria-label="Resize Handle"
          class="group basis-3 px-[3px]"
        >
          <div class="size-full rounded transition-colors arara-group-active:bg-arara-300 arara-group-dragging:bg-arara-100" />
        </Resizable.Handle>
        <Resizable.Panel initialSize={0.7} minSize={0.2}>
          <Resizable orientation="vertical" class="size-full">
            <Resizable.Panel
              initialSize={0.5}
              minSize={0.2}
              class="rounded-lg bg-arara-100"
            />
            <Resizable.Handle
              aria-label="Resize Handle"
              class="group basis-3 py-[3px]"
            >
              <div class="size-full rounded transition-colors arara-group-active:bg-arara-300 arara-group-dragging:bg-arara-100" />
            </Resizable.Handle>
            <Resizable.Panel
              initialSize={0.5}
              minSize={0.2}
              class="rounded-lg bg-arara-100"
            />
          </Resizable>
        </Resizable.Panel>
      </Resizable>
    </div>
  )
}

export default ResizableExample
