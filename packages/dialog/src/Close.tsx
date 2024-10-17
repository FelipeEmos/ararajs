import { callEventHandler, type ElementOf } from '@arara/utils/dom'
import {
  type Component,
  createMemo,
  type JSX,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import {
  DynamicButton,
  type DynamicButtonElementProps,
  type DynamicButtonSharedElementProps,
  type DynamicProps,
} from '@arara/utils/dynamic'
import { useInternalDialogContext } from '@src/context'

export type DialogCloseAraraProps = {
  /**
   * The `id` of the dialog context to use.
   */
  contextId?: string
}

export type DialogCloseSharedElementProps<T extends ValidComponent = 'button'> =
  {
    onClick: JSX.EventHandlerUnion<ElementOf<T>, MouseEvent>
  } & DynamicButtonSharedElementProps<T>

export type DialogCloseElementProps = DialogCloseSharedElementProps & {
  'aria-label': 'close'
  'data-arara-dialog-close': '' | null
} & DynamicButtonElementProps

export type DialogCloseProps<T extends ValidComponent = 'button'> =
  DialogCloseAraraProps & Partial<DialogCloseSharedElementProps<T>>

/** Close button that changes the open state to false when clicked.
 *
 * @data `data-arara-dialog-close` - Present on every dialog close element.
 */
const DialogClose = <T extends ValidComponent = 'button'>(
  props: DynamicProps<T, DialogCloseProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as DialogCloseProps, [
    'contextId',
    'onClick',
  ])

  const context = createMemo(() =>
    useInternalDialogContext(localProps.contextId),
  )

  const onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    event,
  ) => {
    !callEventHandler(localProps.onClick, event) && context().setOpen(false)
  }

  return (
    <DynamicButton<
      Component<Omit<DialogCloseElementProps, keyof DynamicButtonElementProps>>
    >
      // === SharedElementProps ===
      onClick={onClick}
      // === ElementProps ===
      aria-label="close"
      data-arara-dialog-close=""
      {...otherProps}
    />
  )
}

export default DialogClose
