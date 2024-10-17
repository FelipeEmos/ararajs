import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type LabelAraraProps as DialogLabelAraraProps,
  type LabelElementProps as DialogLabelElementProps,
  type LabelSharedElementProps as DialogLabelSharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type DrawerLabelAraraProps = DialogLabelAraraProps

export type DrawerLabelSharedElementProps<T extends ValidComponent = 'h2'> =
  DialogLabelSharedElementProps<T>

export type DrawerLabelElementProps = DrawerLabelSharedElementProps & {
  'data-arara-drawer-label': ''
} & DialogLabelElementProps

export type DrawerLabelProps<T extends ValidComponent = 'h2'> =
  DrawerLabelAraraProps & Partial<DrawerLabelSharedElementProps<T>>

/** Label element to announce the drawer to accessibility tools.
 *
 * @data `data-arara-drawer-label` - Present on every drawer label element.
 */
const DrawerLabel = <T extends ValidComponent = 'h2'>(
  props: DynamicProps<T, DrawerLabelProps<T>>,
) => {
  return (
    <Dialog.Label<
      Component<Omit<DrawerLabelElementProps, keyof DialogLabelElementProps>>
    >
      // === ElementProps ===
      data-arara-drawer-label=""
      // === Misc ===
      data-arara-dialog-label={null}
      {...(props as DrawerLabelProps)}
    />
  )
}

export default DrawerLabel
