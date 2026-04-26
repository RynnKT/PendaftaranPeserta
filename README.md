# 📋 Pendaftaran Peserta

Aplikasi berbasis web untuk mengelola proses pendaftaran peserta secara online.
Project ini dibuat untuk mempermudah pengelolaan data peserta secara terstruktur dan efisien.

---

## 🚀 Fitur Utama

* ✏️ Form pendaftaran peserta
* 📊 Menampilkan data peserta
* 🔍 Detail peserta
* 🛠️ Edit data
* ❌ Hapus data
* 📁 Penyimpanan ke database

---

## 🧱 Teknologi yang Digunakan

* Frontend: CSS, JavaScript
* Backend: Node.js 
* Database: PostgreSQL
* Tools: Git, GitHub

---

## ⚙️ Cara Menjalankan Project

1. Clone repository:

```bash
git clone https://github.com/RynnKT/PendaftaranPeserta.git
```

2. Masuk ke folder project:

```bash
cd PendaftaranPeserta
```

3. Install dependencies:

```bash
npm install
```

4. Jalankan server:

```bash
npm start
```

5. Buka di browser:

```
http://localhost:3000
```

---

## 🗄️ Struktur Database

### Tabel: peserta

| Field        | Tipe Data | Keterangan               |
| ------------ | --------- | ------------------------ |
| id           | INT       | Primary key              |
| nama         | VARCHAR   | Nama peserta             |
| tempatlahir  | VARCHAR   | Tempat lahir             |
| tanggallahir | DATE      | Tanggal lahir            |
| agama        | VARCHAR   | Agama peserta            |
| alamat       | TEXT      | Alamat                   |
| telepone     | VARCHAR   | Nomor telepon            |
| jk           | INT       | Jenis kelamin (1=L, 2=P) |
| hobi         | VARCHAR   | Hobi                     |
| foto         | VARCHAR   | Nama file foto           |
| idkabko      | INT       | Relasi ke kabupaten/kota |

---

### Relasi

* `idkabko` → mengacu ke tabel **kabko**
* Data kabupaten/kota terhubung dengan **provinsi**

---

### Contoh Response API

```json
{
  "id": 18,
  "nama": "eca",
  "tempatlahir": "Malang",
  "tanggallahir": "2026-04-23",
  "agama": "Kristen",
  "alamat": "Malang",
  "telepone": "03107935702",
  "jk": 2,
  "hobi": "Tidur",
  "foto": "foto-xxxx.png",
  "nama_kabko": "Malang",
  "nama_provinsi": "Jawa Timur"
}
```

## 📌 Tujuan Project

Project ini dibuat untuk:

* Tugas kuliah
* Latihan CRUD
* Implementasi REST API & database

---
