import { PropsWithChildren } from 'react'
import { FontProvider } from './fonts-provider'
import { KeyboardAvoidingProvider } from './keyboard-avoid-provider'
import { SafeAreaProvider } from './safe-area-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <FontProvider>
      <ThemeProvider>
        <KeyboardAvoidingProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </KeyboardAvoidingProvider>
      </ThemeProvider>
    </FontProvider>
  )
}
