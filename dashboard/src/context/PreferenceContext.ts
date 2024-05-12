import { createContext } from 'react'

export interface IPreferenceContext {
  noAnimate: boolean
  darkTheme: boolean
}

export const PreferenceContext = createContext<IPreferenceContext>({
  noAnimate: false,
  darkTheme: false,
})
