import { callEventHandler, type ElementOf } from '@arara/utils/dom'
import {
  type Component,
  createEffect,
  createMemo,
  createSignal,
  type JSX,
  onCleanup,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import Disclosure, {
  type TriggerAraraProps as DisclosureTriggerAraraProps,
  type TriggerElementProps as DisclosureTriggerElementProps,
  type TriggerSharedElementProps as DisclosureTriggerSharedElementProps,
} from '@arara/disclosure'
import { dataIf } from '@arara/utils'
import type { DynamicProps } from '@arara/utils/dynamic'
import { mergeRefs } from '@arara/utils/reactivity'
import { useInternalAccordionContext } from '@src/context'
import { useInternalAccordionItemContext } from '@src/itemContext'

export type AccordionTriggerAraraProps = DisclosureTriggerAraraProps

export type AccordionTriggerSharedElementProps<
  T extends ValidComponent = 'button',
> = {
  onKeyDown: JSX.EventHandlerUnion<ElementOf<T>, KeyboardEvent>
  onFocus?: JSX.EventHandlerUnion<ElementOf<T>, FocusEvent>
  disabled: boolean | undefined
} & DisclosureTriggerSharedElementProps<T>

export type AccordionTriggerElementProps =
  AccordionTriggerSharedElementProps & {
    id: string | undefined
    'aria-disabled': 'true' | undefined
    'data-disabled': '' | undefined
    'data-arara-accordion-trigger': ''
  } & DisclosureTriggerElementProps

export type AccordionTriggerProps<T extends ValidComponent = 'button'> =
  AccordionTriggerAraraProps & Partial<AccordionTriggerSharedElementProps<T>>

/** Button that changes the open state of the accordion item when clicked.
 *
 * @data `data-arara-accordion-trigger` - Present on every accordion trigger element.
 * @data `data-expanded` - Present when the accordion is expanded.
 * @data `data-collapsed` - Present when the accordion is collapsed.
 * @data `data-disabled` - Present when the accordion trigger is disabled.
 */
const AccordionTrigger = <T extends ValidComponent = 'button'>(
  props: DynamicProps<T, AccordionTriggerProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as AccordionTriggerProps, [
    'contextId',
    'ref',
    'onKeyDown',
    'onFocus',
    'disabled',
  ])
  const [triggerRef, setTriggerRef] = createSignal<HTMLElement | null>(null)

  const accordionContext = createMemo(() =>
    useInternalAccordionContext(localProps.contextId),
  )

  createEffect(() => {
    const trigger = triggerRef()
    const context = accordionContext()
    if (trigger) {
      context.registerTrigger(trigger)
      onCleanup(() => context.unregisterTrigger(trigger))
    }
  })

  const context = createMemo(() =>
    useInternalAccordionItemContext(localProps.contextId),
  )

  createEffect(() => {
    const _context = context()
    _context.registerTriggerId()
    onCleanup(() => _context.unregisterTriggerId())
  })

  const onKeyDown: JSX.EventHandlerUnion<HTMLButtonElement, KeyboardEvent> = (
    e,
  ) => {
    !callEventHandler(localProps.onKeyDown, e) &&
      accordionContext().onTriggerKeyDown(e)
  }

  const onFocus: JSX.EventHandlerUnion<HTMLButtonElement, FocusEvent> = (e) => {
    callEventHandler(localProps.onFocus, e)
    accordionContext().onTriggerFocus(e)
  }

  return (
    <Disclosure.Trigger<
      Component<
        Omit<AccordionTriggerElementProps, keyof DisclosureTriggerElementProps>
      >
    >
      // === SharedElementProps ===
      ref={mergeRefs(localProps.ref, setTriggerRef)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      disabled={
        localProps.disabled === true || context().disabled() || undefined
      }
      // === ElementProps ===
      id={context().triggerId()}
      contextId={localProps.contextId}
      aria-disabled={context().disabled() ? 'true' : undefined}
      data-disabled={dataIf(context().disabled())}
      data-arara-accordion-trigger=""
      // === Misc ===
      data-arara-disclosure-trigger={null}
      {...otherProps}
    />
  )
}

export default AccordionTrigger
