import type { ApiDeclaration } from '@lib/typedoc/types/typedoc'
import coreTypedoc from '../../../../packages/core/api.json'
import type { Library } from '@lib/typedoc/types/specifications'

export const Typedoc: { [key: string]: ApiDeclaration } = {
  ararajs: coreTypedoc as ApiDeclaration,
}

const AraraJsAPI: Library = {
  api: Typedoc['ararajs'],
  name: 'AraraJS',
  items: {
    Root: {
      kind: 'component',
      sorting: [
        'expanded',
        'onExpandedChange',
        'initialExpanded',
        'collapseBehavior',
        'disclosureId',
        'contextId',
      ],
    },
    Trigger: {
      kind: 'component',
      sorting: ['as', 'contextId'],
    },
    Content: {
      kind: 'component',
      sorting: ['as', 'forceMount', 'contextId'],
    },
    useContext: {
      kind: 'context',
      sorting: [
        'expanded',
        'setExpanded',
        'collapseBehavior',
        'disclosureId',
        'contentPresent',
        'contentRef',
        'contentSize',
      ],
    },
    RootChildrenProps: {
      kind: 'childrenProps',
      sorting: [
        'expanded',
        'setExpanded',
        'collapseBehavior',
        'disclosureId',
        'contentPresent',
        'contentRef',
        'contentSize',
      ],
    },
  },
}

console.log("CRAZY", AraraJsAPI)

export { AraraJsAPI }

export default [AraraJsAPI]
