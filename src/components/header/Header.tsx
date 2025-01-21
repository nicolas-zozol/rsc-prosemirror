import './header.scss'
import { SimpleLink } from '@/components/link/SimpleLink'

export const Header: React.FC = () => {
  return (
    <header className={'rsc-header'}>
      <nav className={'blog-container'}>
        <span className={'mr-20'}>
          <SimpleLink href="/">Home</SimpleLink>
        </span>

        <div className={'start'}>
          <span>
            <SimpleLink>CLEAN CODE</SimpleLink>
          </span>
          <span>
            <SimpleLink>WEB</SimpleLink>
          </span>
          <span>
            <SimpleLink>BLOCKCHAIN</SimpleLink>
          </span>
        </div>
        <div className={'end'}>
          <span>
            <SimpleLink href="/">BLOG</SimpleLink>
          </span>
        </div>
      </nav>

      <span className={'logo'}>
        <div>Robusta Build</div>
        <div className={'emojis'}>💪🏗</div>
      </span>
    </header>
  )
}
