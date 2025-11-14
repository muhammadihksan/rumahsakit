
// DATABASE & STORAGE MANAGEMENT//


// Initialize databases
let users = JSON.parse(localStorage.getItem('puskesmasUsers')) || [];
let loginActivities = JSON.parse(localStorage.getItem('loginActivities')) || [];
let patients = JSON.parse(localStorage.getItem('patients')) || [];
let diagnoses = JSON.parse(localStorage.getItem('diagnoses')) || [];
let prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
let nurseSchedules = JSON.parse(localStorage.getItem('nurseSchedules')) || [];
let currentUser = null;

// Create default admin if no users exist
if (users.length === 0) {
    users.push({
        id: 'user_001',
        fullname: 'Administrator',
        username: 'ihksan',
        email: 'admin@puskesmas.id',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('puskesmasUsers', JSON.stringify(users));
}
else if (users.length === 0) {
    users.push({
        id: 'user_002',
        fullname: 'fata',
        username: 'fata',
        email: 'admin@puskesmas.id',
        password: 'perawat123',
        role: 'Perawat',
        status: 'active',
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('puskesmasUsers', JSON.stringify(users));
}

// Initialize default medicines if empty
if (medicines.length === 0) {
    medicines = [
        { id: 'MED001', name: 'Paracetamol 500mg', category: 'Analgesik', stock: 850, unit: 'Tablet', expired: '2026-12-31', status: 'Aman' },
        { id: 'MED002', name: 'Amoxicillin 500mg', category: 'Antibiotik', stock: 450, unit: 'Kapsul', expired: '2026-03-31', status: 'Aman' },
        { id: 'MED003', name: 'Vitamin C 1000mg', category: 'Vitamin', stock: 200, unit: 'Tablet', expired: '2026-06-30', status: 'Aman' }
    ];
    localStorage.setItem('medicines', JSON.stringify(medicines));
}

// UTILITY FUNCTIONS

function generateId(prefix) {
    return prefix + '_' + Date.now() + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateOnly(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

function getCurrentDate() {
    return new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showForm(formToShow) {
    document.querySelectorAll('.form-container, .message-container').forEach(form => {
        form.classList.remove('active');
    });
    formToShow.classList.add('active');
}

function logActivity(userId, username, role, action) {
    const activity = {
        id: generateId('ACT'),
        userId: userId,
        username: username,
        role: role,
        action: action,
        timestamp: new Date().toISOString(),
        ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
        userAgent: navigator.userAgent.substring(0, 50) + '...'
    };
    
    loginActivities.unshift(activity);
    if (loginActivities.length > 100) loginActivities = loginActivities.slice(0, 100);
    localStorage.setItem('loginActivities', JSON.stringify(loginActivities));
}

function saveData() {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('diagnoses', JSON.stringify(diagnoses));
    localStorage.setItem('prescriptions', JSON.stringify(prescriptions));
    localStorage.setItem('medicines', JSON.stringify(medicines));
    localStorage.setItem('nurseSchedules', JSON.stringify(nurseSchedules));
    localStorage.setItem('puskesmasUsers', JSON.stringify(users));
}

// PDF GENERATION FUNCTION


function generatePDF(patientId) {
    const patient = patients.find(p => p.id === patientId);
    const patientDiagnoses = diagnoses.filter(d => d.patientId === patientId);
    
    if (!patient) return;
    
    let content = `
RIWAYAT MEDIS PASIEN
=====================================

DATA PASIEN:
Nama: ${patient.name}
No. RM: ${patient.medicalRecordNumber}
Usia: ${patient.age} tahun
Jenis Kelamin: ${patient.gender}
Alamat: ${patient.address}
Telepon: ${patient.phone}
Tanggal Daftar: ${formatDateOnly(patient.createdAt)}

=====================================
RIWAYAT DIAGNOSIS:

`;

    if (patientDiagnoses.length === 0) {
        content += 'Belum ada riwayat diagnosis.\n';
    } else {
        patientDiagnoses.forEach((diag, index) => {
            content += `
${index + 1}. DIAGNOSIS (${formatDateOnly(diag.createdAt)})
   Dokter: ${diag.doctorName}
   Keluhan: ${diag.complaint}
   Diagnosis: ${diag.diagnosis}
   Tindakan: ${diag.treatment}
   
`;
        });
    }

    content += `
=====================================
Dicetak pada: ${getCurrentDate()}
SIM Puskesmas 24 Jam
`;

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Riwayat_Medis_${patient.medicalRecordNumber}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Riwayat medis berhasil didownload!');
}

// ========================================
// LOGIN FORM HANDLING
// ========================================

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const successMessage = document.getElementById('successMessage');

// Form switching
document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    showForm(registerForm);
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    showForm(loginForm);
});

document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
    e.preventDefault();
    showForm(forgotPasswordForm);
});

document.getElementById('backToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    showForm(loginForm);
});

document.getElementById('continueBtn').addEventListener('click', () => {
    showForm(loginForm);
});

// Login handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!role) {
        alert('Pilih role terlebih dahulu!');
        return;
    }
    
    const user = users.find(u => 
        u.username === username && 
        u.password === password && 
        u.role === role &&
        u.status === 'active'
    );
    
    if (user) {
        currentUser = user;
        
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({
                username: user.username,
                role: user.role
            }));
        }
        
        logActivity(user.id, user.username, user.role, 'Login');
        showDashboard(role, user);
    } else {
        alert('Username, password, atau role salah, atau akun tidak aktif!');
    }
});

// Register handler
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullname = document.getElementById('regFullname').value;
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const role = document.getElementById('regRole').value;
    
    if (!role) {
        alert('Pilih role terlebih dahulu!');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak sama!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password minimal 6 karakter!');
        return;
    }
    
    if (users.find(u => u.username === username)) {
        alert('Username sudah digunakan!');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        alert('Email sudah terdaftar!');
        return;
    }
    
    const newUser = {
        id: generateId('USER'),
        fullname,
        username,
        email,
        password,
        role,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveData();
    
    logActivity(newUser.id, newUser.username, newUser.role, 'Registrasi');
    
    document.getElementById('successText').textContent = `Akun berhasil dibuat untuk ${fullname}! Silakan login.`;
    showForm(successMessage);
    
    registerForm.reset();
});

// Forgot password handler
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    const user = users.find(u => u.email === email);
    
    if (user) {
        document.getElementById('successText').textContent = `Link reset password telah dikirim ke ${email}.`;
        showForm(successMessage);
        forgotPasswordForm.reset();
    } else {
        alert('Email tidak terdaftar!');
    }
});

// Password validation
document.getElementById('regPassword').addEventListener('input', (e) => {
    const password = e.target.value;
    const color = password.length < 6 ? '#ff4444' : password.length < 10 ? '#ffaa00' : '#44ff44';
    e.target.style.borderColor = color;
});

document.getElementById('regConfirmPassword').addEventListener('input', (e) => {
    const password = document.getElementById('regPassword').value;
    const confirmPassword = e.target.value;
    
    if (confirmPassword && password !== confirmPassword) {
        e.target.style.borderColor = '#ff4444';
    } else if (confirmPassword) {
        e.target.style.borderColor = '#44ff44';
    }
});

