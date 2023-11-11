import { isFunction } from '@lib/assertions'
import createControllableSignal from '@lib/create/controllableSignal'
import createFocusTrap from '@lib/create/focusTrap'
import createOnce from '@lib/create/once'
import createPresence from '@lib/create/presence'
import { access } from '@lib/utils'
import { DialogContext } from '@primitives/dialog/DialogContext'
import { mergeProps, createUniqueId, createSignal, untrack } from 'solid-js'
import type { Component, JSX, Setter } from 'solid-js'

export type DialogRootProps = {
  /** The `role` attribute of the dialog element. */
  role?: 'dialog' | 'alertdialog'
  /** Whether the dialog is open or not. */
  open?: boolean
  /** Callback fired when the open state changes. */
  onOpenChange?: Setter<boolean>
  /** Whether the dialog is open initially or not. */
  initialOpen?: boolean
  /** Whether the dialog should be rendered as a modal or not. */
  modal?: boolean
  /** Whether the dialog should close when the user presses the `Escape` key. */
  closeOnEscapeKeyDown?: boolean
  /** Whether the dialog should be closed if the user interacts outside the bounds of `<Dialog.Content />` */
  closeOnOutsideInteract?: boolean
  /** Whether pointer events outside of `<Dialog.Content />` should be disabled. */
  noOutsidePointerEvents?: boolean
  /** Whether the dialog should prevent scrolling on the `<body>` element. */
  preventScroll?: boolean
  /** Whether padding should be added to the body element to avoid shifting because of the scrollbar disappearing */
  preventScrollbarShift?: boolean
  /** Whether the dialog should trap focus or not. */
  trapFocus?: boolean
  /** Whether the dialog should restore focus to the previous active element when it closes. */
  restoreFocus?: boolean
  /** The element to receive focus when the dialog opens. */
  initialFocusEl?: HTMLElement
  /** The element to receive focus when the dialog closes. */
  finalFocusEl?: HTMLElement
  /** The `id` attribute of the dialog element. */
  dialogId?: string
  /** The `id` attribute of the dialog label element. */
  labelId?: string
  /** The `id` attribute of the dialog description element. */
  descriptionId?: string
  children: JSX.Element | ((props: DialogRootChildrenProps) => JSX.Element)
}

export type DialogRootChildrenProps = {
  /** The `role` attribute of the dialog element. */
  role: 'dialog' | 'alertdialog'
  /** Whether the dialog is open or not. */
  open: boolean
  /** Change the open state of the dialog */
  setOpen: Setter<boolean>
  /** Whether the dialog should be rendered as a modal or not. */
  modal: boolean
  /** Whether the dialog should close when the user presses the `Escape` key. */
  closeOnEscapeKeyDown: boolean
  /** Whether the dialog should be closed if the user interacts outside the bounds of the dialog content. */
  closeOnOutsideInteract: boolean
  /** Whether pointer events outside of `<Dialog.Content />` should be disabled. */
  noOutsidePointerEvents: boolean
  /** Whether the dialog should prevent scrolling on the `<body>` element. */
  preventScroll: boolean
  /** Whether padding should be added to the body element to avoid shifting because of the scrollbar disappearing */
  preventScrollbarShift: boolean
  /** Whether the dialog should trap focus or not. */
  trapFocus: boolean
  /** Whether the dialog should restore focus to the previous active element when it closes. */
  restoreFocus: boolean
  /** The element to receive focus when the dialog opens. */
  initialFocusEl?: HTMLElement
  /** The element to receive focus when the dialog closes. */
  finalFocusEl?: HTMLElement
  /** Whether the dialog content is present. This differes from `open` as it tracks pending animations. */
  contentPresent: boolean
  /** Whether the dialog overlay is present. This differes from `open` as it tracks pending animations. */
  overlayPresent: boolean
  dialogId: string
  labelId: string
  descriptionId: string
}

const DEFAULT_MODAL = true

