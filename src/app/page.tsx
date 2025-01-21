import { Header } from '@/components/header/Header'

export default function Home() {
  return (
    <main className={'blog-container'}>
      <Header />
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h3>Robusta Build: simple ProseMirror demonstration</h3>
      </section>
      <section>
        <div>HOME</div>
        <div>lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </section>
    </main>
  )
}
