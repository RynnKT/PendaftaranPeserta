import Link from 'next/link';
import { getPesertaById } from '../../../../lib/api';

export default async function DetailPesertaPage({ params }) {
  const { id } = await params;
  const data = await getPesertaById(id);

  const getJk = (jk) => {
    if (jk === 1 || jk === '1') return 'Laki-laki';
    if (jk === 2 || jk === '2') return 'Perempuan';
    return '-';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Detail Peserta</h2>
          <p className="text-sm text-slate-600">
            Informasi lengkap peserta.
          </p>
        </div>
        <Link
          href="/peserta"
          className="rounded-xl bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200"
        >
          Kembali
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Foto Profile */}
            <div className="flex-shrink-0">
              <div className="h-48 w-48 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-slate-50">
                {data.foto ? (
                  <img
                    src={`http://localhost:3000/uploads/${data.foto}`}
                    alt={data.nama || 'Foto Peserta'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    Tidak ada foto
                  </div>
                )}
              </div>
            </div>

            {/* Detail Info */}
            <div className="flex-1">
              <h3 className="mb-6 text-xl font-semibold text-slate-800 border-b pb-4">
                Informasi Pribadi
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-slate-500">ID Peserta</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Nama Lengkap</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.nama || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Tempat, Tanggal Lahir</dt>
                  <dd className="mt-1 text-base text-slate-900">
                    {data.tempatlahir || '-'}, {formatDate(data.tanggallahir)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Jenis Kelamin</dt>
                  <dd className="mt-1 text-base text-slate-900">{getJk(data.jk)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Agama</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.agama || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Telepon</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.telepone || '-'}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-slate-500">Hobi</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.hobi || '-'}</dd>
                </div>
                
                <h3 className="sm:col-span-2 mt-4 mb-2 text-xl font-semibold text-slate-800 border-b pb-4">
                  Informasi Alamat
                </h3>
                
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-slate-500">Alamat Lengkap</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.alamat || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Kabupaten/Kota</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.nama_kabko || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">Provinsi</dt>
                  <dd className="mt-1 text-base text-slate-900">{data.nama_provinsi || '-'}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
          <div className="flex justify-end gap-3">
            <Link
              href={`/peserta/edit/${data.id}`}
              className="rounded-xl bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600 shadow-sm"
            >
              Edit Data
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
