/* ==========================================================================
   app.js — Logika dashboard wisman Indonesia
   Berisi: (1) data, (2) animasi count-up & reveal, (3) tiga chart, (4) filter.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DATA
   Data tren tahunan di bawah ini NYATA, bersumber dari BPS
   (Statistik Kunjungan Wisatawan Mancanegara). Satuan: juta kunjungan.
   -------------------------------------------------------------------------- */

// Tren wisman per tahun (untuk Line Chart)
const dataTahun = {
  labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  nilai:  [15.81,  16.11,  4.05,   1.56,   5.47,   11.68,  13.90],
};

// 10 negara asal wisman terbanyak, 2024 (untuk Bar Chart). Satuan: JUTA kunjungan.
// [RESMI BPS - Statistik Indonesia 2025] Total 13.902.420. Angka 5 besar PERSIS:
//   Malaysia 2.278.281 | Australia 1.671.222 | Singapura 1.408.015 | Tiongkok 1.198.582 | Timor Leste 776.294
// [ESTIMASI] rank 6-10 (India dst) belum dirilis detail; konfirmasi di tabel BPS lalu ganti.
const dataNegara = {
  labels: ['Malaysia', 'Australia', 'Singapura', 'Tiongkok', 'Timor Leste',
           'India', 'Korea Selatan', 'Inggris', 'Amerika Serikat', 'Jepang'],
  nilai:  [2.28, 1.67, 1.41, 1.20, 0.78, 0.55, 0.45, 0.42, 0.40, 0.38],
  //        ^---------- RESMI BPS (5 besar) ----------^  ^------ estimasi, konfirmasi ------^
};

// Pintu masuk utama wisman, 2024 (untuk Doughnut Chart). Satuan: JUTA kunjungan.
// [RESMI BPS 2024] urutan: Ngurah Rai > Soekarno-Hatta > Batam > Juanda > Kualanamu.
// [RESMI BPS 2024] Batam = 1,33 juta. Angka lain estimasi; konfirmasi di tabel BPS.
const dataPintu = {
  labels: ['Ngurah Rai (Bali)', 'Soekarno-Hatta (Jakarta)', 'Batam',
           'Juanda (Surabaya)', 'Kualanamu (Medan)', 'Pintu lainnya'],
  nilai:  [6.30, 2.50, 1.33, 0.60, 0.30, 2.87],
  //                    ^resmi
};

// Palet warna agar konsisten dengan tema CSS
const WARNA = {
  ocean: '#1b98a8',
  oceanDeep: '#07435c',
  sunset: '#f2784b',
  set: ['#07435c', '#1b98a8', '#f2784b', '#7cc7d1', '#f4a988', '#b8d8c8'],
};


/* --------------------------------------------------------------------------
   2. ANIMASI
   (a) COUNT-UP: angka KPI naik dari 0 ke nilai akhir.
   (b) REVEAL: kartu & chart fade-in saat di-scroll masuk layar, fade-out saat keluar.
   Keduanya dipicu oleh IntersectionObserver, yaitu fitur browser yang memberi tahu
   kita kapan sebuah elemen masuk/keluar area layar (viewport).
   -------------------------------------------------------------------------- */

// Catatan: kelas .has-js sudah ditambahkan ke <html> lewat script kecil di <head>
// (supaya elemen tidak berkedip). CSS memakai penanda itu untuk menyiapkan animasi.

// Format angka gaya Indonesia (koma sebagai pemisah desimal)
function formatAngka(nilai, desimal) {
  return nilai.toLocaleString('id-ID', {
    minimumFractionDigits: desimal,
    maximumFractionDigits: desimal,
  });
}

// ---- (a) Fungsi animasi count-up untuk satu angka KPI ----
function jalankanCountUp(el) {
  const target = parseFloat(el.dataset.target);          // nilai akhir
  const desimal = parseInt(el.dataset.decimals || '0');  // angka di belakang koma
  const durasi = 1400;                                   // lama animasi (ms)
  const mulai = performance.now();

  function langkah(waktu) {
    const progres = Math.min((waktu - mulai) / durasi, 1); // 0 -> 1
    el.textContent = formatAngka(target * progres, desimal);
    if (progres < 1) requestAnimationFrame(langkah);       // ulangi tiap frame
  }
  requestAnimationFrame(langkah);
}

