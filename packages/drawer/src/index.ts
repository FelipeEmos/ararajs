import Close, {
  type DrawerCloseAraraProps as CloseAraraProps,
  type DrawerCloseElementProps as CloseElementProps,
  type DrawerCloseProps as CloseProps,
  type DrawerCloseSharedElementProps as CloseSharedElementProps,
} from '@src/Close'
import Content, {
  type DrawerContentAraraProps as ContentAraraProps,
  type DrawerContentElementProps as ContentElementProps,
  type DrawerContentProps as ContentProps,
  type DrawerContentSharedElementProps as ContentSharedElementProps,
} from '@src/Content'
import Description, {
  type DrawerDescriptionAraraProps as DescriptionAraraProps,
  type DrawerDescriptionElementProps as DescriptionElementProps,
  type DrawerDescriptionProps as DescriptionProps,
  type DrawerDescriptionSharedElementProps as DescriptionSharedElementProps,
} from '@src/Description'
import {
  type ContextValue as DialogContextValue,
  Portal,
  type PortalProps,
  useContext as useDialogContext,
} from '@arara/dialog'
import {
  type DrawerContextValue,
  useDrawerContext as useContext,
} from '@src/context'
import Label, {
  type DrawerLabelAraraProps as LabelAraraProps,
  type DrawerLabelElementProps as LabelElementProps,
  type DrawerLabelProps as LabelProps,
  type DrawerLabelSharedElementProps as LabelSharedElementProps,
} from '@src/Label'
import Overlay, {
  type DrawerOverlayAraraProps as OverlayAraraProps,
  type DrawerOverlayElementProps as OverlayElementProps,
  type DrawerOverlayProps as OverlayProps,
  type DrawerOverlaySharedElementProps as OverlaySharedElementProps,
} from '@src/Overlay'
import Root, {
  type DrawerRootChildrenProps,
  type DrawerRootProps,
} from '@src/Root'
import type { Side, Size } from '@arara/utils'
import Trigger, {
  type DrawerTriggerAraraProps as TriggerAraraProps,
  type DrawerTriggerElementProps as TriggerElementProps,
  type DrawerTriggerProps as TriggerProps,
  type DrawerTriggerSharedElementProps as TriggerSharedElementProps,
} from '@src/Trigger'
import type { DynamicProps } from '@arara/utils/dynamic'

export type {
  DrawerRootProps as RootProps,
  DrawerRootChildrenProps as RootChildrenProps,
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
  DrawerContextValue as ContextValue,
  DialogContextValue,
  Side,
  Size,
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
  useDialogContext,
}

const Drawer = Object.assign(Root, {
  Trigger,
  Portal,
  Overlay,
  Content,
  Label,
  Description,
  Close,
  useContext,
  useDialogContext,
})

export default Drawer
