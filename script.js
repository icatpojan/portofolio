// Floating Particles Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Typing Animation
const typingTexts = [
  'Fullstack Web Developer',
  'System Architect',
  'API Specialist',
  'Database Engineer',
  'DevOps Enthusiast'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeText() {
  const currentText = typingTexts[textIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typeSpeed = 500;
  }

  setTimeout(typeText, typeSpeed);
}

typeText();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const parallaxBg = document.getElementById('parallaxBg');
  const scrolled = window.pageYOffset;
  const parallaxSection = document.querySelector('.parallax-section');
  const sectionTop = parallaxSection.offsetTop;
  const sectionHeight = parallaxSection.offsetHeight;
  
  if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
    const offset = (scrolled - sectionTop) * 0.5;
    parallaxBg.style.transform = `translateY(${offset}px)`;
    
    const blurAmount = Math.min((scrolled - sectionTop) / 200, 8);
    parallaxBg.style.filter = `blur(${blurAmount}px)`;
  }
});

// Horizontal Scroll Bridge
const horizontalScrollContainer = document.getElementById('horizontalScrollContainer');
const horizontalScrollContent = document.getElementById('horizontalScrollContent');

window.addEventListener('scroll', () => {
  const containerRect = horizontalScrollContainer.getBoundingClientRect();
  const containerTop = containerRect.top;
  const containerHeight = containerRect.height;
  
  if (containerTop <= 0 && containerTop > -containerHeight) {
    const scrollProgress = Math.abs(containerTop) / containerHeight;
    const maxScroll = horizontalScrollContent.scrollWidth - window.innerWidth;
    const scrollAmount = scrollProgress * maxScroll;
    horizontalScrollContent.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
  observer.observe(el);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function closeMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.remove('active');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Project Data
const projectData = {
  jid: {
    title: 'JID - Jasa Marga Integrated Digital Map',
    description: `Platform pemetaan dan monitoring terintegrasi yang dirancang khusus untuk PT Jasa Marga, mengelola data lalu lintas real-time dan analitik infrastruktur jalan tol di seluruh Indonesia.`,
    features: [
      'Real-time traffic monitoring dengan visualisasi peta interaktif',
      'Dashboard analitik untuk monitoring kondisi jalan tol',
      'Sistem pelaporan kerusakan infrastruktur',
      'Integrasi dengan sensor IoT untuk data real-time',
      'Multi-user access dengan role-based permissions',
      'Export data dan laporan dalam berbagai format',
      'Mobile-responsive interface untuk akses di lapangan',
      'Notifikasi otomatis untuk kondisi darurat'
    ],
    tech: ['Laravel', 'Vue.js', 'PostgreSQL', 'Docker', 'Redis', 'Leaflet.js', 'WebSocket'],
    impact: 'Meningkatkan efisiensi monitoring infrastruktur jalan tol sebesar 60% dan mengurangi response time untuk penanganan insiden dari 45 menit menjadi 15 menit.'
  },
  kapal: {
    title: 'Kapal Pintar Office Management System',
    description: `Sistem manajemen internal komprehensif untuk PT Kapal Pintar Indonesia, mengelola operasi kapal, logistik, dokumen, dan sumber daya manusia secara terintegrasi.`,
    features: [
      'Manajemen armada kapal dengan tracking real-time',
      'Sistem logistik dan inventory management',
      'Document management system untuk sertifikasi kapal',
      'HR management untuk crew dan staff',
      'Financial tracking dan budgeting',
      'Maintenance scheduling dan history',
      'Compliance monitoring untuk regulasi maritim',
      'Reporting dan analytics dashboard'
    ],
    tech: ['Laravel', 'React', 'MySQL', 'Docker', 'Redis', 'AWS S3', 'Chart.js'],
    impact: 'Mendigitalisasi 100% proses manual perusahaan, menghemat 40 jam kerja per minggu untuk administrative tasks, dan meningkatkan compliance rate menjadi 98%.'
  },
  mumtaza: {
    title: 'Mumtaza Salon Point of Sale System',
    description: `Sistem Point of Sale (POS) modern dan user-friendly untuk Mumtaza Salon, mengelola transaksi kasir, booking layanan, inventory produk, dan laporan keuangan harian.`,
    features: [
      'Kasir dengan interface touchscreen-friendly',
      'Sistem booking dan appointment management',
      'Inventory management untuk produk salon',
      'Customer database dan loyalty program',
      'Multi-payment methods (cash, card, e-wallet)',
      'Laporan penjualan harian, mingguan, dan bulanan',
      'Staff performance tracking',
      'Promo dan discount management'
    ],
    tech: ['CodeIgniter', 'Vue.js', 'MySQL', 'Bootstrap', 'Chart.js'],
    impact: 'Mempercepat proses transaksi 3x lebih cepat, mengurangi kesalahan pencatatan hingga 95%, dan meningkatkan customer retention sebesar 35% melalui loyalty program.'
  },
  gold: {
    title: 'Dinar Gold Store POS & Inventory System',
    description: `Sistem POS dan manajemen stok khusus untuk toko emas Dinar, dengan fitur tracking harga emas real-time, manajemen berat dan kadar emas, serta sinkronisasi stok antar cabang.`,
    features: [
      'POS dengan kalkulasi otomatis berdasarkan harga emas real-time',
      'Tracking berat, kadar, dan jenis emas (24K, 22K, 18K)',
      'Inventory management multi-cabang',
      'Integrasi dengan API harga emas internasional',
      'Sistem buyback dan trade-in',
      'Barcode/QR code untuk setiap item',
      'Laporan keuangan dan stok real-time',
      'Customer database untuk repeat customers'
    ],
    tech: ['Laravel', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    impact: 'Mengurangi discrepancy stok dari 5% menjadi 0.2%, meningkatkan akurasi pricing hingga 100%, dan memungkinkan ekspansi ke 5 cabang baru dengan sistem terpusat.'
  },
  nusapenida: {
    title: 'Nusa Penida Tourist Management Platform',
    description: `Platform web booking dan manajemen operasional untuk tour operator di Nusa Penida, Bali. Mengelola booking wisatawan, jadwal tour, assignment guide, dan pembayaran.`,
    features: [
      'Online booking system dengan real-time availability',
      'Tour package management dengan customization',
      'Guide assignment dan scheduling',
      'Payment gateway integration (Midtrans, Xendit)',
      'Customer review dan rating system',
      'Multi-language support (EN, ID, CN, JP)',
      'WhatsApp notification untuk konfirmasi booking',
      'Admin dashboard untuk monitoring operasional'
    ],
    tech: ['Laravel', 'Vue.js', 'MySQL', 'Docker', 'Midtrans API', 'Google Maps API'],
    impact: 'Meningkatkan booking online sebesar 250%, mengurangi no-show rate dari 15% menjadi 3%, dan meningkatkan customer satisfaction score menjadi 4.8/5.'
  },
  api: {
    title: 'Enterprise API & Database Management',
    description: `Solusi REST API dan manajemen database untuk berbagai aplikasi data-driven. Menyediakan CRUD operations, security, versioning, dan dokumentasi lengkap untuk integrasi sistem.`,
    features: [
      'RESTful API design dengan best practices',
      'JWT authentication dan authorization',
      'API versioning untuk backward compatibility',
      'Rate limiting dan throttling',
      'Comprehensive API documentation (Swagger/OpenAPI)',
      'Database optimization dan indexing',
      'Caching strategy dengan Redis',
      'Monitoring dan logging dengan ELK stack'
    ],
    tech: ['Express.js', 'AdonisJS', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Nginx'],
    impact: 'Melayani 1M+ API requests per hari dengan 99.9% uptime, response time rata-rata <100ms, dan zero data breach selama 2 tahun operasional.'
  },
  kkp: {
    title: 'KKP Data Transmitter System',
    description: `Sistem pengiriman data kapal otomatis ke Kementerian Kelautan dan Perikanan (KKP) untuk compliance dan pelaporan real-time. Mengirim data posisi, tangkapan, dan aktivitas kapal.`,
    features: [
      'Automated data transmission setiap 30 menit',
      'GPS tracking integration',
      'Catch reporting dengan species identification',
      'Compliance monitoring untuk fishing zones',
      'Offline data buffering untuk area tanpa signal',
      'Encryption untuk data security',
      'Dashboard monitoring untuk fleet management',
      'Alert system untuk violation detection'
    ],
    tech: ['Node.js', 'Python', 'PostgreSQL', 'MQTT', 'Docker', 'AWS IoT'],
    impact: 'Memastikan 100% compliance dengan regulasi KKP, mengurangi manual reporting time dari 4 jam/hari menjadi 0, dan meningkatkan traceability hasil tangkapan.'
  },
  whatsapp: {
    title: 'WhatsApp Business API Integration',
    description: `Integrasi WhatsApp Business API untuk automasi pesan, OTP verification, notifikasi transaksional, dan chatbot customer service menggunakan Node.js dan Express.`,
    features: [
      'OTP verification via WhatsApp',
      'Automated transactional notifications',
      'Chatbot dengan natural language processing',
      'Broadcast messaging untuk marketing',
      'Template message management',
      'Multi-agent customer service dashboard',
      'Analytics dan reporting',
      'Integration dengan CRM systems'
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'WhatsApp Business API', 'DialogFlow', 'Redis'],
    impact: 'Menangani 50K+ messages per hari, meningkatkan customer engagement sebesar 180%, dan mengurangi customer service workload hingga 60% melalui automation.'
  },
  roadissue: {
    title: 'Road Issue Reporting Platform',
    description: `Platform publik untuk pelaporan kerusakan jalan, gangguan lalu lintas, dan bahaya di jalan kepada pemerintah lokal. Memungkinkan citizen engagement dan transparent issue tracking.`,
    features: [
      'Mobile-first reporting dengan photo upload',
      'GPS-based location tagging',
      'Issue categorization dan priority system',
      'Public dashboard untuk tracking status',
      'Government admin panel untuk issue management',
      'Notification system untuk updates',
      'Analytics untuk hotspot identification',
      'Integration dengan government systems'
    ],
    tech: ['Laravel', 'React', 'PostgreSQL', 'Docker', 'Google Maps API', 'AWS S3'],
    impact: 'Menerima 2000+ laporan per bulan, meningkatkan response time pemerintah dari 30 hari menjadi 7 hari, dan meningkatkan citizen satisfaction terhadap public services.'
  }
};

// Modal Functions
function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  const project = projectData[projectId];
  
  if (!project) return;
  
  document.getElementById('modalTitle').textContent = project.title;
  
  const techBadges = project.tech.map(tech => 
    `<span class="tech-badge">${tech}</span>`
  ).join('');
  
  const featuresList = project.features.map(feature => 
    `<li>${feature}</li>`
  ).join('');
  
  document.getElementById('modalBody').innerHTML = `
    <p>${project.description}</p>
    
    <h3>🚀 Key Features</h3>
    <ul>${featuresList}</ul>
    
    <h3>💻 Tech Stack</h3>
    <div class="tech-stack">${techBadges}</div>
    
    <h3>📊 Impact & Results</h3>
    <p>${project.impact}</p>
  `;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target == modal) {
    closeModal();
  }
}

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
