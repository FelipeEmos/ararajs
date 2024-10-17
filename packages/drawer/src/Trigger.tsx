import type { Component, ValidComponent } from 'solid-js'
import Dialog, {
  type TriggerAraraProps as DialogTriggerAraraProps,
  type TriggerElementProps as DialogTriggerElementProps,
  type TriggerSharedElementProps as DialogTriggerSharedElementProps,
} from '@arara/dialog'
import type { DynamicProps } from '@arara/utils/dynamic'

export type DrawerTriggerAraraProps = DialogTriggerAraraProps

export type DrawerTriggerSharedElementProps<
  T extends ValidComponent = 'button',
> = DialogTriggerSharedElementProps<T>

export type DrawerTriggerElementProps = DrawerTriggerSharedElementProps & {
  'data-arara-drawer-trigger': ''
} & DialogTriggerElementProps

export type DrawerTriggerProps<T extends ValidComponent = 'button'> =
  DrawerTriggerAraraProps & Partial<DrawerTriggerSharedElementProps<T>>

/** Button that changes the open state of the drawer when clicked.
 *
 * @data `data-arara-drawer-trigger` - Present on every drawer trigger element.
 * @data `data-open` - Present when the drawer is open.
 * @data `data-closed` - Present when the drawer is closed.
 */
const DrawerTrigger = <T extends ValidComponent = 'button'>(
  props: DynamicProps<T, DrawerTriggerProps<T>>,
) => {
  return (
    <Dialog.Trigger<
      Component<
        Omit<DrawerTriggerElementProps, keyof DialogTriggerElementProps>
      >
    >
      // === ElementProps ===
      data-arara-drawer-trigger=""
      // === Misc ===
      data-arara-dialog-trigger={null}
      {...(props as DrawerTriggerProps)}
    />
  )
}

export default DrawerTrigger
