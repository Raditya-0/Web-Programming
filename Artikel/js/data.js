// ============================================================
//  data.js — Dummy data: artikel & user
// ============================================================

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Raka Pratama',
    email: 'raka@kampus.ac.id',
    password: 'raka123',
    bio: 'Mahasiswa Teknik Informatika semester 7. Suka nulis tentang teknologi dan open source.',
    joinDate: '2024-01-15',
  },
  {
    id: 'u2',
    name: 'Sari Dewi',
    email: 'sari@kampus.ac.id',
    password: 'sari123',
    bio: 'Peneliti muda bidang kecerdasan buatan. Asisten dosen di Fakultas Ilmu Komputer.',
    joinDate: '2024-02-20',
  },
  {
    id: 'u3',
    name: 'Bima Ardiansyah',
    email: 'bima@kampus.ac.id',
    password: 'bima123',
    bio: 'Aktivis kampus & jurnalis mahasiswa. Meliput isu pendidikan dan kebijakan kampus.',
    joinDate: '2024-03-05',
  },
];

const DUMMY_ARTICLES = [
  {
    id: 1,
    title: 'Mengenal Large Language Model: Dari GPT ke Llama dan Seterusnya',
    preview: 'Large Language Model (LLM) telah mengubah cara kita berinteraksi dengan komputer secara fundamental. Artikel ini membahas evolusi arsitektur, bagaimana model-model ini dilatih, dan implikasinya bagi dunia akademik.',
    content: `<h2>Apa Itu Large Language Model?</h2>
<p>Large Language Model (LLM) adalah kelas model kecerdasan buatan yang dilatih pada korpus teks raksasa — miliaran hingga triliunan token — menggunakan arsitektur <em>transformer</em>. Kemampuannya melampaui sekadar melengkapi kalimat; LLM modern dapat menulis kode, menerjemahkan bahasa, merangkum dokumen panjang, bahkan melakukan penalaran multi-langkah.</p>

<h2>Sejarah Singkat: Dari n-gram ke Transformer</h2>
<p>Sebelum era deep learning, model bahasa mengandalkan statistik sederhana seperti n-gram. Model bigram misalnya, hanya mempertimbangkan satu kata sebelumnya untuk memprediksi kata berikutnya. Pendekatan ini murah secara komputasi, tetapi gagal menangkap konteks jangka panjang.</p>
<p>Tahun 2017 menjadi titik balik ketika Vaswani et al. dari Google Brain mempublikasikan makalah legendaris <em>"Attention Is All You Need"</em>. Arsitektur transformer yang mereka usulkan menggantikan recurrent network dengan mekanisme <em>self-attention</em>, memungkinkan model memproses seluruh sekuens secara paralel dan menangkap dependensi jarak jauh dengan efisien.</p>

<figure>
  <img src="https://picsum.photos/seed/llm-arch/800/400" alt="Ilustrasi arsitektur transformer" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Ilustrasi konseptual arsitektur transformer dengan mekanisme multi-head attention.</figcaption>
</figure>

<h2>GPT, BERT, dan Keluarga Besar Transformer</h2>
<p>OpenAI merilis GPT-1 pada 2018 menggunakan pendekatan <em>autoregressive</em>: model memprediksi token berikutnya berdasarkan semua token sebelumnya. Sementara Google merespons dengan BERT, yang menggunakan pendekatan <em>masked language modeling</em> — lebih unggul untuk tugas pemahaman teks.</p>
<p>Lompatan terbesar datang ketika GPT-3 (175 miliar parameter) dirilis pada 2020, menunjukkan kemampuan <em>few-shot learning</em> yang mengejutkan: cukup berikan beberapa contoh di prompt, model dapat mengerjakan tugas baru tanpa pelatihan ulang.</p>

<h2>Era Open-Source: Llama Mengubah Segalanya</h2>
<p>Meta AI merilis Llama (2023) dan Llama 2, yang pertama kali memungkinkan komunitas riset menjalankan LLM berkualitas tinggi secara lokal. Ini membuka pintu bagi ribuan fine-tuned model: Alpaca, Vicuna, WizardCoder, dan ratusan lainnya di Hugging Face.</p>
<p>Bagi mahasiswa dan peneliti kampus, ini berarti akses ke model-model canggih tanpa biaya API, membuka peluang riset yang sebelumnya hanya bisa dilakukan oleh perusahaan besar.</p>

<h2>Implikasi bagi Dunia Akademik</h2>
<p>Kemunculan LLM menimbulkan pertanyaan mendasar tentang integritas akademik, cara kita mengajar menulis, dan definisi kreativitas. Namun di sisi lain, LLM membuka peluang: akselerasi riset literatur, asisten coding, dan alat bantu bagi mahasiswa berkebutuhan khusus.</p>
<p>Yang paling penting: memahami cara kerja LLM bukan lagi domain eksklusif ilmuwan data. Setiap mahasiswa, dari ilmu sosial hingga kedokteran, perlu melek AI untuk menavigasi dekade mendatang dengan bijak.</p>`,
    authorId: 'u2',
    authorName: 'Sari Dewi',
    date: '2025-11-10',
    category: 'Teknologi',
    readTime: 8,
    imageUrl: 'https://picsum.photos/seed/llm1/800/400',
    claps: 142,
    tags: ['AI', 'Machine Learning', 'LLM'],
  },
  {
    id: 2,
    title: 'Sistem Kredit Semester Baru: Apa yang Berubah dan Apa yang Tetap',
    preview: 'Kebijakan SKS terbaru yang diberlakukan mulai semester genap ini membawa perubahan signifikan pada cara mahasiswa merencanakan studi. Berikut panduan lengkap yang perlu kamu tahu.',
    content: `<h2>Latar Belakang Perubahan Kebijakan</h2>
<p>Rapat Senat Akademik yang berlangsung bulan lalu resmi mengesahkan revisi Pedoman Akademik 2025. Perubahan paling mencolok menyentuh aturan pengambilan SKS, jadwal ujian remedial, dan mekanisme cuti akademik. Perubahan ini, menurut pihak rektorat, merespons tuntutan link-and-match dengan kebutuhan industri sekaligus memperhatikan kesehatan mental mahasiswa.</p>

<h2>Batas Maksimum SKS per Semester</h2>
<p>Sebelumnya, mahasiswa dengan IP semester ≥ 3.50 bisa mengambil hingga 24 SKS. Kini, batas itu diturunkan menjadi 22 SKS untuk semua mahasiswa, tanpa pengecualian. Alasan yang disampaikan: beban 24 SKS terbukti berkontribusi pada tingginya tingkat stres mahasiswa dan performa akademik yang tidak konsisten.</p>

<figure>
  <img src="https://picsum.photos/seed/kampus-reg/800/400" alt="Mahasiswa merencanakan jadwal studi" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Mahasiswa berdiskusi tentang rencana studi di perpustakaan kampus.</figcaption>
</figure>

<h2>Mata Kuliah Pilihan Lintas Prodi</h2>
<p>Salah satu terobosan paling dinanti: mulai semester ini, mahasiswa dapat mengambil hingga 9 SKS dari prodi lain dalam satu fakultas, dan 6 SKS dari fakultas berbeda. Ini membuka jalan bagi kombinasi studi yang sebelumnya tidak mungkin — misalnya mahasiswa Teknik Informatika yang mengambil mata kuliah Psikologi Organisasi atau Desain Komunikasi Visual.</p>

<h2>Mekanisme Ujian Remedial yang Lebih Fleksibel</h2>
<p>Ujian remedial kini dapat diambil untuk semua mata kuliah dengan nilai C ke bawah, bukan hanya mata kuliah wajib. Nilai hasil remedial dihitung sebagai nilai baru, menggantikan nilai lama — bukan dirata-rata seperti aturan sebelumnya. Ini memberikan insentif nyata bagi mahasiswa untuk memperbaiki pemahaman materi.</p>

<h2>Apa yang Tidak Berubah</h2>
<p>Batas waktu studi tetap 7 tahun (14 semester) untuk program sarjana. Ketentuan IPK kelulusan minimal 2.00 juga tidak berubah. Kewajiban mengambil mata kuliah Pancasila, Agama, dan Kewarganegaraan tetap berlaku sebagai syarat kelulusan.</p>

<h2>Langkah Selanjutnya</h2>
<p>Bagi mahasiswa yang terdampak perubahan ini, Bagian Akademik membuka sesi konsultasi setiap Selasa dan Kamis pukul 09.00–12.00. Panduan lengkap juga tersedia di portal akademik kampus mulai minggu depan.</p>`,
    authorId: 'u3',
    authorName: 'Bima Ardiansyah',
    date: '2025-11-18',
    category: 'Kampus',
    readTime: 6,
    imageUrl: 'https://picsum.photos/seed/kampus2/800/400',
    claps: 87,
    tags: ['Akademik', 'SKS', 'Kebijakan'],
  },
  {
    id: 3,
    title: 'Riset Tim Robotika Kampus Tembus Jurnal IEEE: Sebuah Perjalanan 3 Tahun',
    preview: 'Tim Robotika Universitas berhasil mempublikasikan hasil riset swarm robotics mereka di IEEE Transactions on Robotics. Perjalanan dari lab sederhana ke panggung internasional ternyata penuh liku.',
    content: `<h2>Awal yang Sederhana</h2>
<p>Tiga tahun lalu, lab robotika hanyalah ruangan 4x6 meter dengan satu set Arduino, beberapa motor DC bekas, dan semangat yang meluap-luap. Lima mahasiswa dan satu dosen pembimbing — itulah tim yang kini berhasil menembus salah satu jurnal paling bergengsi di bidang robotika.</p>

<h2>Tentang Riset: Swarm Intelligence untuk Pemetaan Bencana</h2>
<p>Inti dari penelitian ini adalah algoritma koordinasi baru untuk swarm robot — kelompok robot kecil yang bekerja kolektif seperti semut atau lebah. Alih-alih menggunakan koordinasi terpusat yang rentan terhadap single point of failure, tim mengembangkan protokol <em>decentralized stigmergic communication</em> yang memungkinkan ratusan robot mini untuk memetakan area reruntuhan secara otonom.</p>

<figure>
  <img src="https://picsum.photos/seed/robot-swarm/800/400" alt="Robot swarm dalam simulasi" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Simulasi swarm robot dalam skenario pencarian korban di area bencana.</figcaption>
</figure>

<h2>Tantangan Terbesar: Dari Hardware ke Publikasi</h2>
<p>Ketua tim, Fadhil Ramadhan (angkatan 2021), bercerita bahwa tantangan terbesar bukan pada algoritmanya, melainkan pada proses peer-review. "Reviewer pertama meminta kami menguji algoritma pada 500 robot simultan. Waktu itu kami hanya punya kapasitas simulasi untuk 100 robot," kenangnya.</p>
<p>Tim akhirnya mengajukan proposal ke BRIN untuk mendapatkan akses ke fasilitas komputasi awan. Proses ini memakan waktu enam bulan — namun hasilnya sepadan. Dengan 512 robot simultan, algoritma mereka menunjukkan efisiensi 34% lebih tinggi dibanding baseline terkini.</p>

<h2>Dampak dan Rencana Ke Depan</h2>
<p>Publikasi ini membuka pintu kolaborasi dengan dua universitas di Jepang dan satu startup deep-tech di Singapura yang tertarik mengaplikasikan teknologi ini untuk inspeksi infrastruktur jembatan. Tim juga sedang mempersiapkan demo prototype fisik untuk kompetisi INAICTA tahun depan.</p>

<h2>Pesan untuk Mahasiswa Lain</h2>
<p>"Jangan tunggu kondisi sempurna. Lab kami jauh dari ideal, dana kami terbatas, tapi kami konsisten dan saling mendukung. Publikasi internasional bukan monopoli universitas kaya — itu soal kegigihan dan kolaborasi yang tepat," ujar Dr. Andhika Wijaya, dosen pembimbing tim.</p>`,
    authorId: 'u2',
    authorName: 'Sari Dewi',
    date: '2025-11-22',
    category: 'Riset',
    readTime: 7,
    imageUrl: 'https://picsum.photos/seed/robot3/800/400',
    claps: 210,
    tags: ['Riset', 'Robotika', 'IEEE'],
  },
  {
    id: 4,
    title: 'Git Bukan Cuma untuk Developer: Panduan Versi Kontrol untuk Semua Mahasiswa',
    preview: 'Sistem kontrol versi bukan sekadar alat programmer. Mahasiswa hukum, ekonomi, hingga sastra bisa memanfaatkan Git untuk mengelola tugas, skripsi, dan proyek kolaboratif secara lebih efisien.',
    content: `<h2>Mengapa Mahasiswa Non-Teknik Perlu Git?</h2>
<p>Bayangkan kamu sedang mengerjakan skripsi 80 halaman. Kamu simpan versi <code>skripsi_final.docx</code>, lalu ada revisi dosen jadi <code>skripsi_final_v2.docx</code>, lalu ada lagi <code>skripsi_final_v2_REVISED_pak_dosen.docx</code>. Familiar? Inilah masalah yang diselesaikan Git sejak 20 tahun lalu.</p>

<h2>Konsep Dasar yang Perlu Dipahami</h2>
<p>Git bekerja dengan menyimpan <em>snapshot</em> dari proyek kamu di setiap titik waktu tertentu. Setiap snapshot disebut <em>commit</em>. Kamu bisa kapan saja kembali ke commit mana pun, membandingkan perubahan antara dua waktu, atau bekerja di <em>branch</em> terpisah tanpa merusak versi utama.</p>

<figure>
  <img src="https://picsum.photos/seed/git-flow/800/400" alt="Ilustrasi alur kerja Git" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Visualisasi branch dan commit dalam Git — setiap titik adalah snapshot proyek kamu.</figcaption>
</figure>

<h2>Memulai: Tiga Perintah yang Cukup untuk 80% Kebutuhan</h2>
<p>Kamu tidak perlu hafal ratusan perintah Git. Untuk penggunaan sehari-hari sebagai mahasiswa, tiga ini sudah cukup:</p>
<ul>
  <li><code>git init</code> — mulai melacak folder proyek kamu</li>
  <li><code>git add . && git commit -m "pesan"</code> — simpan snapshot dengan catatan</li>
  <li><code>git log</code> — lihat riwayat semua perubahan</li>
</ul>

<h2>GitHub untuk Kolaborasi Kelompok</h2>
<p>Dengan GitHub, proyek kelompok tidak lagi perlu kirim-kirim file lewat WhatsApp. Setiap anggota bekerja di branch masing-masing, lalu menggabungkan perubahan melalui <em>pull request</em> yang bisa di-review sebelum dimasukkan ke versi utama. Konflik edit yang menimpa pekerjaan orang lain menjadi masa lalu.</p>

<h2>Sumber Belajar Gratis</h2>
<p>GitHub Education memberikan akses GitHub Pro gratis untuk mahasiswa aktif — cukup verifikasi dengan email kampus. Pro Tip: GitHub Copilot juga termasuk dalam paket ini, asisten AI yang bisa membantu kamu menulis dan menjelaskan kode.</p>`,
    authorId: 'u1',
    authorName: 'Raka Pratama',
    date: '2025-11-25',
    category: 'Teknologi',
    readTime: 5,
    imageUrl: 'https://picsum.photos/seed/git4/800/400',
    claps: 95,
    tags: ['Git', 'Produktivitas', 'Tutorial'],
  },
  {
    id: 5,
    title: 'Kopi Gratis Perpustakaan Pusat: Strategi Jitu atau Gimmick Semata?',
    preview: 'Sejak perpustakaan pusat meluncurkan program "Kopi Belajar" — kopi gratis untuk pengunjung yang belajar minimal 2 jam — angka kunjungan melonjak 47%. Tapi apakah kualitas belajarnya ikut meningkat?',
    content: `<h2>Fenomena Kopi Belajar</h2>
<p>Langkah perpustakaan pusat menyediakan kopi gratis bagi pengunjung yang swipe kartu mahasiswa dan belajar minimal 2 jam ternyata viral di media sosial kampus. Dalam dua minggu pertama, antrian di meja registrasi sempat membuat koridor lantai 1 terlihat seperti antrian konser. Angka kunjungan harian melonjak dari rata-rata 340 menjadi 502 — kenaikan 47%.</p>

<h2>Data di Balik Angka</h2>
<p>Kepala Perpustakaan, Ibu Dr. Ratna Sari, M.Lib, menunjukkan data yang lebih nuansed. Memang kunjungan naik drastis, tapi rata-rata durasi kunjungan juga meningkat dari 1,8 jam menjadi 2,6 jam. Jumlah peminjaman buku fisik naik 12%, dan akses e-journal kampus melonjak 31% selama periode yang sama.</p>

<figure>
  <img src="https://picsum.photos/seed/library5/800/400" alt="Perpustakaan kampus yang ramai" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Suasana perpustakaan pusat yang kini lebih ramai sejak program Kopi Belajar diluncurkan.</figcaption>
</figure>

<h2>Kritik: Apakah Ini Belajar Sungguhan?</h2>
<p>Tidak semua pihak antusias. Beberapa dosen mengeluhkan bahwa suasana perpustakaan kini lebih mirip kafe — suara obrolan, tawa, dan notifikasi ponsel. "Perpustakaan seharusnya tempat konsentrasi, bukan tempat nongkrong dengan dalih belajar," ujar satu dosen yang tidak mau disebutkan namanya.</p>
<p>Survei cepat yang dilakukan BEM kepada 200 mahasiswa menunjukkan 68% mengaku datang memang untuk belajar, 24% menjawab "kopi dulu, belajar belakangan", dan 8% terang-terangan bilang "ya buat kopinya."</p>

<h2>Perspektif Psikologi Pendidikan</h2>
<p>Dosen Psikologi Pendidikan, Dr. Iwan Kurniawan, memberikan sudut pandang yang menarik: "Kalau stimulasi kecil seperti kopi gratis bisa membangun kebiasaan mengunjungi perpustakaan, itu sudah setengah pertempuran. Kebiasaan hadir dulu, kualitas belajar bisa dioptimalkan belakangan."</p>

<h2>Rencana Evaluasi</h2>
<p>Program ini dijadwalkan berjalan 6 bulan. Perpustakaan akan melakukan evaluasi komprehensif mencakup data kunjungan, peminjaman, dan survei kepuasan sebelum memutuskan apakah program dilanjutkan, dimodifikasi, atau dihentikan.</p>`,
    authorId: 'u3',
    authorName: 'Bima Ardiansyah',
    date: '2025-12-01',
    category: 'Kampus',
    readTime: 5,
    imageUrl: 'https://picsum.photos/seed/library5/800/400',
    claps: 178,
    tags: ['Kampus', 'Perpustakaan', 'Opini'],
  },
  {
    id: 6,
    title: 'Mengapa Skripsi Harus Direformasi: Argumen untuk Model Capstone Project',
    preview: 'Skripsi 80 halaman yang dikerjakan sendirian dalam setahun sudah tidak relevan dengan dunia kerja maupun riset modern. Sudah saatnya kampus berani bereksperimen dengan format alternatif.',
    content: `<h2>Masalah dengan Skripsi Tradisional</h2>
<p>Format skripsi yang ada saat ini — satu mahasiswa, satu topik, minimal 80 halaman, dikerjakan 6–12 bulan — dirancang untuk era ketika pengetahuan bergerak lambat dan pekerjaan akademik bersifat soliter. Di era kolaborasi lintas disiplin dan akselerasi teknologi, format ini mulai menunjukkan retaknya.</p>
<p>Survei alumni menunjukkan bahwa 73% merasa skripsi mereka tidak relevan langsung dengan pekerjaan pertama mereka. Lebih mengkhawatirkan: 41% menyebut skripsi sebagai sumber utama stres akademik yang signifikan, bahkan mempengaruhi kesehatan mental mereka.</p>

<h2>Apa Itu Capstone Project?</h2>
<p>Capstone project adalah proyek akhir yang bersifat interdisipliner, berorientasi pada pemecahan masalah nyata, dan seringkali dikerjakan dalam tim kecil. Format ini sudah lama diterapkan di universitas-universitas teknik terkemuka di AS dan Eropa, termasuk MIT, TU Delft, dan ETH Zurich.</p>

<figure>
  <img src="https://picsum.photos/seed/capstone6/800/400" alt="Presentasi capstone project" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Tim mahasiswa mempresentasikan capstone project mereka di hadapan panel evaluator dari industri.</figcaption>
</figure>

<h2>Argumen Pro: Relevansi dan Kolaborasi</h2>
<p>Capstone project memaksa mahasiswa untuk bekerja dalam tim, mengelola konflik, membagi tugas, dan mengintegrasikan perspektif berbeda — kompetensi yang justru paling dicari industri tetapi paling jarang dikembangkan selama studi. Masalah yang diselesaikan pun nyata dan berdampak, bukan sekadar kontribusi teoritis ke literatur yang mungkin tidak pernah dibaca siapapun.</p>

<h2>Argumen Kontra: Standarisasi dan Kedalaman</h2>
<p>Kritik terbesar terhadap model capstone adalah sulitnya memastikan kontribusi individual dan standarisasi penilaian. Skripsi memiliki keunggulan dalam melatih kemandirian intelektual dan kemampuan sintesis literature yang mendalam — ketrampilan fundamental untuk siapapun yang ingin berkarir di penelitian.</p>

<h2>Jalan Tengah: Model Hibrida</h2>
<p>Solusi yang paling realistis mungkin bukan memilih satu atau yang lain, melainkan menawarkan keduanya. Beberapa universitas di Indonesia sudah mulai mengizinkan mahasiswa memilih antara skripsi tradisional atau tugas akhir berbasis produk/capstone dengan bobot SKS yang setara. Ini langkah yang tepat arah, meski implementasinya perlu diperkuat dengan panduan yang jelas dan pelatihan dosen pembimbing.</p>`,
    authorId: 'u1',
    authorName: 'Raka Pratama',
    date: '2025-12-05',
    category: 'Opini',
    readTime: 9,
    imageUrl: 'https://picsum.photos/seed/capstone6/800/400',
    claps: 134,
    tags: ['Pendidikan', 'Skripsi', 'Opini'],
  },
  {
    id: 7,
    title: 'Hands-on Kubernetes: Membangun Cluster Multi-Node di Lab Kampus',
    preview: 'Dengan memanfaatkan server-server tua yang hampir dibuang, tim Lab Jaringan berhasil membangun cluster Kubernetes fungsional untuk keperluan praktikum. Panduan lengkap ada di sini.',
    content: `<h2>Dari Server Bekas ke Production-Like Cluster</h2>
<p>Tiga server Dell PowerEdge generasi 2015 yang hampir dilelang ternyata mampu menjalankan cluster Kubernetes 1 master + 2 worker dengan performa yang memadai untuk keperluan pembelajaran. Proses setup memakan waktu 2 hari penuh, dan inilah catatan lengkapnya.</p>

<h2>Spesifikasi Hardware</h2>
<p>Master node: Dell PowerEdge R420, 2x Xeon E5-2450, 64GB RAM, 2x 300GB SAS. Worker node 1 & 2: Dell PowerEdge R320, 1x Xeon E5-2407, 32GB RAM, 2x 146GB SAS. Jaringan: switch 1Gbps yang sudah ada di lab. Total biaya tambahan: Rp 0 (semua sudah tersedia).</p>

<figure>
  <img src="https://picsum.photos/seed/k8s-lab/800/400" alt="Server rack lab jaringan" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Server rack Lab Jaringan yang kini menjalankan cluster Kubernetes untuk praktikum mahasiswa.</figcaption>
</figure>

<h2>Stack yang Digunakan</h2>
<p>Ubuntu Server 22.04 LTS pada semua node, <code>kubeadm</code> untuk bootstrapping cluster, Flannel sebagai CNI plugin (ringan dan cocok untuk lingkungan belajar), MetalLB sebagai load balancer bare-metal, dan Longhorn untuk persistent storage.</p>

<h2>Hambatan yang Ditemui</h2>
<p>Masalah terbesar adalah konflik versi antara <code>containerd</code> dan <code>runc</code> yang tidak langsung terdeteksi. Tanda-tandanya halus: pod bisa dibuat tapi selalu masuk status <code>ContainerCreating</code> tanpa error yang jelas. Solusinya: downgrade <code>containerd</code> ke versi 1.6.x dan pin versi di apt untuk menghindari auto-upgrade.</p>
<p>Masalah kedua adalah time sync. Kubernetes sangat sensitif terhadap perbedaan waktu antar node. Pastikan <code>chrony</code> atau <code>ntpd</code> berjalan dan tersinkronisasi sebelum inisialisasi cluster.</p>

<h2>Hasil dan Rencana Selanjutnya</h2>
<p>Cluster kini berjalan stabil dengan uptime 99.2% selama 3 bulan terakhir. Sudah digunakan untuk 4 kelas praktikum Cloud Computing dan Jaringan Lanjut dengan total 120 mahasiswa. Rencana berikutnya: integrasi dengan GitLab CI/CD kampus untuk pipeline deployment otomatis sebagai bahan praktikum DevOps.</p>`,
    authorId: 'u1',
    authorName: 'Raka Pratama',
    date: '2025-12-10',
    category: 'Teknologi',
    readTime: 10,
    imageUrl: 'https://picsum.photos/seed/k8s7/800/400',
    claps: 88,
    tags: ['Kubernetes', 'DevOps', 'Lab'],
  },
  {
    id: 8,
    title: 'Burnout Akademik: Tanda-Tanda, Penyebab, dan Cara Pulih yang Realistis',
    preview: 'Hampir 60% mahasiswa mengalami gejala burnout setidaknya sekali selama masa studi. Ini bukan tanda kelemahan — ini sinyal bahwa sesuatu perlu diubah. Panduan berbasis riset untuk memahami dan mengatasinya.',
    content: `<h2>Apa Itu Burnout Akademik?</h2>
<p>Burnout akademik berbeda dari kelelahan biasa. Ini adalah kondisi kelelahan kronis yang ditandai oleh tiga dimensi: <em>exhaustion</em> (kelelahan emosional dan fisik yang persisten), <em>cynicism</em> (berkembangnya sikap negatif dan detachment terhadap studi), dan <em>inefficacy</em> (perasaan bahwa usaha tidak menghasilkan hasil yang berarti).</p>
<p>Riset Maslach & Leiter menunjukkan bahwa burnout bukan semata masalah individu yang "kurang kuat" — melainkan produk dari ketidaksesuaian antara tuntutan lingkungan dan sumber daya yang tersedia.</p>

<h2>Tanda-Tanda yang Sering Diabaikan</h2>
<p>Prokrastinasi yang memburuk padahal sebelumnya kamu orang yang disiplin. Kehilangan minat pada mata kuliah yang dulu kamu sukai. Fisik mudah sakit — sistem imun melemah akibat stres kronis. Susah tidur meski sangat lelah. Mengisolasi diri dari teman dan kegiatan sosial. Merasa semua yang kamu lakukan "tidak cukup baik."</p>

<figure>
  <img src="https://picsum.photos/seed/burnout8/800/400" alt="Mahasiswa duduk sendirian di kampus" style="width:100%;border-radius:8px;margin:1.5rem 0;">
  <figcaption style="text-align:center;color:#6b7280;font-size:0.875rem;">Burnout sering tidak terlihat dari luar — penting untuk mengenali tanda-tandanya lebih awal.</figcaption>
</figure>

<h2>Penyebab Struktural yang Jarang Dibahas</h2>
<p>Kita sering menyalahkan diri sendiri saat burnout, padahal banyak penyebabnya bersifat struktural. Beban SKS yang tidak realistis. Ketidakjelasan ekspektasi dari dosen yang berbeda. Tekanan sosial dari perbandingan dengan teman sebaya. Ketidakpastian karir yang konstan. Kurangnya otonomi atas jadwal dan konten belajar. Ini bukan keluhan — ini faktor risiko yang sudah terdokumentasi dalam literatur psikologi pendidikan.</p>

<h2>Pemulihan: Apa yang Benar-Benar Bekerja</h2>
<p>Bukan liburan seminggu lalu kembali ke tumpukan tugas yang sama. Pemulihan dari burnout membutuhkan perubahan sistemik, bukan sekadar istirahat. Beberapa strategi yang didukung riset: tetapkan batas waktu belajar yang keras dan patuhi, identifikasi satu atau dua sumber stres terbesar dan cari solusinya secara aktif, reconnect dengan teman-teman, dan yang paling penting — cari bantuan profesional tanpa rasa malu.</p>

<h2>Layanan Psikologi di Kampus</h2>
<p>Pusat Konseling Mahasiswa kampus menyediakan sesi konseling gratis hingga 6 kali per semester, dengan janji temu bisa dilakukan via aplikasi kampus. Data kunjungan bersifat rahasia dan tidak akan mempengaruhi status akademik kamu. Tidak perlu menunggu hingga krisis — datang lebih awal jauh lebih mudah daripada ketika sudah di titik terendah.</p>`,
    authorId: 'u3',
    authorName: 'Bima Ardiansyah',
    date: '2025-12-15',
    category: 'Opini',
    readTime: 8,
    imageUrl: 'https://picsum.photos/seed/burnout8/800/400',
    claps: 256,
    tags: ['Kesehatan Mental', 'Mahasiswa', 'Opini'],
  },
];

// Seed localStorage with dummy data if not present
function seedData() {
  if (!localStorage.getItem('articles')) {
    localStorage.setItem('articles', JSON.stringify(DUMMY_ARTICLES));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(DUMMY_USERS));
  }
}
