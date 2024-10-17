import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type OverlayAraraProps as DialogOverlayAraraProps,
  type OverlayElementProps as DialogOverlayElementProps,
  type OverlaySharedElementProps as DialogOverlaySharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type PopoverOverlayAraraProps = DialogOverlayAraraProps

export type PopoverOverlaySharedElementProps<T extends ValidComponent = 'div'> =
  DialogOverlaySharedElementProps<T>

export type PopoverOverlayElementProps = PopoverOverlaySharedElementProps & {
  'data-arara-popover-overlay': ''
} & DialogOverlayElementProps

export type PopoverOverlayProps<T extends ValidComponent = 'div'> =
  PopoverOverlayAraraProps & Partial<PopoverOverlaySharedElementProps<T>>

/** Component which can be used to create a faded background. Can be animated.
 *
 * @data `data-arara-popover-overlay` - Present on every popover overlay element.
 * @data `data-open` - Present when the popover is open.
 * @data `data-closed` - Present when the popover is closed.
 */
const PopoverOverlay = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, PopoverOverlayProps<T>>,
) => {
  return (
    <Dialog.Overlay<
      Component<
        Omit<PopoverOverlayElementProps, keyof DialogOverlayElementProps>
      >
    >
      // === ElementProps ===
      data-arara-popover-overlay=""
      // === Misc ===
      data-arara-dialog-overlay={null}
      {...(props as PopoverOverlayProps)}
    />
  )
}

export default PopoverOverlay
