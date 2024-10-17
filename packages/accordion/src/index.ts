import Content, {
  type AccordionContentAraraProps as ContentAraraProps,
  type AccordionContentElementProps as ContentElementProps,
  type AccordionContentProps as ContentProps,
  type AccordionContentSharedElementProps as ContentSharedElementProps,
} from '@src/Content'
import {
  type AccordionContextValue as ContextValue,
  useAccordionContext as useContext,
} from '@src/context'
import {
  type ContextValue as DisclosureContextValue,
  useContext as useDisclosureContext,
} from '@arara/disclosure'
import Item, {
  type AccordionItemChildrenProps as ItemChildrenProps,
  type AccordionItemAraraProps as ItemAraraProps,
  type AccordionItemElementProps as ItemElementProps,
  type AccordionItemProps as ItemProps,
  type AccordionItemSharedElementProps as ItemSharedElementProps,
} from '@src/Item'
import {
  type AccordionItemContextValue as ItemContextValue,
  useAccordionItemContext as useItemContext,
} from '@src/itemContext'
import Root, {
  type AccordionRootChildrenProps as RootChildrenProps,
  type AccordionRootProps as RootProps,
} from '@src/Root'
import Trigger, {
  type AccordionTriggerAraraProps as TriggerAraraProps,
  type AccordionTriggerElementProps as TriggerElementProps,
  type AccordionTriggerProps as TriggerProps,
  type AccordionTriggerSharedElementProps as TriggerSharedElementProps,
} from '@src/Trigger'
import type { DynamicProps } from '@arara/utils/dynamic'

export type {
  RootProps,
  RootChildrenProps,
  ItemAraraProps,
  ItemSharedElementProps,
  ItemElementProps,
  ItemProps,
  ItemChildrenProps,
  TriggerAraraProps,
  TriggerSharedElementProps,
  TriggerElementProps,
  TriggerProps,
  ContentAraraProps,
  ContentSharedElementProps,
  ContentElementProps,
  ContentProps,
  ContextValue,
  ItemContextValue,
  DisclosureContextValue,
  DynamicProps,
}

export {
  Root,
  Item,
  Trigger,
  Content,
  useContext,
  useItemContext,
  useDisclosureContext,
}

const Accordion = Object.assign(Root, {
  Item,
  Trigger,
  Content,
  useContext,
  useItemContext,
  useDisclosureContext,
})

export default Accordion
