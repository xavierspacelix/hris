import Link from 'next/link';

const navigation = [
  ['Dashboard', '/dashboard'],
  ['People', '/people'],
  ['Settings', '/settings'],
  ['Audit log', '/settings/audit'],
] as const;

export default function TenantLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="shell"><aside className="sidebar"><Link className="brand" href="/dashboard">HR<span>IS</span></Link><nav className="nav">{navigation.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></aside><div className="main"><header className="topbar"><div className="tenant">PT Nusantara<small>Ruang kerja organisasi</small></div><select className="branch" aria-label="Pilih cabang"><option>Semua cabang</option><option>Jakarta</option><option>Surabaya</option></select></header><main className="content">{children}</main></div></div>;
}
