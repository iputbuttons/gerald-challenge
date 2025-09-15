import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState
} from 'react'
import {
  SharedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

export type DrawerContextValue = {
  isOpen: boolean
  progress: SharedValue<number>
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const progress = useSharedValue(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openDrawer = useCallback(() => {
    setIsOpen(true)
    progress.value = withTiming(1, { duration: 280 })
  }, [progress])

  const closeDrawer = useCallback(() => {
    progress.value = withTiming(0, { duration: 280 })
    setIsOpen(false)
  }, [progress])

  const toggleDrawer = useCallback(() => {
    if (isOpen) {
      closeDrawer()
    } else {
      openDrawer(
    }
  }, [isOpen, openDrawer, closeDrawer])

  const value = useMemo<DrawerContextValue>(
    () => ({ isOpen, progress, openDrawer, closeDrawer, toggleDrawer }),
    [isOpen, progress, openDrawer, closeDrawer, toggleDrawer]
  )

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  )
}
