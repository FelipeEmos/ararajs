import Resizable from '@corvu/resizable'
import type { VoidComponent } from 'solid-js'

const ResizableCollapsibleExample: VoidComponent = () => {
  return (
    <div class="size-full p-4">
      <Resizable class="size-full">
        <Resizable.Panel
          initialSize={0.4}
          minSize={0.3}
          collapsible
          collapsedSize={0.15}
          class="flex items-center justify-center overflow-hidden rounded-lg bg-arara-100"
        >
          {(props) => (
            <p class="text-center text-sm">
              Size:
              <br />
              <span class="font-bold">{props.size.toFixed(2)}</span>
              <br />
              Collapsed:
              <br />
              <span class="font-bold">{props.collapsed ? 'yes' : 'no'}</span>
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
          initialSize={0.6}
          minSize={0.3}
          class="rounded-lg bg-arara-100"
        />
      </Resizable>
    </div>
  )
}

export default ResizableCollapsibleExample
