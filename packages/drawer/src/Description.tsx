import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type DescriptionAraraProps as DialogDescriptionAraraProps,
  type DescriptionElementProps as DialogDescriptionElementProps,
  type DescriptionSharedElementProps as DialogDescriptionSharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type DrawerDescriptionAraraProps = DialogDescriptionAraraProps

export type DrawerDescriptionSharedElementProps<
  T extends ValidComponent = 'p',
> = DialogDescriptionSharedElementProps<T>

export type DrawerDescriptionElementProps =
  DrawerDescriptionSharedElementProps & {
    'data-arara-drawer-description': ''
  } & DialogDescriptionElementProps

export type DrawerDescriptionProps<T extends ValidComponent = 'p'> =
  DrawerDescriptionAraraProps & Partial<DrawerDescriptionSharedElementProps<T>>

/** Description element to announce the drawer to accessibility tools.
 *
 * @data `data-arara-drawer-description` - Present on every drawer description element.
 */
const DrawerDescription = <T extends ValidComponent = 'p'>(
  props: DynamicProps<T, DrawerDescriptionProps<T>>,
) => {
  return (
    <Dialog.Description<
      Component<
        Omit<DrawerDescriptionElementProps, keyof DialogDescriptionElementProps>
      >
    >
      // === ElementProps ===
      data-arara-drawer-description=""
      // === Misc ===
      data-arara-dialog-description={null}
      {...(props as DrawerDescriptionProps)}
    />
  )
}

export default DrawerDescription
