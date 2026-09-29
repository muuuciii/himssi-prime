/**
 * HIMSSI Prime - Prime Athlete Management System
 * Pelatda Pencak Silat Menuju Kejurnas Piala KONI Jakarta 17 November 2026
 * Pure Vanilla JavaScript (ES6) with LocalStorage persistence & Chart.js
 */

// ============================================================
// 1. INITIAL DATABASE (DUMMY DATA)
// ============================================================
const DEFAULT_USERS = [
  // OWNER
  { id: 'u-1111', username: '1111', password: '031193', name: 'MUTIA KARTIKA, M.Pd.', role: 'OWNER', status: 'ACTIVE', athleteId: null, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80' },
  // MANAGERS
  { id: 'u-2222', username: '2222', password: '000000', name: 'Dr. DARMAYANTI, SE.,MM.', role: 'MANAGER', status: 'ACTIVE', athleteId: null, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80' },
  { id: 'u-3333', username: '3333', password: '000000', name: 'Siti Marisha Juliama, SH.,MH', role: 'MANAGER', status: 'ACTIVE', athleteId: null, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80' },
  // COACHES
  { id: 'u-4444', username: '4444', password: '123456', name: 'Miko Paldian, S.Pd.,Gr.', role: 'COACH', status: 'ACTIVE', athleteId: null, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80' },
  { id: 'u-5555', username: '5555', password: '123456', name: 'Bambang Irawan, SE.', role: 'COACH', status: 'ACTIVE', athleteId: null, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80' },
  // ATHLETES
  { id: 'u-0001', username: '0001', password: '123456', name: 'FATHIR ATHALLA', role: 'ATHLETE', status: 'ACTIVE', athleteId: 'ath-0001', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80' },
  { id: 'u-0002', username: '0002', password: '123456', name: 'ERICHA MAHARANI', role: 'ATHLETE', status: 'ACTIVE', athleteId: 'ath-0002', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80' },
  { id: 'u-0003', username: '0003', password: '123456', name: 'ALDO SAPUTRA', role: 'ATHLETE', status: 'ACTIVE', athleteId: 'ath-0003', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80' }
];

const DEFAULT_ATHLETES = [
  {
    id: 'ath-0001',
    username: '0001',
    name: 'FATHIR ATHALLA',
    gender: 'PA',
    kelas: 'D/PA PRA',
    komisariat: 'KERTAPATI',
    bbMin: 39.0,
    bbMax: 42.0,
    currentBB: 40.2,
    targetBB: 40.5,
    readinessScore: 92,
    readinessStatus: 'READY', // READY, MONITORING, WARNING
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    joinedDate: '2026-01-15'
  },
  {
    id: 'ath-0002',
    username: '0002',
    name: 'ERICHA MAHARANI',
    gender: 'PI',
    kelas: 'D/PI PRA',
    komisariat: 'KERTAPATI',
    bbMin: 39.0,
    bbMax: 42.0,
    currentBB: 40.5,
    targetBB: 40.5,
    readinessScore: 84,
    readinessStatus: 'READY',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80',
    joinedDate: '2026-01-15'
  },
  {
    id: 'ath-0003',
    username: '0003',
    name: 'ALDO SAPUTRA',
    gender: 'PA',
    kelas: 'E/PA PRA',
    komisariat: 'SEBERANG ULU 2',
    bbMin: 42.0,
    bbMax: 45.0,
    currentBB: 43.8,
    targetBB: 43.5,
    readinessScore: 74,
    readinessStatus: 'MONITORING',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
    joinedDate: '2026-02-01'
  }
];

const DEFAULT_WEIGHT_LOGS = [
  { id: 'w-1', athleteId: 'ath-0001', athleteName: 'FATHIR ATHALLA', date: '2026-09-15', weight: 41.2, note: 'Sesi latihan beban awal', recordedBy: 'Miko Paldian, S.Pd.,Gr.' },
  { id: 'w-2', athleteId: 'ath-0001', athleteName: 'FATHIR ATHALLA', date: '2026-09-22', weight: 40.6, note: 'Penurunan berat badan terkendali', recordedBy: 'Miko Paldian, S.Pd.,Gr.' },
  { id: 'w-3', athleteId: 'ath-0001', athleteName: 'FATHIR ATHALLA', date: '2026-09-29', weight: 40.2, note: 'Menuju timbang badan pertandingan.', recordedBy: 'Miko Paldian, S.Pd.,Gr.' },
  { id: 'w-4', athleteId: 'ath-0002', athleteName: 'ERICHA MAHARANI', date: '2026-09-15', weight: 41.0, note: 'Kondisi fisik optimal', recordedBy: 'Bambang Irawan, SE.' },
  { id: 'w-5', athleteId: 'ath-0002', athleteName: 'ERICHA MAHARANI', date: '2026-09-29', weight: 40.5, note: 'Target ideal terjaga stabil', recordedBy: 'Bambang Irawan, SE.' },
  { id: 'w-6', athleteId: 'ath-0003', athleteName: 'ALDO SAPUTRA', date: '2026-09-15', weight: 44.5, note: 'Mulai program defisit kalori', recordedBy: 'Miko Paldian, S.Pd.,Gr.' },
  { id: 'w-7', athleteId: 'ath-0003', athleteName: 'ALDO SAPUTRA', date: '2026-09-29', weight: 43.8, note: 'Progres baik, jaga cairan tubuh', recordedBy: 'Miko Paldian, S.Pd.,Gr.' }
];

const DEFAULT_WELLNESS = [
  { id: 'wel-1', athleteId: 'ath-0001', athleteName: 'FATHIR ATHALLA', date: '2026-09-29', rhr: 58, sleep: 8.5, fatigue: 2, soreness: 2, stress: 2, mood: 'Sangat Baik', weight: 40.2, score: 92, status: 'READY' },
  { id: 'wel-2', athleteId: 'ath-0002', athleteName: 'ERICHA MAHARANI', date: '2026-09-29', rhr: 62, sleep: 8.0, fatigue: 3, soreness: 3, stress: 2, mood: 'Baik', weight: 40.5, score: 84, status: 'READY' },
  { id: 'wel-3', athleteId: 'ath-0003', athleteName: 'ALDO SAPUTRA', date: '2026-09-29', rhr: 74, sleep: 6.5, fatigue: 5, soreness: 4, stress: 4, mood: 'Normal', weight: 43.8, score: 74, status: 'MONITORING' }
];

const DEFAULT_TRAINING = [
  { id: 'tr-1', name: 'Penguatan Pola Langkah & Tendangan Sabit Tanding', date: '2026-09-29', type: 'Teknik & Jurus', duration: 120, intensity: 'Tinggi', target: 'Kecepatan counter attack < 0.4 detik, 100 repetisi tendangan sabit kanan/kiri sasaran dada.', coach: 'Miko Paldian, S.Pd.,Gr.' },
  { id: 'tr-2', name: 'Simulasi Pertandingan Tanding 3 Babak Full Rules', date: '2026-09-28', type: 'Simulasi Pertandingan', duration: 90, intensity: 'Maksimal', target: 'Penerapan taktik jatuhan kaitan dan serang bela sesuai peraturan IPSI/KONI 2026.', coach: 'Bambang Irawan, SE.' },
  { id: 'tr-3', name: 'Interval Training & Sirkuit Fisik Anaerobik', date: '2026-09-26', type: 'Fisik & Stamina', duration: 90, intensity: 'Tinggi', target: 'Meningkatkan VO2Max dan ketahanan otot tungkai bawah menghadapi babak penentuan.', coach: 'Miko Paldian, S.Pd.,Gr.' },
  { id: 'tr-4', name: 'Sparring Partner & Bedah Teknik Jatuhan Bantingan', date: '2026-09-24', type: 'Sparring Partner', duration: 100, intensity: 'Tinggi', target: 'Refleks tangkapan tendangan lawan disusul sapuan rebah dan guntingan.', coach: 'Bambang Irawan, SE.' }
];

const DEFAULT_DOCS = [
  { id: 'doc-1', title: 'Sesi Latihan Fisik & Kecepatan Reaksi Kertapati', date: '2026-09-28', category: 'Foto Latihan', mediaUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&auto=format&fit=crop&q=80', videoUrl: 'https://www.youtube.com', notes: 'Evaluasi: Power tendangan atlet putra menunjukkan lonjakan akselerasi tajam.' },
  { id: 'doc-2', title: 'Simulasi Tanding & Uji Ketahanan Atlet Putri', date: '2026-09-26', category: 'Simulasi Tanding', mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', videoUrl: '', notes: 'Ericha Maharani sukses mengeksekusi 4x jatuhan bersih tanpa kehilangan poin serangan balasan.' }
];

const DEFAULT_EVALUATIONS = [
  { id: 'ev-1', athleteId: 'ath-0001', athleteName: 'FATHIR ATHALLA', date: '2026-09-28', physical: 92, technical: 90, tactical: 88, avg: 90, notes: 'Konsentrasi dan refleks elakan sangat prima. Pertahankan ritme napas saat diserang beruntun.', coach: 'Miko Paldian, S.Pd.,Gr.' },
  { id: 'ev-2', athleteId: 'ath-0002', athleteName: 'ERICHA MAHARANI', date: '2026-09-28', physical: 86, technical: 88, tactical: 85, avg: 86, notes: 'Penguasaan gelanggang sangat taktis. Kuda-kuda tangguh saat menahan dorongan.', coach: 'Bambang Irawan, SE.' },
  { id: 'ev-3', athleteId: 'ath-0003', athleteName: 'ALDO SAPUTRA', date: '2026-09-28', physical: 78, technical: 82, tactical: 80, avg: 80, notes: 'Teknik jatuhan bagus, namun stamina babak ketiga mulai menurun. Perbanyak asupan cairan dan istirahat.', coach: 'Miko Paldian, S.Pd.,Gr.' }
];

const DEFAULT_BRANDING = {
  appName: 'HIMSSI Prime',
  orgName: 'HIMSSI SUMSEL',
  subtitle: 'Prime Athlete Management System',
  eventTag: 'Pelatda Kejurnas Silat Piala KONI Jakarta 2026',
  logoUrl: 'https://res.cloudinary.com/warv2ock/image/upload/v1790667398/himssi.png'
};

// ============================================================
// 2. STATE & STORAGE CONTROLLER
// ============================================================
class SatriaDB {
  static get(key, defaultValue) {
    try {
      const stored = localStorage.getItem(`satria_${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.error('Storage Read Error:', e);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(`satria_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Storage Write Error:', e);
    }
  }

  static init() {
    if (!localStorage.getItem('satria_initialized')) {
      this.resetToDefaults();
    }
  }

  static resetToDefaults() {
    this.set('users', DEFAULT_USERS);
    this.set('athletes', DEFAULT_ATHLETES);
    this.set('weight_logs', DEFAULT_WEIGHT_LOGS);
    this.set('wellness', DEFAULT_WELLNESS);
    this.set('training', DEFAULT_TRAINING);
    this.set('docs', DEFAULT_DOCS);
    this.set('evaluations', DEFAULT_EVALUATIONS);
    this.set('branding', DEFAULT_BRANDING);
    localStorage.setItem('satria_initialized', 'true');
  }
}

// Global App State
const AppState = {
  currentUser: null,
  activePage: 'dashboard',
  weightChartInstance: null,
  readinessChartInstance: null,
  performanceChartInstance: null
};

// ============================================================
// 3. SMART FEATURE: ATHLETE READINESS CALCULATOR
// ============================================================
function calculateReadinessScore({ rhr, sleep, fatigue, soreness, stress, mood }) {
  // Sleep subscore (Target 8-9h): 0-100
  let sleepScore = 0;
  if (sleep >= 8) sleepScore = 100;
  else if (sleep >= 7) sleepScore = 85;
  else if (sleep >= 6) sleepScore = 65;
  else if (sleep >= 5) sleepScore = 45;
  else sleepScore = 30;

  // Fatigue, Soreness, Stress (scale 1-10 where 1 is best) -> invert to 0-100
  const fatigueScore = Math.max(0, 100 - (fatigue - 1) * 11);
  const sorenessScore = Math.max(0, 100 - (soreness - 1) * 11);
  const stressScore = Math.max(0, 100 - (stress - 1) * 11);

  // Mood scoring
  const moodScores = {
    'Sangat Baik': 100,
    'Baik': 85,
    'Normal': 70,
    'Kurang Baik': 50,
    'Buruk': 30
  };
  const moodScore = moodScores[mood] || 70;

  // RHR Penalty if elevated (>75 bpm for trained silat athlete)
  let rhrPenalty = 0;
  if (rhr > 85) rhrPenalty = 15;
  else if (rhr > 75) rhrPenalty = 8;

  // Weighted composite score (0-100)
  const composite = (sleepScore * 0.30) + (fatigueScore * 0.25) + (sorenessScore * 0.20) + (stressScore * 0.15) + (moodScore * 0.10) - rhrPenalty;
  const finalScore = Math.round(Math.min(100, Math.max(10, composite)));

  let status = 'READY';
  let label = 'Siap Latihan';
  let badgeClass = 'badge-success';
  let desc = 'Kondisi fisik prima, siap menjalani sesi latihan berintensitas tinggi hari ini!';

  if (finalScore < 60) {
    status = 'WARNING';
    label = 'Perlu Perhatian';
    badgeClass = 'badge-danger';
    desc = 'Kondisi tubuh mengalami kelelahan/stres tinggi. Dianjurkan latihan ringan & recovery aktif.';
  } else if (finalScore < 80) {
    status = 'MONITORING';
    label = 'Monitoring';
    badgeClass = 'badge-warning';
    desc = 'Kondisi cukup baik, lakukan pemanasan menyeluruh dan penyesuaian beban latihan.';
  }

  return { score: finalScore, status, label, badgeClass, desc };
}

// ============================================================
// 4. AUTHENTICATION & ACCESS CONTROL
// ============================================================
function initAuth() {
  const loginScreen = document.getElementById('loginScreen');
  const appContainer = document.getElementById('appContainer');
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const loginAlert = document.getElementById('loginAlert');
  const loginAlertText = document.getElementById('loginAlertText');

  // Check persisted session
  const savedUser = SatriaDB.get('session_user', null);
  if (savedUser) {
    loginSuccess(savedUser);
  }

  // Handle Form Submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const users = SatriaDB.get('users', DEFAULT_USERS);
    const matchedUser = users.find(u => u.username === username && u.password === password);

    if (!matchedUser) {
      showLoginAlert('Username atau password yang Anda masukkan salah!');
      return;
    }

    if (matchedUser.status === 'INACTIVE') {
      showLoginAlert('Akun Anda dinonaktifkan oleh Administrator (Owner)!');
      return;
    }

    loginSuccess(matchedUser);
  });

  // Toggle Password Visibility
  const toggleBtn = document.getElementById('togglePasswordBtn');
  const toggleIcon = document.getElementById('togglePasswordIcon');
  toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.className = 'fa-solid fa-eye-slash';
    } else {
      passwordInput.type = 'password';
      toggleIcon.className = 'fa-solid fa-eye';
    }
  });

  // Topbar Role Switcher Dropdown
  const btnRoleSwitcher = document.getElementById('btnRoleSwitcher');
  const roleSwitchMenu = document.getElementById('roleSwitchMenu');
  btnRoleSwitcher.addEventListener('click', (e) => {
    e.stopPropagation();
    roleSwitchMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('[data-switch-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetUsername = btn.getAttribute('data-switch-user');
      const users = SatriaDB.get('users', DEFAULT_USERS);
      const targetUser = users.find(u => u.username === targetUsername);
      if (targetUser) {
        roleSwitchMenu.classList.add('hidden');
        loginSuccess(targetUser);
        showToast(`Beralih peran sebagai ${targetUser.role} (${targetUser.name})`, 'success');
      }
    });
  });

  // Logout Buttons with direct listeners
  const sLogoutBtn = document.getElementById('sidebarLogoutBtn');
  if (sLogoutBtn) {
    sLogoutBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      logout();
    };
  }
  const tLogoutBtn = document.getElementById('topbarLogoutBtn');
  if (tLogoutBtn) {
    tLogoutBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      logout();
    };
  }

  function showLoginAlert(msg) {
    loginAlertText.textContent = msg;
    loginAlert.classList.remove('hidden');
    setTimeout(() => loginAlert.classList.add('hidden'), 4000);
  }
}

function loginSuccess(user) {
  AppState.currentUser = user;
  SatriaDB.set('session_user', user);

  const loginScreen = document.getElementById('loginScreen');
  if (loginScreen) {
    loginScreen.classList.add('hidden');
    loginScreen.style.display = 'none';
  }

  const appContainer = document.getElementById('appContainer');
  if (appContainer) {
    appContainer.classList.remove('hidden');
    appContainer.style.display = 'flex';
  }

  updateUserProfileUI(user);
  applyRolePermissions(user.role);
  renderAllViews();
}

function logout() {
  AppState.currentUser = null;
  localStorage.removeItem('satria_session_user');
  localStorage.removeItem('himssi_session_user');
  localStorage.removeItem('session_user');

  // Close all open modals, menus, and sidebars
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));

  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (backdrop) backdrop.classList.remove('active');

  const appContainer = document.getElementById('appContainer');
  if (appContainer) {
    appContainer.classList.add('hidden');
    appContainer.style.display = 'none';
  }

  const loginScreen = document.getElementById('loginScreen');
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
    loginScreen.style.display = 'flex';
  }

  const usernameInput = document.getElementById('usernameInput');
  if (usernameInput) usernameInput.value = '';
  const passwordInput = document.getElementById('passwordInput');
  if (passwordInput) passwordInput.value = '';

  showToast('Anda telah berhasil keluar dari sistem.', 'info');
}

