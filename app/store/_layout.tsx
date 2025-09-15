import { DrawerHeader } from '@/shared/components/drawer'
import { useTheme } from '@/shared/hooks/useTheme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.black,
          fontFamily: 'Satoshi-Bold',
          fontSize: 18
        },
        header: DrawerHeader,
        tabBarActiveTintColor: colors.red[400],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarLabelStyle: {
          fontFamily: 'Satoshi-Medium',
          fontSize: 14
        },
        tabBarStyle: {
          borderTopColor: colors.gray[300]
        }
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: (props) => (
            <Ionicons
              name={props.focused ? 'home' : 'home-outline'}
              {...props}
            />
          )
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          title: 'Cart',
          tabBarIcon: (props) => (
            <Ionicons
              name={props.focused ? 'cart' : 'cart-outline'}
              {...props}
            />
          )
        }}
      />
      <Tabs.Screen
        name='favourites'
        options={{
          title: 'Favourites',
          tabBarIcon: (props) => (
            <Ionicons
              name={props.focused ? 'heart' : 'heart-outline'}
              {...props}
            />
          )
        }}
      />
    </Tabs>
  )
}
