import { PropsWithChildren } from 'react'
import { SafeAreaProvider as SafeAreaProviderBase } from 'react-native-safe-area-context'

export const SafeAreaProvider = ({ children }: PropsWithChildren) => {
  return <SafeAreaProviderBase>{children}</SafeAreaProviderBase>
}
