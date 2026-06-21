# Kebangkitan Pariwisata Indonesia

> Dashboard tren kunjungan wisatawan mancanegara (wisman) ke Indonesia 2018–2024, dengan data dari Badan Pusat Statistik (BPS).

🌐 Demo: https://Kelompook-5.vercel.app  ← ganti dengan URL Vercel kelompokmu

## Isi Dashboard

- Chart 1: Line Chart — tren jumlah wisman per tahun (2018–2024)
- Chart 2: Bar Chart — 10 negara asal wisman terbanyak (2024)
- Chart 3: Doughnut Chart — proporsi wisman per pintu masuk utama (2024)
- Fitur interaktif: tooltip saat hover, dropdown filter rentang tahun, dan toggle legend
- Animasi: entrance Chart.js, count-up angka KPI, dan CSS fade-in

## Sumber Data

- Nama dataset: Statistik Kunjungan Wisatawan Mancanegara 2024
- URL sumber: https://www.bps.go.id/en/statistics-table/2/MTgyMSMy/jumlah-kunjungan-wisatawan-mancanegara-ke-indonesia-menurut-kebangsaan.html

> Catatan keakuratan data (semua dari BPS):
> - Tren tahunan 2018–2024: angka resmi BPS.
> - Negara asal (3 besar): resmi BPS 2024 — Malaysia 2,2 jt (16,4%), Australia 1,6 jt (12%),
>   Singapura 1,4 jt (10,1%). Rank 4–10 masih estimasi; konfirmasi di tabel BPS.
> - Pintu masuk: urutan resmi BPS 2024 (Ngurah Rai > Soekarno-Hatta > Batam > Juanda >
>   Kualanamu); Batam = 1,33 jt (resmi). Angka pintu lain estimasi; konfirmasi di tabel BPS.
> Angka yang masih estimasi tinggal diganti di array `dataNegara` & `dataPintu` pada `app.js`.

## Cara Jalankan di Lokal

# Jalur A (static):
Buka index.html langsung di browser (atau pakai Live Server di VS Code)

## Teknologi

- Chart.js (visualisasi)
- HTML + CSS + JavaScript
- Vercel (deployment)

## Anggota

- Dinda Cantika Putri Baruara (103012300135)
- Lilia Gita Savitri (103012300181)
- Bianka Rosa (103012300335)
- Mutiara Syaikha Husnaa (103012300460)
