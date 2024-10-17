import { combineStyle, type ElementOf, type Ref } from '@arara/utils/dom'
import {
  createMemo,
  type JSX,
  Show,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import { Dynamic, type DynamicProps } from '@arara/utils/dynamic'
import { mergeRefs, some } from '@arara/utils/reactivity'
import { dataIf } from '@arara/utils'
import Dismissible from 'solid-dismissible'
import { useInternalDialogContext } from '@src/context'

export type DialogContentAraraProps = {
  /**
   * Whether the dialog content should be forced to render. Useful when using third-party animation libraries.
   * @defaultValue `false`
   */
  forceMount?: boolean
  /**
   * The `id` of the dialog context to use.
   */
  contextId?: string
}

export type DialogContentSharedElementProps<T extends ValidComponent = 'div'> =
  {
    ref: Ref<ElementOf<T>>
    style: string | JSX.CSSProperties
  }

export type DialogContentElementProps = DialogContentSharedElementProps & {
  id: string
  role: 'dialog' | 'alertdialog'
  tabIndex: '-1'
  'aria-describedby': string | undefined
  'aria-labelledby': string | undefined
  'aria-modal': 'true' | 'false'
  'data-closed': '' | undefined
  'data-open': '' | undefined
  'data-arara-dialog-content': '' | null
}

export type DialogContentProps<T extends ValidComponent = 'div'> =
  DialogContentAraraProps & Partial<DialogContentSharedElementProps<T>>

/** Content of the dialog. Can be animated.
 *
 * @data `data-arara-dialog-content` - Present on every dialog content element.
 * @data `data-open` - Present when the dialog is open.
 * @data `data-closed` - Present when the dialog is closed.
 */
const DialogContent = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, DialogContentProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as DialogContentProps, [
    'forceMount',
    'contextId',
    'ref',
    'style',
  ])

  const context = createMemo(() =>
    useInternalDialogContext(localProps.contextId),
  )

  const show = () =>
    some(context().open, () => localProps.forceMount, context().contentPresent)

  const enableDismissible = createMemo(
    () => context().open() || context().contentPresent(),
  )

  return (
    <Dismissible
      element={context().contentRef}
      enabled={enableDismissible()}
      dismissibleId={context().dialogId()}
      onDismiss={() => context().setOpen(false)}
      dismissOnEscapeKeyDown={context().closeOnEscapeKeyDown}
      dismissOnOutsideFocus={context().closeOnOutsideFocus}
      dismissOnOutsidePointer={context().closeOnOutsidePointer}
      outsidePointerStrategy={context().closeOnOutsidePointerStrategy}
      outsidePointerIgnore={() => [context().triggerRef()]}
      noOutsidePointerEvents={context().noOutsidePointerEvents}
      onEscapeKeyDown={context().onEscapeKeyDown}
      onOutsideFocus={context().onOutsideFocus}
      onOutsidePointer={context().onOutsidePointer}
    >
      {(props) => (
        <Show when={show()}>
          <Dynamic<DialogContentElementProps>
            as="div"
            // === SharedElementProps ===
            ref={mergeRefs(context().setContentRef, localProps.ref)}
            style={combineStyle(
              {
                'pointer-events': props.isLastLayer ? 'auto' : undefined,
              },
              localProps.style,
            )}
            // === ElementProps ===
            id={context().dialogId()}
            role={context().role()}
            tabIndex="-1"
            aria-describedby={context().descriptionId()}
            aria-labelledby={context().labelId()}
            aria-modal={context().modal() ? 'true' : 'false'}
            data-closed={dataIf(!context().open())}
            data-open={dataIf(context().open())}
            data-arara-dialog-content=""
            {...otherProps}
          />
        </Show>
      )}
    </Dismissible>
  )
}

export default DialogContent
