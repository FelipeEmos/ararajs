import arara from '../../../packages/arara/package.json'
// import accordion from '../../../packages/accordion/package.json'
// import dialog from '../../../packages/dialog/package.json'
// import disclosure from '../../../packages/disclosure/package.json'
// import dismissible from '../../../packages/solid-dismissible/package.json'
// import drawer from '../../../packages/drawer/package.json'
// import focusTrap from '../../../packages/solid-focus-trap/package.json'
// import list from '../../../packages/solid-list/package.json'
// import otpField from '../../../packages/otp-field/package.json'
// import persistent from '../../../packages/solid-persistent/package.json'
// import popover from '../../../packages/popover/package.json'
// import presence from '../../../packages/solid-presence/package.json'
// import preventScroll from '../../../packages/solid-prevent-scroll/package.json'
// import resizable from '../../../packages/resizable/package.json'
// import tooltip from '../../../packages/tooltip/package.json'
// import transitionSize from '../../../packages/solid-transition-size/package.json'

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
    sourceHref: 'https://github.com/FelipeEmos/arara/tree/main/packages/arara',
  },
  '@corvu/accordion': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/accordion',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/accordion',
  },
  '@corvu/dialog': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/dialog',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/dialog',
  },
  '@corvu/disclosure': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/disclosure',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/disclosure',
  },
  '@corvu/drawer': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/drawer',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/drawer',
  },
  '@corvu/otp-field': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/otp-field',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/otp-field',
  },
  '@corvu/popover': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/popover',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/popover',
  },
  '@corvu/resizable': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/resizable',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/resizable',
  },
  '@corvu/tooltip': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/@corvu/tooltip',
    sourceHref: 'https://github.com/araradev/arara/tree/main/packages/tooltip',
  },
  'solid-dismissible': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/solid-dismissible',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-dismissible',
  },
  'solid-focus-trap': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/solid-focus-trap',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-focus-trap',
  },
  'solid-list': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/solid-list',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-list',
  },
  'solid-persistent': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/solid-persistent',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-persistent',
  },
  'solid-presence': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/solid-presence',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-presence',
  },
  'solid-prevent-scroll': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/solid-prevent-scroll',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-prevent-scroll',
  },
  'solid-transition-size': {
    version: 'TODO: remove',
    npmHref: 'https://www.npmjs.com/package/solid-transition-size',
    sourceHref:
      'https://github.com/araradev/arara/tree/main/packages/solid-transition-size',
  },
}

export default packageMetas
