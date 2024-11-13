import type { ApiReference } from '@lib/typedoc/types/apiReferences'
import type { Library } from '@lib/typedoc/types/specifications'
import resolveChildrenProps from '@lib/typedoc/resolve/resolveChildrenProps'
import resolveComponent from '@lib/typedoc/resolve/resolveComponent'
import resolveContext from '@lib/typedoc/resolve/resolveContext'
import resolveFunction from '@lib/typedoc/resolve/resolveFunction'
import resolveInheritedComponent from '@lib/typedoc/resolve/resolveInheritedComponent'
import resolveInheritedContext from '@lib/typedoc/resolve/resolveInheritedContext'
import resolveSimple from '@lib/typedoc/resolve/resolveSimple'

const resolveLibrary = (library: Library): ApiReference[] => {
  const apiReferences: ApiReference[] = []
  // FIXME: this is a temporary fix for the first deploy
  // for (const [name, item] of Object.entries(library.items)) {
  //   switch (item.kind) {
  //     case 'component':
  //       apiReferences.push(resolveComponent(library.api, name, item))
  //       break
  //     case 'inherited-component':
  //       apiReferences.push(resolveInheritedComponent(library.api, name, item))
  //       break
  //     case 'context':
  //       apiReferences.push(resolveContext(library.api, name, item))
  //       break
  //     case 'inherited-context':
  //       apiReferences.push(resolveInheritedContext(library.api, name, item))
  //       break
  //     case 'childrenProps':
  //       apiReferences.push(resolveChildrenProps(library.api, name, item))
  //       break
  //     case 'simple':
  //       apiReferences.push(resolveSimple(library.api, name))
  //       break
  //     case 'function':
  //       apiReferences.push(resolveFunction(library.api, name, item))
  //       break
  //     case 'temporary':
  //       switch (name) {
  //         case 'createPersistent':
  //           apiReferences.push({
  //             name,
  //             kind: 'function',
  //             props: [
  //               {
  //                 name: 'component',
  //                 defaultHtml: null,
  //                 type: '() => JSX.Element',
  //                 descriptionHtml: '',
  //                 isFunction: true,
  //               },
  //             ],
  //             returns: [
  //               {
  //                 name: 'persistedComponent',
  //                 type: 'Accessor<JSX.Element>',
  //                 descriptionHtml: '',
  //                 isFunction: true,
  //               },
  //             ],
  //           })
  //           break
  //       }
  //   }
  // }

  return apiReferences
}

export default resolveLibrary
