// Toggle Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Status Login Sederhana (Simulasi)
let isLoggedIn = false;

// Login Modal
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const registerLink = document.getElementById('registerLink');
const registerModal = document.getElementById('registerModal');
const closeButtons = document.querySelectorAll('.close');

// Tombol Login di Header
loginBtn.addEventListener('click', () => {
  if (!isLoggedIn) {
    loginModal.style.display = 'flex';
  } else {
    alert("Anda sudah login sebagai pengguna RosoSehat.");
  }
});

registerLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'none';
  registerModal.style.display = 'flex';
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
  });
});

// Close Modal dengan Klik di Luar
window.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal.style.display = 'none';
  if (e.target === registerModal) registerModal.style.display = 'none';
  if (e.target === document.getElementById('consultationModal')) document.getElementById('consultationModal').style.display = 'none';
  if (e.target === document.getElementById('historyModal')) document.getElementById('historyModal').style.display = 'none';
  if (e.target === document.getElementById('replyModal')) document.getElementById('replyModal').style.display = 'none';
});

// Form Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Login berhasil! Selamat datang di RosoSehat.");
  loginModal.style.display = 'none';
  isLoggedIn = true; // Set status login
  updateLoginButton(); // Update tampilan tombol login
});

// Form Register
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Pendaftaran berhasil! Silakan login untuk mulai konsultasi.");
  registerModal.style.display = 'none';
});

// Fungsi Update Tombol Login
function updateLoginButton() {
  const loginBtn = document.getElementById('loginBtn');
  if (isLoggedIn) {
    loginBtn.textContent = "Logout";
    loginBtn.onclick = function() {
      if (confirm("Yakin ingin logout?")) {
        isLoggedIn = false;
        loginBtn.textContent = "Login";
        loginBtn.onclick = function() { loginModal.style.display = 'flex'; };
      }
    };

    // Tambahkan tombol "Riwayat Konsultasi" setelah login
    if (!document.querySelector('#historyBtn')) {
      const historyBtn = document.createElement('button');
      historyBtn.id = 'historyBtn';
      historyBtn.textContent = 'Riwayat';
      historyBtn.className = 'btn-login';
      historyBtn.style.marginLeft = '0.5rem';
      loginBtn.parentNode.insertBefore(historyBtn, loginBtn.nextSibling);

      historyBtn.addEventListener('click', function() {
        showConsultationHistory();
      });
    }
  }
}

// Fungsi untuk menampilkan riwayat konsultasi
function showConsultationHistory() {
  const savedComplaints = JSON.parse(localStorage.getItem('rosoComplaints')) || [];
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = ''; // Kosongkan dulu

  if (savedComplaints.length === 0) {
    historyList.innerHTML = '<p>Belum ada riwayat konsultasi.</p>';
  } else {
    savedComplaints.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'history-item';
      itemElement.innerHTML = `
        <div class="complaint">
          <strong>${item.date}</strong><br>
          <em>"${item.complaint}"</em>
        </div>
        <div class="response">
          <strong>Rojo Sehat:</strong><br>
          <em>"${item.response || 'Balasan sedang diproses...'}"</em>
        </div>
        <hr>
      `;
      historyList.appendChild(itemElement);
    });
  }

  document.getElementById('historyModal').style.display = 'flex';
}

// Tutup Modal Riwayat
document.querySelector('#historyModal .close').addEventListener('click', function() {
  document.getElementById('historyModal').style.display = 'none';
});

// Tombol Tanya Keluhan - Sekarang Buka Modal Konsultasi
document.getElementById('tanyaKeluhanBtn').addEventListener('click', function() {
  if (!isLoggedIn) {
    alert("Untuk bertanya, Anda perlu login terlebih dahulu.");
    loginModal.style.display = 'flex';
  } else {
    document.getElementById('consultationModal').style.display = 'flex';
  }
});

// Tutup Modal Konsultasi
document.querySelector('#consultationModal .close').addEventListener('click', function() {
  document.getElementById('consultationModal').style.display = 'none';
});