// Remember me functionality
window.addEventListener('load', () => {
    const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
    
    if (rememberedUser) {
        document.getElementById('loginUsername').value = rememberedUser.username;
        document.getElementById('loginRole').value = rememberedUser.role;
        document.getElementById('rememberMe').checked = true;
    }
});

// ========================================
// DASHBOARD DISPLAY FUNCTIONS
// ========================================

function showDashboard(role, user) {
    showPage('loginPage');
    
    switch(role) {
        case 'admin':
            showPage('dashboardAdmin');
            initAdminDashboard(user);
            break;
        case 'perawat':
            showPage('dashboardPerawat');
            initPerawatDashboard(user);
            break;
        case 'dokter':
            showPage('dashboardDokter');
            initDokterDashboard(user);
            break;
        case 'simpus':
            showPage('dashboardSimpus');
            initSimpusDashboard(user);
            break;
        case 'apoteker':
            showPage('dashboardApoteker');
            initApotekerDashboard(user);
            break;
    }
}

// ========================================
// ADMIN DASHBOARD
// ========================================

function initAdminDashboard(user) {
    document.getElementById('adminName').textContent = user.fullname;
    document.getElementById('currentDate').textContent = getCurrentDate();
    
    renderAdminOverview();
    
    document.querySelectorAll('#dashboardAdmin .menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('#dashboardAdmin .menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const page = link.getAttribute('data-page');
            
            switch(page) {
                case 'admin-overview':
                    renderAdminOverview();
                    break;
                case 'admin-users':
                    renderAdminUsers();
                    break;
                case 'admin-activity':
                    renderAdminActivity();
                    break;
                case 'admin-stats':
                    renderAdminPatients();
                    break;
                case 'admin-settings':
                    renderAdminSchedule();
                    break;
            }
        });
    });
    
    document.getElementById('logoutAdmin').addEventListener('click', (e) => {
        e.preventDefault();
        logActivity(user.id, user.username, user.role, 'Logout');
        currentUser = null;
        showPage('loginPage');
        showForm(loginForm);
    });
}

function renderAdminOverview() {
    const content = document.getElementById('adminContent');
    
    const totalUsers = users.length;
    const totalPatients = patients.length;
    const todayPatients = patients.filter(p => {
        const today = new Date().toDateString();
        const patientDate = new Date(p.createdAt).toDateString();
        return today === patientDate;
    }).length;
    
    content.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Total Pengguna</div>
                        <div class="stat-card-value">${totalUsers}</div>
                    </div>
                    <div class="stat-card-icon">👥</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Total Pasien</div>
                        <div class="stat-card-value">${totalPatients}</div>
                    </div>
                    <div class="stat-card-icon">🏥</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Pasien Hari Ini</div>
                        <div class="stat-card-value">${todayPatients}</div>
                    </div>
                    <div class="stat-card-icon">🤒</div>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Total Aktivitas</div>
                        <div class="stat-card-value">${loginActivities.length}</div>
                    </div>
                    <div class="stat-card-icon">📊</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Akses Cepat</h3>
            <div class="stats-grid">
                <button class="btn-primary" onclick="navigateToMenu('admin-stats')" style="padding: 20px;">
                    📋 Kelola Pasien
                </button>
                <button class="btn-primary" onclick="navigateToMenu('admin-settings')" style="padding: 20px;">
                    📅 Jadwal Perawat
                </button>
                <button class="btn-primary" onclick="navigateToMenu('admin-users')" style="padding: 20px;">
                    👥 Kelola Pengguna
                </button>
                <button class="btn-primary" onclick="navigateToMenu('admin-activity')" style="padding: 20px;">
                    📝 Log Aktivitas
                </button>
            </div>
        </div>
    `;
}

function navigateToMenu(menuPage) {
    const link = document.querySelector(`[data-page="${menuPage}"]`);
    if (link) link.click();
}

function renderAdminUsers() {
    const content = document.getElementById('adminContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Manajemen Pengguna</h3>
            <div class="search-bar">
                <input type="text" id="searchUser" class="search-input" placeholder="Cari pengguna...">
                <select id="filterRole">
                    <option value="">Semua Role</option>
                    <option value="admin">Admin</option>
                    <option value="perawat">Perawat</option>
                    <option value="dokter">Dokter</option>
                    <option value="simpus">Tim SIMPUS</option>
                    <option value="apoteker">Apoteker</option>
                </select>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nama Lengkap</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Terdaftar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="usersTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    renderUsersTable();
    
    document.getElementById('searchUser').addEventListener('input', renderUsersTable);
    document.getElementById('filterRole').addEventListener('change', renderUsersTable);
}

function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    const searchTerm = document.getElementById('searchUser').value.toLowerCase();
    const roleFilter = document.getElementById('filterRole').value;
    
    let filteredUsers = users.filter(user => {
        const matchSearch = user.fullname.toLowerCase().includes(searchTerm) || 
                          user.username.toLowerCase().includes(searchTerm);
        const matchRole = !roleFilter || user.role === roleFilter;
        
        return matchSearch && matchRole;
    });
    
    tbody.innerHTML = filteredUsers.map(user => `
        <tr>
            <td>${user.fullname}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td><span class="badge badge-primary">${user.role.toUpperCase()}</span></td>
            <td><span class="badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}">${user.status === 'active' ? 'Aktif' : 'Nonaktif'}</span></td>
            <td>${formatDateOnly(user.createdAt)}</td>
            <td>
                <button class="btn-secondary" onclick="toggleUserStatus('${user.id}')">
                    ${user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                ${user.role !== 'admin' ? `<button class="btn-danger" onclick="deleteUser('${user.id}')">Hapus</button>` : ''}
            </td>
        </tr>
    `).join('');
}

window.toggleUserStatus = function(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        saveData();
        renderUsersTable();
    }
};

window.deleteUser = function(userId) {
    if (confirm('Yakin ingin menghapus pengguna ini?')) {
        users = users.filter(u => u.id !== userId);
        saveData();
        renderUsersTable();
    }
};

function renderAdminActivity() {
    const content = document.getElementById('adminContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Log Aktivitas Login</h3>
            <div class="search-bar">
                <input type="text" id="searchActivity" class="search-input" placeholder="Cari aktivitas...">
                <select id="filterAction">
                    <option value="">Semua Aksi</option>
                    <option value="Login">Login</option>
                    <option value="Logout">Logout</option>
                    <option value="Registrasi">Registrasi</option>
                </select>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Aksi</th>
                            <th>IP Address</th>
                            <th>Waktu</th>
                        </tr>
                    </thead>
                    <tbody id="activityTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    renderActivityTable();
    
    document.getElementById('searchActivity').addEventListener('input', renderActivityTable);
    document.getElementById('filterAction').addEventListener('change', renderActivityTable);
}

function renderActivityTable() {
    const tbody = document.getElementById('activityTableBody');
    const searchTerm = document.getElementById('searchActivity').value.toLowerCase();
    const actionFilter = document.getElementById('filterAction').value;
    
    let filteredActivities = loginActivities.filter(activity => {
        const matchSearch = activity.username.toLowerCase().includes(searchTerm);
        const matchAction = !actionFilter || activity.action === actionFilter;
        
        return matchSearch && matchAction;
    });
    
    tbody.innerHTML = filteredActivities.slice(0, 50).map(activity => `
        <tr>
            <td>${activity.username}</td>
            <td><span class="badge badge-info">${activity.role}</span></td>
            <td><span class="badge badge-success">${activity.action}</span></td>
            <td>${activity.ipAddress}</td>
            <td>${formatDate(activity.timestamp)}</td>
        </tr>
    `).join('');
}

function renderAdminPatients() {
    const content = document.getElementById('adminContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Manajemen Data Pasien</h3>
            <button class="btn-primary" onclick="showAddPatientModal()" style="margin-bottom: 20px;">
                ➕ Tambah Pasien Baru
            </button>
            <div class="search-bar">
                <input type="text" id="searchPatient" class="search-input" placeholder="Cari pasien...">
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. Antrian</th>
                            <th>No. RM</th>
                            <th>Nama Pasien</th>
                            <th>Usia</th>
                            <th>Jenis Kelamin</th>
                            <th>Telepon</th>
                            <th>Status</th>
                            <th>Tgl Daftar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="patientsTableBody">
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Modal Add Patient -->
        <div id="addPatientModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Tambah Pasien Baru</h3>
                    <span class="modal-close" onclick="closeAddPatientModal()">&times;</span>
                </div>
                <form id="addPatientForm">
                    <div class="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" id="patientName" required>
                    </div>
                    <div class="form-group">
                        <label>Usia (tahun)</label>
                        <input type="number" id="patientAge" required>
                    </div>
                    <div class="form-group">
                        <label>Jenis Kelamin</label>
                        <select id="patientGender" required>
                            <option value="">Pilih</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Alamat</label>
                        <textarea id="patientAddress" rows="2" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>No. Telepon</label>
                        <input type="tel" id="patientPhone" required>
                    </div>
                    <div class="form-group">
                        <label>Keluhan</label>
                        <textarea id="patientComplaint" rows="2" required></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Daftarkan Pasien</button>
                </form>
            </div>
        </div>
    `;
    
    renderPatientsTable();
    
    document.getElementById('searchPatient').addEventListener('input', renderPatientsTable);
    
    document.getElementById('addPatientForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addNewPatient();
    });
}

