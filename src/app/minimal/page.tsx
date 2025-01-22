import { Header } from '@/components/header/Header'
import { ProseMirrorEditorMinimal } from '@/components/prosemirror/minimal/ProseMirrorEditorMinimal'
import './pm.css'
import PageLinkNavigator from '@/components/link/PageLinkNavigator'

export default function Minimal() {
  const pages = [
    { name: 'Suggest Box', href: '/' },
    { name: 'Telegram', href: '/telegram' },
    { name: 'Minimal', href: '/minimal' },
  ]
  return (
    <main className={'blog-container'} id={'telegram'}>
      <Header />
      <h3>ProseMirror demonstration: minimal editor</h3>
      <section className={'mt-2'}>
        <PageLinkNavigator pages={pages} />
      </section>
      <section className={'mt-6'}>
        <div>This is the minimal editor: Free typing, no feature</div>
      </section>
      <section className={'mt-6'}>
        <ProseMirrorEditorMinimal />
      </section>
    </main>
  )
}