const DialogRoot: Component<DialogRootProps> = (props) => {
  const defaultedProps = mergeProps(
    {
      role: 'dialog' as const,
      initialOpen: false,
      modal: true,
      closeOnEscapeKeyDown: true,
      closeOnOutsideInteract: () =>
        props.modal ?? DEFAULT_MODAL ? true : false,
      noOutsidePointerEvents: () =>
        props.modal ?? DEFAULT_MODAL ? true : false,
      preventScroll: true,
      preventScrollbarShift: true,
      trapFocus: true,
      restoreFocus: true,
      dialogId: createUniqueId(),
      labelId: createUniqueId(),
      descriptionId: createUniqueId(),
    },
    props,
  )

  const [open, setOpen] = createControllableSignal({
    value: () => defaultedProps.open,
    defaultValue: () => defaultedProps.initialOpen,
    onChange: defaultedProps.onOpenChange,
  })

  const [contentRef, setContentRef] = createSignal<HTMLElement | null>(null)
  const [overlayRef, setOverlayRef] = createSignal<HTMLElement | null>(null)

  const { present: contentPresent } = createPresence({
    present: open,
    element: contentRef,
  })
  const { present: overlayPresent } = createPresence({
    present: open,
    element: overlayRef,
  })

  createFocusTrap({
    element: contentRef,
    initialFocusElement: () => defaultedProps.initialFocusEl ?? null,
    isDisabled: () => !open() || !defaultedProps.trapFocus,
    restoreFocus: () => defaultedProps.restoreFocus,
    finalFocusElement: () => defaultedProps.finalFocusEl ?? null,
  })

  const childrenProps: DialogRootChildrenProps = {
    get role() {
      return defaultedProps.role
    },
    get open() {
      return open()
    },
    setOpen,
    get modal() {
      return defaultedProps.modal
    },
    get closeOnEscapeKeyDown() {
      return defaultedProps.closeOnEscapeKeyDown
    },
    get closeOnOutsideInteract() {
      return access(defaultedProps.closeOnOutsideInteract)
    },
    get noOutsidePointerEvents() {
      return access(defaultedProps.noOutsidePointerEvents)
    },
    get preventScroll() {
      return defaultedProps.preventScroll
    },
    get preventScrollbarShift() {
      return defaultedProps.preventScrollbarShift
    },
    get trapFocus() {
      return defaultedProps.trapFocus
    },
    get restoreFocus() {
      return defaultedProps.restoreFocus
    },
    get initialFocusEl() {
      return defaultedProps.initialFocusEl
    },
    get finalFocusEl() {
      return defaultedProps.finalFocusEl
    },
    get contentPresent() {
      return contentPresent()
    },
    get overlayPresent() {
      return overlayPresent()
    },
    get dialogId() {
      return defaultedProps.dialogId
    },
    get labelId() {
      return defaultedProps.labelId
    },
    get descriptionId() {
      return defaultedProps.descriptionId
    },
  }

  const memoizedChildren = createOnce(() => defaultedProps.children)

  const resolveChildren = () => {
    const children = memoizedChildren()()
    if (isFunction(children)) {
      return children(childrenProps)
    }
    return children
  }

  return (
    <DialogContext.Provider
      value={{
        role: () => defaultedProps.role,
        open,
        modal: () => defaultedProps.modal,
        closeOnEscapeKeyDown: () => defaultedProps.closeOnEscapeKeyDown,
        closeOnOutsideInteract: () =>
          access(defaultedProps.closeOnOutsideInteract),
        noOutsidePointerEvents: () =>
          access(defaultedProps.noOutsidePointerEvents),
        preventScroll: () => defaultedProps.preventScroll,
        preventScrollbarShift: () => defaultedProps.preventScrollbarShift,
        trapFocus: () => defaultedProps.trapFocus,
        restoreFocus: () => defaultedProps.restoreFocus,
        initialFocusEl: () => defaultedProps.initialFocusEl,
        finalFocusEl: () => defaultedProps.finalFocusEl,
        contentPresent,
        overlayPresent,
        dialogId: () => defaultedProps.dialogId,
        labelId: () => defaultedProps.labelId,
        descriptionId: () => defaultedProps.descriptionId,
        setOpen,
        contentRef,
        setContentRef,
        setOverlayRef,
      }}
    >
      {untrack(() => resolveChildren())}
    </DialogContext.Provider>
  )
}

export default DialogRoot
