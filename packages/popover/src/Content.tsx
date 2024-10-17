import {
  type Component,
  createMemo,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import type {
  ContentAraraProps as DialogContentAraraProps,
  ContentElementProps as DialogContentElementProps,
  ContentSharedElementProps as DialogContentSharedElementProps,
} from '@arara/dialog'
import { combineStyle } from '@arara/utils/dom'
import Dialog from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'
import { getFloatingStyle } from '@arara/utils/floating'
import type { Placement } from '@floating-ui/dom'
import { useInternalPopoverContext } from '@src/context'

export type PopoverContentAraraProps = DialogContentAraraProps

export type PopoverContentSharedElementProps<T extends ValidComponent = 'div'> =
  DialogContentSharedElementProps<T>

export type PopoverContentElementProps = PopoverContentSharedElementProps & {
  'data-placement': Placement
  'data-arara-popover-content': ''
} & DialogContentElementProps

export type PopoverContentProps<T extends ValidComponent = 'button'> =
  PopoverContentAraraProps & Partial<PopoverContentSharedElementProps<T>>

/** Content of the popover. Can be animated.
 *
 * @data `data-arara-popover-content` - Present on every popover content element.
 * @data `data-open` - Present when the popover is open.
 * @data `data-closed` - Present when the popover is closed.
 * @data `data-placement` - Current placement of the popover.
 */
const PopoverContent = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, PopoverContentProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as PopoverContentProps, [
    'forceMount',
    'contextId',
    'style',
  ])

  const context = createMemo(() =>
    useInternalPopoverContext(localProps.contextId),
  )

  return (
    <Dialog.Content<
      Component<
        Omit<PopoverContentElementProps, keyof DialogContentElementProps>
      >
    >
      contextId={localProps.contextId}
      // === SharedElementProps ===
      style={combineStyle(
        {
          ...getFloatingStyle({
            strategy: () => context().strategy(),
            floatingState: () => context().floatingState(),
          })(),
        },
        localProps.style,
      )}
      // === ElementProps ===
      data-placement={context().floatingState().placement}
      data-arara-popover-content=""
      // === Misc ===
      data-arara-dialog-content={null}
      {...otherProps}
    />
  )
}

export default PopoverContent
