import './Header.scss'

interface HeaderProps {
  title: string
  repo: string
}

const Header: React.FC<HeaderProps> = ({ title, repo }) => {
  return (
    <div className="header">
      <div className="header__title">{title}</div>
      <a href={repo}>GitHub</a>
    </div>
  )
}

export default Header
