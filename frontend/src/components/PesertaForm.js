'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createPeserta,
  updatePeserta,
  getProvinsi,
  getKabkoByProvinsi,
} from '../lib/api';

export default function PesertaForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: '',
    tempatlahir: '',
    tanggallahir: '',
    agama: '',
    alamat: '',
    telepone: '',
    jk: '',
    hobi: '',
    foto: '',
    idkabko: '',
  });

  const [provinsi, setProvinsi] = useState([]);
  const [kabko, setKabko] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState('');
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  useEffect(() => {
    async function loadProvinsi() {
      try {
        const data = await getProvinsi();
        setProvinsi(data);
      } catch (error) {
        alert(error.message);
      }
    }
    loadProvinsi();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        nama: initialData.nama || '',
        tempatlahir: initialData.tempatlahir || '',
        tanggallahir: initialData.tanggallahir
          ? initialData.tanggallahir.substring(0, 10)
          : '',
        agama: initialData.agama || '',
        alamat: initialData.alamat || '',
        telepone: initialData.telepone || '',
        jk: initialData.jk === 1 ? 'L' : initialData.jk === 2 ? 'P' : (initialData.jk || ''),
        hobi: initialData.hobi || '',
        foto: initialData.foto || '',
        idkabko: initialData.idkabko || '',
      });
      if (initialData.foto) {
        setFotoPreview(initialData.foto);
      }
    }
  }, [initialData]);

  async function handleProvinsiChange(e) {
    const idProvinsi = e.target.value;
    setSelectedProvinsi(idProvinsi);
    setForm((prev) => ({ ...prev, idkabko: '' }));

    if (!idProvinsi) {
      setKabko([]);
      return;
    }

    try {
      const data = await getKabkoByProvinsi(idProvinsi);
      setKabko(data);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setFotoFile(null);
      setFotoPreview(initialData?.foto || null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar (JPG, PNG, dll)');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB');
      e.target.value = '';
      return;
    }

    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key !== 'foto') {
          formData.append(key, form[key]);
        }
      });
      
      if (fotoFile) {
        formData.append('foto', fotoFile);
      }

      if (isEdit && initialData?.id) {
        await updatePeserta(initialData.id, formData);
        alert('Data berhasil diubah');
      } else {
        await createPeserta(formData);
        alert('Data berhasil ditambahkan');
      }

      router.push('/peserta');
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500';
  const labelClass = 'mb-1 block text-sm font-medium text-slate-700';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Nama</label>
          <input className={inputClass} type="text" name="nama" value={form.nama} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Tempat Lahir</label>
          <input className={inputClass} type="text" name="tempatlahir" value={form.tempatlahir} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Tanggal Lahir</label>
          <input className={inputClass} type="date" name="tanggallahir" value={form.tanggallahir} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Agama</label>
          <select className={inputClass} name="agama" value={form.agama} onChange={handleChange}>
          <option value="">-- Pilih --</option>
          <option value="Islam">Islam</option>
          <option value="Kristen">Kristen</option>
          <option value="Hindu">Hindu</option>
          <option value="Buddha">Buddha</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Alamat</label>
          <textarea className={inputClass} name="alamat" value={form.alamat} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Telepone</label>
          <input className={inputClass} type="text" name="telepone" value={form.telepone} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Jenis Kelamin</label>
          <select className={inputClass} name="jk" value={form.jk} onChange={handleChange}>
            <option value="">-- Pilih --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Hobi</label>
          <input className={inputClass} type="text" name="hobi" value={form.hobi} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Foto</label>
          <input
            className={inputClass}
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
          />
          {fotoPreview && (
            <div className="mt-3">
              <span className="text-xs text-slate-500 block mb-1">Preview:</span>
              <img 
                src={fotoPreview.startsWith('blob:') || fotoPreview.startsWith('http') ? fotoPreview : `http://localhost:5000/uploads/${fotoPreview}`} 
                alt="Preview Foto" 
                className="h-32 w-32 object-cover rounded-xl border border-slate-200" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        <div>
          <label className={labelClass}>Provinsi</label>
          <select className={inputClass} value={selectedProvinsi} onChange={handleProvinsiChange}>
            <option value="">-- Pilih Provinsi --</option>
            {provinsi.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Kabko</label>
          <select className={inputClass} name="idkabko" value={form.idkabko} onChange={handleChange}>
            <option value="">-- Pilih Kabko --</option>
            {kabko.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-700"
      >
        {isEdit ? 'Update' : 'Simpan'}
      </button>
    </form>
  );
}