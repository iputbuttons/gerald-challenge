import { PropsWithChildren } from 'react'
import { DrawerProvider } from './drawer-provider'
import { FontProvider } from './fonts-provider'
import { KeyboardAvoidingProvider } from './keyboard-avoid-provider'
import { SafeAreaProvider } from './safe-area-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <FontProvider>
      <ThemeProvider>
        <KeyboardAvoidingProvider>
          <SafeAreaProvider>
            <DrawerProvider>{children}</DrawerProvider>
          </SafeAreaProvider>
        </KeyboardAvoidingProvider>
      </ThemeProvider>
    </FontProvider>
  )
}
