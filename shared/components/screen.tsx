import { ReactNode } from 'react'
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface ScreenProps {
  children: ReactNode
  className?: string
}

export const Screen = ({ children, className }: ScreenProps) => {
  return (
    <View className={twMerge('flex-1 gap-4 p-3 bg-white', className)}>
      {children}
    </View>
  )
}
