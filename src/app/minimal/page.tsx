import { Header } from '@/components/header/Header'
import { ReactElement } from 'react'
import EmptyLayout from '@/components/layout/EmptyLayout'

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
    </main>
  )
}
Minimal.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>
}
