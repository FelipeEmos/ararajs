import './index.css'
import { Star } from '@examples/primitives/tooltip/icons'
import Tooltip from '@corvu/tooltip'
import type { VoidComponent } from 'solid-js'

const TooltipExample: VoidComponent = () => {
  return (
    <Tooltip
      placement="top"
      openDelay={200}
      floatingOptions={{
        offset: 13,
        flip: true,
        shift: true,
      }}
    >
      <Tooltip.Trigger
        as="a"
        href="https://github.com/araradev/arara/"
        target="_blank"
      >
        <Star size="26" />
        <span class="sr-only">arara on GitHub</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          Give arara a star! ⭐️
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip>
  )
}

export default TooltipExample
