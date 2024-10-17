import Close, {
  type DialogCloseAraraProps as CloseAraraProps,
  type DialogCloseElementProps as CloseElementProps,
  type DialogCloseProps as CloseProps,
  type DialogCloseSharedElementProps as CloseSharedElementProps,
} from '@src/Close'
import Content, {
  type DialogContentAraraProps as ContentAraraProps,
  type DialogContentElementProps as ContentElementProps,
  type DialogContentProps as ContentProps,
  type DialogContentSharedElementProps as ContentSharedElementProps,
} from '@src/Content'
import {
  type DialogContextValue as ContextValue,
  useDialogContext as useContext,
} from '@src/context'
import Description, {
  type DialogDescriptionAraraProps as DescriptionAraraProps,
  type DialogDescriptionElementProps as DescriptionElementProps,
  type DialogDescriptionProps as DescriptionProps,
  type DialogDescriptionSharedElementProps as DescriptionSharedElementProps,
} from '@src/Description'
import Label, {
  type DialogLabelAraraProps as LabelAraraProps,
  type DialogLabelElementProps as LabelElementProps,
  type DialogLabelProps as LabelProps,
  type DialogLabelSharedElementProps as LabelSharedElementProps,
} from '@src/Label'
import Overlay, {
  type DialogOverlayAraraProps as OverlayAraraProps,
  type DialogOverlayElementProps as OverlayElementProps,
  type DialogOverlayProps as OverlayProps,
  type DialogOverlaySharedElementProps as OverlaySharedElementProps,
} from '@src/Overlay'
import Portal, { type DialogPortalProps } from '@src/Portal'
import Root, {
  type DialogRootChildrenProps as RootChildrenProps,
  type DialogRootProps as RootProps,
} from '@src/Root'
import Trigger, {
  type DialogTriggerAraraProps as TriggerAraraProps,
  type DialogTriggerElementProps as TriggerElementProps,
  type DialogTriggerProps as TriggerProps,
  type DialogTriggerSharedElementProps as TriggerSharedElementProps,
} from '@src/Trigger'
import type { DynamicProps } from '@arara/utils/dynamic'

export type {
  RootProps,
  RootChildrenProps,
  TriggerAraraProps,
  TriggerSharedElementProps,
  TriggerElementProps,
  TriggerProps,
  DialogPortalProps as PortalProps,
  OverlayAraraProps,
  OverlaySharedElementProps,
  OverlayElementProps,
  OverlayProps,
  ContentAraraProps,
  ContentSharedElementProps,
  ContentElementProps,
  ContentProps,
  LabelAraraProps,
  LabelSharedElementProps,
  LabelElementProps,
  LabelProps,
  DescriptionAraraProps,
  DescriptionSharedElementProps,
  DescriptionElementProps,
  DescriptionProps,
  CloseAraraProps,
  CloseSharedElementProps,
  CloseElementProps,
  CloseProps,
  ContextValue,
  DynamicProps,
}

export {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Label,
  Description,
  Close,
  useContext,
}

const Dialog = Object.assign(Root, {
  Trigger,
  Portal,
  Overlay,
  Content,
  Label,
  Description,
  Close,
  useContext,
})

export default Dialog
