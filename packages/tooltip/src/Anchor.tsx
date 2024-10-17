import { createMemo, splitProps, type ValidComponent } from 'solid-js'
import { Dynamic, type DynamicProps } from '@arara/utils/dynamic'
import type { ElementOf, Ref } from '@arara/utils/dom'
import { mergeRefs } from '@arara/utils/reactivity'
import { useInternalTooltipContext } from '@src/context'

export type TooltipAnchorAraraProps = {
  /**
   * The `id` of the tooltip context to use.
   */
  contextId?: string
}

export type TooltipAnchorSharedElementProps<T extends ValidComponent = 'div'> =
  {
    ref: Ref<ElementOf<T>>
  }

export type TooltipAnchorElementProps = TooltipAnchorSharedElementProps & {
  'data-arara-tooltip-anchor': ''
}

export type TooltipAnchorProps<T extends ValidComponent = 'div'> =
  TooltipAnchorAraraProps & Partial<TooltipAnchorSharedElementProps<T>>

/** Anchor element to override the floating reference.
 *
 * @data `data-arara-tooltip-anchor` - Present on every tooltip anchor element.
 */
const TooltipAnchor = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, TooltipAnchorProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as TooltipAnchorProps, [
    'contextId',
    'ref',
  ])

  const context = createMemo(() =>
    useInternalTooltipContext(localProps.contextId),
  )

  return (
    <Dynamic<TooltipAnchorElementProps>
      as="div"
      // === SharedElementProps ===
      ref={mergeRefs(context().setAnchorRef, localProps.ref)}
      // === ElementProps ===
      data-arara-tooltip-anchor=""
      {...otherProps}
    />
  )
}

export default TooltipAnchor
