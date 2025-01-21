import { Header } from '@/components/header/Header'
import './pm.css'
import { ProseMirrorEditorTelegram } from '@/components/prosemirror/telegram/ProseMirrorEditorTelegram'

export default function Telegram() {
  return (
    <main className={'blog-container'}>
      <Header />
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3>Robusta Build: telegram ProseMirror demonstration</h3>
      </section>
      <section>
        <div>
          Enter once ENTER to STOP between sentence. Enter twice ENTER to END
          the telegram.
        </div>
      </section>
      <section>
        <ProseMirrorEditorTelegram />
      </section>
    </main>
  )
}
