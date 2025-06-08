import Link from 'next/link';

export default function MenuDemo() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/podcast">podcast</Link>
        </li>
        <li>
          <Link href="/reference">reference</Link>
        </li>
        <li>
          <Link href="/kariera">kariera</Link>
        </li>
        <li>
          <Link href="/nas-tym">tym</Link>
        </li>
        <li>
          <Link href="/kontakt">kontakt</Link>
        </li>
        <li>
          <Link href="/sluzby">sluzby</Link>
        </li>
      </ul>
    </nav>
  );
}
