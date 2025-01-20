import Link from 'next/link'
import './header.scss'
import './layout.scss'
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
          <span>
            <SimpleLink>SOLIDITY</SimpleLink>
          </span>

          <span>
            <SimpleLink>ETHERS.js</SimpleLink>
          </span>
        </div>
        <div className={'end'}>
          <span>
            <SimpleLink href="/blog">BLOG</SimpleLink>
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
