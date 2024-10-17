import {
  type Component,
  createMemo,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import Dialog, {
  type OverlayAraraProps as DialogOverlayAraraProps,
  type OverlayElementProps as DialogOverlayElementProps,
  type OverlaySharedElementProps as DialogOverlaySharedElementProps,
} from '@arara/dialog'
import { dataIf } from '@arara/utils'
import type { DynamicProps } from '@arara/utils/dynamic'
import { useInternalDrawerContext } from '@src/context'

export type DrawerOverlayAraraProps = DialogOverlayAraraProps

export type DrawerOverlaySharedElementProps<T extends ValidComponent = 'div'> =
  DialogOverlaySharedElementProps<T>

export type DrawerOverlayElementProps = DrawerOverlaySharedElementProps & {
  'data-closing': '' | undefined
  'data-opening': '' | undefined
  'data-resizing': '' | undefined
  'data-snapping': '' | undefined
  'data-transitioning': '' | undefined
  'data-arara-drawer-overlay': ''
} & DialogOverlayElementProps

export type DrawerOverlayProps<T extends ValidComponent = 'div'> =
  DrawerOverlayAraraProps & Partial<DrawerOverlaySharedElementProps<T>>

/** Component which can be used to create a faded background. Can be animated.
 *
 * @data `data-arara-drawer-overlay` - Present on every drawer overlay element.
 * @data `data-open` - Present when the drawer is open.
 * @data `data-closed` - Present when the drawer is closed.
 * @data `data-transitioning` - Present when the drawer is transitioning (opening, closing or snapping).
 * @data `data-opening` - Present when the drawer is in the open transition.
 * @data `data-closing` - Present when the drawer is in the close transition.
 * @data `data-snapping` - Present when the drawer is transitioning after the user stops dragging.
 * @data `data-resizing` - Present when the drawer is transitioning after the size (width/height) changes. Only present if `transitionResize` is set to `true`.
 */
const DrawerOverlay = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, DrawerOverlayProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as DrawerOverlayProps, [
    'contextId',
  ])

  const drawerContext = createMemo(() =>
    useInternalDrawerContext(localProps.contextId),
  )

  return (
    <Dialog.Overlay<
      Component<
        Omit<DrawerOverlayElementProps, keyof DialogOverlayElementProps>
      >
    >
      contextId={localProps.contextId}
      // === ElementProps ===
      data-closing={dataIf(drawerContext().transitionState() === 'closing')}
      data-opening={dataIf(drawerContext().transitionState() === 'opening')}
      data-resizing={dataIf(drawerContext().transitionState() === 'resizing')}
      data-snapping={dataIf(drawerContext().transitionState() === 'snapping')}
      data-transitioning={dataIf(drawerContext().isTransitioning())}
      data-arara-drawer-overlay=""
      // === Misc ===
      data-arara-dialog-overlay={null}
      {...otherProps}
    />
  )
}

export default DrawerOverlay
