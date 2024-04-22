import Close, { type DialogCloseProps } from '@primitives/dialog/Close'
import Content, { type DialogContentProps } from '@primitives/dialog/Content'
import Description, {
  type DialogDescriptionProps,
} from '@primitives/dialog/Description'
import {
  type DialogContextValue,
  useDialogContext as useContext,
} from '@primitives/dialog/context'
import Label, { type DialogLabelProps } from '@primitives/dialog/Label'
import Overlay, { type DialogOverlayProps } from '@primitives/dialog/Overlay'
import Portal, { type DialogPortalProps } from '@primitives/dialog/Portal'
import Root, {
  type DialogRootChildrenProps,
  type DialogRootProps,
} from '@primitives/dialog/Root'
import Trigger, { type DialogTriggerProps } from '@primitives/dialog/Trigger'

export type {
  DialogContextValue as ContextValue,
  DialogRootProps as RootProps,
  DialogRootChildrenProps as RootChildrenProps,
  DialogTriggerProps as TriggerProps,
  DialogPortalProps as PortalProps,
  DialogOverlayProps as OverlayProps,
  DialogContentProps as ContentProps,
  DialogLabelProps as LabelProps,
  DialogDescriptionProps as DescriptionProps,
  DialogCloseProps as CloseProps,
}

export {
  useContext,
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Label,
  Description,
  Close,
}

export const Dialog = Object.assign(Root, {
  useContext,
  Trigger,
  Portal,
  Overlay,
  Content,
  Label,
  Description,
  Close,
})
