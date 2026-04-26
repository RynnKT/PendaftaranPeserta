const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProvinsi() {
  const res = await fetch(`${API_URL}/provinsi`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil provinsi');
  return res.json();
}

export async function getKabkoByProvinsi(idProvinsi) {
  const res = await fetch(`${API_URL}/kabko/provinsi/${idProvinsi}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Gagal mengambil kabko');
  return res.json();
}

export async function getPeserta() {
  const res = await fetch(`${API_URL}/peserta`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil peserta');
  return res.json();
}

export async function getPesertaById(id) {
  const res = await fetch(`${API_URL}/peserta/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil detail peserta');
  return res.json();
}

export async function createPeserta(data) {
  const isFormData = data instanceof FormData;
  const res = await fetch(`${API_URL}/peserta`, {
    method: 'POST',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal menambah peserta');
  }
  return res.json();
}

export async function updatePeserta(id, data) {
  const isFormData = data instanceof FormData;
  const res = await fetch(`${API_URL}/peserta/${id}`, {
    method: 'PUT',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal mengubah peserta');
  }
  return res.json();
}

export async function deletePeserta(id) {
  const res = await fetch(`${API_URL}/peserta/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Gagal menghapus peserta');
  return res.json();
}