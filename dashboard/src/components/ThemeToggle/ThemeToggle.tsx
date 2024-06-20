import { useContext } from 'react'
import { DarkModeSwitch, defaultProperties } from 'react-toggle-dark-mode'
import {
  IPreferenceContext,
  PreferenceContext,
} from '../../context/PreferenceContext'

import './ThemeToggle.scss'

const ThemeToggle: React.FC = () => {
  const { noAnimate, darkTheme } =
    useContext<IPreferenceContext>(PreferenceContext)

  const animationProperties = { ...defaultProperties }
  if (noAnimate) {
    animationProperties.springConfig = {
      mass: 0,
      tension: 0,
      friction: 0,
    }
  }

  const onToggle = () => {
    const event = new CustomEvent<boolean>('toggle-theme', {
      detail: !darkTheme,
    })
    document.dispatchEvent(event)
  }

  return (
    <button
      className="theme-toggle"
      aria-label="Toggle theme"
      onClick={onToggle}
    >
      <DarkModeSwitch
        checked={darkTheme}
        onChange={() => undefined}
        animationProperties={animationProperties}
      />
    </button>
  )
}

export default ThemeToggle
