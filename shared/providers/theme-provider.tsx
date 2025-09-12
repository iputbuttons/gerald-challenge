import { PropsWithChildren, createContext } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../tailwind.config'

const { theme } = resolveConfig(tailwindConfig as any)

export const ThemeContext = createContext(theme)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
