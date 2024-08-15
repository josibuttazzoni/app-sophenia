import Link from 'next/link';

const PAGES = [
  { href: '/', label: 'Context Counter' },
  { href: '/pop-in-hydration', label: 'Hydration Loading Async Counter' },
  { href: '/hydration-loading', label: 'Pop-in Hydration Async Counter' }
];

export function Footer() {
  return (
    <nav className="my-8 flex flex-wrap gap-4">
      {PAGES.map(({ href, label }) => (
        <Link
          key={href}
          className="font-semibold underline transition duration-100 hover:opacity-75"
          href={href}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
