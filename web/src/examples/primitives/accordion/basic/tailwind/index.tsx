import Accordion from '@arara/accordion'
import type { VoidComponent } from 'solid-js'

const AccordionExample: VoidComponent = () => {
  return (
    <div class="my-auto w-full max-w-[250px] overflow-hidden rounded-lg @xl:max-w-[400px]">
      <Accordion collapseBehavior="hide">
        <Accordion.Item>
          <h2>
            <Accordion.Trigger class="w-full border-b border-arara-300 bg-arara-100 px-4 py-3 text-left font-medium transition-all duration-100 hover:bg-arara-200 focus-visible:bg-arara-200 focus-visible:outline-none">
              What is arara?
            </Accordion.Trigger>
          </h2>
          <Accordion.Content class="overflow-hidden border-b border-arara-300 bg-arara-100 arara-expanded:animate-expand arara-collapsed:animate-collapse">
            <div class="px-4 py-2">
              A collection of unstyled, customizable UI primitives for SolidJS.
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <h2>
            <Accordion.Trigger class="w-full border-b border-arara-300 bg-arara-100 px-4 py-3 text-left font-medium transition-all duration-100 hover:bg-arara-200 focus-visible:bg-arara-200 focus-visible:outline-none">
              Is it accessible?
            </Accordion.Trigger>
          </h2>
          <Accordion.Content class="overflow-hidden border-b border-arara-300 bg-arara-100 arara-expanded:animate-expand arara-collapsed:animate-collapse">
            <div class="px-4 py-2">
              It has full keyboard support and adheres to the WAI-ARIA pattern
              for accordions.
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <h2>
            <Accordion.Trigger class="w-full border-b border-arara-300 bg-arara-100 px-4 py-3 text-left font-medium transition-all duration-100 hover:bg-arara-200 focus-visible:bg-arara-200 focus-visible:outline-none">
              Can I customize it?
            </Accordion.Trigger>
          </h2>
          <Accordion.Content class="overflow-hidden border-b border-arara-300 bg-arara-100 arara-expanded:animate-expand arara-collapsed:animate-collapse">
            <div class="px-4 py-2">
              Yes, check out the API reference at the bottom for all options.
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default AccordionExample