function updateUserProfileUI(user) {
  const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80';
  const avatarUrl = user.avatar || defaultAvatar;

  // Sidebar User Card
  document.getElementById('sidebarUserAvatar').src = avatarUrl;
  document.getElementById('sidebarUserName').textContent = user.name;
  document.getElementById('sidebarUserRole').textContent = user.role;
  document.getElementById('sidebarUserExtra').textContent = `ID: ${user.username}`;

  // Topbar
  document.getElementById('topbarUserAvatar').src = avatarUrl;
  document.getElementById('topbarUserName').textContent = user.name;
  document.getElementById('topbarRoleBadge').textContent = user.role;
  const roleBadgeEl = document.getElementById('topbarUserRoleBadge');
  roleBadgeEl.textContent = user.role;
  roleBadgeEl.className = `badge badge-sm ${getRoleBadgeClass(user.role)}`;

  // Welcome Header in Dashboard
  document.getElementById('welcomeUserName').textContent = user.name;
}

function getRoleBadgeClass(role) {
  switch (role) {
    case 'OWNER': return 'badge-gold';
    case 'MANAGER': return 'badge-info';
    case 'COACH': return 'badge-warning';
    case 'ATHLETE': return 'badge-success';
    default: return 'badge-outline';
  }
}

// ============================================================
// 5. ROLE ACCESS CONTROL PERMISSIONS
// ============================================================
function applyRolePermissions(role) {
  const navUsers = document.getElementById('navUsersLink');
  const navWellness = document.getElementById('navWellnessLink');
  const btnAddAthlete = document.getElementById('btnOpenAddAthleteModal');
  const trainingActions = document.getElementById('trainingHeaderActions');
  const monitoringActions = document.getElementById('monitoringHeaderActions');
  const dbSettingsCard = document.getElementById('dbSettingsCard');
  const welcomeRoleDesc = document.getElementById('welcomeRoleDesc');
  const welcomeQuickActions = document.getElementById('welcomeQuickActions');
  const athletePersonalAlert = document.getElementById('athletePersonalAlert');

  // Reset displays
  navUsers.classList.remove('hidden');
  navWellness.classList.remove('hidden');
  btnAddAthlete.classList.remove('hidden');
  trainingActions.classList.remove('hidden');
  monitoringActions.classList.remove('hidden');
  dbSettingsCard.classList.remove('hidden');
  athletePersonalAlert.classList.add('hidden');

  if (role === 'OWNER') {
    welcomeRoleDesc.textContent = 'Akses Penuh Pengawasan & Pengendalian: Manajemen user, otoritas data atlet, dan monitoring kesiapan Kejurnas.';
    welcomeQuickActions.innerHTML = `
      <button class="btn btn-gold btn-sm" onclick="navigateTo('athletes')"><i class="fa-solid fa-users"></i> Kelola Atlet</button>
      <button class="btn btn-outline btn-sm" style="color:#fff; border-color:#fff;" onclick="navigateTo('users')"><i class="fa-solid fa-user-shield"></i> User Management</button>
      <button class="btn btn-outline btn-sm" style="color:#fff; border-color:#fff;" onclick="navigateTo('reports')"><i class="fa-solid fa-file-invoice"></i> Rekapitulasi</button>
    `;
  } else if (role === 'MANAGER') {
    // Read-only monitoring
    navUsers.classList.add('hidden');
    btnAddAthlete.classList.add('hidden');
    trainingActions.classList.add('hidden');
    monitoringActions.classList.add('hidden');
    dbSettingsCard.classList.add('hidden');
    welcomeRoleDesc.textContent = 'Akses Monitoring & Evaluasi: Memantau kondisi atlet, status berat badan, grafik performa, dan dokumentasi latihan kontingen.';
    welcomeQuickActions.innerHTML = `
      <button class="btn btn-gold btn-sm" onclick="navigateTo('monitoring')"><i class="fa-solid fa-heart-pulse"></i> Pantau Fisik & BB</button>
      <button class="btn btn-outline btn-sm" style="color:#fff; border-color:#fff;" onclick="navigateTo('training')"><i class="fa-solid fa-dumbbell"></i> Laporan Latihan</button>
      <button class="btn btn-outline btn-sm" style="color:#fff; border-color:#fff;" onclick="navigateTo('reports')"><i class="fa-solid fa-print"></i> Cetak Laporan</button>
    `;
  } else if (role === 'COACH') {
    navUsers.classList.add('hidden');
    dbSettingsCard.classList.add('hidden');
    welcomeRoleDesc.textContent = 'Akses Pelatih Lapangan: Mengatur program latihan, unggah dokumentasi & video, input timbang badan, serta evaluasi teknik atlet.';
    welcomeQuickActions.innerHTML = `
      <button class="btn btn-gold btn-sm" onclick="openModal('trainingModal')"><i class="fa-solid fa-calendar-plus"></i> Program Baru</button>
      <button class="btn btn-outline btn-sm" style="color:#fff; border-color:#fff;" onclick="openModal('weightModal')"><i class="fa-solid fa-weight-scale"></i> Input Timbang BB</button>
      <button class="btn btn-outline btn-sm" style="color:#fff; border-color:#fff;" onclick="openModal('evaluationModal')"><i class="fa-solid fa-star-half-stroke"></i> Evaluasi Atlet</button>
    `;
  } else if (role === 'ATHLETE') {
    // Personal Athlete access
    navUsers.classList.add('hidden');
    btnAddAthlete.classList.add('hidden');
    trainingActions.classList.add('hidden');
    monitoringActions.classList.add('hidden');
    dbSettingsCard.classList.add('hidden');
    athletePersonalAlert.classList.remove('hidden');

    welcomeRoleDesc.textContent = 'Akses Khusus Atlet: Pantau kesiapan pribadi, catat Daily Wellness setiap pagi, dan pantau progres menuju batas timbang badan.';
    welcomeQuickActions.innerHTML = `
      <button class="btn btn-gold btn-sm" onclick="navigateTo('wellness')"><i class="fa-solid fa-clipboard-check"></i> Isi Daily Wellness</button>
      <button class="btn btn-outline btn-sm" style="color:#fff; border-color:#fff;" onclick="navigateTo('monitoring')"><i class="fa-solid fa-scale-balanced"></i> Progres Berat Badan</button>
    `;

    renderAthletePersonalDashboardAlert();
  }
}