// Observer untuk KPI: hitung naik saat masuk layar, reset ke 0 saat keluar
// (reset membuat animasi bisa diputar ulang setiap kali di-scroll — enak untuk demo)
const kpiObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    if (entry.isIntersecting) {
      jalankanCountUp(el);                 // masuk layar -> animasikan
    } else {
      el.textContent = formatAngka(0, parseInt(el.dataset.decimals || '0')); // keluar -> reset 0
    }
  });
}, { threshold: 0.5 }); // picu saat 50% elemen terlihat

document.querySelectorAll('.kpi-value').forEach((el) => kpiObserver.observe(el));

// ---- (b) Observer untuk REVEAL: tambah/lepas kelas .is-visible ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // masuk layar -> tampilkan (fade-in); keluar layar -> sembunyikan lagi (fade-out)
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach((el) => revealObserver.observe(el));


/* --------------------------------------------------------------------------
   3. CHART
   -------------------------------------------------------------------------- */

// ---- CHART 1: LINE — tren per tahun ----
const ctxLine = document.getElementById('chartLine');
const chartLine = new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: dataTahun.labels,
    datasets: [{
      label: 'Wisman (juta)',
      data: dataTahun.nilai,
      borderColor: WARNA.ocean,
      backgroundColor: 'rgba(27, 152, 168, 0.12)',
      fill: true,            // beri area warna di bawah garis
      tension: 0.35,         // garis sedikit melengkung
      pointBackgroundColor: WARNA.sunset,
      pointRadius: 5,
      pointHoverRadius: 7,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // izinkan chart mengikuti tinggi .chart-box
    plugins: {
      legend: { display: false },
      // Tooltip aktif otomatis; kita rapikan teksnya saja
      tooltip: {
        callbacks: {
          label: (item) => ` ${item.formattedValue} juta kunjungan`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Juta kunjungan' } },
    },
  },
});

// ---- CHART 2: BAR — negara asal ----
const ctxBar = document.getElementById('chartBar');
new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: dataNegara.labels,
    datasets: [{
      label: 'Kunjungan (juta)',
      data: dataNegara.nilai,
      backgroundColor: WARNA.ocean,
      borderRadius: 6,
    }],
  },
  options: {
    indexAxis: 'y', // batang horizontal — lebih mudah dibaca untuk nama negara
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (item) => ` ${item.formattedValue} juta kunjungan` } },
    },
    scales: { x: { beginAtZero: true } },
  },
});

// ---- CHART 3: DOUGHNUT — pintu masuk ----
const ctxDoughnut = document.getElementById('chartDoughnut');
new Chart(ctxDoughnut, {
  type: 'doughnut',
  data: {
    labels: dataPintu.labels,
    datasets: [{
      data: dataPintu.nilai,
      backgroundColor: WARNA.set,
      borderColor: '#ffffff',
      borderWidth: 2,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }, // klik legend = sembunyikan/tampilkan (interaktif bawaan)
      tooltip: { callbacks: { label: (item) => ` ${item.label}: ${item.formattedValue} juta` } },
    },
  },
});


/* --------------------------------------------------------------------------
   4. FITUR INTERAKTIF: filter dropdown untuk Line Chart
   Mengganti rentang tahun yang ditampilkan, lalu chart di-update.
   -------------------------------------------------------------------------- */
const filterTahun = document.getElementById('filterTahun');
filterTahun.addEventListener('change', (e) => {
  if (e.target.value === 'pemulihan') {
    // tampilkan hanya 4 data terakhir (2021–2024)
    chartLine.data.labels = dataTahun.labels.slice(3);
    chartLine.data.datasets[0].data = dataTahun.nilai.slice(3);
  } else {
    // tampilkan semua tahun
    chartLine.data.labels = dataTahun.labels;
    chartLine.data.datasets[0].data = dataTahun.nilai;
  }
  chartLine.update(); // gambar ulang chart dengan animasi
});
