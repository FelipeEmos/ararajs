import {
  callEventHandler,
  dataIf,
  getFloatingStyle,
  mergeRefs,
  some,
} from '@lib/utils'
import {
  createMemo,
  type JSX,
  Show,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import Dynamic, { type DynamicAttributes } from '@lib/components/Dynamic'
import type { EventHandlerEvent, OverrideComponentProps } from '@lib/types'
import Dismissible from '@lib/components/Dismissible'
import { useInternalTooltipContext } from '@primitives/tooltip/context'

export const DEFAULT_TOOLTIP_CONTENT_ELEMENT: ValidComponent = 'div'

export type TooltipContentProps<
  T extends ValidComponent = typeof DEFAULT_TOOLTIP_CONTENT_ELEMENT,
> = OverrideComponentProps<
  T,
  DynamicAttributes<T> & {
    /**
     * Whether the tooltip content should be forced to render. Useful when using third-party animation libraries.
     * @defaultValue `false`
     */
    forceMount?: boolean
    /**
     * The `id` of the tooltip context to use.
     */
    contextId?: string
    /** @hidden */
    children?: JSX.Element
    /** @hidden */
    ref?: (element: HTMLElement) => void
    /** @hidden */
    style?: JSX.CSSProperties
    /** @hidden */
    onPointerDown?: JSX.EventHandlerUnion<HTMLElement, PointerEvent>
  }
>

/** Content of the tooltip. Can be animated.
 *
 * @data `data-corvu-tooltip-content` - Present on every tooltip content element.
 * @data `data-open` - Present when the tooltip is open.
 * @data `data-closed` - Present when the tooltip is closed.
 */
const TooltipContent = <
  T extends ValidComponent = typeof DEFAULT_TOOLTIP_CONTENT_ELEMENT,
>(
  props: TooltipContentProps<T>,
) => {
  const [localProps, otherProps] = splitProps(props, [
    'as',
    'forceMount',
    'contextId',
    'children',
    'ref',
    'style',
    'onPointerDown',
  ])

  const context = createMemo(() =>
    useInternalTooltipContext(localProps.contextId),
  )

  const show = () =>
    some(
      context().open,
      // eslint-disable-next-line solid/reactivity
      () => localProps.forceMount,
      context().contentPresent,
    )

  const keepAlive = createMemo((prev) => prev || show(), false)

  return (
    <Show when={keepAlive()}>
      <Dismissible
        element={context().contentRef}
        enabled={context().open() || context().contentPresent()}
        onDismiss={() => context().setOpen(false)}
        dismissOnEscapeKeyDown={context().closeOnEscapeKeyDown}
        dismissOnOutsidePointer={false}
        noOutsidePointerEvents={false}
        onEscapeKeyDown={context().onEscapeKeyDown}
      >
        {(props) => {
          const memoizedChildren = createMemo(() => localProps.children)

          return (
            <Show when={show()}>
              <Dynamic
                ref={mergeRefs(context().setContentRef, localProps.ref)}
                as={localProps.as ?? DEFAULT_TOOLTIP_CONTENT_ELEMENT}
                role="tooltip"
                id={context().tooltipId()}
                onPointerDown={(
                  event: EventHandlerEvent<HTMLElement, PointerEvent>,
                ) => {
                  !callEventHandler(localProps.onPointerDown, event) &&
                    context().setTooltipState('hovered')
                }}
                aria-describedby={context().triggerId()}
                data-open={dataIf(context().open())}
                data-closed={dataIf(!context().open())}
                data-corvu-tooltip-content=""
                style={{
                  ...getFloatingStyle({
                    strategy: () => context().strategy(),
                    floatingState: () => context().floatingState(),
                  })(),
                  'pointer-events': props.isLastLayer ? 'auto' : undefined,
                  ...localProps.style,
                }}
                {...otherProps}
              >
                {memoizedChildren()}
              </Dynamic>
            </Show>
          )
        }}
      </Dismissible>
    </Show>
  )
}

export default TooltipContent