import { Header } from '@/components/header/Header'
import { ProseMirrorEditorAutocomplete } from '@/components/prosemirror/autocomplete/ProseMirrorEditorAutocomplete'
import './pm.css'
import './home-page.scss'
import PageLinkNavigator from '@/components/link/PageLinkNavigator'

export default function Home() {
  const pages = [
    { name: 'Suggest Box', href: '/' },
    { name: 'Telegram', href: '/telegram' },
    { name: 'Minimal', href: '/minimal' },
  ]

  return (
    <main className={'blog-container'} id={'homepage'}>
      <Header />
      <h3>ProseMirror demonstration: IdeaFlow & Suggest Box</h3>
      <section className={'mt-2'}>
        <PageLinkNavigator pages={pages} />
      </section>
      <section className={'mt-6'}>
        <p>
          Type <code>@</code> to select a{' '}
          <span className={'mention'}>@User</span> : unmatched user will close
          the box
        </p>
        <p>
          Type <code>#</code> to select or create a{' '}
          <span className={'hashtag'}>#Hashtag</span> : <code>SPACE</code> will
          select the hashtag
        </p>
        <p>
          Type <code>&lt;&gt;</code> to select or create an{' '}
          <span className={'flow'}>&lt;&gt;IdeaFlow</span> : free flow text
        </p>
        <p>
          Then, type <code>ENTER</code> or <code>TAB</code> to select your
          choice, <code>ESCAPE</code> to cancel it.
        </p>
      </section>
      <section className={'mt-6'}>
        <ProseMirrorEditorAutocomplete />
      </section>
    </main>
  )
}
