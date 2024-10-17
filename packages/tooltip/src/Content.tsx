import { combineStyle, type ElementOf, type Ref } from '@arara/utils/dom'
import {
  createMemo,
  type JSX,
  Show,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import { Dynamic, type DynamicProps } from '@arara/utils/dynamic'
import { mergeRefs, some } from '@arara/utils/reactivity'
import { dataIf } from '@arara/utils'
import Dismissible from 'solid-dismissible'
import { getFloatingStyle } from '@arara/utils/floating'
import type { Placement } from '@floating-ui/dom'
import { useInternalTooltipContext } from '@src/context'

export type TooltipContentAraraProps = {
  /**
   * Whether the tooltip content should be forced to render. Useful when using third-party animation libraries.
   * @defaultValue `false`
   */
  forceMount?: boolean
  /**
   * The `id` of the tooltip context to use.
   */
  contextId?: string
}

export type TooltipContentSharedElementProps<T extends ValidComponent = 'div'> =
  {
    ref: Ref<ElementOf<T>>
    style: string | JSX.CSSProperties
  }

export type TooltipContentElementProps = TooltipContentSharedElementProps & {
  id: string
  role: 'tooltip'
  'data-closed': '' | undefined
  'data-open': '' | undefined
  'data-placement': Placement
  'data-arara-tooltip-content': ''
}

export type TooltipContentProps<T extends ValidComponent = 'div'> =
  TooltipContentAraraProps & Partial<TooltipContentSharedElementProps<T>>

/** Content of the tooltip. Can be animated.
 *
 * @data `data-arara-tooltip-content` - Present on every tooltip content element.
 * @data `data-open` - Present when the tooltip is open.
 * @data `data-closed` - Present when the tooltip is closed.
 * @data `data-placement` - Current placement of the tooltip.
 */
const TooltipContent = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, TooltipContentProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as TooltipContentProps, [
    'forceMount',
    'contextId',
    'ref',
    'style',
  ])

  const context = createMemo(() =>
    useInternalTooltipContext(localProps.contextId),
  )

  const show = () =>
    some(context().open, () => localProps.forceMount, context().contentPresent)

  const enableDismissible = createMemo(
    () => context().open() || context().contentPresent(),
  )

  return (
    <Dismissible
      element={context().contentRef}
      enabled={enableDismissible()}
      dismissibleId={context().tooltipId()}
      onDismiss={() => context().setOpen(false)}
      dismissOnEscapeKeyDown={context().closeOnEscapeKeyDown}
      dismissOnOutsideFocus={false}
      dismissOnOutsidePointer={false}
      noOutsidePointerEvents={false}
      onEscapeKeyDown={context().onEscapeKeyDown}
    >
      {(props) => (
        <Show when={show()}>
          <Dynamic<TooltipContentElementProps>
            as="div"
            // === SharedElementProps ===
            ref={mergeRefs(context().setContentRef, localProps.ref)}
            style={combineStyle(
              {
                ...getFloatingStyle({
                  strategy: () => context().strategy(),
                  floatingState: () => context().floatingState(),
                })(),
                'pointer-events': props.isLastLayer ? 'auto' : undefined,
              },
              localProps.style,
            )}
            // === ElementProps ===
            id={context().tooltipId()}
            role="tooltip"
            data-closed={dataIf(!context().open())}
            data-open={dataIf(context().open())}
            data-placement={context().floatingState().placement}
            data-arara-tooltip-content=""
            {...otherProps}
          />
        </Show>
      )}
    </Dismissible>
  )
}

export default TooltipContent
