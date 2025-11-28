# 🎉 Fitur Baru: Data Pasien OBGYN

## ✨ Yang Baru Ditambahkan:

### 1. **Table Database Baru: `patients`**
   - Menyimpan data lengkap pasien untuk setiap protokol
   - Field: Nama, Faskes, Pekerjaan, Status Pernikahan, Alamat, Tindakan, GPA, dll.
   - Relasi dengan `protocols` table via `protocol_code`

### 2. **Form Input Data Pasien di Scanner**
   - **Wajib**: Nama Pasien
   - **Opsional**: 
     - Nama Faskes
     - Pekerjaan & Status Pekerjaan
     - Status Pernikahan (dropdown)
     - Alamat Lengkap
     - Provinsi & Kabupaten (dropdown cascade)
     - Tindakan Medis
     - GPA (Gravida, Para, Abortus)
     - Tenaga Kesehatan (RS/Bidan/Klinik/dll)

### 3. **Data Provinsi & Kabupaten Indonesia**
   - 34 Provinsi
   - 500+ Kabupaten/Kota
   - Dropdown cascade (pilih provinsi → muncul kabupaten)

### 4. **API Endpoint Updated**
   - `/api/confirm-usage/:code` sekarang menerima data pasien lengkap
   - Otomatis simpan ke table `patients`
   - Upsert: update jika sudah ada, insert jika baru

---

## 🚀 Cara Menjalankan

### Step 1: Jalankan Migration
Buka terminal di folder project, lalu jalankan:

```bash
node migrate-add-patients-table.js
```

Output yang diharapkan:
```
🔧 Starting migration: Add patients table
📂 Database path: D:\...\data.db
✅ Connected to database
📋 Creating patients table...
✅ Patients table created successfully
📊 Creating indexes...
✅ Created index: idx_patients_protocol_code
✅ Created index: idx_patients_provinsi
✅ Created index: idx_patients_kabupaten
✅ Created index: idx_patients_faskes
✅ Migration completed successfully!
```

### Step 2: Jalankan Server

```bash
npm start
```

### Step 3: Test Fitur

1. **Login** ke aplikasi
2. Buka halaman **Scanner**: `/scanner`
3. **Scan QR Code** atau **Input Manual** kode protokol
4. Setelah kode valid, akan muncul **Form Data Pasien**
5. **Isi minimal Nama Pasien** (wajib), field lain opsional
6. Klik **"Tandai Sebagai Terpakai"** atau **"Tandai Sebagai Terkirim"**
7. Data akan tersimpan di database

---

## 📊 Struktur Database

### Table: `patients`

```sql
CREATE TABLE patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  protocol_code TEXT UNIQUE NOT NULL,  -- Link ke protocols.code
  patient_name TEXT NOT NULL,           -- Wajib
  faskes_name TEXT,
  pekerjaan TEXT,
  status_pekerjaan TEXT,
  status_pernikahan TEXT,              -- MENIKAH, BELUM MENIKAH, CERAI, DUDA/JANDA
  alamat TEXT,
  tindakan TEXT,
  gpa_gravida INTEGER,                 -- G dalam GPA
  gpa_para INTEGER,                    -- P dalam GPA
  gpa_abortus INTEGER,                 -- A dalam GPA
  tenaga_kesehatan TEXT,               -- RS, BIDAN, KLINIK, PUSKESMAS, LAINNYA
  provinsi TEXT,
  kabupaten TEXT,
  created_at TEXT,
  updated_at TEXT,
  created_by INTEGER,
  FOREIGN KEY (protocol_code) REFERENCES protocols(code),
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

---

## 🧪 Test Scenarios

### Scenario 1: Scan dengan Data Minimal
1. Scan QR
2. Isi **Nama Pasien**: "Ibu Siti"
3. Klik "Tandai Sebagai Terpakai"
4. ✅ Harus berhasil

### Scenario 2: Scan dengan Data Lengkap
1. Scan QR
2. Isi semua field:
   - Nama: "Ibu Aminah"
   - Faskes: "RS Budi Asih"
   - Pekerjaan: "IRT"
   - Status Pernikahan: "Menikah"
   - Alamat: "Jl. Mawar No. 10"
   - Provinsi: "DKI JAKARTA"
   - Kabupaten: "JAKARTA SELATAN"
   - Tindakan: "Pemeriksaan Kehamilan"
   - GPA: G=2, P=1, A=0
   - Tenaga Kesehatan: "BIDAN"
3. Klik "Tandai Sebagai Terpakai"
4. ✅ Semua data harus tersimpan

### Scenario 3: Update Data Pasien
1. Scan kode yang sama lagi
2. Ganti nama pasien
3. Submit
4. ✅ Data harus ter-update (bukan duplicate)

---

## 🎨 UI Theme

Semua sudah menggunakan tema **Pink-Ungu OBGYN**:
- Primary: `#E91E63` (Pink)
- Secondary: `#9C27B0` (Purple)
- Accent: `#F8BBD0` (Light Pink)
- Background: `#FCE4EC` (Soft Pink)

---

## 📱 Mobile Responsive

Form sudah **fully responsive**:
- ✅ Touch-friendly (min 48px button height)
- ✅ No zoom on input focus (font-size: 16px)
- ✅ Smooth animations
- ✅ Dropdown cascade works on mobile

---

## 🔧 Troubleshooting

### Error: "Table patients already exists"
**Solusi**: Aman, migration script sudah handle ini. Skip saja.

### Error: "Nama pasien harus diisi"
**Solusi**: Pastikan field "Nama Lengkap Pasien" terisi sebelum submit.

### Dropdown Kabupaten tidak muncul
**Solusi**: 
1. Pastikan file `indonesia-regions.json` ada di folder `/public/`
2. Pilih provinsi dulu, baru kabupaten akan muncul

### Data tidak tersimpan
**Solusi**:
1. Check console browser (F12) untuk error
2. Pastikan migration sudah dijalankan
3. Restart server setelah migration

---

## 🔍 Query Data Pasien

Untuk melihat data pasien yang sudah tersimpan:

```sql
SELECT 
  p.code,
  p.status,
  p.patient_name,
  pt.faskes_name,
  pt.provinsi,
  pt.kabupaten,
  pt.gpa_gravida,
  pt.gpa_para,
  pt.gpa_abortus
FROM protocols p
LEFT JOIN patients pt ON p.code = pt.protocol_code
WHERE p.patient_name IS NOT NULL;
```

---

## 📋 Next Steps (Opsional)

Jika mau lanjut develop:

1. **Dashboard Filter** 
   - Tambah dropdown filter provinsi/kabupaten di dashboard
   - Filter protocols berdasarkan region

2. **Export Data**
   - Export data pasien ke Excel/CSV
   - Include semua field GPA, alamat, dll.

3. **Statistics**
   - Grafik per provinsi
   - Grafik per faskes
   - Grafik per tenaga kesehatan

4. **Validation**
   - Phone number validation
   - Email validation (jika ada field email)
   - GPA logic validation (G ≥ P + A)

---

## 📞 Support

Jika ada masalah:
1. Check terminal untuk error log
2. Check browser console (F12)
3. Check file `error.log` di folder project
4. Pastikan semua dependencies sudah ter-install (`npm install`)

---

**Happy Testing! 🎉**
