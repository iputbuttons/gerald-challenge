import { Button } from '@/shared/components/button'
import { Screen } from '@/shared/components/screen'
import { useRouter } from 'expo-router'
import { Text } from 'react-native'

export default function HomeScreen() {
  const { push } = useRouter()

  const goToDetails = () => {
    push('/store/home/details')
  }

  return (
    <Screen>
      <Text className='font-satoshi-regular text-lg'>
        This is the home screen
      </Text>
      <Button onPress={goToDetails}>Go to details screen</Button>
    </Screen>
  )
}