// ============================================================
// 6. COUNTDOWN WIDGET (Kejurnas 17 November 2026)
// ============================================================
function initCountdown() {
  const targetDate = new Date('2026-11-17T08:00:00+07:00').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('cdDays').textContent = '00';
      document.getElementById('cdHours').textContent = '00';
      document.getElementById('cdMinutes').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMinutes').textContent = String(minutes).padStart(2, '0');
  }

  update();
  setInterval(update, 60000);
}

// ============================================================
// 7. ROUTING & NAVIGATION
// ============================================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link[data-page]');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetPage = link.getAttribute('data-page');
      navigateTo(targetPage);

      // Close mobile sidebar if open
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });
  });

  // Mobile menu buttons
  document.getElementById('toggleSidebarBtn').addEventListener('click', () => {
    sidebar.classList.add('open');
    backdrop.classList.add('active');
  });

  document.getElementById('closeSidebarBtn').addEventListener('click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
  });

  backdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
  });

  // General Close Dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.role-switcher-dropdown')) {
      document.getElementById('roleSwitchMenu').classList.add('hidden');
    }
    if (!e.target.closest('.notification-dropdown')) {
      document.getElementById('notificationMenu').classList.add('hidden');
    }
  });

  // Notifications dropdown
  document.getElementById('notificationBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('notificationMenu').classList.toggle('hidden');
  });

  // Quick navigation buttons
  document.getElementById('btnGoToWellness')?.addEventListener('click', () => navigateTo('wellness'));
  document.getElementById('btnRefreshDashboard')?.addEventListener('click', () => {
    renderAllViews();
    showToast('Data dashboard telah disegarkan.', 'success');
  });

  // Tab switching in Training Page
  document.querySelectorAll('.tab-btn[data-target-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn[data-target-tab]').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target-tab');
      document.getElementById(targetId)?.classList.remove('hidden');
    });
  });
}

function navigateTo(pageId) {
  AppState.activePage = pageId;

  // Update active state in nav links
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Update visible section
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
    section.classList.add('hidden');
  });

  const activeSection = document.getElementById(`page-${pageId}`);
  if (activeSection) {
    activeSection.classList.remove('hidden');
    activeSection.classList.add('active');
  }

  // Update Header Title & Breadcrumb
  const titles = {
    dashboard: { title: 'Dashboard Utama', breadcrumb: 'Beranda / Monitoring Kesiapan Atlet' },
    athletes: { title: 'Manajemen Atlet', breadcrumb: 'Atlet / Direktori Kontingen Pelatda' },
    training: { title: 'Program & Evaluasi Latihan', breadcrumb: 'Latihan / Kurikulum & Dokumentasi' },
    monitoring: { title: 'Monitoring Fisik & Timbang Badan', breadcrumb: 'Monitoring / BB & Fisiologis' },
    users: { title: 'User Management', breadcrumb: 'Pengaturan / Hak Akses Pengguna' },
    wellness: { title: 'Daily Wellness Check', breadcrumb: 'Kebugaran / Input Mandiri Atlet' },
    reports: { title: 'Laporan Resmi Pelatda', breadcrumb: 'Laporan / Rekapitulasi Menuju Kejurnas' },
    profile: { title: 'Profil & Pengaturan', breadcrumb: 'Akun / Biodata & Preferensi' }
  };

  if (titles[pageId]) {
    document.getElementById('pageTitle').textContent = titles[pageId].title;
    document.getElementById('pageBreadcrumb').textContent = titles[pageId].breadcrumb;
  }

  // Refresh view contents
  renderAllViews();
}

// ============================================================
// 8. RENDER ALL VIEWS & CONTROLLERS
// ============================================================
function renderAllViews() {
  applyAppBranding();
  renderDashboardStats();
  renderAthleteTable();
  renderAthleteCards();
  renderTrainingPrograms();
  renderDocumentationGallery();
  renderEvaluations();
  renderWeightLogs();
  renderWellnessLogs();
  renderUserManagement();
  renderReportTable();
  renderProfilePage();
  renderNotifications();
  initCharts();
}

