import {
  createAccordionItemContext,
  createInternalAccordionItemContext,
} from '@src/itemContext'
import {
  createMemo,
  createUniqueId,
  type JSX,
  mergeProps,
  splitProps,
  type ValidComponent,
} from 'solid-js'
import type {
  RootChildrenProps as DisclosureRootChildrenProps,
  RootProps as DisclosureRootProps,
  DynamicProps,
} from '@arara/disclosure'
import createOnce from '@arara/utils/create/once'
import createRegister from '@arara/utils/create/register'
import Disclosure from '@arara/disclosure'
import { Dynamic } from '@arara/utils/dynamic'
import Fragment from '@arara/utils/components/Fragment'
import { isFunction } from '@arara/utils'
import { useInternalAccordionContext } from '@src/context'

export type AccordionItemAraraProps = {
  /**
   * Value of the accordion item.
   * @defaultValue `createUniqueId()`
   */
  value?: string
  /**
   * Whether the accordion item is disabled. Used to override the default provided by `<Accordion.Root>`.
   */
  disabled?: boolean
  /**
   * The `id` attribute of the accordion item trigger element.
   * @defaultValue `createUniqueId()`
   */
  triggerId?: string
} & Omit<
  DisclosureRootProps,
  'expanded' | 'onExpandedChange' | 'initialExpanded' | 'children'
>

export type AccordionItemSharedElementProps<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends ValidComponent = typeof Fragment,
> = {
  children:
    | JSX.Element
    | ((
        props: AccordionItemChildrenProps & DisclosureRootChildrenProps,
      ) => JSX.Element)
}

export type AccordionItemElementProps = AccordionItemSharedElementProps & {
  'data-arara-accordion-item': ''
}

export type AccordionItemProps<T extends ValidComponent = typeof Fragment> =
  AccordionItemAraraProps & Partial<AccordionItemSharedElementProps<T>>

/** Props that are passed to the Item component children callback. */
export type AccordionItemChildrenProps = {
  /** Value of the accordion item. */
  value: string
  /** Whether the accordion item is disabled. */
  disabled: boolean
  /** The `id` attribute of the accordion item trigger element. */
  triggerId: string | undefined
}

/** Context wrapper for the accordion item. Is required for every accordion item you create.
 *
 * @data `data-arara-accordion-item` - Present if the item isn't rendered as a Fragment.
 */
const AccordionItem = <T extends ValidComponent = typeof Fragment>(
  props: DynamicProps<T, AccordionItemProps<T>>,
) => {
  const defaultedProps = mergeProps(
    {
      accordionId: createUniqueId(),
    },
    props,
  )
  const [localProps, otherProps] = splitProps(
    defaultedProps as AccordionItemProps,
    [
      'value',
      'disabled',
      'collapseBehavior',
      'triggerId',
      'contextId',
      'children',
    ],
  )

  const [triggerId, registerTriggerId, unregisterTriggerId] = createRegister({
    value: () => localProps.triggerId ?? createUniqueId(),
  })

  const context = createMemo(() =>
    useInternalAccordionContext(localProps.contextId),
  )

  const value = createMemo(() => localProps.value ?? createUniqueId())

  const expanded = createMemo(() => context().internalValue().includes(value()))
  const disabled = createMemo(
    () => (localProps.disabled ?? context().disabled()) as boolean,
  )
  const collapseBehavior = createMemo(
    () => localProps.collapseBehavior ?? context().collapseBehavior(),
  )

  const childrenProps: AccordionItemChildrenProps = {
    get value() {
      return value()
    },
    get disabled() {
      return disabled()
    },
    get triggerId() {
      return triggerId()
    },
  }

  const memoizedChildren = createOnce(() => localProps.children)

  const resolveChildren = (
    disclosureChildrenProps: DisclosureRootChildrenProps,
  ) => {
    const children = memoizedChildren()()
    if (isFunction(children)) {
      const mergedProps = mergeProps(disclosureChildrenProps, childrenProps)
      return children(mergedProps)
    }
    return children
  }

  const memoizedAccordionItem = createMemo(() => {
    const AccordionItemContext = createAccordionItemContext(
      localProps.contextId,
    )
    const InternalAccordionItemContext = createInternalAccordionItemContext(
      localProps.contextId,
    )

    return (
      <AccordionItemContext.Provider
        value={{
          value,
          disabled,
          triggerId,
        }}
      >
        <InternalAccordionItemContext.Provider
          value={{
            value,
            disabled,
            triggerId,
            registerTriggerId,
            unregisterTriggerId,
          }}
        >
          <Dynamic<AccordionItemElementProps>
            as={Fragment}
            // === ElementProps ===
            data-arara-accordion-item=""
            {...otherProps}
          >
            <Disclosure
              expanded={expanded()}
              onExpandedChange={(newExpanded) => {
                if (newExpanded === expanded() || disabled()) return
                context().toggleValue(value())
              }}
              collapseBehavior={collapseBehavior()}
              contextId={localProps.contextId}
              {...otherProps}
            >
              {(disclosureChildrenProps) =>
                resolveChildren(disclosureChildrenProps)
              }
            </Disclosure>
          </Dynamic>
        </InternalAccordionItemContext.Provider>
      </AccordionItemContext.Provider>
    )
  })

  return memoizedAccordionItem as unknown as JSX.Element
}

export default AccordionItem
