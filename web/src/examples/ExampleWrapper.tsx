import { createSignal, type FlowComponent, For, type JSX } from 'solid-js'
import { cn } from '@lib/cn'

type CodeSnippets = {
  name: string
  files: {
    fileName: string
    slotName: string
  }[]
}[]

type ExampleWrapperProps = {
  children: JSX.Element
  codeSnippets: CodeSnippets
  height?: 'heading' | 'dynamic'
  contentClass?: string
  [key: string]: JSX.Element | CodeSnippets
}

export default function ExampleWrapper(props: ExampleWrapperProps) {
  const [activeTab, setActiveTab] = createSignal(0)

  return (
    <div class="not-prose mb-12 border-2 border-arara-400/30 shadow-md">
      {/* Tabs */}
      <div class="flex overflow-x-auto border-b border-arara-400/30 bg-arara-bg">
        <Tab
          isActive={activeTab() === 0}
          onClick={() => setActiveTab(0)}
          isShowIcon
        >
          Preview
        </Tab>
        <For each={props.codeSnippets[0].files}>
          {(file, index) => (
            <Tab
              isActive={activeTab() === index() + 1}
              onClick={() => setActiveTab(index() + 1)}
            >
              {file.fileName}
            </Tab>
          )}
        </For>
      </div>

      {/* Content */}
      <div>
        {/* Preview Panel */}
        <div
          class={cn(
            'w-full bg-arara-200/10',
            {
              hidden: activeTab() !== 0,
              'h-[300px] @xl:h-[400px]': props.height === 'heading',
              'h-[200px]': !props.height,
            },
            props.contentClass,
          )}
        >
          <div class="flex size-full items-center justify-center">
            {props.children}
          </div>
        </div>

        {/* Code Panels */}
        <For each={props.codeSnippets[0].files}>
          {(file, index) => (
            <div
              class={cn('w-full', {
                hidden: activeTab() !== index() + 1,
              })}
            >
              {props[file.slotName] as JSX.Element}
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

type TabProps = {
  isActive: boolean
  onClick: () => void
  children: JSX.Element
  isShowIcon?: boolean
}

const Tab: FlowComponent<TabProps> = (props) => {
  const iconClass = 'size-4'

  return (
    <button
      class={cn(
        'border-b-4 px-4 py-2 text-sm font-medium text-nowrap flex flex-col gap-2',
        props.isActive
          ? 'border-arara-400 bg-arara-200/40 text-arara-text font-bold'
          : 'border-transparent text-arara-text/40 hover:text-arara-text',
      )}
      onClick={props.onClick}
    >
      {props.isShowIcon === true ? (
        <ShowIcon class={iconClass} />
      ) : (
        <CodeIcon class={iconClass} />
      )}
      {props.children}
    </button>
  )
}

function ShowIcon(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  )
}

function CodeIcon(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  )
}
