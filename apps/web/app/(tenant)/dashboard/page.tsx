export default function DashboardPage() {
  return <><section className="page-header"><div><h1>Dashboard</h1><p>Ringkasan fondasi organisasi dan akses.</p></div></section><div className="grid"><section className="card"><h2>Konfigurasi organisasi</h2><p>Lengkapi pengaturan tenant dan regional sebelum menambah data karyawan.</p><span className="badge">Siap dikonfigurasi</span></section><section className="card"><h2>Kontrol akses</h2><p>Kelola peran anggota dan periksa riwayat perubahan sensitif.</p><span className="badge">Server enforced</span></section></div></>;
}
