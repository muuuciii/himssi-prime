# HIMSSI Prime - Athlete Management System 🥋🏅
**Sistem Terpadu Monitoring & Evaluasi Atlet Pelatda Pencak Silat - HIMSSI SUMSEL**

Aplikasi manajemen dan evaluasi kesiapan fisik, teknik, taktik, dan dokumen atlet untuk persiapan **Kejuaraan Nasional Silat Piala KONI Jakarta 2026**.

---

## 🚀 Panduan Upload ke GitHub & Publikasi ke Vercel

### Langkah 1: Buat Repository di GitHub
1. Buka [github.com](https://github.com) dan login ke akun Anda.
2. Klik tombol **New** (Buat Repository Baru).
3. Beri nama repositori, contoh: `himssi-prime` atau `satria-x-pelatda`.
4. Pilih **Public** (atau Private sesuai preferensi Anda).
5. Jangan centang "Add a README file" (karena file proyek sudah lengkap).
6. Klik **Create repository**.

---

### Langkah 2: Hubungkan & Push ke GitHub
Di terminal atau Git Bash pada laptop Anda, jalankan perintah berikut (ganti `<username-anda>` dan `<repo-anda>` dengan link GitHub Anda):

```bash
# Tambahkan remote repository GitHub Anda
git remote add origin https://github.com/<username-anda>/<repo-anda>.git

# Pastikan berada di branch main
git branch -M main

# Kirim (push) seluruh kode ke GitHub
git push -u origin main
```

---

### Langkah 3: Publikasi Otomatis di Vercel App
1. Buka [vercel.com](https://vercel.com) dan login (disarankan pilih **Continue with GitHub**).
2. Di Dashboard Vercel, klik tombol **Add New...** > **Project**.
3. Cari repository **`himssi-prime`** yang baru saja Anda push ke GitHub, lalu klik **Import**.
4. Pengaturan build di Vercel akan terdeteksi otomatis (file `vercel.json` sudah disediakan):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **Deploy**! 
6. Tunggu sekitar 30–60 detik hingga selesai. Vercel akan memberikan link domain publik gratis (misal: `https://himssi-prime.vercel.app`).

---

## 🛠️ Menjalankan di Lokal (Development)

```bash
# Install dependensi
npm install

# Jalankan server lokal
npm run dev

# Build untuk produksi
npm run build
```

---

## 👥 Hak Akses Akun Resmi (Multi-Role)
- **Owner**: `1111` / `031193` (Mutia Kartika, M.Pd.)
- **Manager**: `2222` / `000000` (Dr. Darmayanti, SE.,MM.)
- **Pelatih**: `4444` / `123456` (Miko Paldian, S.Pd.,Gr.)
- **Atlet**: `0001` / `123456` (Fathir Athalla)
