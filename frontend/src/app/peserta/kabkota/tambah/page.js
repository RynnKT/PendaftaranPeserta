'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createKabko, getProvinsi } from '../../../../lib/api';

export default function TambahKabkotaPage() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [idProvinsi, setIdProvinsi] = useState('');
  const [provinsiList, setProvinsiList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProvinsi()
      .then(setProvinsiList)
      .catch((err) => alert(err.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim()) return alert('Nama tidak boleh kosong');
    if (!idProvinsi) return alert('Pilih provinsi terlebih dahulu');
    setLoading(true);
    try {
      await createKabko({ nama: nama.trim(), id_provinsi: idProvinsi });
      alert('Kabupaten/Kota berhasil ditambahkan');
      router.push('/peserta/kabkota');
      router.refresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Tambah Kabupaten / Kota</h2>
        <p className="text-sm text-slate-600">Tambahkan data kabupaten atau kota baru.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nama Kabupaten / Kota
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Kota Bandung"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Provinsi
          </label>
          <select
            value={idProvinsi}
            onChange={(e) => setIdProvinsi(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          >
            <option value="">-- Pilih Provinsi --</option>
            {provinsiList.map((p) => (
              <option key={p.id} value={p.id}>{p.nama}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl bg-slate-100 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-200"
          >
            Kembali
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-700 disabled:opacity-60"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>
    </section>
  );
}
