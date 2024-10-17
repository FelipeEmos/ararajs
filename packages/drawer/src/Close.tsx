import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type CloseAraraProps as DialogCloseAraraProps,
  type CloseElementProps as DialogCloseElementProps,
  type CloseSharedElementProps as DialogCloseSharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type DrawerCloseAraraProps = DialogCloseAraraProps

export type DrawerCloseSharedElementProps<T extends ValidComponent = 'button'> =
  DialogCloseSharedElementProps<T>

export type DrawerCloseElementProps = DrawerCloseSharedElementProps & {
  'data-arara-drawer-close': ''
} & DialogCloseElementProps

export type DrawerCloseProps<T extends ValidComponent = 'button'> =
  DrawerCloseAraraProps & Partial<DrawerCloseSharedElementProps<T>>

/** Close button that changes the open state to false when clicked.
 *
 * @data `data-arara-drawer-close` - Present on every drawer close element.
 */
const DrawerClose = <T extends ValidComponent = 'button'>(
  props: DynamicProps<T, DrawerCloseProps<T>>,
) => {
  return (
    <Dialog.Close<
      Component<Omit<DrawerCloseElementProps, keyof DialogCloseElementProps>>
    >
      // === ElementProps ===
      data-arara-drawer-close=""
      // === Misc ===
      data-arara-dialog-close={null}
      {...(props as DrawerCloseProps)}
    />
  )
}

export default DrawerClose
