import { Header } from '@/components/header/Header'
import { ProseMirrorEditorMinimal } from '@/components/prosemirror/minimal/ProseMirrorEditorMinimal'
import './pm.css'

export default function Minimal() {
  return (
    <main className={'blog-container'}>
      <Header />
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3>Robusta Build: minimal ProseMirror demonstration</h3>
      </section>
      <section>
        <div>This is the minimal editor</div>
      </section>
      <section>
        <ProseMirrorEditorMinimal />
      </section>
    </main>
  )
}
