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
import { dataIf } from '@arara/utils'
import { mergeRefs } from '@arara/utils/reactivity'
import { useInternalDialogContext } from '@src/context'

export type DialogTriggerAraraProps = {
  /**
   * The `id` of the dialog context to use.
   */
  contextId?: string
}

export type DialogTriggerSharedElementProps<
  T extends ValidComponent = 'button',
> = {
  onClick: JSX.EventHandlerUnion<ElementOf<T>, MouseEvent>
} & DynamicButtonSharedElementProps<T>

export type DialogTriggerElementProps = DialogTriggerSharedElementProps & {
  'aria-controls': string
  'aria-expanded': 'true' | 'false'
  'aria-haspopup': 'dialog'
  'data-closed': '' | undefined
  'data-open': '' | undefined
  'data-arara-dialog-trigger': '' | null
} & DynamicButtonElementProps

export type DialogTriggerProps<T extends ValidComponent = 'button'> =
  DialogTriggerAraraProps & Partial<DialogTriggerSharedElementProps<T>>

/** Button that changes the open state of the dialog when clicked.
 *
 * @data `data-arara-dialog-trigger` - Present on every dialog trigger element.
 * @data `data-open` - Present when the dialog is open.
 * @data `data-closed` - Present when the dialog is closed.
 */
const DialogTrigger = <T extends ValidComponent = 'button'>(
  props: DynamicProps<T, DialogTriggerProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as DialogTriggerProps, [
    'contextId',
    'ref',
    'onClick',
  ])

  const context = createMemo(() =>
    useInternalDialogContext(localProps.contextId),
  )

  const onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (e) => {
    !callEventHandler(localProps.onClick, e) &&
      context().setOpen((open) => !open)
  }

  return (
    <DynamicButton<
      Component<
        Omit<DialogTriggerElementProps, keyof DynamicButtonElementProps>
      >
    >
      // === SharedElementProps ===
      ref={mergeRefs(context().setTriggerRef, localProps.ref)}
      onClick={onClick}
      // === ElementProps ===
      aria-controls={context().dialogId()}
      aria-expanded={context().open() ? 'true' : 'false'}
      aria-haspopup="dialog"
      data-closed={dataIf(!context().open())}
      data-open={dataIf(context().open())}
      data-arara-dialog-trigger=""
      {...otherProps}
    />
  )
}

export default DialogTrigger
