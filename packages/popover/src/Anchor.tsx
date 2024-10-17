import { createMemo, splitProps, type ValidComponent } from 'solid-js'
import { Dynamic, type DynamicProps } from '@arara/utils/dynamic'
import type { ElementOf, Ref } from '@arara/utils/dom'
import { mergeRefs } from '@arara/utils/reactivity'
import { useInternalPopoverContext } from '@src/context'

export type PopoverAnchorAraraProps = {
  /**
   * The `id` of the popover context to use.
   */
  contextId?: string
}

export type PopoverAnchorSharedElementProps<T extends ValidComponent = 'div'> =
  {
    ref: Ref<ElementOf<T>>
  }

export type PopoverAnchorElementProps = PopoverAnchorSharedElementProps & {
  'data-arara-popover-anchor': ''
}

export type PopoverAnchorProps<T extends ValidComponent = 'div'> =
  PopoverAnchorAraraProps & Partial<PopoverAnchorSharedElementProps<T>>

/** Anchor element to override the floating reference.
 *
 * @data `data-arara-popover-anchor` - Present on every popover anchor element.
 */
const PopoverAnchor = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, PopoverAnchorProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as PopoverAnchorProps, [
    'contextId',
    'ref',
  ])

  const context = createMemo(() =>
    useInternalPopoverContext(localProps.contextId),
  )

  return (
    <Dynamic<PopoverAnchorElementProps>
      as="div"
      // === SharedElementProps ===
      ref={mergeRefs(context().setAnchorRef, localProps.ref)}
      // === ElementProps ===
      data-arara-popover-anchor=""
      {...otherProps}
    />
  )
}

export default PopoverAnchor
