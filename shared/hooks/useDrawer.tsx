import { useContext } from 'react'
import { DrawerContext } from '../providers/drawer-provider'

export const useDrawer = () => {
  const drawer = useContext(DrawerContext)

  if (!drawer) {
    throw new Error('useDrawer must be used within DrawerProvider')
  }

  return drawer
}
