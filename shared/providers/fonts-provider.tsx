import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { PropsWithChildren, useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

export const FontProvider = ({ children }: PropsWithChildren) => {
  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
    'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.otf'),
    'Satoshi-Regular': require('../assets/fonts/Satoshi-Regular.otf')
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return children
}