function renderPatientsTable() {
    const tbody = document.getElementById('patientsTableBody');
    const searchTerm = document.getElementById('searchPatient').value.toLowerCase();
    
    let filteredPatients = patients.filter(patient => {
        return patient.name.toLowerCase().includes(searchTerm) || 
               patient.medicalRecordNumber.toLowerCase().includes(searchTerm);
    });
    
    tbody.innerHTML = filteredPatients.map(patient => `
        <tr>
            <td><strong>${patient.queueNumber}</strong></td>
            <td>${patient.medicalRecordNumber}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.phone}</td>
            <td><span class="badge badge-${patient.status === 'Menunggu' ? 'warning' : patient.status === 'Diperiksa' ? 'info' : 'success'}">${patient.status}</span></td>
            <td>${formatDateOnly(patient.createdAt)}</td>
            <td>
                <button class="btn-danger" onclick="deletePatient('${patient.id}')">Hapus</button>
            </td>
        </tr>
    `).join('');
}

window.showAddPatientModal = function() {
    document.getElementById('addPatientModal').classList.add('active');
};

window.closeAddPatientModal = function() {
    document.getElementById('addPatientModal').classList.remove('active');
    document.getElementById('addPatientForm').reset();
};

function addNewPatient() {
    const newPatient = {
        id: generateId('PAT'),
        queueNumber: 'A' + String(patients.length + 1).padStart(3, '0'),
        medicalRecordNumber: 'RM-' + new Date().getFullYear() + '-' + String(patients.length + 1).padStart(4, '0'),
        name: document.getElementById('patientName').value,
        age: document.getElementById('patientAge').value,
        gender: document.getElementById('patientGender').value,
        address: document.getElementById('patientAddress').value,
        phone: document.getElementById('patientPhone').value,
        complaint: document.getElementById('patientComplaint').value,
        status: 'Menunggu',
        createdAt: new Date().toISOString()
    };
    
    patients.push(newPatient);
    saveData();
    
    alert(`Pasien berhasil didaftarkan!\n\nNomor Antrian: ${newPatient.queueNumber}\nNo. RM: ${newPatient.medicalRecordNumber}`);
    
    closeAddPatientModal();
    renderPatientsTable();
}

window.deletePatient = function(patientId) {
    if (confirm('Yakin ingin menghapus data pasien ini?')) {
        patients = patients.filter(p => p.id !== patientId);
        diagnoses = diagnoses.filter(d => d.patientId !== patientId);
        prescriptions = prescriptions.filter(p => p.patientId !== patientId);
        saveData();
        renderPatientsTable();
        alert('Data pasien berhasil dihapus!');
    }
};

