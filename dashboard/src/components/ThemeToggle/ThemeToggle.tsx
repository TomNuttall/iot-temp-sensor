import { useEffect } from 'react'
import '@theme-toggles/react/css/Within.css'
import { Within } from '@theme-toggles/react'

const ThemeToggle: React.FC = () => {
  useEffect(() => {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    onToggle(colorScheme.matches)

    colorScheme.addEventListener('change', onChange)
    return () => colorScheme.removeEventListener('change', onChange)
  }, [])

  const onChange = (e: { matches: boolean }) => {
    onToggle(e.matches)
  }

  const onToggle = (toggled: boolean) => {
    document.documentElement.setAttribute(
      'color-scheme',
      toggled ? 'dark' : 'light',
    )
  }

  return <Within duration={750} onToggle={onToggle} placeholder={undefined} />
}

export default ThemeToggle
