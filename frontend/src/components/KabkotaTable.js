'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteKabko, updateKabko, getProvinsi } from '../lib/api';
import { useEffect } from 'react';

export default function KabkotaTable({ data }) {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState('');
  const [editIdProvinsi, setEditIdProvinsi] = useState('');
  const [provinsiList, setProvinsiList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProvinsi()
      .then(setProvinsiList)
      .catch((err) => console.error(err));
  }, []);

  function startEdit(item) {
    setEditId(item.id);
    setEditNama(item.nama);
    setEditIdProvinsi(item.id_provinsi);
  }

  function cancelEdit() {
    setEditId(null);
    setEditNama('');
    setEditIdProvinsi('');
  }

  async function handleSaveEdit(id) {
    if (!editNama.trim()) return alert('Nama tidak boleh kosong');
    if (!editIdProvinsi) return alert('Pilih provinsi terlebih dahulu');
    setLoading(true);
    try {
      await updateKabko(id, { nama: editNama.trim(), id_provinsi: editIdProvinsi });
      setEditId(null);
      router.refresh();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm('Yakin ingin menghapus kabupaten/kota ini?');
    if (!ok) return;
    try {
      await deleteKabko(id);
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
            <th className="px-4 py-3 text-left">Nama Kabupaten/Kota</th>
            <th className="px-4 py-3 text-left">Provinsi</th>
            <th className="px-4 py-3 text-left w-44">Aksi</th>
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
                    autoFocus
                  />
                ) : (
                  <span className="font-medium text-slate-800">{item.nama}</span>
                )}
              </td>
              <td className="px-4 py-3">
                {editId === item.id ? (
                  <select
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:border-slate-500"
                    value={editIdProvinsi}
                    onChange={(e) => setEditIdProvinsi(e.target.value)}
                  >
                    <option value="">-- Pilih Provinsi --</option>
                    {provinsiList.map((p) => (
                      <option key={p.id} value={p.id}>{p.nama}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-slate-600">{item.nama_provinsi || '-'}</span>
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
              <td colSpan="4" className="px-4 py-6 text-center text-slate-500">
                Belum ada data kabupaten/kota.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
