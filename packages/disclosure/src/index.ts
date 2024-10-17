import Content, {
  type DisclosureContentAraraProps as ContentAraraProps,
  type DisclosureContentElementProps as ContentElementProps,
  type DisclosureContentProps as ContentProps,
  type DisclosureContentSharedElementProps as ContentSharedElementProps,
} from '@src/Content'
import {
  type DisclosureContextValue as ContextValue,
  useDisclosureContext as useContext,
} from '@src/context'
import Root, {
  type DisclosureRootChildrenProps as RootChildrenProps,
  type DisclosureRootProps as RootProps,
} from '@src/Root'
import Trigger, {
  type DisclosureTriggerAraraProps as TriggerAraraProps,
  type DisclosureTriggerElementProps as TriggerElementProps,
  type DisclosureTriggerProps as TriggerProps,
  type DisclosureTriggerSharedElementProps as TriggerSharedElementProps,
} from '@src/Trigger'
import type { DynamicProps } from '@arara/utils/dynamic'

export type {
  RootProps,
  RootChildrenProps,
  TriggerAraraProps,
  TriggerSharedElementProps,
  TriggerElementProps,
  TriggerProps,
  ContentAraraProps,
  ContentSharedElementProps,
  ContentElementProps,
  ContentProps,
  ContextValue,
  DynamicProps,
}

export { Root, Trigger, Content, useContext }

const Disclosure = Object.assign(Root, {
  Trigger,
  Content,
  useContext,
})

export default Disclosure
