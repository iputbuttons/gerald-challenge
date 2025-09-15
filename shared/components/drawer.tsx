import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Link, LinkProps, usePathname } from 'expo-router'
import { PropsWithChildren } from 'react'
import {
  Pressable,
  Text,
  useWindowDimensions,
  View,
  ViewStyle
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDrawer } from '../hooks/useDrawer'
import { useTheme } from '../hooks/useTheme'
import { Logo } from './logo'

type DrawerMenuLinks = {
  label: string
  href: LinkProps['href']
  hrefStartsWith: string
}[]

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const DrawerHeader = (
  props: BottomTabHeaderProps | NativeStackHeaderProps
) => {
  const drawer = useDrawer()
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  return (
    <View
      className='flex-row items-center justify-between bg-white p-4'
      style={{ paddingTop: insets.top }}
    >
      {drawer ? (
        <Ionicons
          name='menu'
          size={24}
          color={colors.black as string}
          onPress={drawer.openDrawer}
        />
      ) : (
        <View />
      )}
      <Text className='font-satoshi-bold text-2xl'>{props.options.title}</Text>
      <View className='w-6' />
    </View>
  )
}

export const DrawerMenu = () => {
  const drawer = useDrawer()
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const links: DrawerMenuLinks = [
    {
      label: 'Store',
      href: '/store/home',
      hrefStartsWith: '/store'
    },
    {
      label: 'Orders',
      href: '/orders',
      hrefStartsWith: '/orders'
    }
  ]

  const isActive = (hrefStartsWith: string) => {
    return pathname.startsWith(hrefStartsWith)
  }

  return (
    <View
      className='flex-1 p-6 bg-blue-950 gap-12'
      style={{ paddingTop: insets.top }}
    >
      <Logo />
      <View className='gap-3'>
        {links.map((link) => {
          return (
            <Link href={link.href} asChild key={link.label}>
              <Pressable
                className={`px-3 py-2 rounded-lg w-[7.5rem] ${isActive(link.hrefStartsWith) ? 'bg-red-200 ' : ''}`}
                onPress={drawer?.closeDrawer}
              >
                <Text
                  className={`font-satoshi-medium text-xl ${isActive(link.hrefStartsWith) ? 'text-red-900' : 'text-white'}`}
                >
                  {link.label}
                </Text>
              </Pressable>
            </Link>
          )
        })}
      </View>
    </View>
  )
}

export const DrawerContainer = ({ children }: PropsWithChildren) => {
  const drawer = useDrawer()
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const translateXWidth = width * 0.6
  const insetTopReduced = -insets.top + 12

  const screenStyle = useAnimatedStyle<ViewStyle>(() => ({
    borderRadius: interpolate(drawer?.progress.value, [0, 1], [12, 24]),
    transform: [
      {
        translateY: interpolate(drawer?.progress.value, [0, 1], [0, 64])
      }
    ]
  }))

  const mainStyle = useAnimatedStyle<ViewStyle>(() => ({
    borderRadius: interpolate(drawer?.progress.value, [0, 1], [12, 24]),
    transform: [
      {
        translateX: interpolate(
          drawer?.progress.value,
          [0, 1],
          [0, translateXWidth]
        )
      },
      {
        translateY: interpolate(drawer?.progress.value, [0, 1], [0, 24])
      },
      {
        rotate: `${interpolate(drawer?.progress.value, [0, 1], [0, -0.12])}rad`
      }
    ]
  }))

  const childrenOffsetStyle = useAnimatedStyle<ViewStyle>(() => ({
    marginTop: interpolate(drawer?.progress.value, [0, 1], [0, insetTopReduced])
  }))

  const overlayStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: interpolate(drawer?.progress.value, [0, 1], [0, 1])
  }))

  if (!drawer) return children

  return (
    <Animated.View className='flex-1' style={screenStyle}>
      <View className='absolute left-0 top-0 bottom-0 w-full rounded-tl-3xl overflow-hidden'>
        <DrawerMenu />
      </View>

      <Animated.View className='flex-1 overflow-hidden' style={mainStyle}>
        <Animated.View className='flex-1' style={childrenOffsetStyle}>
          {children}
        </Animated.View>
        <AnimatedPressable
          className='absolute inset-0'
          onPress={drawer.closeDrawer}
          style={overlayStyle}
        />
      </Animated.View>
    </Animated.View>
  )
}