function renderAdminSchedule() {
    const content = document.getElementById('adminContent');
    
    const nurses = users.filter(u => u.role === 'perawat');
    
    content.innerHTML = `
        <div class="card">
            <h3>Jadwal Jaga Perawat</h3>
            <button class="btn-primary" onclick="showAddScheduleModal()" style="margin-bottom: 20px;">
                ➕ Tambah Jadwal Baru
            </button>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nama Perawat</th>
                            <th>Tanggal</th>
                            <th>Shift</th>
                            <th>Jam</th>
                            <th>Ruangan</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="scheduleTableBody">
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Modal Add Schedule -->
        <div id="addScheduleModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Buat Jadwal Jaga</h3>
                    <span class="modal-close" onclick="closeAddScheduleModal()">&times;</span>
                </div>
                <form id="addScheduleForm">
                    <div class="form-group">
                        <label>Pilih Perawat</label>
                        <select id="scheduleNurse" required>
                            <option value="">-- Pilih Perawat --</option>
                            ${nurses.map(n => `<option value="${n.id}">${n.fullname}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tanggal</label>
                        <input type="date" id="scheduleDate" required>
                    </div>
                    <div class="form-group">
                        <label>Shift</label>
                        <select id="scheduleShift" required>
                            <option value="">Pilih Shift</option>
                            <option value="Pagi">Pagi (07:00 - 14:00)</option>
                            <option value="Siang">Siang (14:00 - 21:00)</option>
                            <option value="Malam">Malam (21:00 - 07:00)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Ruangan</label>
                        <input type="text" id="scheduleRoom" placeholder="Contoh: IGD, Rawat Inap" required>
                    </div>
                    <button type="submit" class="btn-primary">Simpan Jadwal</button>
                </form>
            </div>
        </div>
    `;
    
    renderScheduleTable();
    
    document.getElementById('addScheduleForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addNewSchedule();
    });
}

function renderScheduleTable() {
    const tbody = document.getElementById('scheduleTableBody');
    
    tbody.innerHTML = nurseSchedules.map(schedule => {
        const nurse = users.find(u => u.id === schedule.nurseId);
        const shiftTime = schedule.shift === 'Pagi' ? '07:00 - 14:00' : 
                         schedule.shift === 'Siang' ? '14:00 - 21:00' : '21:00 - 07:00';
        
        return `
            <tr>
                <td>${nurse ? nurse.fullname : 'Unknown'}</td>
                <td>${formatDateOnly(schedule.date)}</td>
                <td><span class="badge badge-info">${schedule.shift}</span></td>
                <td>${shiftTime}</td>
                <td>${schedule.room}</td>
                <td>
                    <button class="btn-danger" onclick="deleteSchedule('${schedule.id}')">Hapus</button>
                </td>
            </tr>
        `;
    }).join('');
}

window.showAddScheduleModal = function() {
    document.getElementById('addScheduleModal').classList.add('active');
};

window.closeAddScheduleModal = function() {
    document.getElementById('addScheduleModal').classList.remove('active');
    document.getElementById('addScheduleForm').reset();
};

function addNewSchedule() {
    const nurseId = document.getElementById('scheduleNurse').value;
    const nurse = users.find(u => u.id === nurseId);
    
    const newSchedule = {
        id: generateId('SCH'),
        nurseId: nurseId,
        nurseName: nurse.fullname,
        date: document.getElementById('scheduleDate').value,
        shift: document.getElementById('scheduleShift').value,
        room: document.getElementById('scheduleRoom').value,
        createdAt: new Date().toISOString()
    };
    
    nurseSchedules.push(newSchedule);
    saveData();
    
    alert('Jadwal berhasil dibuat!');
    closeAddScheduleModal();
    renderScheduleTable();
}

window.deleteSchedule = function(scheduleId) {
    if (confirm('Yakin ingin menghapus jadwal ini?')) {
        nurseSchedules = nurseSchedules.filter(s => s.id !== scheduleId);
        saveData();
        renderScheduleTable();
    }
};

// ========================================
// PERAWAT DASHBOARD
// ========================================

function initPerawatDashboard(user) {
    document.getElementById('perawatName').textContent = user.fullname;
    document.getElementById('currentDatePerawat').textContent = getCurrentDate();
    
    renderPerawatOverview();
    
    document.querySelectorAll('#dashboardPerawat .menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#dashboardPerawat .menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const page = link.getAttribute('data-page');
            switch(page) {
                case 'perawat-overview':
                    renderPerawatOverview();
                    break;
                case 'perawat-patients':
                    renderPerawatPatients();
                    break;
                case 'perawat-schedule':
                    renderPerawatSchedule();
                    break;
                case 'perawat-medical':
                    renderPerawatMedical();
                    break;
            }
        });
    });
    
    document.getElementById('logoutPerawat').addEventListener('click', (e) => {
        e.preventDefault();
        logActivity(user.id, user.username, user.role, 'Logout');
        currentUser = null;
        showPage('loginPage');
        showForm(loginForm);
    });
}

function renderPerawatOverview() {
    const content = document.getElementById('perawatContent');
    
    const totalPatients = patients.length;
    const todayPatients = patients.filter(p => {
        const today = new Date().toDateString();
        const patientDate = new Date(p.createdAt).toDateString();
        return today === patientDate;
    }).length;
    
    const mySchedules = nurseSchedules.filter(s => s.nurseId === currentUser.id);
    
    content.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Total Pasien</div>
                        <div class="stat-card-value">${totalPatients}</div>
                    </div>
                    <div class="stat-card-icon">🤒</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Pasien Hari Ini</div>
                        <div class="stat-card-value">${todayPatients}</div>
                    </div>
                    <div class="stat-card-icon">📋</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Jadwal Saya</div>
                        <div class="stat-card-value">${mySchedules.length}</div>
                    </div>
                    <div class="stat-card-icon">📅</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Riwayat Medis</div>
                        <div class="stat-card-value">${diagnoses.length}</div>
                    </div>
                    <div class="stat-card-icon">📄</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Selamat Datang, ${currentUser.fullname}</h3>
            <p>Dashboard perawat untuk monitoring pasien, jadwal jaga, dan riwayat medis.</p>
        </div>
    `;
}