// Render Dashboard KPI Cards & Athlete Summary Table
function renderDashboardStats() {
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);

  const total = athletes.length;
  const ready = athletes.filter(a => a.readinessStatus === 'READY').length;
  const monitoring = athletes.filter(a => a.readinessStatus === 'MONITORING').length;
  const warning = athletes.filter(a => a.readinessStatus === 'WARNING').length;

  document.getElementById('statTotalAthletes').textContent = `${total} Atlet`;
  document.getElementById('statReadyAthletes').textContent = `${ready} Atlet`;
  document.getElementById('statMonitoringAthletes').textContent = `${monitoring} Atlet`;
  document.getElementById('statWarningAthletes').textContent = `${warning} Atlet`;

  document.getElementById('readinessGreenCount').textContent = `${ready} Atlet`;
  document.getElementById('readinessYellowCount').textContent = `${monitoring} Atlet`;
  document.getElementById('readinessRedCount').textContent = `${warning} Atlet`;

  // Render Table
  const tbody = document.getElementById('dashboardAthleteTableBody');
  tbody.innerHTML = '';

  athletes.forEach(ath => {
    const tr = document.createElement('tr');
    const bbStatus = getWeightStatus(ath.currentBB, ath.bbMin, ath.bbMax);
    const readBadge = getReadinessBadgeHtml(ath.readinessStatus, ath.readinessScore);

    tr.innerHTML = `
      <td>
        <div class="table-athlete-cell">
          <img src="${ath.avatar}" class="table-athlete-avatar" alt="${ath.name}">
          <div>
            <div class="athlete-name-text">${ath.name}</div>
            <div class="athlete-id-text">ID: ${ath.username}</div>
          </div>
        </div>
      </td>
      <td><strong>${ath.kelas}</strong></td>
      <td>${ath.komisariat}</td>
      <td><strong>${ath.currentBB.toFixed(1)} Kg</strong> <small class="text-muted">(${ath.bbMin}-${ath.bbMax} Kg)</small></td>
      <td><span class="badge ${bbStatus.badge}">${bbStatus.label}</span></td>
      <td><strong>${ath.readinessScore}</strong> / 100</td>
      <td>${readBadge}</td>
      <td class="text-right">
        <button class="btn btn-outline btn-sm" onclick="viewAthleteDetail('${ath.id}')">
          <i class="fa-solid fa-eye"></i> Detail
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function getWeightStatus(bb, min, max) {
  if (bb > max) {
    const diff = (bb - max).toFixed(1);
    return { label: `Over (+${diff} Kg)`, badge: 'badge-danger' };
  } else if (bb < min) {
    const diff = (min - bb).toFixed(1);
    return { label: `Under (-${diff} Kg)`, badge: 'badge-warning' };
  } else {
    return { label: 'Ideal Target', badge: 'badge-success' };
  }
}

function getReadinessBadgeHtml(status, score) {
  if (status === 'READY') {
    return `<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Siap Latihan</span>`;
  } else if (status === 'MONITORING') {
    return `<span class="badge badge-warning"><i class="fa-solid fa-triangle-exclamation"></i> Monitoring</span>`;
  } else {
    return `<span class="badge badge-danger"><i class="fa-solid fa-circle-exclamation"></i> Perlu Perhatian</span>`;
  }
}

function renderAthletePersonalDashboardAlert() {
  const athlete = getLoggedInAthleteProfile();
  if (!athlete) return;

  const wellnessList = SatriaDB.get('wellness', DEFAULT_WELLNESS);
  const latestWel = wellnessList.filter(w => w.athleteId === athlete.id).pop() || {
    score: athlete.readinessScore,
    status: athlete.readinessStatus,
    sleep: 8,
    rhr: 60,
    weight: athlete.currentBB
  };

  document.getElementById('athleteScoreVal').textContent = latestWel.score;
  const ring = document.getElementById('athleteScoreRing');

  if (latestWel.status === 'READY') {
    ring.style.borderColor = 'var(--status-green)';
    ring.style.color = 'var(--status-green)';
    ring.style.background = 'var(--status-green-light)';
    document.getElementById('athleteReadinessStatusTitle').textContent = 'Kondisi Prima: Siap Latihan Penuh!';
    document.getElementById('athleteReadinessBadge').className = 'badge badge-success';
    document.getElementById('athleteReadinessBadge').textContent = 'SIAP LATIHAN';
    document.getElementById('athleteReadinessAdvice').textContent = 'Tubuh Anda siap menerima pembebanan maksimal hari ini. Tetap jaga hidrasi dan pemanasan teratur.';
  } else if (latestWel.status === 'MONITORING') {
    ring.style.borderColor = 'var(--status-yellow)';
    ring.style.color = 'var(--status-yellow)';
    ring.style.background = 'var(--status-yellow-light)';
    document.getElementById('athleteReadinessStatusTitle').textContent = 'Monitoring: Tingkat Kelelahan Cukup Tinggi';
    document.getElementById('athleteReadinessBadge').className = 'badge badge-warning';
    document.getElementById('athleteReadinessBadge').textContent = 'MONITORING';
    document.getElementById('athleteReadinessAdvice').textContent = 'Konsultasikan dengan pelatih untuk penyesuaian repetisi teknik. Tingkatkan istirahat dan nutrisi protein.';
  } else {
    ring.style.borderColor = 'var(--status-red)';
    ring.style.color = 'var(--status-red)';
    ring.style.background = 'var(--status-red-light)';
    document.getElementById('athleteReadinessStatusTitle').textContent = 'Peringatan: Tubuh Butuh Pemulihan Segera!';
    document.getElementById('athleteReadinessBadge').className = 'badge badge-danger';
    document.getElementById('athleteReadinessBadge').textContent = 'PERHATIAN';
    document.getElementById('athleteReadinessAdvice').textContent = 'Denyut jantung atau pegal otot tinggi. Wajib lakukan peregangan statis, kompres es, dan tidur minimal 9 jam.';
  }

  document.getElementById('athleteTodaySleep').textContent = latestWel.sleep;
  document.getElementById('athleteTodayRHR').textContent = latestWel.rhr;
  document.getElementById('athleteTodayWeight').textContent = athlete.currentBB;
  document.getElementById('athleteClassTarget').textContent = `${athlete.kelas} (${athlete.bbMin}-${athlete.bbMax} Kg)`;
}

function getLoggedInAthleteProfile() {
  if (!AppState.currentUser || AppState.currentUser.role !== 'ATHLETE') return null;
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  return athletes.find(a => a.username === AppState.currentUser.username || a.id === AppState.currentUser.athleteId) || athletes[0];
}

// ============================================================
// 9. ATHLETE MANAGEMENT (PAGE 2)
// ============================================================
function renderAthleteCards() {
  const container = document.getElementById('athletesCardsContainer');
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  const search = document.getElementById('athleteSearchInput')?.value.toLowerCase() || '';
  const classFilter = document.getElementById('athleteClassFilter')?.value || '';
  const statusFilter = document.getElementById('athleteStatusFilter')?.value || '';

  const filtered = athletes.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search) || a.komisariat.toLowerCase().includes(search) || a.kelas.toLowerCase().includes(search);
    const matchClass = !classFilter || a.kelas === classFilter;
    const matchStatus = !statusFilter || a.readinessStatus === statusFilter;
    return matchSearch && matchClass && matchStatus;
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 3rem; background:#fff; border-radius:12px; border:1px dashed #cbd5e1;">
        <i class="fa-solid fa-user-slash" style="font-size: 2.5rem; color:#94a3b8; margin-bottom: 0.5rem;"></i>
        <h4 style="color:#475569;">Tidak ada data atlet yang sesuai filter</h4>
      </div>
    `;
    return;
  }

  filtered.forEach(ath => {
    const card = document.createElement('div');
    card.className = 'athlete-card';
    const bbStatus = getWeightStatus(ath.currentBB, ath.bbMin, ath.bbMax);

    const isOwner = AppState.currentUser?.role === 'OWNER';
    const isCoach = AppState.currentUser?.role === 'COACH';

    card.innerHTML = `
      <div class="athlete-card-header">
        <div class="card-avatar-wrap">
          <img src="${ath.avatar}" alt="${ath.name}" class="card-athlete-img">
        </div>
        <div class="card-athlete-info">
          <h4 class="card-athlete-name">${ath.name}</h4>
          <div class="card-athlete-class"><i class="fa-solid fa-medal"></i> ${ath.kelas}</div>
          <div class="card-athlete-komisariat"><i class="fa-solid fa-location-dot"></i> Kom. ${ath.komisariat}</div>
        </div>
      </div>
      <div class="athlete-card-body">
        <div class="athlete-stat-row">
          <div class="stat-item">
            <span class="stat-item-label">Berat Terkini</span>
            <span class="stat-item-val">${ath.currentBB.toFixed(1)} Kg</span>
          </div>
          <div class="stat-item">
            <span class="stat-item-label">Target Kelas</span>
            <span class="stat-item-val">${ath.bbMin} - ${ath.bbMax} Kg</span>
          </div>
          <div class="stat-item">
            <span class="stat-item-label">Status Berat</span>
            <span class="stat-item-val"><span class="badge ${bbStatus.badge}">${bbStatus.label}</span></span>
          </div>
          <div class="stat-item">
            <span class="stat-item-label">Readiness Score</span>
            <span class="stat-item-val">${ath.readinessScore} / 100</span>
          </div>
        </div>
      </div>
      <div class="athlete-card-footer">
        <div>
          ${getReadinessBadgeHtml(ath.readinessStatus, ath.readinessScore)}
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline btn-sm" onclick="viewAthleteDetail('${ath.id}')">
            <i class="fa-solid fa-eye"></i> Detail
          </button>
          ${isOwner ? `
            <button class="btn btn-outline btn-sm" onclick="openEditAthleteModal('${ath.id}')" title="Edit Data Atlet">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteAthlete('${ath.id}')" title="Hapus Atlet">
              <i class="fa-solid fa-trash"></i>
            </button>
          ` : ''}
          ${isCoach ? `
            <button class="btn btn-gold btn-sm" onclick="openWeightModalForAthlete('${ath.id}')" title="Input BB">
              <i class="fa-solid fa-weight-scale"></i>
            </button>
          ` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Window functions for Athlete CRUD
window.viewAthleteDetail = function(athleteId) {
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  const ath = athletes.find(a => a.id === athleteId);
  if (!ath) return;

  const weights = SatriaDB.get('weight_logs', DEFAULT_WEIGHT_LOGS).filter(w => w.athleteId === athleteId);
  const evals = SatriaDB.get('evaluations', DEFAULT_EVALUATIONS).filter(e => e.athleteId === athleteId);
  const wellness = SatriaDB.get('wellness', DEFAULT_WELLNESS).filter(w => w.athleteId === athleteId);

  const content = document.getElementById('athleteDetailContent');
  content.innerHTML = `
    <div style="display:flex; align-items:center; gap: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-light); padding-bottom: 1rem;">
      <img src="${ath.avatar}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--gold-bright); object-fit: cover;">
      <div>
        <h3 style="font-size: 1.35rem; font-weight:800;">${ath.name}</h3>
        <p style="color:var(--gold-primary); font-weight:700;">Kelas: ${ath.kelas} • Komisariat: ${ath.komisariat}</p>
        <p style="font-size: 0.8rem; color:var(--text-muted);">Rentang Batas: ${ath.bbMin} - ${ath.bbMax} Kg • BB Terkini: ${ath.currentBB} Kg • Username: ${ath.username}</p>
      </div>
    </div>

    <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.5rem;"><i class="fa-solid fa-weight-scale text-gold"></i> Riwayat Timbang Badan:</h4>
    <div style="max-height: 140px; overflow-y:auto; margin-bottom: 1rem; border:1px solid #e2e8f0; border-radius:8px;">
      <table class="table" style="font-size:0.8rem;">
        <thead><tr><th>Tanggal</th><th>Berat (Kg)</th><th>Catatan</th><th>Pelatih</th></tr></thead>
        <tbody>
          ${weights.length ? weights.map(w => `<tr><td>${w.date}</td><td><strong>${w.weight}</strong></td><td>${w.note}</td><td>${w.recordedBy}</td></tr>`).join('') : '<tr><td colspan="4" class="text-center">Belum ada riwayat timbang</td></tr>'}
        </tbody>
      </table>
    </div>

    <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.5rem;"><i class="fa-solid fa-heart-pulse text-gold"></i> Daily Wellness Terakhir:</h4>
    <div style="max-height: 140px; overflow-y:auto; margin-bottom: 1rem; border:1px solid #e2e8f0; border-radius:8px;">
      <table class="table" style="font-size:0.8rem;">
        <thead><tr><th>Tanggal</th><th>RHR</th><th>Tidur</th><th>Mood</th><th>Readiness Score</th></tr></thead>
        <tbody>
          ${wellness.length ? wellness.map(wl => `<tr><td>${wl.date}</td><td>${wl.rhr} BPM</td><td>${wl.sleep} Jam</td><td>${wl.mood}</td><td><strong>${wl.score}</strong> (${wl.status})</td></tr>`).join('') : '<tr><td colspan="5" class="text-center">Belum ada log wellness</td></tr>'}
        </tbody>
      </table>
    </div>

    <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:0.5rem;"><i class="fa-solid fa-clipboard-check text-gold"></i> Catatan Rapor Pelatih:</h4>
    <div style="max-height: 140px; overflow-y:auto; border:1px solid #e2e8f0; border-radius:8px;">
      <table class="table" style="font-size:0.8rem;">
        <thead><tr><th>Tanggal</th><th>Fisik</th><th>Teknik</th><th>Mental</th><th>Catatan</th></tr></thead>
        <tbody>
          ${evals.length ? evals.map(ev => `<tr><td>${ev.date}</td><td>${ev.physical}</td><td>${ev.technical}</td><td>${ev.tactical}</td><td>${ev.notes}</td></tr>`).join('') : '<tr><td colspan="5" class="text-center">Belum ada catatan evaluasi</td></tr>'}
        </tbody>
      </table>
    </div>
  `;

  openModal('athleteDetailModal');
};

window.openEditAthleteModal = function(athleteId) {
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  const ath = athletes.find(a => a.id === athleteId);
  if (!ath) return;

  document.getElementById('athleteModalTitle').textContent = 'Edit Data Atlet';
  document.getElementById('athleteFormId').value = ath.id;
  document.getElementById('athNameInput').value = ath.name;
  document.getElementById('athUsernameInput').value = ath.username;
  document.getElementById('athUsernameInput').disabled = true;
  document.getElementById('athPasswordInput').value = '******';
  document.getElementById('athClassInput').value = ath.kelas;
  document.getElementById('athBBRangeInput').value = `${ath.bbMin}-${ath.bbMax}`;
  document.getElementById('athKomisariatInput').value = ath.komisariat;
  document.getElementById('athCurrentBBInput').value = ath.currentBB;
  document.getElementById('athTargetBBInput').value = ath.targetBB;
  document.getElementById('athPhotoUrlInput').value = ath.avatar;

  openModal('athleteModal');
};

window.deleteAthlete = function(athleteId) {
  if (!confirm('Apakah Anda yakin ingin menghapus data atlet ini? Akun terkait juga akan dinonaktifkan.')) return;

  let athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  const ath = athletes.find(a => a.id === athleteId);
  athletes = athletes.filter(a => a.id !== athleteId);
  SatriaDB.set('athletes', athletes);

  // Also remove or deactivate associated user
  if (ath) {
    let users = SatriaDB.get('users', DEFAULT_USERS);
    users = users.filter(u => u.username !== ath.username);
    SatriaDB.set('users', users);
  }

  showToast('Data atlet berhasil dihapus.', 'success');
  renderAllViews();
};

window.openWeightModalForAthlete = function(athleteId) {
  openModal('weightModal');
  const select = document.getElementById('weightAthleteSelect');
  select.value = athleteId;
};

// ============================================================
// 10. TRAINING, EVALUATION & DOCUMENTATION (PAGE 3)
// ============================================================
function renderTrainingPrograms() {
  const tbody = document.getElementById('trainingProgramTableBody');
  const trainings = SatriaDB.get('training', DEFAULT_TRAINING);
  tbody.innerHTML = '';

  const isCoachOrOwner = AppState.currentUser?.role === 'COACH' || AppState.currentUser?.role === 'OWNER';

  trainings.forEach(tr => {
    const row = document.createElement('tr');
    let intensityBadge = 'badge-info';
    if (tr.intensity === 'Tinggi') intensityBadge = 'badge-warning';
    if (tr.intensity === 'Maksimal') intensityBadge = 'badge-danger';
    if (tr.intensity === 'Rendah') intensityBadge = 'badge-success';

    row.innerHTML = `
      <td><strong>${tr.date}</strong></td>
      <td><strong>${tr.name}</strong></td>
      <td><span class="badge badge-outline">${tr.type}</span></td>
      <td>${tr.duration} Menit</td>
      <td><span class="badge ${intensityBadge}">${tr.intensity}</span></td>
      <td><small>${tr.target}</small></td>
      <td><small>${tr.coach}</small></td>
      <td class="text-right">
        ${isCoachOrOwner ? `
          <button class="btn btn-outline-danger btn-sm" onclick="deleteTraining('${tr.id}')" title="Hapus">
            <i class="fa-solid fa-trash"></i>
          </button>
        ` : '-'}
      </td>
    `;
    tbody.appendChild(row);
  });
}

window.deleteTraining = function(id) {
  if (!confirm('Hapus sesi latihan ini?')) return;
  let trs = SatriaDB.get('training', DEFAULT_TRAINING);
  trs = trs.filter(t => t.id !== id);
  SatriaDB.set('training', trs);
  showToast('Program latihan dihapus.', 'success');
  renderTrainingPrograms();
};

function renderDocumentationGallery() {
  const container = document.getElementById('docGalleryContainer');
  const docs = SatriaDB.get('docs', DEFAULT_DOCS);
  container.innerHTML = '';

  docs.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-card';
    card.innerHTML = `
      <div class="doc-media-wrap">
        <img src="${doc.mediaUrl || 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&auto=format&fit=crop&q=80'}" alt="${doc.title}" class="doc-media-img">
        <span class="doc-category-badge">${doc.category}</span>
        ${doc.videoUrl ? `
          <a href="${doc.videoUrl}" target="_blank" class="doc-video-btn" title="Tonton Video">
            <i class="fa-solid fa-circle-play"></i>
          </a>
        ` : ''}
      </div>
      <div class="doc-card-body">
        <div class="doc-date"><i class="fa-solid fa-calendar-day"></i> ${doc.date}</div>
        <h4 class="doc-title">${doc.title}</h4>
        <div class="doc-notes"><i class="fa-solid fa-quote-left text-gold"></i> ${doc.notes}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderEvaluations() {
  const tbody = document.getElementById('evaluationTableBody');
  const evals = SatriaDB.get('evaluations', DEFAULT_EVALUATIONS);
  tbody.innerHTML = '';

  evals.forEach(ev => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${ev.date}</td>
      <td><strong>${ev.athleteName}</strong></td>
      <td><span class="badge badge-success">${ev.physical}</span></td>
      <td><span class="badge badge-info">${ev.technical}</span></td>
      <td><span class="badge badge-warning">${ev.tactical}</span></td>
      <td><strong>${ev.avg}</strong> / 100</td>
      <td><small>${ev.notes}</small></td>
      <td><small>${ev.coach}</small></td>
    `;
    tbody.appendChild(row);
  });
}

// ============================================================
// 11. MONITORING & WEIGHT LOGS (PAGE 4)
// ============================================================
function renderWeightLogs() {
  const tbody = document.getElementById('weightLogsTableBody');
  const logs = SatriaDB.get('weight_logs', DEFAULT_WEIGHT_LOGS);
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);

  tbody.innerHTML = '';

  let idealCount = 0;
  let overCount = 0;

  logs.slice().reverse().forEach(log => {
    const ath = athletes.find(a => a.id === log.athleteId) || { kelas: 'D/PA PRA', bbMin: 39, bbMax: 42 };
    const dev = (log.weight - ath.bbMax).toFixed(1);
    const bbStatus = getWeightStatus(log.weight, ath.bbMin, ath.bbMax);

    if (log.weight >= ath.bbMin && log.weight <= ath.bbMax) idealCount++;
    if (log.weight > ath.bbMax) overCount++;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${log.date}</strong></td>
      <td><strong>${log.athleteName}</strong></td>
      <td>${ath.kelas}</td>
      <td>${ath.bbMin} - ${ath.bbMax} Kg</td>
      <td><strong>${log.weight.toFixed(1)} Kg</strong></td>
      <td>${dev > 0 ? `<span class="text-danger">+${dev} Kg</span>` : `<span class="text-success">${dev} Kg</span>`}</td>
      <td><span class="badge ${bbStatus.badge}">${bbStatus.label}</span></td>
      <td><small>${log.note}</small></td>
      <td><small>${log.recordedBy}</small></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('statTotalWeightLogs').textContent = `${logs.length} Log`;
  document.getElementById('statIdealWeightCount').textContent = `${idealCount} Log`;
  document.getElementById('statOverWeightCount').textContent = `${overCount} Log`;
}

function renderWellnessLogs() {
  const tbody = document.getElementById('wellnessLogsTableBody');
  const logs = SatriaDB.get('wellness', DEFAULT_WELLNESS);
  tbody.innerHTML = '';

  let totalSleep = 0;
  logs.forEach(w => totalSleep += Number(w.sleep || 0));
  const avgSleep = logs.length ? (totalSleep / logs.length).toFixed(1) : 0;
  document.getElementById('statAvgSleepHours').textContent = `${avgSleep} Jam`;

  logs.slice().reverse().forEach(wl => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${wl.date}</td>
      <td><strong>${wl.athleteName}</strong></td>
      <td>${wl.rhr} BPM</td>
      <td>${wl.sleep} Jam</td>
      <td>${wl.fatigue} / 10</td>
      <td>${wl.soreness} / 10</td>
      <td>${wl.stress} / 10</td>
      <td>${wl.mood}</td>
      <td><strong>${wl.score}</strong></td>
      <td>${getReadinessBadgeHtml(wl.status, wl.score)}</td>
    `;
    tbody.appendChild(row);
  });
}

// ============================================================
// 12. USER MANAGEMENT (PAGE 6 - OWNER ONLY)
// ============================================================
function renderUserManagement() {
  const tbody = document.getElementById('usersTableBody');
  const users = SatriaDB.get('users', DEFAULT_USERS);
  const search = document.getElementById('userSearchInput')?.value.toLowerCase() || '';

  tbody.innerHTML = '';

  const filtered = users.filter(u => u.name.toLowerCase().includes(search) || u.username.toLowerCase().includes(search) || u.role.toLowerCase().includes(search));

  filtered.forEach(u => {
    const row = document.createElement('tr');
    const isCurrent = AppState.currentUser?.id === u.id;

    row.innerHTML = `
      <td>
        <div class="table-athlete-cell">
          <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'}" class="table-athlete-avatar" alt="${u.name}">
          <div>
            <div class="athlete-name-text">${u.name} ${isCurrent ? '<span class="badge badge-sm badge-gold">Anda</span>' : ''}</div>
            <div class="athlete-id-text">ID: ${u.id}</div>
          </div>
        </div>
      </td>
      <td><code>${u.username}</code></td>
      <td><span class="badge ${getRoleBadgeClass(u.role)}">${u.role}</span></td>
      <td>
        ${u.status === 'ACTIVE'
          ? '<span class="badge badge-success"><i class="fa-solid fa-check"></i> Aktif</span>'
          : '<span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Nonaktif</span>'
        }
      </td>
      <td>${u.athleteId ? 'Atlet Terdaftar' : 'Manajemen Tim'}</td>
      <td class="text-right">
        <button class="btn btn-outline btn-sm" onclick="openEditUserModal('${u.id}')" title="Edit Akun">
          <i class="fa-solid fa-pen"></i> Edit
        </button>
        ${!isCurrent ? `
          <button class="btn btn-outline btn-sm" onclick="toggleUserStatus('${u.id}')" title="Ubah Status">
            <i class="fa-solid fa-power-off"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteUser('${u.id}')" title="Hapus User">
            <i class="fa-solid fa-trash"></i>
          </button>
        ` : ''}
      </td>
    `;
    tbody.appendChild(row);
  });
}

window.openEditUserModal = function(userId) {
  const users = SatriaDB.get('users', DEFAULT_USERS);
  const u = users.find(usr => usr.id === userId);
  if (!u) return;

  document.getElementById('userModalTitle').textContent = 'Edit Pengguna';
  document.getElementById('userFormId').value = u.id;
  document.getElementById('usrFullNameInput').value = u.name;
  document.getElementById('usrUsernameInput').value = u.username;
  document.getElementById('usrPasswordInput').value = u.password;
  document.getElementById('usrRoleInput').value = u.role;
  document.getElementById('usrStatusInput').value = u.status;

  openModal('userModal');
};

window.toggleUserStatus = function(userId) {
  let users = SatriaDB.get('users', DEFAULT_USERS);
  users = users.map(u => {
    if (u.id === userId) {
      const nextStatus = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      return { ...u, status: nextStatus };
    }
    return u;
  });
  SatriaDB.set('users', users);
  showToast('Status pengguna berhasil diubah.', 'success');
  renderUserManagement();
};

window.deleteUser = function(userId) {
  if (!confirm('Yakin ingin menghapus pengguna ini?')) return;
  let users = SatriaDB.get('users', DEFAULT_USERS);
  users = users.filter(u => u.id !== userId);
  SatriaDB.set('users', users);
  showToast('Pengguna telah dihapus.', 'success');
  renderUserManagement();
};

// ============================================================
// 13. REPORT & PRINT MATRIX (PAGE 7)
// ============================================================
function renderReportTable() {
  const tbody = document.getElementById('reportTableBody');
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  tbody.innerHTML = '';

  const ready = athletes.filter(a => a.readinessStatus === 'READY').length;
  const monitoring = athletes.filter(a => a.readinessStatus === 'MONITORING').length;
  const warning = athletes.filter(a => a.readinessStatus === 'WARNING').length;

  document.getElementById('repTotalAthletes').textContent = `${athletes.length} Atlet`;
  document.getElementById('repReadyAthletes').textContent = `${ready} Atlet`;
  document.getElementById('repMonitoringAthletes').textContent = `${monitoring} Atlet`;
  document.getElementById('repWarningAthletes').textContent = `${warning} Atlet`;

  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const timeFormatted = now.toLocaleDateString('id-ID', options);
  if (document.getElementById('reportGeneratedTime')) {
    document.getElementById('reportGeneratedTime').textContent = timeFormatted;
  }
  if (document.getElementById('reportPrintDate')) {
    document.getElementById('reportPrintDate').textContent = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  athletes.forEach((ath, idx) => {
    const bbStatus = getWeightStatus(ath.currentBB, ath.bbMin, ath.bbMax);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${idx + 1}</td>
      <td><strong>${ath.name}</strong></td>
      <td>${ath.kelas}</td>
      <td>${ath.komisariat}</td>
      <td>${ath.bbMin} - ${ath.bbMax} Kg</td>
      <td><strong>${ath.currentBB.toFixed(1)} Kg</strong></td>
      <td>${bbStatus.label}</td>
      <td><strong>${ath.readinessScore}</strong> / 100</td>
      <td>${ath.readinessStatus === 'READY' ? 'Siap Latihan (Prima)' : ath.readinessStatus === 'MONITORING' ? 'Pengawasan Beban' : 'Istirahat / Warning'}</td>
    `;
    tbody.appendChild(row);
  });

  // Export JSON functionality
  document.getElementById('btnExportDataJSON')?.addEventListener('click', () => {
    const branding = SatriaDB.get('branding', DEFAULT_BRANDING);
    const data = {
      app: `${branding.appName} - ${branding.orgName}`,
      exportDate: new Date().toISOString(),
      athletes: SatriaDB.get('athletes', DEFAULT_ATHLETES),
      weights: SatriaDB.get('weight_logs', DEFAULT_WEIGHT_LOGS),
      wellness: SatriaDB.get('wellness', DEFAULT_WELLNESS),
      training: SatriaDB.get('training', DEFAULT_TRAINING),
      evaluations: SatriaDB.get('evaluations', DEFAULT_EVALUATIONS)
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${branding.appName}_Rekap_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Data berhasil diekspor dalam format JSON.', 'success');
  });
}

// ============================================================
// 14. PROFILE & SETTINGS (PAGE 8)
// ============================================================
function renderProfilePage() {
  const user = AppState.currentUser;
  if (!user) return;

  const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80';
  document.getElementById('profileCardAvatar').src = user.avatar || defaultAvatar;
  document.getElementById('profileCardName').textContent = user.name;
  document.getElementById('profileCardRole').textContent = user.role;
  document.getElementById('profileCardDetail').textContent = `Username: ${user.username} • Status: ${user.status}`;

  document.getElementById('profFullName').value = user.name;
  document.getElementById('profUsername').value = user.username;
  document.getElementById('profRoleDisplay').value = user.role;
  document.getElementById('profAvatarUrl').value = user.avatar || '';

  // Quick stats in profile
  const quickStats = document.getElementById('profileQuickStats');
  if (user.role === 'ATHLETE') {
    const ath = getLoggedInAthleteProfile();
    quickStats.innerHTML = `
      <div class="profile-stat-line"><span>Kelas Tanding:</span><strong>${ath?.kelas || '-'}</strong></div>
      <div class="profile-stat-line"><span>Komisariat:</span><strong>${ath?.komisariat || '-'}</strong></div>
      <div class="profile-stat-line"><span>BB Terkini:</span><strong>${ath?.currentBB || '-'} Kg</strong></div>
      <div class="profile-stat-line"><span>Batas Kelas:</span><strong>${ath?.bbMin || '-'} - ${ath?.bbMax || '-'} Kg</strong></div>
    `;
  } else {
    quickStats.innerHTML = `
      <div class="profile-stat-line"><span>Otoritas:</span><strong>${user.role} Tim Pelatda</strong></div>
      <div class="profile-stat-line"><span>Status Akun:</span><strong>${user.status}</strong></div>
      <div class="profile-stat-line"><span>Target Kejurnas:</span><strong>17 Nov 2026</strong></div>
    `;
  }

  // Profile photo file upload
  document.getElementById('profilePhotoInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const dataUrl = evt.target.result;
        updateUserAvatar(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  });

  // Profile Update Form
  const profileForm = document.getElementById('profileUpdateForm');
  profileForm.onsubmit = function(e) {
    e.preventDefault();
    const newName = document.getElementById('profFullName').value.trim();
    const newPassword = document.getElementById('profNewPassword').value.trim();
    const newAvatar = document.getElementById('profAvatarUrl').value.trim();

    let users = SatriaDB.get('users', DEFAULT_USERS);
    users = users.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          name: newName || u.name,
          password: newPassword || u.password,
          avatar: newAvatar || u.avatar
        };
      }
      return u;
    });

    SatriaDB.set('users', users);
    const updated = users.find(u => u.id === user.id);
    AppState.currentUser = updated;
    SatriaDB.set('session_user', updated);

    // If athlete, also update athlete name and avatar
    if (user.role === 'ATHLETE') {
      let athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
      athletes = athletes.map(a => {
        if (a.username === user.username) {
          return { ...a, name: newName || a.name, avatar: newAvatar || a.avatar };
        }
        return a;
      });
      SatriaDB.set('athletes', athletes);
    }

    updateUserProfileUI(updated);
    renderAllViews();
    showToast('Profil Anda berhasil diperbarui!', 'success');
  };

  // Branding Form Handling (Change App Name & Logo)
  initBrandingForm();

  // Seed default DB & clear data buttons
  document.getElementById('btnSeedDefaultData')?.addEventListener('click', () => {
    if (confirm('Kembalikan semua database ke setelan awal default? Data yang baru saja diinput akan direset.')) {
      SatriaDB.resetToDefaults();
      showToast('Database HIMSSI Prime berhasil direset ke kondisi awal.', 'success');
      renderAllViews();
    }
  });

  document.getElementById('btnClearAllData')?.addEventListener('click', () => {
    if (confirm('PERINGATAN: Hapus seluruh data LocalStorage HIMSSI Prime?')) {
      localStorage.clear();
      SatriaDB.resetToDefaults();
      location.reload();
    }
  });
}

function initBrandingForm() {
  const brandingForm = document.getElementById('appBrandingForm');
  if (!brandingForm) return;

  const currentBranding = SatriaDB.get('branding', DEFAULT_BRANDING);
  document.getElementById('settingAppName').value = currentBranding.appName || 'HIMSSI Prime';
  document.getElementById('settingOrgName').value = currentBranding.orgName || 'HIMSSI SUMSEL';
  document.getElementById('settingAppSubtitle').value = currentBranding.subtitle || 'Prime Athlete Management System';
  document.getElementById('settingEventTag').value = currentBranding.eventTag || 'Pelatda Kejurnas Piala KONI Jakarta 2026';
  document.getElementById('settingLogoUrl').value = currentBranding.logoUrl?.startsWith('data:') ? '' : currentBranding.logoUrl || '';
  document.getElementById('previewAppLogo').src = currentBranding.logoUrl || './assets/logo.png';

  // Only Owner and Manager can modify branding
  const brandingCard = document.getElementById('appBrandingCard');
  if (brandingCard) {
    if (AppState.currentUser?.role === 'OWNER' || AppState.currentUser?.role === 'MANAGER') {
      brandingCard.classList.remove('hidden');
    } else {
      brandingCard.classList.add('hidden');
    }
  }

  // Handle Logo Upload from device
  const fileInput = document.getElementById('settingLogoFileInput');
  fileInput.onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const dataUrl = evt.target.result;
        document.getElementById('previewAppLogo').src = dataUrl;
        document.getElementById('settingLogoUrl').value = '';
        saveLogoDirectly(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to default logo
  document.getElementById('btnResetDefaultLogo').onclick = function() {
    const defaultLogo = './assets/logo.png';
    document.getElementById('previewAppLogo').src = defaultLogo;
    document.getElementById('settingLogoUrl').value = '';
    saveLogoDirectly(defaultLogo);
    showToast('Logo dikembalikan ke default.', 'info');
  };

  function saveLogoDirectly(logoSrc) {
    const branding = SatriaDB.get('branding', DEFAULT_BRANDING);
    branding.logoUrl = logoSrc;
    SatriaDB.set('branding', branding);
    applyAppBranding();
  }

  brandingForm.onsubmit = function(e) {
    e.preventDefault();
    const appName = document.getElementById('settingAppName').value.trim() || 'HIMSSI Prime';
    const orgName = document.getElementById('settingOrgName').value.trim() || 'HIMSSI SUMSEL';
    const subtitle = document.getElementById('settingAppSubtitle').value.trim() || 'Prime Athlete Management System';
    const eventTag = document.getElementById('settingEventTag').value.trim();
    const logoUrlInput = document.getElementById('settingLogoUrl').value.trim();
    const currentBranding = SatriaDB.get('branding', DEFAULT_BRANDING);

    const updatedBranding = {
      appName,
      orgName,
      subtitle: subtitle || currentBranding.subtitle,
      eventTag: eventTag || currentBranding.eventTag,
      logoUrl: logoUrlInput || currentBranding.logoUrl || './assets/logo.png'
    };

    SatriaDB.set('branding', updatedBranding);
    applyAppBranding();
    showToast('Nama dan logo aplikasi berhasil diperbarui!', 'success');
  };
}

function applyAppBranding() {
  let branding = SatriaDB.get('branding', DEFAULT_BRANDING);
  if (!branding.logoUrl || branding.logoUrl.includes('cloudinary.com')) {
    branding.logoUrl = './assets/logo.png';
    SatriaDB.set('branding', branding);
  }
  const logo = branding.logoUrl || './assets/logo.png';

  // 1. Update Logo across pages
  document.querySelectorAll('.brand-logo, .mini-logo, .report-logo, #previewAppLogo').forEach(img => {
    img.src = logo;
    img.onerror = function() {
      if (this.src !== '/logo.png') {
        this.src = '/logo.png';
      }
    };
  });

  // 2. Update Sidebar & Top Header
  const sidebarBrand = document.querySelector('.sidebar-brand-name');
  if (sidebarBrand) {
    sidebarBrand.innerHTML = `${branding.appName}`;
  }
  const sidebarOrg = document.querySelector('.sidebar-org');
  if (sidebarOrg) {
    sidebarOrg.textContent = branding.orgName;
  }

  // 3. Update Login Screen Branding
  const loginBrand = document.querySelector('.brand-title');
  if (loginBrand) {
    loginBrand.innerHTML = `${branding.appName}`;
  }
  const loginSub = document.querySelector('.brand-subtitle');
  if (loginSub) {
    loginSub.textContent = branding.subtitle;
  }
  const loginEvent = document.querySelector('.event-tag');
  if (loginEvent) {
    loginEvent.innerHTML = `<i class="fa-solid fa-medal"></i> ${branding.eventTag}`;
  }

  // 4. Update Document Title
  document.title = `${branding.appName} - ${branding.orgName}`;
}

function updateUserAvatar(dataUrl) {
  let users = SatriaDB.get('users', DEFAULT_USERS);
  users = users.map(u => u.id === AppState.currentUser.id ? { ...u, avatar: dataUrl } : u);
  SatriaDB.set('users', users);
  AppState.currentUser.avatar = dataUrl;
  SatriaDB.set('session_user', AppState.currentUser);

  if (AppState.currentUser.role === 'ATHLETE') {
    let athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
    athletes = athletes.map(a => a.username === AppState.currentUser.username ? { ...a, avatar: dataUrl } : a);
    SatriaDB.set('athletes', athletes);
  }

  updateUserProfileUI(AppState.currentUser);
  document.getElementById('profileCardAvatar').src = dataUrl;
  showToast('Foto profil berhasil diperbarui!', 'success');
}

// ============================================================
// 15. NOTIFICATIONS
// ============================================================
function renderNotifications() {
  const notifList = document.getElementById('notifList');
  const notifBadge = document.getElementById('notifBadge');
  const notifCount = document.getElementById('notifCount');

  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  const notifications = [];

  athletes.forEach(ath => {
    if (ath.currentBB > ath.bbMax) {
      notifications.push({
        type: 'danger',
        icon: 'fa-triangle-exclamation text-danger',
        text: `<strong>${ath.name}</strong> over weight (+${(ath.currentBB - ath.bbMax).toFixed(1)} Kg dari target kelas ${ath.kelas}).`,
        time: 'Pagi Ini'
      });
    }
    if (ath.readinessStatus === 'MONITORING') {
      notifications.push({
        type: 'warning',
        icon: 'fa-eye text-warning',
        text: `<strong>${ath.name}</strong> butuh monitoring (Readiness Score: ${ath.readinessScore}).`,
        time: 'Pagi Ini'
      });
    }
  });

  notifBadge.textContent = notifications.length;
  notifCount.textContent = `${notifications.length} peringatan`;

  if (notifications.length === 0) {
    notifList.innerHTML = '<div style="padding:1rem; text-align:center; color:#94a3b8; font-size:0.8rem;">Tidak ada notifikasi kritis. Semua kondisi aman.</div>';
    return;
  }

  notifList.innerHTML = notifications.map(n => `
    <div class="notif-item">
      <i class="fa-solid ${n.icon}"></i>
      <div>
        <div>${n.text}</div>
        <small class="text-muted">${n.time}</small>
      </div>
    </div>
  `).join('');
}

// ============================================================
// 16. CHART.JS VISUALIZATIONS
// ============================================================
function initCharts() {
  if (typeof Chart === 'undefined') return;

  initWeightChart();
  initReadinessDoughnutChart();
  initPerformanceChart();
}

function initWeightChart() {
  const ctx = document.getElementById('weightChart');
  if (!ctx) return;

  const select = document.getElementById('weightChartAthleteSelect');
  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  const weights = SatriaDB.get('weight_logs', DEFAULT_WEIGHT_LOGS);

  // Populate select options if empty or out of sync
  if (select.children.length === 0) {
    select.innerHTML = athletes.map(a => `<option value="${a.id}">${a.name} (${a.kelas})</option>`).join('');
    select.addEventListener('change', () => initWeightChart());
  }

  const selectedAthleteId = select.value || athletes[0]?.id;
  const targetAthlete = athletes.find(a => a.id === selectedAthleteId) || athletes[0];
  if (!targetAthlete) return;

  const athleteLogs = weights.filter(w => w.athleteId === targetAthlete.id).sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = athleteLogs.length ? athleteLogs.map(l => l.date) : ['2026-09-15', '2026-09-22', '2026-09-29'];
  const dataPoints = athleteLogs.length ? athleteLogs.map(l => l.weight) : [targetAthlete.currentBB, targetAthlete.currentBB, targetAthlete.currentBB];

  const maxLine = new Array(labels.length).fill(targetAthlete.bbMax);
  const minLine = new Array(labels.length).fill(targetAthlete.bbMin);

  if (AppState.weightChartInstance) {
    AppState.weightChartInstance.destroy();
  }

  AppState.weightChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'BB Terukur (Kg)',
          data: dataPoints,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#d97706',
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: 'Batas Maksimal Kelas',
          data: maxLine,
          borderColor: '#ef4444',
          borderDash: [6, 6],
          pointRadius: 0,
          fill: false
        },
        {
          label: 'Batas Minimal Kelas',
          data: minLine,
          borderColor: '#3b82f6',
          borderDash: [6, 6],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${item.raw} Kg`
          }
        }
      },
      scales: {
        y: {
          min: Math.floor(targetAthlete.bbMin - 2),
          max: Math.ceil(targetAthlete.bbMax + 3),
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}

function initReadinessDoughnutChart() {
  const ctx = document.getElementById('readinessChart');
  if (!ctx) return;

  const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
  const ready = athletes.filter(a => a.readinessStatus === 'READY').length;
  const monitoring = athletes.filter(a => a.readinessStatus === 'MONITORING').length;
  const warning = athletes.filter(a => a.readinessStatus === 'WARNING').length;

  if (AppState.readinessChartInstance) {
    AppState.readinessChartInstance.destroy();
  }

  AppState.readinessChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Siap Latihan (Green)', 'Monitoring (Yellow)', 'Perlu Perhatian (Red)'],
      datasets: [{
        data: [ready, monitoring, warning],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function initPerformanceChart() {
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;

  const evals = SatriaDB.get('evaluations', DEFAULT_EVALUATIONS);
  const labels = ['Sesi 1 (15 Sep)', 'Sesi 2 (18 Sep)', 'Sesi 3 (21 Sep)', 'Sesi 4 (24 Sep)', 'Sesi 5 (26 Sep)', 'Sesi 6 (28 Sep)', 'Sesi 7 (29 Sep)'];

  if (AppState.performanceChartInstance) {
    AppState.performanceChartInstance.destroy();
  }

  AppState.performanceChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Skor Fisik Rata-rata',
          data: [82, 84, 85, 87, 88, 90, 91],
          backgroundColor: '#0f172a',
          borderRadius: 6
        },
        {
          label: 'Skor Teknik & Taktik',
          data: [80, 81, 83, 85, 86, 88, 89],
          backgroundColor: '#d97706',
          borderRadius: 6
        },
        {
          label: 'Ketahanan Tanding (Line)',
          data: [78, 80, 82, 84, 86, 88, 92],
          type: 'line',
          borderColor: '#10b981',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#10b981'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } }
        }
      },
      scales: {
        y: {
          min: 60,
          max: 100,
          ticks: { stepSize: 10 }
        }
      }
    }
  });
}

// ============================================================
// 17. FORM HANDLERS & MODALS CONTROLLER
// ============================================================
function initFormsAndModals() {
  // Populate athlete selects in modals
  function refreshModalAthleteSelects() {
    const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
    const weightSel = document.getElementById('weightAthleteSelect');
    const evalSel = document.getElementById('evalAthleteSelect');

    const options = athletes.map(a => `<option value="${a.id}">${a.name} (${a.kelas})</option>`).join('');
    if (weightSel) weightSel.innerHTML = options;
    if (evalSel) evalSel.innerHTML = options;
  }

  // Generic modal close handler
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  // Open Add Athlete Modal
  document.getElementById('btnOpenAddAthleteModal')?.addEventListener('click', () => {
    document.getElementById('athleteForm').reset();
    document.getElementById('athleteModalTitle').textContent = 'Tambah Data Atlet Baru';
    document.getElementById('athleteFormId').value = '';
    document.getElementById('athUsernameInput').disabled = false;
    openModal('athleteModal');
  });

  // Open Add User Modal
  document.getElementById('btnOpenAddUserModal')?.addEventListener('click', () => {
    document.getElementById('userForm').reset();
    document.getElementById('userModalTitle').textContent = 'Tambah Pengguna Baru';
    document.getElementById('userFormId').value = '';
    openModal('userModal');
  });

  // Open Training Modals
  document.getElementById('btnOpenAddTrainingModal')?.addEventListener('click', () => {
    document.getElementById('trainingForm').reset();
    document.getElementById('trDateInput').value = new Date().toISOString().slice(0, 10);
    openModal('trainingModal');
  });

  document.getElementById('btnOpenAddDocModal')?.addEventListener('click', () => {
    document.getElementById('docForm').reset();
    document.getElementById('docDateInput').value = new Date().toISOString().slice(0, 10);
    openModal('docModal');
  });

  document.getElementById('btnOpenAddWeightModal')?.addEventListener('click', () => {
    refreshModalAthleteSelects();
    document.getElementById('weightForm').reset();
    document.getElementById('weightDateInput').value = new Date().toISOString().slice(0, 10);
    openModal('weightModal');
  });

  document.getElementById('btnOpenEvaluationModal')?.addEventListener('click', () => {
    refreshModalAthleteSelects();
    document.getElementById('evaluationForm').reset();
    document.getElementById('evalDateInput').value = new Date().toISOString().slice(0, 10);
    openModal('evaluationModal');
  });

  // Handle Athlete Form Submit
  document.getElementById('athleteForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('athleteFormId').value;
    const name = document.getElementById('athNameInput').value.trim();
    const username = document.getElementById('athUsernameInput').value.trim();
    const password = document.getElementById('athPasswordInput').value.trim();
    const kelas = document.getElementById('athClassInput').value.trim();
    const bbRange = document.getElementById('athBBRangeInput').value.trim();
    const komisariat = document.getElementById('athKomisariatInput').value.trim();
    const currentBB = parseFloat(document.getElementById('athCurrentBBInput').value) || 40.0;
    const targetBB = parseFloat(document.getElementById('athTargetBBInput').value) || 40.5;
    const photoUrl = document.getElementById('athPhotoUrlInput').value.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80';

    const rangeParts = bbRange.split('-').map(s => parseFloat(s.trim()));
    const bbMin = rangeParts[0] || 39.0;
    const bbMax = rangeParts[1] || 42.0;

    let athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
    let users = SatriaDB.get('users', DEFAULT_USERS);

    if (id) {
      // Edit
      athletes = athletes.map(a => a.id === id ? {
        ...a, name, kelas, komisariat, bbMin, bbMax, currentBB, targetBB, avatar: photoUrl
      } : a);
      showToast('Data atlet berhasil diperbarui!', 'success');
    } else {
      // Create
      const newAthId = `ath-${Date.now().toString().slice(-4)}`;
      athletes.push({
        id: newAthId,
        username,
        name,
        gender: kelas.includes('/PI') ? 'PI' : 'PA',
        kelas,
        komisariat,
        bbMin,
        bbMax,
        currentBB,
        targetBB,
        readinessScore: 85,
        readinessStatus: 'READY',
        avatar: photoUrl,
        joinedDate: new Date().toISOString().slice(0, 10)
      });

      // Also create login user for athlete
      if (!users.some(u => u.username === username)) {
        users.push({
          id: `u-${username}`,
          username,
          password: password || '123456',
          name,
          role: 'ATHLETE',
          status: 'ACTIVE',
          athleteId: newAthId,
          avatar: photoUrl
        });
      }
      showToast('Atlet dan akun login baru berhasil didaftarkan!', 'success');
    }

    SatriaDB.set('athletes', athletes);
    SatriaDB.set('users', users);
    closeModal('athleteModal');
    renderAllViews();
  });

  // Handle User Form Submit (Owner)
  document.getElementById('userForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('userFormId').value;
    const name = document.getElementById('usrFullNameInput').value.trim();
    const username = document.getElementById('usrUsernameInput').value.trim();
    const password = document.getElementById('usrPasswordInput').value.trim();
    const role = document.getElementById('usrRoleInput').value;
    const status = document.getElementById('usrStatusInput').value;

    let users = SatriaDB.get('users', DEFAULT_USERS);

    if (id) {
      users = users.map(u => u.id === id ? { ...u, name, username, password, role, status } : u);
      showToast('Data pengguna berhasil diperbarui.', 'success');
    } else {
      if (users.some(u => u.username === username)) {
        alert('Username sudah digunakan! Gunakan username lain.');
        return;
      }
      users.push({
        id: `u-${Date.now().toString().slice(-4)}`,
        username,
        password,
        name,
        role,
        status,
        athleteId: null,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
      });
      showToast('Pengguna baru berhasil ditambahkan.', 'success');
    }

    SatriaDB.set('users', users);
    closeModal('userModal');
    renderUserManagement();
  });

  // Handle Training Form Submit
  document.getElementById('trainingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('trNameInput').value.trim();
    const date = document.getElementById('trDateInput').value;
    const type = document.getElementById('trTypeInput').value;
    const duration = parseInt(document.getElementById('trDurationInput').value) || 90;
    const intensity = document.getElementById('trIntensityInput').value;
    const target = document.getElementById('trTargetInput').value.trim();

    const trainings = SatriaDB.get('training', DEFAULT_TRAINING);
    trainings.unshift({
      id: `tr-${Date.now()}`,
      name,
      date,
      type,
      duration,
      intensity,
      target,
      coach: AppState.currentUser?.name || 'Miko Paldian, S.Pd.,Gr.'
    });

    SatriaDB.set('training', trainings);
    closeModal('trainingModal');
    showToast('Program latihan baru berhasil dipublikasikan!', 'success');
    renderTrainingPrograms();
  });

  // Handle Documentation Form Submit
  document.getElementById('docForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('docTitleInput').value.trim();
    const date = document.getElementById('docDateInput').value;
    const category = document.getElementById('docCategoryInput').value;
    const mediaUrl = document.getElementById('docMediaUrlInput').value.trim() || 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&auto=format&fit=crop&q=80';
    const videoUrl = document.getElementById('docVideoUrlInput').value.trim();
    const notes = document.getElementById('docNotesInput').value.trim();

    const fileInput = document.getElementById('docFileInput');
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        saveDocWithMedia(evt.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      saveDocWithMedia(mediaUrl);
    }

    function saveDocWithMedia(finalMedia) {
      const docs = SatriaDB.get('docs', DEFAULT_DOCS);
      docs.unshift({
        id: `doc-${Date.now()}`,
        title,
        date,
        category,
        mediaUrl: finalMedia,
        videoUrl,
        notes
      });
      SatriaDB.set('docs', docs);
      closeModal('docModal');
      showToast('Dokumentasi latihan berhasil diunggah!', 'success');
      renderDocumentationGallery();
    }
  });

  // Handle Weight Log Form Submit
  document.getElementById('weightForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const athleteId = document.getElementById('weightAthleteSelect').value;
    const date = document.getElementById('weightDateInput').value;
    const weight = parseFloat(document.getElementById('weightValInput').value);
    const note = document.getElementById('weightNoteInput').value.trim();

    let athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete) return;

    // Update athlete's current weight
    athletes = athletes.map(a => a.id === athleteId ? { ...a, currentBB: weight } : a);
    SatriaDB.set('athletes', athletes);

    // Add log
    const logs = SatriaDB.get('weight_logs', DEFAULT_WEIGHT_LOGS);
    logs.push({
      id: `w-${Date.now()}`,
      athleteId,
      athleteName: athlete.name,
      date,
      weight,
      note,
      recordedBy: AppState.currentUser?.name || 'Miko Paldian, S.Pd.,Gr.'
    });
    SatriaDB.set('weight_logs', logs);

    closeModal('weightModal');
    showToast(`Berat badan ${athlete.name} (${weight} Kg) berhasil disimpan!`, 'success');
    renderAllViews();
  });

  // Handle Evaluation Form Submit
  document.getElementById('evaluationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const athleteId = document.getElementById('evalAthleteSelect').value;
    const date = document.getElementById('evalDateInput').value;
    const physical = parseInt(document.getElementById('evalPhysicalInput').value);
    const technical = parseInt(document.getElementById('evalTechnicalInput').value);
    const tactical = parseInt(document.getElementById('evalTacticalInput').value);
    const notes = document.getElementById('evalNotesInput').value.trim();
    const avg = Math.round((physical + technical + tactical) / 3);

    const athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
    const ath = athletes.find(a => a.id === athleteId);

    const evals = SatriaDB.get('evaluations', DEFAULT_EVALUATIONS);
    evals.unshift({
      id: `ev-${Date.now()}`,
      athleteId,
      athleteName: ath ? ath.name : 'Atlet Silat',
      date,
      physical,
      technical,
      tactical,
      avg,
      notes,
      coach: AppState.currentUser?.name || 'Miko Paldian, S.Pd.,Gr.'
    });

    SatriaDB.set('evaluations', evals);
    closeModal('evaluationModal');
    showToast('Evaluasi atlet berhasil disimpan!', 'success');
    renderEvaluations();
  });

  // Search & filter live updates
  document.getElementById('athleteSearchInput')?.addEventListener('input', renderAthleteCards);
  document.getElementById('athleteClassFilter')?.addEventListener('change', renderAthleteCards);
  document.getElementById('athleteStatusFilter')?.addEventListener('change', renderAthleteCards);
  document.getElementById('userSearchInput')?.addEventListener('input', renderUserManagement);
}

