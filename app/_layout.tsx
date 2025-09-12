import { Providers } from '@/shared/providers/providers'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import '../shared/configs/tailwind.css'

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style='auto' />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </Providers>
  )
}
