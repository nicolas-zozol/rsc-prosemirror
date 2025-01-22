import './header.scss'
import { SimpleLink } from '@/components/link/SimpleLink'

export const Header: React.FC = () => {
  return (
    <header className={'rsc-header'}>
      <nav className={'blog-container'}>
        <span className={'mr-20'}>
          <SimpleLink href="https://www.robusta.build">Home</SimpleLink>
        </span>

        <div className={'start'}>
          <span>CLEAN CODE</span>
          <span>WEB</span>
          <span>BLOCKCHAIN</span>
        </div>
        <div className={'end'}>
          <span>
            <SimpleLink href="https://www.robusta.build/blog">Blog</SimpleLink>
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
