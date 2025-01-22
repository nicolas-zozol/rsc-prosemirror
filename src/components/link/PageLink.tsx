import Link from 'next/link'

interface PageLinkProps {
  name: string
  href: string
  active: boolean
}

export const PageLink = ({ name, href, active }: PageLinkProps) => {
  return (
    <div>
      {active ? (
        <span className="text-gray-500">{name}</span>
      ) : (
        <Link href={href} className="text-blue-500 hover:text-blue-700">
          {name}
        </Link>
      )}
    </div>
  )
}
