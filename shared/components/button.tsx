import { useTheme } from '@/shared/hooks/useTheme'
import { ReactNode, useEffect } from 'react'
import { ActivityIndicator, Pressable, Text } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export interface ButtonProps {
  children: string
  onPress: () => void
  isLoading?: boolean
  loadingText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = ({
  children,
  onPress,
  isLoading,
  loadingText = 'Loading...',
  leftIcon,
  rightIcon
}: ButtonProps) => {
  const { colors } = useTheme()
  const animationProgress = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationProgress.value,
      [0, 1],
      [colors.red[400], colors.gray[500]]
    )

    return { backgroundColor }
  })

  useEffect(() => {
    animationProgress.value = withTiming(isLoading ? 1 : 0, {
      duration: 300
    })
  }, [isLoading, animationProgress])

  return (
    <AnimatedPressable
      className='bg-red-400 p-4 rounded-full items-center justify-center flex-row gap-2'
      disabled={isLoading}
      onPress={onPress}
      style={animatedStyle}
    >
      {isLoading ? <ActivityIndicator color={colors.white} /> : leftIcon}
      <Text className='font-satoshi-bold text-lg text-white'>
        {isLoading ? loadingText : children}
      </Text>
      {!isLoading && rightIcon}
    </AnimatedPressable>
  )
}
