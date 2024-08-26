import ThemeToggle from '../ThemeToggle'
import GitHubLogo from '../../assets'
import './Header.scss'

interface HeaderProps {
  title: string
  repo: string
}

const Header: React.FC<HeaderProps> = ({ title, repo }) => {
  return (
    <header className="header">
      <div className="header__title">{title}</div>
      <div className="header__links">
        <ThemeToggle />
        <a href={repo}>
          <GitHubLogo title="GitHub Project" />
        </a>
      </div>
    </header>
  )
}

export default Header