function renderPerawatPatients() {
    const content = document.getElementById('perawatContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Statistik Pasien</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-title">Total Pasien Terdaftar</div>
                    <div class="stat-card-value">${patients.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-title">Menunggu Pemeriksaan</div>
                    <div class="stat-card-value">${patients.filter(p => p.status === 'Menunggu').length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-title">Sedang Diperiksa</div>
                    <div class="stat-card-value">${patients.filter(p => p.status === 'Diperiksa').length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-title">Selesai</div>
                    <div class="stat-card-value">${patients.filter(p => p.status === 'Selesai').length}</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Daftar Pasien</h3>
            <div class="search-bar">
                <input type="text" id="searchPatientNurse" class="search-input" placeholder="Cari pasien...">
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. Antrian</th>
                            <th>No. RM</th>
                            <th>Nama Pasien</th>
                            <th>Usia</th>
                            <th>Keluhan</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody id="nursePatientTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    renderNursePatientTable();
    document.getElementById('searchPatientNurse').addEventListener('input', renderNursePatientTable);
}

function renderNursePatientTable() {
    const tbody = document.getElementById('nursePatientTableBody');
    const searchTerm = document.getElementById('searchPatientNurse').value.toLowerCase();
    
    let filtered = patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.medicalRecordNumber.toLowerCase().includes(searchTerm)
    );
    
    tbody.innerHTML = filtered.map(patient => `
        <tr>
            <td><strong>${patient.queueNumber}</strong></td>
            <td>${patient.medicalRecordNumber}</td>
            <td>${patient.name}</td>
            <td>${patient.age} tahun</td>
            <td>${patient.complaint}</td>
            <td><span class="badge badge-${patient.status === 'Menunggu' ? 'warning' : patient.status === 'Diperiksa' ? 'info' : 'success'}">${patient.status}</span></td>
            <td>${formatDateOnly(patient.createdAt)}</td>
        </tr>
    `).join('');
}

function renderPerawatSchedule() {
    const content = document.getElementById('perawatContent');
    
    const mySchedules = nurseSchedules.filter(s => s.nurseId === currentUser.id);
    
    content.innerHTML = `
        <div class="card">
            <h3>Jadwal Jaga Saya</h3>
            ${mySchedules.length === 0 ? 
                '<div class="alert alert-info">Belum ada jadwal jaga untuk Anda.</div>' :
                `<div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Shift</th>
                                <th>Jam</th>
                                <th>Ruangan</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mySchedules.map(schedule => {
                                const shiftTime = schedule.shift === 'Pagi' ? '07:00 - 14:00' : 
                                                 schedule.shift === 'Siang' ? '14:00 - 21:00' : '21:00 - 07:00';
                                const scheduleDate = new Date(schedule.date);
                                const today = new Date();
                                const isPast = scheduleDate < today;
                                
                                return `
                                    <tr>
                                        <td>${formatDateOnly(schedule.date)}</td>
                                        <td><span class="badge badge-info">${schedule.shift}</span></td>
                                        <td>${shiftTime}</td>
                                        <td>${schedule.room}</td>
                                        <td><span class="badge ${isPast ? 'badge-success' : 'badge-warning'}">${isPast ? 'Selesai' : 'Akan Datang'}</span></td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>`
            }
        </div>
    `;
}

function renderPerawatMedical() {
    const content = document.getElementById('perawatContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Riwayat Medis Pasien</h3>
            <div class="alert alert-info">
                <strong>Info:</strong> Riwayat diagnosis yang telah diinput oleh dokter.
            </div>
            <div class="search-bar">
                <input type="text" id="searchMedical" class="search-input" placeholder="Cari pasien atau diagnosis...">
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. RM</th>
                            <th>Nama Pasien</th>
                            <th>Dokter</th>
                            <th>Keluhan</th>
                            <th>Diagnosis</th>
                            <th>Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="medicalTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    renderMedicalTable();
    document.getElementById('searchMedical').addEventListener('input', renderMedicalTable);
}

function renderMedicalTable() {
    const tbody = document.getElementById('medicalTableBody');
    const searchTerm = document.getElementById('searchMedical').value.toLowerCase();
    
    let filtered = diagnoses.filter(d => {
        const patient = patients.find(p => p.id === d.patientId);
        return patient && (
            patient.name.toLowerCase().includes(searchTerm) ||
            patient.medicalRecordNumber.toLowerCase().includes(searchTerm) ||
            d.diagnosis.toLowerCase().includes(searchTerm)
        );
    });
    
    tbody.innerHTML = filtered.map(diag => {
        const patient = patients.find(p => p.id === diag.patientId);
        return `
            <tr>
                <td>${patient ? patient.medicalRecordNumber : '-'}</td>
                <td>${patient ? patient.name : '-'}</td>
                <td>${diag.doctorName}</td>
                <td>${diag.complaint}</td>
                <td>${diag.diagnosis}</td>
                <td>${formatDateOnly(diag.createdAt)}</td>
                <td>
                    <button class="btn-primary" onclick="generatePDF('${diag.patientId}')">
                        📄 Download PDF
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ========================================
// DOKTER DASHBOARD
// ========================================

function initDokterDashboard(user) {
    document.getElementById('dokterName').textContent = user.fullname;
    document.getElementById('currentDateDokter').textContent = getCurrentDate();
    
    renderDokterOverview();
    
    document.querySelectorAll('#dashboardDokter .menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#dashboardDokter .menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const page = link.getAttribute('data-page');
            switch(page) {
                case 'dokter-overview':
                    renderDokterOverview();
                    break;
                case 'dokter-patients':
                    renderDokterPatients();
                    break;
                case 'dokter-diagnosis':
                    renderDokterDiagnosis();
                    break;
                case 'dokter-prescription':
                    renderDokterPrescription();
                    break;
            }
        });
    });
    
    document.getElementById('logoutDokter').addEventListener('click', (e) => {
        e.preventDefault();
        logActivity(user.id, user.username, user.role, 'Logout');
        currentUser = null;
        showPage('loginPage');
        showForm(loginForm);
    });
}

function renderDokterOverview() {
    const content = document.getElementById('dokterContent');
    
    const waitingPatients = patients.filter(p => p.status === 'Menunggu').length;
    const todayDiagnoses = diagnoses.filter(d => {
        const today = new Date().toDateString();
        const diagDate = new Date(d.createdAt).toDateString();
        return today === diagDate;
    }).length;
    
    content.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Pasien Menunggu</div>
                        <div class="stat-card-value">${waitingPatients}</div>
                    </div>
                    <div class="stat-card-icon">⏳</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Diagnosis Hari Ini</div>
                        <div class="stat-card-value">${todayDiagnoses}</div>
                    </div>
                    <div class="stat-card-icon">✅</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Total Diagnosis</div>
                        <div class="stat-card-value">${diagnoses.length}</div>
                    </div>
                    <div class="stat-card-icon">📋</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Resep Dibuat</div>
                        <div class="stat-card-value">${prescriptions.length}</div>
                    </div>
                    <div class="stat-card-icon">💊</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Selamat Datang, Dr. ${currentUser.fullname}</h3>
            <p>Dashboard dokter untuk pemeriksaan pasien, diagnosis, dan pemberian resep.</p>
        </div>
    `;
}

function renderDokterPatients() {
    const content = document.getElementById('dokterContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Daftar Pasien</h3>
            <div class="alert alert-info">
                Pasien yang didaftarkan oleh admin akan muncul di sini.
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. Antrian</th>
                            <th>No. RM</th>
                            <th>Nama Pasien</th>
                            <th>Usia</th>
                            <th>Keluhan</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${patients.map(patient => `
                            <tr>
                                <td><strong>${patient.queueNumber}</strong></td>
                                <td>${patient.medicalRecordNumber}</td>
                                <td>${patient.name}</td>
                                <td>${patient.age} tahun</td>
                                <td>${patient.complaint}</td>
                                <td><span class="badge badge-${patient.status === 'Menunggu' ? 'warning' : patient.status === 'Diperiksa' ? 'info' : 'success'}">${patient.status}</span></td>
                                <td>
                                    ${patient.status === 'Menunggu' ? 
                                        `<button class="btn-primary" onclick="startExamination('${patient.id}')">Periksa</button>` :
                                        `<button class="btn-secondary">Lihat</button>`
                                    }
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

window.startExamination = function(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        patient.status = 'Diperiksa';
        saveData();
        
        // Navigate to diagnosis page
        document.querySelector('[data-page="dokter-diagnosis"]').click();
        
        // Pre-fill patient data
        setTimeout(() => {
            document.getElementById('diagnosisPatient').value = patientId;
            document.getElementById('diagnosisComplaint').value = patient.complaint;
        }, 100);
    }
};

function renderDokterDiagnosis() {
    const content = document.getElementById('dokterContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Form Diagnosis</h3>
            <form id="diagnosisForm">
                <div class="form-group">
                    <label>Pilih Pasien</label>
                    <select id="diagnosisPatient" required>
                        <option value="">-- Pilih Pasien --</option>
                        ${patients.filter(p => p.status === 'Diperiksa' || p.status === 'Menunggu').map(p => 
                            `<option value="${p.id}">${p.queueNumber} - ${p.name} (${p.medicalRecordNumber})</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Berat Badan (Kg)</label>
                    <input type="text" id="diagnosisDiagnosis" placeholder="75 Kg..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Tinggi Badan (Cm)</label>
                    <input type="text" id="diagnosisDiagnosis" placeholder="175 Cm..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Alergi (Alergi)</label>
                    <input type="text" id="diagnosisDiagnosis" placeholder="Ada/Tidak..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Keluhan (Anamnesa)</label>
                    <textarea id="diagnosisComplaint" rows="3" placeholder="Keluhan dan riwayat penyakit..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Diagnosis (ICD-10)</label>
                    <input type="text" id="diagnosisDiagnosis" placeholder="Contoh: A09 - Diare dan Gastroenteritis" required>
                </div>
                <div class="form-group">
                    <label>Tindakan Medis</label>
                    <textarea id="diagnosisTreatment" rows="2" placeholder="Tindakan medis yang diberikan..." required></textarea>
                </div>
                <button type="submit" class="btn-primary">Simpan Diagnosis</button>
            </form>
        </div>
        
        <div class="card">
            <h3>Riwayat Diagnosis</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Pasien</th>
                            <th>Keluhan</th>
                            <th>Diagnosis</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${diagnoses.slice(0, 10).map(diag => {
                            const patient = patients.find(p => p.id === diag.patientId);
                            return `
                                <tr>
                                    <td>${patient ? patient.name : '-'}</td>
                                    <td>${diag.complaint}</td>
                                    <td>${diag.diagnosis}</td>
                                    <td>${formatDateOnly(diag.createdAt)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('diagnosisForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveDiagnosis();
    });
}

function saveDiagnosis() {
    const patientId = document.getElementById('diagnosisPatient').value;
    const patient = patients.find(p => p.id === patientId);
    
    if (!patient) {
        alert('Pilih pasien terlebih dahulu!');
        return;
    }
    
    const newDiagnosis = {
        id: generateId('DIAG'),
        patientId: patientId,
        patientName: patient.name,
        doctorId: currentUser.id,
        doctorName: currentUser.fullname,
        complaint: document.getElementById('diagnosisComplaint').value,
        diagnosis: document.getElementById('diagnosisDiagnosis').value,
        treatment: document.getElementById('diagnosisTreatment').value,
        createdAt: new Date().toISOString()
    };
    
    diagnoses.push(newDiagnosis);
    
    // Update patient status
    patient.status = 'Selesai';
    
    saveData();
    
    alert('Diagnosis berhasil disimpan! Data telah masuk ke Perawat dan SIMPUS.');
    document.getElementById('diagnosisForm').reset();
    renderDokterDiagnosis();
}

function renderDokterPrescription() {
    const content = document.getElementById('dokterContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Resep Obat</h3>
            <form id="prescriptionForm">
                <div class="form-group">
                    <label>Pilih Pasien</label>
                    <select id="prescriptionPatient" required>
                        <option value="">-- Pilih Pasien --</option>
                        ${patients.map(p => 
                            `<option value="${p.id}">${p.name} (${p.medicalRecordNumber})</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Pilih Obat</label>
                    <select id="prescriptionMedicine" required>
                        <option value="">-- Pilih Obat --</option>
                        ${medicines.map(m => 
                            `<option value="${m.id}">${m.name} - Stok: ${m.stock}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Dosis</label>
                    <input type="text" id="prescriptionDose" placeholder="Contoh: 3x1 tablet" required>
                </div>
                <div class="form-group">
                    <label>Jumlah</label>
                    <input type="number" id="prescriptionQuantity" placeholder="Jumlah obat" required>
                </div>
                <div class="form-group">
                    <label>Catatan</label>
                    <textarea id="prescriptionNotes" rows="2" placeholder="Aturan pakai dan catatan khusus..."></textarea>
                </div>
                <button type="submit" class="btn-primary">Buat Resep</button>
            </form>
        </div>
        
        <div class="card">
            <h3>Resep Terakhir</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. Resep</th>
                            <th>Pasien</th>
                            <th>Obat</th>
                            <th>Dosis</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${prescriptions.slice(0, 10).map(presc => {
                            const patient = patients.find(p => p.id === presc.patientId);
                            const medicine = medicines.find(m => m.id === presc.medicineId);
                            return `
                                <tr>
                                    <td>${presc.prescriptionNumber}</td>
                                    <td>${patient ? patient.name : '-'}</td>
                                    <td>${medicine ? medicine.name : '-'}</td>
                                    <td>${presc.dose}</td>
                                    <td><span class="badge badge-${presc.status === 'Menunggu' ? 'warning' : 'success'}">${presc.status}</span></td>
                                    <td>${formatDateOnly(presc.createdAt)}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('prescriptionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        savePrescription();
    });
}

function savePrescription() {
    const patientId = document.getElementById('prescriptionPatient').value;
    const medicineId = document.getElementById('prescriptionMedicine').value;
    const quantity = parseInt(document.getElementById('prescriptionQuantity').value);
    
    const patient = patients.find(p => p.id === patientId);
    const medicine = medicines.find(m => m.id === medicineId);
    
    if (!patient || !medicine) {
        alert('Pilih pasien dan obat terlebih dahulu!');
        return;
    }
    
    if (medicine.stock < quantity) {
        alert(`Stok obat tidak mencukupi! Stok tersedia: ${medicine.stock}`);
        return;
    }
    
    const newPrescription = {
        id: generateId('PRESC'),
        prescriptionNumber: 'RX-' + new Date().getFullYear() + '-' + String(prescriptions.length + 1).padStart(3, '0'),
        patientId: patientId,
        patientName: patient.name,
        doctorId: currentUser.id,
        doctorName: currentUser.fullname,
        medicineId: medicineId,
        medicineName: medicine.name,
        dose: document.getElementById('prescriptionDose').value,
        quantity: quantity,
        notes: document.getElementById('prescriptionNotes').value,
        status: 'Menunggu',
        createdAt: new Date().toISOString()
    };
    
    prescriptions.push(newPrescription);
    
    // Reduce medicine stock
    medicine.stock -= quantity;
    
    saveData();
    
    alert('Resep berhasil dibuat! Data telah dikirim ke Apoteker.');
    document.getElementById('prescriptionForm').reset();
    renderDokterPrescription();
}

// ========================================
// SIMPUS DASHBOARD
// ========================================

function initSimpusDashboard(user) {
    document.getElementById('simpusName').textContent = user.fullname;
    document.getElementById('currentDateSimpus').textContent = getCurrentDate();
    
    renderSimpusOverview();
    
    document.querySelectorAll('#dashboardSimpus .menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#dashboardSimpus .menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const page = link.getAttribute('data-page');
            switch(page) {
                case 'simpus-overview':
                    renderSimpusOverview();
                    break;
                case 'simpus-data':
                    renderSimpusData();
                    break;
                case 'simpus-reports':
                    renderSimpusReports();
                    break;
                case 'simpus-backup':
                    renderSimpusBackup();
                    break;
            }
        });
    });
    
    document.getElementById('logoutSimpus').addEventListener('click', (e) => {
        e.preventDefault();
        logActivity(user.id, user.username, user.role, 'Logout');
        currentUser = null;
        showPage('loginPage');
        showForm(loginForm);
    });
}

function renderSimpusOverview() {
    const content = document.getElementById('simpusContent');
    
    content.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Data Pasien</div>
                        <div class="stat-card-value">${patients.length}</div>
                    </div>
                    <div class="stat-card-icon">👥</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Data Diagnosis</div>
                        <div class="stat-card-value">${diagnoses.length}</div>
                    </div>
                    <div class="stat-card-icon">📋</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Data Resep</div>
                        <div class="stat-card-value">${prescriptions.length}</div>
                    </div>
                    <div class="stat-card-icon">💊</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Total Backup</div>
                        <div class="stat-card-value">5</div>
                    </div>
                    <div class="stat-card-icon">💾</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Selamat Datang, ${currentUser.fullname}</h3>
            <p>Dashboard Tim SIMPUS untuk manajemen data, pelaporan, dan backup sistem. Semua data dari Admin dan Dokter terintegrasi di sini.</p>
        </div>
        
        <div class="card">
            <h3>Standarisasi Data (ICD-9, ICD-10)</h3>
            <div class="alert alert-info">
                <strong>Info:</strong> Sistem menggunakan standarisasi ICD-9 dan ICD-10 untuk kode diagnosis dan tindakan medis.
            </div>
        </div>
    `;
}

function renderSimpusData() {
    const content = document.getElementById('simpusContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Data Backup dari Admin dan Dokter</h3>
            <div class="alert alert-success">
                <strong>Terintegrasi!</strong> Semua data dari Admin (pasien) dan Dokter (diagnosis, resep) tersimpan otomatis di sini.
            </div>
            
            <h4 style="margin-top: 20px; margin-bottom: 15px;">Data Pasien (dari Admin)</h4>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. RM</th>
                            <th>Nama</th>
                            <th>Usia</th>
                            <th>Status</th>
                            <th>Tanggal Daftar</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${patients.slice(0, 5).map(p => `
                            <tr>
                                <td>${p.medicalRecordNumber}</td>
                                <td>${p.name}</td>
                                <td>${p.age}</td>
                                <td><span class="badge badge-info">${p.status}</span></td>
                                <td>${formatDateOnly(p.createdAt)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <h4 style="margin-top: 30px; margin-bottom: 15px;">Data Diagnosis (dari Dokter)</h4>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Pasien</th>
                            <th>Dokter</th>
                            <th>Diagnosis</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${diagnoses.slice(0, 5).map(d => `
                            <tr>
                                <td>${d.patientName}</td>
                                <td>${d.doctorName}</td>
                                <td>${d.diagnosis}</td>
                                <td>${formatDateOnly(d.createdAt)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderSimpusReports() {
    const content = document.getElementById('simpusContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Generate Laporan</h3>
            <div class="alert alert-info">Generate laporan berdasarkan data yang tersimpan di sistem.</div>
            
            <div class="stats-grid">
                <button class="btn-primary" onclick="generateReport('patients')" style="padding: 20px;">
                    📊 Laporan Pasien
                </button>
                <button class="btn-primary" onclick="generateReport('diagnoses')" style="padding: 20px;">
                    📋 Laporan Diagnosis
                </button>
                <button class="btn-primary" onclick="generateReport('prescriptions')" style="padding: 20px;">
                    💊 Laporan Resep
                </button>
                <button class="btn-primary" onclick="generateReport('all')" style="padding: 20px;">
                    📁 Laporan Lengkap
                </button>
            </div>
        </div>
    `;
}

window.generateReport = function(type) {
    let content = `LAPORAN SIM PUSKESMAS 24 JAM\n`;
    content += `Tanggal: ${getCurrentDate()}\n`;
    content += `===========================================\n\n`;
    
    if (type === 'patients' || type === 'all') {
        content += `LAPORAN DATA PASIEN\n`;
        content += `Total Pasien: ${patients.length}\n\n`;
        patients.forEach((p, i) => {
            content += `${i+1}. ${p.name} (${p.medicalRecordNumber}) - ${p.age} tahun - ${p.status}\n`;
        });
        content += `\n`;
    }
    
    if (type === 'diagnoses' || type === 'all') {
        content += `LAPORAN DIAGNOSIS\n`;
        content += `Total Diagnosis: ${diagnoses.length}\n\n`;
        diagnoses.forEach((d, i) => {
            content += `${i+1}. ${d.patientName} - ${d.diagnosis} (${d.doctorName})\n`;
        });
        content += `\n`;
    }
    
    if (type === 'prescriptions' || type === 'all') {
        content += `LAPORAN RESEP\n`;
        content += `Total Resep: ${prescriptions.length}\n\n`;
        prescriptions.forEach((p, i) => {
            content += `${i+1}. ${p.prescriptionNumber} - ${p.patientName} - ${p.medicineName}\n`;
        });
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_${type}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Laporan berhasil didownload!');
};

function renderSimpusBackup() {
    const content = document.getElementById('simpusContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Backup & Restore Data</h3>
            <div class="alert alert-warning">
                <strong>Penting:</strong> Backup semua data sistem secara berkala.
            </div>
            
            <h4 style="margin-top: 20px; margin-bottom: 15px;">Backup Data</h4>
            <button class="btn-primary" onclick="backupAllData()">💾 Backup Semua Data Sekarang</button>
            
            <h4 style="margin-top: 30px; margin-bottom: 15px;">Statistik Data</h4>
            <table>
                <thead>
                    <tr>
                        <th>Jenis Data</th>
                        <th>Jumlah Record</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Data Pasien</td>
                        <td>${patients.length}</td>
                    </tr>
                    <tr>
                        <td>Data Diagnosis</td>
                        <td>${diagnoses.length}</td>
                    </tr>
                    <tr>
                        <td>Data Resep</td>
                        <td>${prescriptions.length}</td>
                    </tr>
                    <tr>
                        <td>Data Pengguna</td>
                        <td>${users.length}</td>
                    </tr>
                    <tr>
                        <td>Data Aktivitas</td>
                        <td>${loginActivities.length}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

window.backupAllData = function() {
    const backupData = {
        patients: patients,
        diagnoses: diagnoses,
        prescriptions: prescriptions,
        medicines: medicines,
        users: users,
        loginActivities: loginActivities,
        nurseSchedules: nurseSchedules,
        backupDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Backup_SIMPUS_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Backup berhasil! File telah didownload.');
};

// ========================================
// APOTEKER DASHBOARD
// ========================================

function initApotekerDashboard(user) {
    document.getElementById('apotekerName').textContent = user.fullname;
    document.getElementById('currentDateApoteker').textContent = getCurrentDate();
    
    renderApotekerOverview();
    
    document.querySelectorAll('#dashboardApoteker .menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#dashboardApoteker .menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const page = link.getAttribute('data-page');
            switch(page) {
                case 'apoteker-overview':
                    renderApotekerOverview();
                    break;
                case 'apoteker-inventory':
                    renderApotekerInventory();
                    break;
                case 'apoteker-prescriptions':
                    renderApotekerPrescriptions();
                    break;
                case 'apoteker-expired':
                    renderApotekerExpired();
                    break;
            }
        });
    });
    
    document.getElementById('logoutApoteker').addEventListener('click', (e) => {
        e.preventDefault();
        logActivity(user.id, user.username, user.role, 'Logout');
        currentUser = null;
        showPage('loginPage');
        showForm(loginForm);
    });
}

function renderApotekerOverview() {
    const content = document.getElementById('apotekerContent');
    
    const pendingPrescriptions = prescriptions.filter(p => p.status === 'Menunggu').length;
    const lowStock = medicines.filter(m => m.stock < 100).length;
    const expiredSoon = medicines.filter(m => {
        const expDate = new Date(m.expired);
        const today = new Date();
        const diffDays = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
        return diffDays < 90 && diffDays > 0;
    }).length;
    
    content.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Resep Menunggu</div>
                        <div class="stat-card-value">${pendingPrescriptions}</div>
                    </div>
                    <div class="stat-card-icon">📝</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Jenis Obat</div>
                        <div class="stat-card-value">${medicines.length}</div>
                    </div>
                    <div class="stat-card-icon">💊</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Stok Menipis</div>
                        <div class="stat-card-value">${lowStock}</div>
                    </div>
                    <div class="stat-card-icon">⚠️</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">Hampir Kadaluarsa</div>
                        <div class="stat-card-value">${expiredSoon}</div>
                    </div>
                    <div class="stat-card-icon">🚫</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Selamat Datang, ${currentUser.fullname}</h3>
            <p>Dashboard apoteker untuk manajemen stok obat, proses resep dari dokter, dan monitoring kadaluarsa.</p>
        </div>
        
        <div class="card">
            <h3>Resep dari Dokter (Menunggu Diproses)</h3>
            ${pendingPrescriptions === 0 ? 
                '<div class="alert alert-info">Tidak ada resep yang menunggu.</div>' :
                `<div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No. Resep</th>
                                <th>Pasien</th>
                                <th>Dokter</th>
                                <th>Obat</th>
                                <th>Jumlah</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${prescriptions.filter(p => p.status === 'Menunggu').map(presc => `
                                <tr>
                                    <td>${presc.prescriptionNumber}</td>
                                    <td>${presc.patientName}</td>
                                    <td>${presc.doctorName}</td>
                                    <td>${presc.medicineName}</td>
                                    <td>${presc.quantity}</td>
                                    <td>
                                        <button class="btn-primary" onclick="processPrescription('${presc.id}')">Proses</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>`
            }
        </div>
    `;
}

window.processPrescription = function(prescId) {
    const presc = prescriptions.find(p => p.id === prescId);
    if (presc) {
        presc.status = 'Selesai';
        presc.processedAt = new Date().toISOString();
        saveData();
        alert(`Resep ${presc.prescriptionNumber} berhasil diproses!`);
        renderApotekerOverview();
    }
};

function renderApotekerInventory() {
    const content = document.getElementById('apotekerContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Manajemen Stok Obat</h3>
            <button class="btn-primary" onclick="showAddMedicineModal()" style="margin-bottom: 20px;">
                ➕ Tambah Obat Baru
            </button>
            <div class="search-bar">
                <input type="text" id="searchMedicine" class="search-input" placeholder="Cari obat...">
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Kode</th>
                            <th>Nama Obat</th>
                            <th>Kategori</th>
                            <th>Stok</th>
                            <th>Satuan</th>
                            <th>Kadaluarsa</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="medicineTableBody">
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Modal Add Medicine -->
        <div id="addMedicineModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Tambah Obat Baru</h3>
                    <span class="modal-close" onclick="closeAddMedicineModal()">&times;</span>
                </div>
                <form id="addMedicineForm">
                    <div class="form-group">
                        <label>Nama Obat</label>
                        <input type="text" id="medicineName" required>
                    </div>
                    <div class="form-group">
                        <label>Kategori</label>
                        <input type="text" id="medicineCategory" placeholder="Contoh: Antibiotik" required>
                    </div>
                    <div class="form-group">
                        <label>Stok Awal</label>
                        <input type="number" id="medicineStock" required>
                    </div>
                    <div class="form-group">
                        <label>Satuan</label>
                        <select id="medicineUnit" required>
                            <option value="Tablet">Tablet</option>
                            <option value="Kapsul">Kapsul</option>
                            <option value="Botol">Botol</option>
                            <option value="Strip">Strip</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tanggal Kadaluarsa</label>
                        <input type="date" id="medicineExpired" required>
                    </div>
                    <button type="submit" class="btn-primary">Simpan Obat</button>
                </form>
            </div>
        </div>
    `;
    
    renderMedicineTable();
    
    document.getElementById('searchMedicine').addEventListener('input', renderMedicineTable);
    document.getElementById('addMedicineForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addNewMedicine();
    });
}

function renderMedicineTable() {
    const tbody = document.getElementById('medicineTableBody');
    const searchTerm = document.getElementById('searchMedicine').value.toLowerCase();
    
    let filtered = medicines.filter(m => 
        m.name.toLowerCase().includes(searchTerm) || 
        m.category.toLowerCase().includes(searchTerm)
    );
    
    tbody.innerHTML = filtered.map(med => {
        let status = 'Aman';
        let badgeClass = 'badge-success';
        
        if (med.stock < 50) {
            status = 'Habis';
            badgeClass = 'badge-danger';
        } else if (med.stock < 100) {
            status = 'Menipis';
            badgeClass = 'badge-warning';
        }
        
        return `
            <tr>
                <td>${med.id}</td>
                <td>${med.name}</td>
                <td>${med.category}</td>
                <td>${med.stock}</td>
                <td>${med.unit}</td>
                <td>${formatDateOnly(med.expired)}</td>
                <td><span class="badge ${badgeClass}">${status}</span></td>
                <td>
                    <button class="btn-secondary" onclick="updateStock('${med.id}')">Update Stok</button>
                    <button class="btn-danger" onclick="deleteMedicine('${med.id}')">Hapus</button>
                </td>
            </tr>
        `;
    }).join('');
}

window.showAddMedicineModal = function() {
    document.getElementById('addMedicineModal').classList.add('active');
};

window.closeAddMedicineModal = function() {
    document.getElementById('addMedicineModal').classList.remove('active');
    document.getElementById('addMedicineForm').reset();
};

function addNewMedicine() {
    const newMed = {
        id: 'MED' + String(medicines.length + 1).padStart(3, '0'),
        name: document.getElementById('medicineName').value,
        category: document.getElementById('medicineCategory').value,
        stock: parseInt(document.getElementById('medicineStock').value),
        unit: document.getElementById('medicineUnit').value,
        expired: document.getElementById('medicineExpired').value,
        status: 'Aman'
    };
    
    medicines.push(newMed);
    saveData();
    
    alert('Obat berhasil ditambahkan!');
    closeAddMedicineModal();
    renderMedicineTable();
}

window.updateStock = function(medId) {
    const med = medicines.find(m => m.id === medId);
    if (med) {
        const newStock = prompt(`Update stok ${med.name}\nStok saat ini: ${med.stock}`, med.stock);
        if (newStock !== null) {
            med.stock = parseInt(newStock);
            saveData();
            renderMedicineTable();
            alert('Stok berhasil diupdate!');
        }
    }
};

window.deleteMedicine = function(medId) {
    if (confirm('Yakin ingin menghapus obat ini?')) {
        medicines = medicines.filter(m => m.id !== medId);
        saveData();
        renderMedicineTable();
        alert('Obat berhasil dihapus!');
    }
};

function renderApotekerPrescriptions() {
    const content = document.getElementById('apotekerContent');
    
    content.innerHTML = `
        <div class="card">
            <h3>Daftar Semua Resep</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No. Resep</th>
                            <th>Pasien</th>
                            <th>Dokter</th>
                            <th>Obat</th>
                            <th>Jumlah</th>
                            <th>Status</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${prescriptions.map(presc => `
                            <tr>
                                <td>${presc.prescriptionNumber}</td>
                                <td>${presc.patientName}</td>
                                <td>${presc.doctorName}</td>
                                <td>${presc.medicineName}</td>
                                <td>${presc.quantity} ${medicines.find(m => m.id === presc.medicineId)?.unit || ''}</td>
                                <td><span class="badge badge-${presc.status === 'Menunggu' ? 'warning' : 'success'}">${presc.status}</span></td>
                                <td>${formatDateOnly(presc.createdAt)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}


