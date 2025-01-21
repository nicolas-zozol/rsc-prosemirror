import { Header } from '@/components/header/Header'
import { ProseMirrorEditorAutocomplete } from '@/components/prosemirror/autocomplete/ProseMirrorEditorAutocomplete'
import './pm.css'

export default function Home() {
  return (
    <main className={'blog-container'}>
      <Header />
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3>Robusta Build: simple ProseMirror demonstration</h3>

        <p>Use `@` to select a User</p>
        <p>Use `#` to select or create a Hashtag</p>
        <p>Type `&lt; &gt;` to select or create an IdeaFlow</p>
      </section>
      <section>
        <ProseMirrorEditorAutocomplete />
      </section>
    </main>
  )
}
