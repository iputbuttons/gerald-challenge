import { DrawerContainer, DrawerHeader } from '@/shared/components/drawer'
import { Providers } from '@/shared/providers/providers'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import '../shared/configs/tailwind.css'

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style='auto' />
      <DrawerContainer>
        <Stack
          screenOptions={{
            animation: 'none'
          }}
        >
          <Stack.Screen
            name='orders'
            options={{
              header: DrawerHeader,
              headerShown: true,
              title: 'Orders'
            }}
          />
          <Stack.Screen
            name='store'
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </DrawerContainer>
    </Providers>
  )
}
