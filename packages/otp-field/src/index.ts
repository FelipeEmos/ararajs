import {
  type OtpFieldContextValue as ContextValue,
  useOtpFieldContext as useContext,
} from '@src/context'
import Input, {
  type OtpFieldInputAraraProps as InputAraraProps,
  type OtpFieldInputElementProps as InputElementProps,
  type OtpFieldInputProps as InputProps,
  type OtpFieldInputSharedElementProps as InputSharedElementProps,
} from '@src/Input'
import Root, {
  type OtpFieldRootChildrenProps as RootChildrenProps,
  type OtpFieldRootAraraProps as RootAraraProps,
  type OtpFieldRootElementProps as RootElementProps,
  type OtpFieldRootProps as RootProps,
  type OtpFieldRootSharedElementProps as RootSharedElementProps,
} from '@src/Root'
import type { DynamicProps } from '@arara/utils/dynamic'

export type {
  RootAraraProps,
  RootSharedElementProps,
  RootElementProps,
  RootProps,
  RootChildrenProps,
  InputAraraProps,
  InputSharedElementProps,
  InputElementProps,
  InputProps,
  ContextValue,
  DynamicProps,
}

export { Root, Input, useContext }

const OtpField = Object.assign(Root, {
  Input,
  useContext,
})

export default OtpField
