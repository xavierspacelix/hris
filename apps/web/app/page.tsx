import Link from 'next/link';

export default function Home() {
  return (
    <main className="onboarding">
      <section className="card">
        <h1>Siapkan ruang kerja HRIS</h1>
        <p>Mulai dengan organisasi, cabang pertama, dan admin HR.</p>
        <div className="steps"><strong>1. Organisasi</strong><span>2. Cabang</span><span>3. Admin</span></div>
        <form>
          <div className="field"><label htmlFor="organization">Nama organisasi</label><input id="organization" defaultValue="PT Nusantara" /></div>
          <div className="field"><label htmlFor="slug">Subdomain</label><input id="slug" defaultValue="nusantara" /></div>
          <div className="field"><label htmlFor="timezone">Zona waktu</label><select id="timezone" defaultValue="Asia/Jakarta"><option>Asia/Jakarta</option></select></div>
          <Link className="button" href="/dashboard">Lanjutkan ke cabang</Link>
        </form>
      </section>
    </main>
  );
}
