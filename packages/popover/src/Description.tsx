import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type DescriptionAraraProps as DialogDescriptionAraraProps,
  type DescriptionElementProps as DialogDescriptionElementProps,
  type DescriptionSharedElementProps as DialogDescriptionSharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type PopoverDescriptionAraraProps = DialogDescriptionAraraProps

export type PopoverDescriptionSharedElementProps<
  T extends ValidComponent = 'p',
> = DialogDescriptionSharedElementProps<T>

export type PopoverDescriptionElementProps =
  PopoverDescriptionSharedElementProps & {
    'data-arara-popover-description': ''
  } & DialogDescriptionElementProps

export type PopoverDescriptionProps<T extends ValidComponent = 'p'> =
  PopoverDescriptionAraraProps &
    Partial<PopoverDescriptionSharedElementProps<T>>

/** Description element to announce the popover to accessibility tools.
 *
 * @data `data-arara-popover-description` - Present on every popover description element.
 */
const PopoverDescription = <T extends ValidComponent = 'p'>(
  props: DynamicProps<T, PopoverDescriptionProps<T>>,
) => {
  return (
    <Dialog.Description<
      Component<
        Omit<
          PopoverDescriptionElementProps,
          keyof DialogDescriptionElementProps
        >
      >
    >
      // === ElementProps ===
      data-arara-popover-description=""
      // === Misc ===
      data-arara-dialog-description={null}
      {...(props as PopoverDescriptionProps)}
    />
  )
}

export default PopoverDescription
