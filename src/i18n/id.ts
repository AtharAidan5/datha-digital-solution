import type { Dictionary } from './types'

// Indonesian dictionary. Must satisfy the English key shape. Native-speaker review pending.
export const id: Dictionary = {
  topbar: {
    phoneLabel: 'Hubungi kami',
    phone: '{{phone}}',
    emailLabel: 'Info',
    email: '{{email}}',
    hoursLabel: 'Jam operasional',
    hours: '{{hours}}',
    support: 'Balasan dalam satu hari kerja',
  },
  nav: {
    menu: 'Menu',
    home: 'Beranda',
    about: 'Tentang Kami',
    services: 'Layanan',
    products: 'Solusi',
    portfolio: 'Portofolio',
    clients: 'Klien',
    careers: 'Karir',
    contact: 'Kontak',
    cta: 'Hubungi Kami',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
  },
  hero: {
    cta: 'Hubungi Kami',
    ctaSecondary: 'Lihat Layanan',
    prev: 'Slide sebelumnya',
    next: 'Slide berikutnya',
    goTo: 'Ke slide {{n}}',
    s1: {
      eyebrow: 'Mitra IT Generasi Baru',
      title: 'Mitra IT Generasi Baru Anda',
      text: 'Lahir di era cloud. Kami membangun aplikasi web dan mobile yang aman dan skalabel dengan teknologi modern, tanpa beban sistem lama.',
    },
    s2: {
      eyebrow: 'Berfokus pada Pelanggan',
      title: 'Terobsesi pada Hasil Anda',
      text: 'Keberhasilan Anda adalah satu-satunya ukuran kami. Siklus umpan balik singkat dan pengerjaan transparan menjaga proyek tetap sejalan dengan tujuan Anda.',
    },
    s3: {
      eyebrow: 'Tim Gesit & Mumpuni',
      title: 'Tim yang Gesit dan Mumpuni',
      text: 'Tim engineer yang ramping dengan pola pikir senior: bergerak cepat, adaptif, dan bertanggung jawab penuh dari ide hingga produksi.',
    },
    s4: {
      eyebrow: 'Dukungan Responsif',
      title: 'Dukungan yang Bisa Diandalkan',
      text: 'Komunikasi yang jelas dan respons cepat di hari kerja, sehingga kendala tertangani sebelum menghambat bisnis Anda.',
    },
  },
  why: {
    eyebrow: 'Mengapa DATHA',
    title: 'Dibangun untuk cara teknologi bekerja saat ini',
    lead: 'Sebagai perusahaan baru, kami hadir tanpa pola kerja usang dan tanpa utang teknis warisan. Setiap proyek dimulai dengan alat terbaik saat ini dan keleluasaan untuk beradaptasi.',
    cta: 'Mulai diskusi',
    imageAlt: 'Tim engineer DATHA sedang berkolaborasi',
    p1: {
      title: 'Eksekusi tech stack modern',
      text: 'Arsitektur cloud-native, desain API-first, CI/CD, dan pengujian otomatis sejak hari pertama.',
    },
    p2: {
      title: 'Pemecahan masalah yang adaptif',
      text: 'Sprint singkat dan iterasi cepat memungkinkan kami berganti arah sesuai kebutuhan Anda, tanpa pengerjaan ulang yang mahal.',
    },
    p3: {
      title: 'Mitra, bukan sekadar vendor',
      text: 'Akses langsung ke engineer yang membangun produk Anda. Komunikasi jelas, estimasi jujur.',
    },
    p4: {
      title: 'Aman dan andal sejak awal',
      text: 'Tinjauan keamanan, pemantauan, dan pencadangan menyatu dalam setiap pengerjaan.',
    },
  },
  services: {
    eyebrow: 'Layanan Kami',
    title: 'Solusi IT end-to-end',
    lead: 'Dari ide awal hingga operasional berkelanjutan, satu tim menangani seluruh lini.',
    learnMore: 'Selengkapnya',
    learnMoreAbout: 'Selengkapnya tentang {{service}}',
    s1: {
      title: 'Pengembangan Aplikasi Web',
      text: 'Aplikasi dan portal web yang cepat dan aman, dibangun dengan framework modern dan siap berkembang.',
    },
    s2: {
      title: 'Pemeliharaan & Dukungan',
      text: 'Pemantauan proaktif, pembaruan, dan perbaikan agar sistem Anda tetap cepat, aman, dan stabil.',
    },
    s3: {
      title: 'Pengembangan Aplikasi Mobile',
      text: 'Aplikasi iOS dan Android, dari prototipe pertama hingga rilis di app store.',
    },
    s4: {
      title: 'Konsultasi IT',
      text: 'Saran praktis tentang arsitektur, cloud, dan strategi digital yang menghemat waktu dan biaya.',
    },
    s5: {
      title: 'Integrasi Sistem',
      text: 'Hubungkan aplikasi, data, dan perangkat melalui API yang andal menjadi satu alur kerja yang mulus.',
    },
    s6: {
      title: 'Pelatihan',
      text: 'Program praktik langsung untuk meningkatkan keterampilan tim Anda dalam pengembangan modern dan operasional sistem.',
    },
  },
  cta: {
    title: 'Diskusikan kebutuhan solusi IT untuk bisnis Anda bersama kami',
    text: 'Ceritakan tantangan Anda. Kami membalas dalam satu hari kerja dengan langkah berikutnya yang jelas.',
    button: 'Hubungi sekarang',
    secondary: 'Minta penawaran',
    contactSubject: 'Pertanyaan dari situs web',
    quoteSubject: 'Permintaan penawaran melalui situs web',
    mailLabel: '{{label}} (membuka aplikasi email Anda)',
    emailLabel: 'Lebih suka lewat email?',
  },
  portfolio: {
    eyebrow: 'Karya Terbaru',
    title: 'Hasil yang kami hadirkan',
    viewCase: 'Lihat studi kasus',
    p1: {
      title: 'Platform alur kerja [PLACEHOLDER]',
      metric: 'Pemrosesan {{x}}% lebih cepat',
      text: 'Mengganti spreadsheet manual dengan aplikasi alur kerja berbasis cloud.',
    },
    p2: {
      title: 'Integrasi sistem [PLACEHOLDER]',
      metric: '{{x}} sistem terintegrasi',
      text: 'Menghubungkan keuangan, inventaris, dan pelaporan melalui satu lapisan API.',
    },
    p3: {
      title: 'Aplikasi mobile [PLACEHOLDER]',
      metric: '{{x}} pengguna aktif',
      text: 'Mengubah proses lapangan berbasis kertas menjadi aplikasi iOS dan Android.',
    },
  },
  testimonials: {
    eyebrow: 'Suara Klien',
    title: 'Kata klien kami',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    t1: {
      quote: '"Mereka bergerak secepat startup dan berkomunikasi layaknya mitra sejati." [PLACEHOLDER]',
      author: '{{name}}, {{role}}, {{company}}',
    },
    t2: {
      quote: '"Pengerjaan cepat, kode rapi, dan dukungan yang benar-benar responsif." [PLACEHOLDER]',
      author: '{{name}}, {{role}}, {{company}}',
    },
  },
  footer: {
    tagline: 'Ide • Teknologi • Hari Esok yang Lebih Baik',
    about: 'DATHA Digital Solution membangun aplikasi web dan mobile modern untuk bisnis yang siap bergerak lebih cepat.',
    contactTitle: 'Mari terhubung',
    contactLead: 'Hubungi tim kami melalui telepon atau email, atau kunjungi kami secara langsung.',
    headTitle: 'Kantor Pusat',
    headAddress: '{{address}}',
    workshopTitle: 'Workshop',
    workshopAddress: '{{address}}',
    phone: 'Telepon',
    email: 'Email',
    hours: 'Jam operasional',
    quickLinks: 'Tautan cepat',
    followUs: 'Ikuti kami',
    map: 'Lihat di peta',
    rights: '© {{year}} DATHA Digital Solution. Hak cipta dilindungi.',
    privacy: 'Kebijakan Privasi',
    terms: 'Syarat & Ketentuan',
  },
  meta: {
    title: 'DATHA Digital Solution — Mitra IT Generasi Baru',
    description:
      'Pengembangan aplikasi web dan mobile, integrasi sistem, dan konsultasi IT dari tim engineering yang gesit.',
  },
  common: {
    skipToContent: 'Lewati ke konten',
    langLabel: 'Bahasa',
    langSwitched: 'Bahasa: Indonesia',
    newTab: 'Terbuka di tab baru',
  },
  legal: {
    updated: 'Terakhir diperbarui: {{date}}',
    back: 'Kembali ke beranda',
    draft: 'Draf: menunggu tinjauan hukum',
  },
}
