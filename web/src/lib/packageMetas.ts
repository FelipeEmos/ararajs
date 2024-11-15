import core from '../../../packages/core/package.json'

const packageMetas: {
  [library: string]: {
    version: string
    npmHref: string
    sourceHref: string
  }
} = {
  core: {
    version: core.version,
    npmHref: 'https://www.npmjs.com/package/ararajs',
    sourceHref: 'https://github.com/FelipeEmos/ararajs/tree/main/packages/core',
  },
}

export default packageMetas
