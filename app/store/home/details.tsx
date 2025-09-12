import { Button } from '@/shared/components/button'
import { Screen } from '@/shared/components/screen'
import { useRouter } from 'expo-router'
import { Text } from 'react-native'

export default function DetailsScreen() {
  const { push } = useRouter()

  const goToHome = () => {
    push('/store/home')
  }

  return (
    <Screen>
      <Text className='font-satoshi-regular text-lg'>
        This is the details screen
      </Text>
      <Button onPress={goToHome}>Go to home screen</Button>
    </Screen>
  )
}
