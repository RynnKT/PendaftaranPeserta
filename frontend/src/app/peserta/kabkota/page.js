import { getAllKabko } from '../../../lib/api';
import KabkotaTable from '../../../components/KabkotaTable';
import Link from 'next/link';

export default async function KabkotaPage() {
  const data = await getAllKabko();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Data Kabupaten / Kota</h2>
          <p className="text-sm text-slate-600">Kelola data kabupaten dan kota yang tersedia.</p>
        </div>
        <Link
          href="/peserta/kabkota/tambah"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Tambah Kabupaten/Kota
        </Link>
      </div>
      <KabkotaTable data={data} />
    </section>
  );
}
