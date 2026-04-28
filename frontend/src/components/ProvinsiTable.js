'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteProvinsi, updateProvinsi } from '../lib/api';

export default function ProvinsiTable({ data }) {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [loading, setLoading] = useState(false);

  function startEdit(item) {
    setEditId(item.id);
    setEditNama(item.nama);
  }

  function cancelEdit() {
    setEditId(null);
    setEditNama('');
  }

  async function handleSaveEdit(id) {
    if (!editNama.trim()) return alert('Nama tidak boleh kosong');
    setLoading(true);
    try {
      await updateProvinsi(id, editNama.trim());
      setEditId(null);
      router.refresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm('Yakin ingin menghapus provinsi ini?');
    if (!ok) return;
    try {
      await deleteProvinsi(id);
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-4 py-3 text-left w-16">No</th>
            <th className="px-4 py-3 text-left">Nama Provinsi</th>
            <th className="px-4 py-3 text-left w-40">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id} className="border-t hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
              <td className="px-4 py-3">
                {editId === item.id ? (
                  <input
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:border-slate-500"
                    value={editNama}
                    onChange={(e) => setEditNama(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(item.id)}
                    autoFocus
                  />
                ) : (
                  <span className="font-medium text-slate-800">{item.nama}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  {editId === item.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        disabled={loading}
                        className="rounded-lg bg-green-600 px-3 py-1.5 text-white hover:bg-green-700 disabled:opacity-60"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-lg bg-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-300"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        className="rounded-lg bg-amber-500 px-3 py-1.5 text-white hover:bg-amber-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="3" className="px-4 py-6 text-center text-slate-500">
                Belum ada data provinsi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
