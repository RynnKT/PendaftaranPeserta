'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProvinsi } from '../../../../lib/api';

export default function TambahProvinsiPage() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim()) return alert('Nama provinsi tidak boleh kosong');
    setLoading(true);
    try {
      await createProvinsi(nama.trim());
      alert('Provinsi berhasil ditambahkan');
      router.push('/peserta/provinsi');
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
        <h2 className="text-2xl font-bold text-slate-900">Tambah Provinsi</h2>
        <p className="text-sm text-slate-600">Tambahkan data provinsi baru.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nama Provinsi
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Jawa Barat"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
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
