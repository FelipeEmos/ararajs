import Anchor, {
  type TooltipAnchorAraraProps as AnchorAraraProps,
  type TooltipAnchorElementProps as AnchorElementProps,
  type TooltipAnchorProps as AnchorProps,
  type TooltipAnchorSharedElementProps as AnchorSharedElementProps,
} from '@src/Anchor'
import Arrow, {
  type TooltipArrowAraraProps as ArrowAraraProps,
  type TooltipArrowElementProps as ArrowElementProps,
  type TooltipArrowProps as ArrowProps,
  type TooltipArrowSharedElementProps as ArrowSharedElementProps,
} from '@src/Arrow'
import Content, {
  type TooltipContentAraraProps as ContentAraraProps,
  type TooltipContentElementProps as ContentElementProps,
  type TooltipContentProps as ContentProps,
  type TooltipContentSharedElementProps as ContentSharedElementProps,
} from '@src/Content'
import {
  type TooltipContextValue as ContextValue,
  useTooltipContext as useContext,
} from '@src/context'
import type {
  FloatingOptions,
  FloatingState,
} from '@arara/utils/create/floating'
import Portal, { type TooltipPortalProps as PortalProps } from '@src/Portal'
import Root, {
  type TooltipRootChildrenProps as RootChildrenProps,
  type TooltipRootProps as RootProps,
} from '@src/Root'
import Trigger, {
  type TooltipTriggerAraraProps as TriggerAraraProps,
  type TooltipTriggerElementProps as TriggerElementProps,
  type TooltipTriggerProps as TriggerProps,
  type TooltipTriggerSharedElementProps as TriggerSharedElementProps,
} from '@src/Trigger'
import type { DynamicProps } from '@arara/utils/dynamic'

export type {
  RootProps,
  RootChildrenProps,
  AnchorAraraProps,
  AnchorSharedElementProps,
  AnchorElementProps,
  AnchorProps,
  TriggerAraraProps,
  TriggerSharedElementProps,
  TriggerElementProps,
  TriggerProps,
  PortalProps,
  ContentAraraProps,
  ContentSharedElementProps,
  ContentElementProps,
  ContentProps,
  ArrowAraraProps,
  ArrowSharedElementProps,
  ArrowElementProps,
  ArrowProps,
  ContextValue,
  FloatingOptions,
  FloatingState,
  DynamicProps,
}

export { Root, Anchor, Trigger, Portal, Content, Arrow, useContext }

const Tooltip = Object.assign(Root, {
  Anchor,
  Trigger,
  Portal,
  Content,
  Arrow,
  useContext,
})

export default Tooltip