// Modal helper
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
  }
};

// ============================================================
// 18. DAILY WELLNESS CHECK-IN CONTROLLER (SMART FEATURE)
// ============================================================
function initDailyWellness() {
  const inputRHR = document.getElementById('inputRHR');
  const inputSleep = document.getElementById('inputSleep');
  const inputFatigue = document.getElementById('inputFatigue');
  const inputSoreness = document.getElementById('inputSoreness');
  const inputStress = document.getElementById('inputStress');
  const inputWeight = document.getElementById('inputWeight');

  const valFatigue = document.getElementById('valFatigue');
  const valSoreness = document.getElementById('valSoreness');
  const valStress = document.getElementById('valStress');

  const labelFatigue = document.getElementById('labelFatigue');
  const labelSoreness = document.getElementById('labelSoreness');
  const labelStress = document.getElementById('labelStress');

  function updateLiveScore() {
    const rhr = parseFloat(inputRHR.value) || 60;
    const sleep = parseFloat(inputSleep.value) || 8;
    const fatigue = parseInt(inputFatigue.value) || 2;
    const soreness = parseInt(inputSoreness.value) || 2;
    const stress = parseInt(inputStress.value) || 2;
    const moodEl = document.querySelector('input[name="moodChoice"]:checked');
    const mood = moodEl ? moodEl.value : 'Sangat Baik';

    // Update range labels
    valFatigue.textContent = fatigue;
    valSoreness.textContent = soreness;
    valStress.textContent = stress;

    labelFatigue.textContent = fatigue <= 3 ? 'Segar & Bugar' : fatigue <= 6 ? 'Kelelahan Sedang' : 'Sangat Lelah';
    labelFatigue.className = fatigue <= 3 ? 'text-success' : fatigue <= 6 ? 'text-warning' : 'text-danger';

    labelSoreness.textContent = soreness <= 3 ? 'Bebas Nyeri' : soreness <= 6 ? 'Pegal Wajar' : 'Nyeri Otot Keras';
    labelSoreness.className = soreness <= 3 ? 'text-success' : soreness <= 6 ? 'text-warning' : 'text-danger';

    labelStress.textContent = stress <= 3 ? 'Tenang & Fokus' : stress <= 6 ? 'Sedikit Tegang' : 'Stres Berat';
    labelStress.className = stress <= 3 ? 'text-success' : stress <= 6 ? 'text-warning' : 'text-danger';

    // Calculate Smart Score
    const result = calculateReadinessScore({ rhr, sleep, fatigue, soreness, stress, mood });

    document.getElementById('previewScoreNumber').textContent = result.score;
    const badge = document.getElementById('previewStatusBadge');
    badge.className = `badge badge-lg ${result.badgeClass}`;
    badge.innerHTML = result.status === 'READY'
      ? `<i class="fa-solid fa-circle-check"></i> ${result.label}`
      : result.status === 'MONITORING'
        ? `<i class="fa-solid fa-triangle-exclamation"></i> ${result.label}`
        : `<i class="fa-solid fa-circle-exclamation"></i> ${result.label}`;

    document.getElementById('previewStatusDescription').textContent = result.desc;

    const circle = document.getElementById('previewScoreCircle');
    if (result.status === 'READY') {
      circle.style.borderColor = 'var(--status-green)';
      document.getElementById('previewScoreNumber').style.color = 'var(--status-green)';
    } else if (result.status === 'MONITORING') {
      circle.style.borderColor = 'var(--status-yellow)';
      document.getElementById('previewScoreNumber').style.color = 'var(--status-yellow)';
    } else {
      circle.style.borderColor = 'var(--status-red)';
      document.getElementById('previewScoreNumber').style.color = 'var(--status-red)';
    }
  }

  [inputRHR, inputSleep, inputFatigue, inputSoreness, inputStress].forEach(el => {
    el?.addEventListener('input', updateLiveScore);
  });

  document.querySelectorAll('input[name="moodChoice"]').forEach(el => {
    el.addEventListener('change', updateLiveScore);
  });

  updateLiveScore();

  // Form Submit
  document.getElementById('wellnessForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const rhr = parseFloat(inputRHR.value) || 60;
    const sleep = parseFloat(inputSleep.value) || 8;
    const fatigue = parseInt(inputFatigue.value) || 2;
    const soreness = parseInt(inputSoreness.value) || 2;
    const stress = parseInt(inputStress.value) || 2;
    const weight = parseFloat(inputWeight.value) || 40.0;
    const moodEl = document.querySelector('input[name="moodChoice"]:checked');
    const mood = moodEl ? moodEl.value : 'Sangat Baik';

    const result = calculateReadinessScore({ rhr, sleep, fatigue, soreness, stress, mood });
    const athlete = getLoggedInAthleteProfile() || { id: 'ath-0001', name: 'FATHIR ATHALLA' };

    // Save wellness entry
    const wellnessList = SatriaDB.get('wellness', DEFAULT_WELLNESS);
    const today = new Date().toISOString().slice(0, 10);

    wellnessList.unshift({
      id: `wel-${Date.now()}`,
      athleteId: athlete.id,
      athleteName: athlete.name,
      date: today,
      rhr,
      sleep,
      fatigue,
      soreness,
      stress,
      mood,
      weight,
      score: result.score,
      status: result.status
    });
    SatriaDB.set('wellness', wellnessList);

    // Also update athlete's readiness score & current weight
    let athletes = SatriaDB.get('athletes', DEFAULT_ATHLETES);
    athletes = athletes.map(a => a.id === athlete.id ? {
      ...a,
      currentBB: weight,
      readinessScore: result.score,
      readinessStatus: result.status
    } : a);
    SatriaDB.set('athletes', athletes);

    // Record weight log
    const weights = SatriaDB.get('weight_logs', DEFAULT_WEIGHT_LOGS);
    weights.push({
      id: `w-${Date.now()}`,
      athleteId: athlete.id,
      athleteName: athlete.name,
      date: today,
      weight,
      note: `Input mandiri Daily Wellness (Skor Kesiapan: ${result.score})`,
      recordedBy: athlete.name
    });
    SatriaDB.set('weight_logs', weights);

    showToast(`Daily Wellness berhasil dicatat! Status: ${result.label} (${result.score} Poin)`, result.status === 'READY' ? 'success' : 'warning');
    navigateTo('dashboard');
  });
}

