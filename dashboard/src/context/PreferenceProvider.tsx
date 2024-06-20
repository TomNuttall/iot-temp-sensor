import { useEffect, useState } from 'react'
import { PreferenceContext } from './PreferenceContext'

interface IPreferenceProviderProps {
  children: JSX.Element | JSX.Element[]
}

export const PreferenceProvider: React.FC<IPreferenceProviderProps> = ({
  children,
}) => {
  const [noAnimate, setNoAnimate] = useState<boolean>(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [darkTheme, setDarkTheme] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const onThemeToggleChange = (e: CustomEvent<boolean>): void =>
      setDarkTheme(e.detail)

    const onColorSchemeChange = (e: { matches: boolean }): void =>
      setDarkTheme(e.matches)

    const onMotionPreferenceChange = (e: { matches: boolean }): void =>
      setNoAnimate(e.matches)

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    document.addEventListener(
      'toggle-theme',
      onThemeToggleChange as (e: Event) => void,
    )
    colorScheme.addEventListener('change', onColorSchemeChange)
    motionPreference.addEventListener('change', onMotionPreferenceChange)

    return () => {
      document.removeEventListener(
        'toggle-theme',
        onThemeToggleChange as (e: Event) => void,
      )
      colorScheme.removeEventListener('change', onColorSchemeChange)
      motionPreference.removeEventListener('change', onMotionPreferenceChange)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute(
      'color-scheme',
      darkTheme ? 'dark' : 'light',
    )
  }, [darkTheme])

  return (
    <PreferenceContext.Provider value={{ noAnimate, darkTheme }}>
      {children}
    </PreferenceContext.Provider>
  )
}
