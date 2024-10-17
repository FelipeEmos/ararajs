import Anchor, {
  type PopoverAnchorAraraProps as AnchorAraraProps,
  type PopoverAnchorElementProps as AnchorElementProps,
  type PopoverAnchorProps as AnchorProps,
  type PopoverAnchorSharedElementProps as AnchorSharedElementProps,
} from '@src/Anchor'
import Arrow, {
  type PopoverArrowAraraProps as ArrowAraraProps,
  type PopoverArrowElementProps as ArrowElementProps,
  type PopoverArrowProps as ArrowProps,
  type PopoverArrowSharedElementProps as ArrowSharedElementProps,
} from '@src/Arrow'
import Close, {
  type PopoverCloseAraraProps as CloseAraraProps,
  type PopoverCloseElementProps as CloseElementProps,
  type PopoverCloseProps as CloseProps,
  type PopoverCloseSharedElementProps as CloseSharedElementProps,
} from '@src/Close'
import Content, {
  type PopoverContentAraraProps as ContentAraraProps,
  type PopoverContentElementProps as ContentElementProps,
  type PopoverContentProps as ContentProps,
  type PopoverContentSharedElementProps as ContentSharedElementProps,
} from '@src/Content'
import Description, {
  type PopoverDescriptionAraraProps as DescriptionAraraProps,
  type PopoverDescriptionElementProps as DescriptionElementProps,
  type PopoverDescriptionProps as DescriptionProps,
  type PopoverDescriptionSharedElementProps as DescriptionSharedElementProps,
} from '@src/Description'
import {
  type ContextValue as DialogContextValue,
  Portal,
  type PortalProps,
  useContext as useDialogContext,
} from '@arara/dialog'
import type {
  FloatingOptions,
  FloatingState,
} from '@arara/utils/create/floating'
import Label, {
  type PopoverLabelAraraProps as LabelAraraProps,
  type PopoverLabelElementProps as LabelElementProps,
  type PopoverLabelProps as LabelProps,
  type PopoverLabelSharedElementProps as LabelSharedElementProps,
} from '@src/Label'
import Overlay, {
  type PopoverOverlayAraraProps as OverlayAraraProps,
  type PopoverOverlayElementProps as OverlayElementProps,
  type PopoverOverlayProps as OverlayProps,
  type PopoverOverlaySharedElementProps as OverlaySharedElementProps,
} from '@src/Overlay'
import {
  type PopoverContextValue,
  usePopoverContext as useContext,
} from '@src/context'
import Root, {
  type PopoverRootChildrenProps,
  type PopoverRootProps,
} from '@src/Root'
import Trigger, {
  type PopoverTriggerAraraProps as TriggerAraraProps,
  type PopoverTriggerElementProps as TriggerElementProps,
  type PopoverTriggerProps as TriggerProps,
  type PopoverTriggerSharedElementProps as TriggerSharedElementProps,
} from '@src/Trigger'
import type { DynamicProps } from '@arara/utils/dynamic'

export type {
  PopoverRootProps as RootProps,
  PopoverRootChildrenProps as RootChildrenProps,
  AnchorAraraProps,
  AnchorSharedElementProps,
  AnchorElementProps,
  AnchorProps,
  TriggerAraraProps,
  TriggerSharedElementProps,
  TriggerElementProps,
  TriggerProps,
  PortalProps,
  OverlayAraraProps,
  OverlaySharedElementProps,
  OverlayElementProps,
  OverlayProps,
  ContentAraraProps,
  ContentSharedElementProps,
  ContentElementProps,
  ContentProps,
  ArrowAraraProps,
  ArrowSharedElementProps,
  ArrowElementProps,
  ArrowProps,
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
  PopoverContextValue as ContextValue,
  DialogContextValue,
  FloatingOptions,
  FloatingState,
  DynamicProps,
}

export {
  Root,
  Anchor,
  Trigger,
  Portal,
  Overlay,
  Content,
  Arrow,
  Label,
  Description,
  Close,
  useContext,
  useDialogContext,
}

const Popover = Object.assign(Root, {
  Anchor,
  Trigger,
  Portal,
  Overlay,
  Content,
  Arrow,
  Label,
  Description,
  Close,
  useContext,
  useDialogContext,
})

export default Popover
