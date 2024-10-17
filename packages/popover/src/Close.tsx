import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type CloseAraraProps as DialogCloseAraraProps,
  type CloseElementProps as DialogCloseElementProps,
  type CloseSharedElementProps as DialogCloseSharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type PopoverCloseAraraProps = DialogCloseAraraProps

export type PopoverCloseSharedElementProps<
  T extends ValidComponent = 'button',
> = DialogCloseSharedElementProps<T>

export type PopoverCloseElementProps = PopoverCloseSharedElementProps & {
  'data-arara-popover-close': ''
} & DialogCloseElementProps

export type PopoverCloseProps<T extends ValidComponent = 'button'> =
  PopoverCloseAraraProps & Partial<PopoverCloseSharedElementProps<T>>

/** Close button that changes the open state to false when clicked.
 *
 * @data `data-arara-popover-close` - Present on every popover close element.
 */
const PopoverClose = <T extends ValidComponent = 'button'>(
  props: DynamicProps<T, PopoverCloseProps<T>>,
) => {
  return (
    <Dialog.Close<
      Component<Omit<PopoverCloseElementProps, keyof DialogCloseElementProps>>
    >
      // === ElementProps ===
      data-arara-popover-close=""
      // === Misc ===
      data-arara-dialog-close={null}
      {...(props as PopoverCloseProps)}
    />
  )
}

export default PopoverClose
