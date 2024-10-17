import {
  createEffect,
  createMemo,
  onCleanup,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import { Dynamic, type DynamicProps } from '@arara/utils/dynamic'
import { useInternalDialogContext } from '@src/context'

export type DialogLabelAraraProps = {
  /**
   * The `id` of the dialog context to use.
   */
  contextId?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
export type DialogLabelSharedElementProps<T extends ValidComponent = 'h2'> = {}

export type DialogLabelElementProps = DialogLabelSharedElementProps & {
  id: string | undefined
  'data-arara-dialog-label': string | null
}

export type DialogLabelProps<T extends ValidComponent = 'h2'> =
  DialogLabelAraraProps & Partial<DialogLabelSharedElementProps<T>>

/** Label element to announce the dialog to accessibility tools.
 *
 * @data `data-arara-dialog-label` - Present on every dialog label element.
 */
const DialogLabel = <T extends ValidComponent = 'h2'>(
  props: DynamicProps<T, DialogLabelProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as DialogLabelProps, [
    'contextId',
  ])

  const context = createMemo(() =>
    useInternalDialogContext(localProps.contextId),
  )

  createEffect(() => {
    const _context = context()
    _context.registerLabelId()
    onCleanup(() => _context.unregisterLabelId())
  })

  return (
    <Dynamic<DialogLabelElementProps>
      as="h2"
      // === ElementProps ===
      id={context().labelId()}
      data-arara-dialog-label=""
      {...otherProps}
    />
  )
}

export default DialogLabel