// ============================================================
// 19. TOAST NOTIFICATIONS HELPER
// ============================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? 'fa-circle-check text-success' : type === 'warning' ? 'fa-triangle-exclamation text-warning' : type === 'danger' ? 'fa-circle-exclamation text-danger' : 'fa-circle-info text-info';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================================
// 20. INITIALIZATION ENTRY POINT & GLOBAL EXPORTS
// ============================================================

// Expose key functions globally on window for inline handlers & debugging
window.logout = logout;
window.navigateTo = navigateTo;
window.loginSuccess = loginSuccess;
window.showToast = showToast;
window.applyAppBranding = applyAppBranding;
window.renderAllViews = renderAllViews;

// Fullscreen Toggle Helper
window.toggleAppFullscreen = function() {
  try {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
      showToast('Mode Layar Penuh diaktifkan', 'info');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      showToast('Keluar dari Mode Layar Penuh', 'info');
    }
  } catch (err) {
    console.warn('Fullscreen toggle failed:', err);
  }
};

document.addEventListener('fullscreenchange', () => {
  const icon = document.getElementById('fullscreenIcon');
  if (icon) {
    if (document.fullscreenElement) {
      icon.className = 'fa-solid fa-compress text-gold';
    } else {
      icon.className = 'fa-solid fa-expand';
    }
  }
});

// Aliases for athlete & user editing if called by alternative names
window.editAthlete = function(athleteId) {
  if (typeof window.openEditAthleteModal === 'function') {
    window.openEditAthleteModal(athleteId);
  }
};
window.editUser = function(userId) {
  if (typeof window.openEditUserModal === 'function') {
    window.openEditUserModal(userId);
  }
};

// Global Delegated Click Handler (Catches any logout click anywhere in the app)
document.addEventListener('click', (e) => {
  const logoutTarget = e.target.closest('#sidebarLogoutBtn, #topbarLogoutBtn, .btn-logout, [data-action="logout"]');
  if (logoutTarget) {
    e.preventDefault();
    e.stopPropagation();
    logout();
  }
});

function startApp() {
  try {
    // Initialize Database
    SatriaDB.init();

    // Apply Current Application Branding (Name & Logo)
    applyAppBranding();

    // Initialize Modules
    initAuth();
    initCountdown();
    initNavigation();
    initFormsAndModals();
    initDailyWellness();

    // Set report print date to today
    const printDateEl = document.getElementById('reportPrintDate');
    if (printDateEl) {
      printDateEl.textContent = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  } catch (err) {
    console.error('App initialization error:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
