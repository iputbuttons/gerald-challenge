import { PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

export const KeyboardAvoidingProvider = ({ children }: PropsWithChildren) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={{ flex: 1 }}
  >
    {children}
  </KeyboardAvoidingView>
)
