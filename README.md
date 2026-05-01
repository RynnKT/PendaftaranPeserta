# 📋 Pendaftaran Peserta

Aplikasi fullstack untuk mengelola proses pendaftaran peserta secara online.
Project ini mencakup **backend API, frontend web, dan mobile app (Expo)** dalam satu repository.

---

## 🚀 Fitur Utama

* ✏️ Form pendaftaran peserta (Web & Mobile)
* 📊 Menampilkan data peserta
* 🔍 Detail peserta
* 🛠️ Edit data peserta
* ❌ Hapus data
* 📷 Upload foto peserta
* 🌐 REST API backend terintegrasi

---

## 🧱 Teknologi yang Digunakan

**Frontend Web**

* HTML, CSS, JavaScript

**Mobile App**

* React Native (Expo)

**Backend**

* Node.js (Express)

**Database**

* PostgreSQL

**Tools**

* Git & GitHub

---

## 📁 Struktur Project

```
PendaftaranPeserta/
├── frontend/          → Web app
├── frontend-mobile/   → Mobile app (Expo)
├── project-api/       → Backend API
└── README.md
```

---

## ⚙️ Cara Menjalankan Project

### 1️⃣ Clone repository

```
git clone https://github.com/RynnKT/PendaftaranPeserta.git
cd PendaftaranPeserta
```

---

### 2️⃣ Jalankan Backend

```
cd project-api
npm install
npm start
```

---

### 3️⃣ Jalankan Frontend Web

```
cd frontend
npm install
npm start
```

---

### 4️⃣ Jalankan Mobile App (Expo)

```
cd frontend-mobile
npm install
npx expo start
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

## 🔗 Contoh Endpoint API

| Method | Endpoint     | Deskripsi        |
| ------ | ------------ | ---------------- |
| GET    | /peserta     | Ambil semua data |
| GET    | /peserta/:id | Detail peserta   |
| POST   | /peserta     | Tambah peserta   |
| PUT    | /peserta/:id | Update peserta   |
| DELETE | /peserta/:id | Hapus peserta    |

---

## 📦 Contoh Response API

```
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

---

## 🎯 Tujuan Project

* Implementasi CRUD dengan REST API
* Integrasi frontend, backend, dan mobile
* Latihan fullstack development
* Tugas kuliah

---

## ⚠️ Catatan

* Pastikan PostgreSQL sudah berjalan
* Konfigurasi database ada di folder `project-api`
* Gunakan `.env` untuk konfigurasi koneksi database

---
