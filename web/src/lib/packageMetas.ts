import accordion from '../../../packages/accordion/package.json'
import arara from '../../../packages/arara/package.json'
import dialog from '../../../packages/dialog/package.json'
import disclosure from '../../../packages/disclosure/package.json'
import dismissible from '../../../packages/solid-dismissible/package.json'
import drawer from '../../../packages/drawer/package.json'
import focusTrap from '../../../packages/solid-focus-trap/package.json'
import list from '../../../packages/solid-list/package.json'
import otpField from '../../../packages/otp-field/package.json'
import persistent from '../../../packages/solid-persistent/package.json'
import popover from '../../../packages/popover/package.json'
import presence from '../../../packages/solid-presence/package.json'
import preventScroll from '../../../packages/solid-prevent-scroll/package.json'
import resizable from '../../../packages/resizable/package.json'
import tooltip from '../../../packages/tooltip/package.json'
import transitionSize from '../../../packages/solid-transition-size/package.json'

const packageMetas: {
  [library: string]: {
    version: string
    npmHref: string
    sourceHref: string
  }
} = {
  arara: {
    version: arara.version,
    npmHref: 'https://www.npmjs.com/package/arara',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/arara',
  },
  '@arara/accordion': {
    version: accordion.version,
    npmHref: 'https://www.npmjs.com/package/@arara/accordion',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/accordion',
  },
  '@arara/dialog': {
    version: dialog.version,
    npmHref: 'https://www.npmjs.com/package/@arara/dialog',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/dialog',
  },
  '@arara/disclosure': {
    version: disclosure.version,
    npmHref: 'https://www.npmjs.com/package/@arara/disclosure',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/disclosure',
  },
  '@arara/drawer': {
    version: drawer.version,
    npmHref: 'https://www.npmjs.com/package/@arara/drawer',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/drawer',
  },
  '@arara/otp-field': {
    version: otpField.version,
    npmHref: 'https://www.npmjs.com/package/@arara/otp-field',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/otp-field',
  },
  '@arara/popover': {
    version: popover.version,
    npmHref: 'https://www.npmjs.com/package/@arara/popover',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/popover',
  },
  '@arara/resizable': {
    version: resizable.version,
    npmHref: 'https://www.npmjs.com/package/@arara/resizable',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/resizable',
  },
  '@arara/tooltip': {
    version: tooltip.version,
    npmHref: 'https://www.npmjs.com/package/@arara/tooltip',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/tooltip',
  },
  'solid-dismissible': {
    version: dismissible.version,
    npmHref: 'https://www.npmjs.com/package/solid-dismissible',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-dismissible',
  },
  'solid-focus-trap': {
    version: focusTrap.version,
    npmHref: 'https://www.npmjs.com/package/solid-focus-trap',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-focus-trap',
  },
  'solid-list': {
    version: list.version,
    npmHref: 'https://www.npmjs.com/package/solid-list',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-list',
  },
  'solid-persistent': {
    version: persistent.version,
    npmHref: 'https://www.npmjs.com/package/solid-persistent',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-persistent',
  },
  'solid-presence': {
    version: presence.version,
    npmHref: 'https://www.npmjs.com/package/solid-presence',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-presence',
  },
  'solid-prevent-scroll': {
    version: preventScroll.version,
    npmHref: 'https://www.npmjs.com/package/solid-prevent-scroll',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-prevent-scroll',
  },
  'solid-transition-size': {
    version: transitionSize.version,
    npmHref: 'https://www.npmjs.com/package/solid-transition-size',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-transition-size',
  },
}

export default packageMetas
