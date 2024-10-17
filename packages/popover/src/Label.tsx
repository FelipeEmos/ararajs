import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type LabelAraraProps as DialogLabelAraraProps,
  type LabelElementProps as DialogLabelElementProps,
  type LabelSharedElementProps as DialogLabelSharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type PopoverLabelAraraProps = DialogLabelAraraProps

export type PopoverLabelSharedElementProps<T extends ValidComponent = 'h2'> =
  DialogLabelSharedElementProps<T>

export type PopoverLabelElementProps = PopoverLabelSharedElementProps & {
  'data-arara-popover-label': ''
} & DialogLabelElementProps

export type PopoverLabelProps<T extends ValidComponent = 'h2'> =
  PopoverLabelAraraProps & Partial<PopoverLabelSharedElementProps<T>>

/** Label element to announce the popover to accessibility tools.
 *
 * @data `data-arara-popover-label` - Present on every popover label element.
 */
const PopoverLabel = <T extends ValidComponent = 'h2'>(
  props: DynamicProps<T, PopoverLabelProps<T>>,
) => {
  return (
    <Dialog.Label<
      Component<Omit<PopoverLabelElementProps, keyof DialogLabelElementProps>>
    >
      // === ElementProps ===
      data-arara-popover-label=""
      // === Misc ===
      data-arara-dialog-label={null}
      {...(props as PopoverLabelProps)}
    />
  )
}

export default PopoverLabel