// Daftar respons berdasarkan kata kunci
const responses = [
  {
    keywords: ["pusing", "sakit kepala", "kepala", "migrain"],
    replies: [
      "🌿 Tenang, cobalah istirahat di ruangan gelap, minum air putih, dan kompres dahi dengan air dingin. Jika berlanjut lebih dari 2 hari, segera ke dokter ya.",
      "🍃 Pusing bisa jadi tanda kurang tidur atau dehidrasi. Cobalah minum air jahe hangat dan tidur cukup. Semoga lekas membaik!"
    ]
  },
  {
    keywords: ["batuk", "pilek", "flu", "demam"],
    replies: [
      "🍵 Minumlah air hangat dengan madu dan lemon. Istirahat cukup, dan jangan lupa pakai masker agar tidak menular ke orang lain.",
      "🌿 Badan lemas karena flu? Cobalah rebusan jahe + serai + gula aren. Hangatkan tubuh dan perbanyak istirahat."
    ]
  },
  {
    keywords: ["cemas", "stress", "gelisah", "takut", "khawatir"],
    replies: [
      "🕊️ Tarik napas dalam-dalam... hembuskan perlahan. Ulangi 5x. Anda tidak sendiri, Rojo Sehat di sini untuk mendengar.",
      "💚 Ingat: perasaan tidak enak itu sementara. Cobalah tulis di buku harian atau berjalan kaki 10 menit. Semuanya akan baik-baik saja."
    ]
  },
  {
    keywords: ["sakit perut", "mual", "diare", "maag"],
    replies: [
      "🍃 Hindari makanan pedas, asam, dan berminyak. Minum air rebusan daun jambu biji atau jahe hangat. Istirahatlah dengan tenang.",
      "🌿 Perut tidak nyaman? Coba kompres hangat di perut dan minum air kelapa muda. Jika muntah terus, segera ke fasilitas kesehatan."
    ]
  },
  {
    keywords: ["capek", "lelah", "lemas", "tidak bersemangat"],
    replies: [
      "☀️ Coba bangun lebih awal, berjemur 10 menit di pagi hari, dan minum air hangat. Tubuh butuh sinar matahari dan istirahat.",
      "🧘‍♀️ Kadang tubuh sedang meminta Anda untuk berhenti sejenak. Dengarkan diri sendiri, dan beri diri Anda waktu untuk pulih."
    ]
  },
  {
    keywords: ["tidak bisa tidur", "insomnia", "susah tidur"],
    replies: [
      "🌙 Coba mandi air hangat sebelum tidur, hindari gawai 1 jam sebelum tidur, dan dengarkan suara alam seperti hujan atau ombak.",
      "🕯️ Baca buku ringan atau latih napas 4-7-8: tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik. Ulangi 3x."
    ]
  }
];

// Fungsi untuk menampilkan balasan langsung seperti chat
function showTypingResponse(complaint, response) {
  // Simpan ke localStorage
  const savedComplaints = JSON.parse(localStorage.getItem('rosoComplaints')) || [];
  savedComplaints.push({
    date: new Date().toLocaleString('id-ID'),
    complaint: complaint,
    response: response
  });
  localStorage.setItem('rosoComplaints', JSON.stringify(savedComplaints));

  // Tutup modal konsultasi
  document.getElementById('consultationModal').style.display = 'none';

  // Tampilkan modal balasan langsung
  const replyModal = document.getElementById('replyModal');
  replyModal.style.display = 'flex';

  // Efek mengetik
  const typingText = document.getElementById('typingText');
  typingText.innerHTML = ''; // Kosongkan dulu
  let i = 0;
  const speed = 30; // kecepatan ketik (ms per karakter)

  function typeWriter() {
    if (i < response.length) {
      typingText.innerHTML += response.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  setTimeout(typeWriter, 500);

  // Tutup modal
  replyModal.querySelector('.close').onclick = () => {
    replyModal.style.display = 'none';
  };
}

// Simpan Keluhan dan Tambahkan Balasan dari Rojo Sehat
document.getElementById('consultationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const complaint = document.getElementById('complaintInput').value;

  if (!complaint.trim()) {
    alert("Silakan tuliskan keluhan Anda terlebih dahulu.");
    return;
  }

  let response = "Terima kasih sudah berbagi keluhanmu. Rojo Sehat akan segera memberikan saran yang sesuai ❤️";

  // Cari kecocokan
  for (const group of responses) {
    if (group.keywords.some(kw => complaint.toLowerCase().includes(kw))) {
      const randomReply = group.replies[Math.floor(Math.random() * group.replies.length)];
      response = randomReply;
      break;
    }
  }

  // Tampilkan efek mengetik langsung
  showTypingResponse(complaint, response);
});

// Mitra Dropdown Toggle
const mitraCard = document.getElementById('mitraCard');
const mitraDetails = document.getElementById('mitraDetails');
const arrow = mitraCard.querySelector('.dropdown-arrow');

mitraCard.addEventListener('click', function() {
  mitraDetails.classList.toggle('show');
  if (mitraDetails.classList.contains('show')) {
    arrow.style.transform = 'rotate(180deg)';
  } else {
    arrow.style.transform = 'rotate(0deg)';
  }
});

// Close dropdown if click outside
document.addEventListener('click', function(e) {
  if (!mitraCard.contains(e.target) && !mitraDetails.contains(e.target)) {
    mitraDetails.classList.remove('show');
    arrow.style.transform = 'rotate(0deg)';
  }
});