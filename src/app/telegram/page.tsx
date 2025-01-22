import { Header } from '@/components/header/Header'
import './pm.css'
import { ProseMirrorEditorTelegram } from '@/components/prosemirror/telegram/ProseMirrorEditorTelegram'
import PageLinkNavigator from '@/components/link/PageLinkNavigator'
import '../home-page.scss'

export default function Telegram() {
  const pages = [
    { name: 'Suggest Box', href: '/' },
    { name: 'Telegram', href: '/telegram' },
    { name: 'Minimal', href: '/minimal' },
  ]
  return (
    <main className={'blog-container'} id={'telegram'}>
      <Header />
      <h3>ProseMirror demonstration: telegram</h3>
      <section className={'mt-2'}>
        <PageLinkNavigator pages={pages} />
      </section>
      <section className={'mt-6'}>
        <div className={'editor-telegram'}>
          Enter once <code>ENTER</code> to <span className={'stop'}>STOP</span>{' '}
          between sentence. Enter twice <code>ENTER</code> to{' '}
          <span className={'end'}> END</span>
          the telegram.
        </div>
      </section>
      <section className={'mt-6'}>
        <ProseMirrorEditorTelegram />
      </section>
    </main>
  )
}
