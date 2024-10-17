import { type Component, createMemo, type ValidComponent } from 'solid-js'
import Disclosure, {
  type ContentAraraProps as DisclosureContentAraraProps,
  type ContentElementProps as DisclosureContentElementProps,
  type ContentSharedElementProps as DisclosureContentSharedElementProps,
} from '@arara/disclosure'
import type { DynamicProps } from '@arara/utils/dynamic'
import { useInternalAccordionItemContext } from '@src/itemContext'

export type AccordionContentAraraProps = DisclosureContentAraraProps

export type AccordionContentSharedElementProps<
  T extends ValidComponent = 'div',
> = DisclosureContentSharedElementProps<T>

export type AccordionContentElementProps =
  AccordionContentSharedElementProps & {
    role: 'region'
    'aria-labelledby': string | undefined
    'data-arara-accordion-content': ''
  } & DisclosureContentElementProps

export type AccordionContentProps<T extends ValidComponent = 'div'> =
  AccordionContentAraraProps & Partial<AccordionContentSharedElementProps<T>>

/** Content of an accordion item. Can be animated.
 *
 * @data `data-arara-accordion-content` - Present on every accordion item content element.
 * @data `data-expanded` - Present when the accordion item is expanded.
 * @data `data-collapsed` - Present when the accordion item is collapsed.
 * @css `--arara-disclosure-content-width` - The width of the accordion item content. Useful if you want to animate its width.
 * @css `--arara-disclosure-content-height` - The height of the accordion item content. Useful if you want to animate its height.
 */
const AccordionContent = <T extends ValidComponent = 'div'>(
  props: DynamicProps<T, AccordionContentProps<T>>,
) => {
  const context = createMemo(() =>
    useInternalAccordionItemContext(props.contextId),
  )

  return (
    <Disclosure.Content<
      Component<
        Omit<AccordionContentElementProps, keyof DisclosureContentElementProps>
      >
    >
      // === ElementProps ===
      role="region"
      aria-labelledby={context().triggerId()}
      data-arara-accordion-content=""
      // === Misc ===
      data-arara-disclosure-content={null}
      {...(props as AccordionContentProps)}
    />
  )
}

export default AccordionContent
