// ========================================
// DATABASE & STORAGE MANAGEMENT
// ========================================

// Initialize databases
let users = JSON.parse(localStorage.getItem('puskesmasUsers')) || [];
let loginActivities = JSON.parse(localStorage.getItem('loginActivities')) || [];
let patients = JSON.parse(localStorage.getItem('patients')) || [];
let diagnoses = JSON.parse(localStorage.getItem('diagnoses')) || [];
let prescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
let nurseSchedules = JSON.parse(localStorage.getItem('nurseSchedules')) || [];
let currentUser = null;

if (users.length === 0) {
    const initialUsers = [
        { id: 'user_001', fullname: 'Administrator Ihksan', username: 'ihksan', email: 'admin@puskesmas.id', password: 'admin123', role: 'admin', status: 'active', createdAt: new Date().toISOString() },
        { id: 'user_002', fullname: 'Dr. aureliaaap', username: 'aureliaaap', email: 'dokter@puskesmas.id', password: '1817dokter', role: 'dokter', status: 'active', createdAt: new Date().toISOString() },
        { id: 'user_003', fullname: 'Perawat rahmi', username: 'rahmi', email: 'perawat@puskesmas.id', password: 'perawat5040', role: 'perawat', status: 'active', createdAt: new Date().toISOString() },
        { id: 'user_004', fullname: 'fata', username: 'fata', email: 'simpus@puskesmas.id', password: 'fata123', role: 'simpus', status: 'active', createdAt: new Date().toISOString() },
        { id: 'user_005', fullname: 'Apoteker haikal', username: 'haikal', email: 'apoteker@puskesmas.id', password: 'apoteker123', role: 'apoteker', status: 'active', createdAt: new Date().toISOString() },
        { id: 'user_006', fullname: 'Admin Kedua', username: 'admin2', email: 'admin2@puskesmas.id', password: 'admin123', role: 'admin', status: 'active', createdAt: new Date().toISOString() }
    ];
    users.push(...initialUsers);
    localStorage.setItem('puskesmasUsers', JSON.stringify(users));
}
if (patients.length === 0) {
    const patientData = [
        { id: 'PAT_1001', queueNumber: 'A001', medicalRecordNumber: 'RM-2025-0001', name: 'Cika', nik: '3201011101900001', age: 35, gender: 'Laki-laki', address: 'Jl. Mawar No. 1', phone: '081210001001', job: 'Karyawan Swasta', poli: 'Poli Umum', purpose: 'Berobat', referral: '-', complaint: 'Batuk kering, demam sejak 3 hari', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 8, 15).toISOString() },
        { id: 'PAT_1002', queueNumber: 'A002', medicalRecordNumber: 'RM-2025-0002', name: 'ihksan', nik: '3201012202950002', age: 28, gender: 'Perempuan', address: 'Perumahan Indah Blok C', phone: '081320002002', job: 'Ibu Rumah Tangga', poli: 'Poli KIA', purpose: 'Kontrol', referral: '-', complaint: 'Kontrol kehamilan bulan ke-7', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 8, 30).toISOString() },
        { id: 'PAT_1003', queueNumber: 'A003', medicalRecordNumber: 'RM-2025-0003', name: 'Aurel', nik: '3201011103850003', age: 40, gender: 'Laki-laki', address: 'Desa Sejahtera RT 05', phone: '081530003003', job: 'Petani', poli: 'Poli Umum', purpose: 'Berobat', referral: '-', complaint: 'Sakit kepala berat dan pandangan kabur', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 8, 45).toISOString() },
        { id: 'PAT_1004', queueNumber: 'A004', medicalRecordNumber: 'RM-2025-0004', name: 'haikal', nik: '3201012204000004', age: 23, gender: 'Perempuan', address: 'Jl. Veteran 15', phone: '081940004004', job: 'Mahasiswa', poli: 'Poli Gigi', purpose: 'Berobat', referral: '-', complaint: 'Sakit gigi berlubang yang tidak tertahankan', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 9, 0).toISOString() },
        { id: 'PAT_1005', queueNumber: 'A005', medicalRecordNumber: 'RM-2025-0005', name: 'Eka Putra', nik: '3201011105750005', age: 50, gender: 'Laki-laki', address: 'Komplek Harapan Baru', phone: '081750005005', job: 'Pensiunan', poli: 'Poli Umum', purpose: 'Kontrol', referral: '-', complaint: 'Kontrol tekanan darah tinggi', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 9, 15).toISOString() },
        { id: 'PAT_1006', queueNumber: 'A006', medicalRecordNumber: 'RM-2025-0006', name: 'Fina Nuraini', nik: '3201012206150006', age: 10, gender: 'Perempuan', address: 'Jl. Sudirman 8', phone: '081260006006', job: '-', poli: 'Poli Umum', purpose: 'Imunisasi', referral: '-', complaint: 'Imunisasi BCG', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 9, 30).toISOString() },
        { id: 'PAT_1007', queueNumber: 'A007', medicalRecordNumber: 'RM-2025-0007', name: 'Gatot Subroto', nik: '3201011107680007', age: 57, gender: 'Laki-laki', address: 'Kp. Damai RT 01', phone: '081170007007', job: 'Pedagang', poli: 'Poli TB', purpose: 'Berobat', referral: '-', complaint: 'Batuk berdahak sudah 1 bulan, keringat malam', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 9, 45).toISOString() },
        { id: 'PAT_1008', queueNumber: 'A008', medicalRecordNumber: 'RM-2025-0008', name: 'Hesti Wulandari', nik: '3201012208990008', age: 26, gender: 'Perempuan', address: 'Apartemen Cendana', phone: '081680008008', job: 'Karyawan Bank', poli: 'Poli Umum', purpose: 'Pemeriksaan Kesehatan', referral: '-', complaint: 'Cek kesehatan rutin untuk kerja', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 10, 0).toISOString() },
        { id: 'PAT_1009', queueNumber: 'A009', medicalRecordNumber: 'RM-2025-0009', name: 'Irfan Hakim', nik: '3201011109910009', age: 34, gender: 'Laki-laki', address: 'Jl. Kenanga No. 5', phone: '081890009009', job: 'Ojek Online', poli: 'Poli Gigi', purpose: 'Kontrol', referral: '-', complaint: 'Pencabutan gigi bungsu post-op', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 10, 15).toISOString() },
        { id: 'PAT_1010', queueNumber: 'A010', medicalRecordNumber: 'RM-2025-0010', name: 'Jessika', nik: '3201012210880010', age: 37, gender: 'Perempuan', address: 'Gang Melati 12', phone: '081010010010', job: 'Wirausaha', poli: 'Poli Umum', purpose: 'Berobat', referral: '-', complaint: 'Maag kambuh, perut terasa perih', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 10, 30).toISOString() },
        { id: 'PAT_1011', queueNumber: 'A011', medicalRecordNumber: 'RM-2025-0011', name: 'Kusuma Negara', nik: '3201011111700011', age: 55, gender: 'Laki-laki', address: 'Dusun Makmur RT 03', phone: '081211011011', job: 'PNS', poli: 'Poli Umum', purpose: 'Kontrol', referral: 'RSUD Sehat', complaint: 'Kontrol setelah rawat inap COVID-19', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 10, 45).toISOString() },
        { id: 'PAT_1012', queueNumber: 'A012', medicalRecordNumber: 'RM-2025-0012', name: 'Lina', nik: '3201012212030012', age: 22, gender: 'Perempuan', address: 'Jl. Pelajar No. 2', phone: '081312012012', job: 'Pelajar', poli: 'Poli Umum', purpose: 'Berobat', referral: '-', complaint: 'Alergi kulit, gatal-gatal di seluruh tubuh', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 11, 0).toISOString() },
        { id: 'PAT_1013', queueNumber: 'A013', medicalRecordNumber: 'RM-2025-0013', name: 'Muhammad Zaki', nik: '3201011101980013', age: 27, gender: 'Laki-laki', address: 'Jl. Kebon Jeruk', phone: '081513013013', job: 'Freelancer', poli: 'Poli Gigi', purpose: 'Berobat', referral: '-', complaint: 'Gusi bengkak dan berdarah', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 11, 15).toISOString() },
        { id: 'PAT_1014', queueNumber: 'A014', medicalRecordNumber: 'RM-2025-0014', name: 'Nina Herawati', nik: '3201012202650014', age: 60, gender: 'Perempuan', address: 'Perumahan Elok Blok F', phone: '081914014014', job: 'Pensiunan', poli: 'Poli Umum', purpose: 'Berobat', referral: '-', complaint: 'Nyeri lutut dan sendi', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 11, 30).toISOString() },
        { id: 'PAT_1015', queueNumber: 'A015', medicalRecordNumber: 'RM-2025-0015', name: 'Oscar Darmawan', nik: '3201011103050015', age: 20, gender: 'Laki-laki', address: 'Kampus Biru', phone: '081715015015', job: 'Mahasiswa', poli: 'Poli Umum', purpose: 'Pemeriksaan Kesehatan', referral: '-', complaint: 'Surat keterangan sehat untuk mendaftar beasiswa', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 11, 45).toISOString() },
        { id: 'PAT_1016', queueNumber: 'A016', medicalRecordNumber: 'RM-2025-0016', name: 'Putri Amelia', nik: '3201012204960016', age: 29, gender: 'Perempuan', address: 'Jl. Pahlawan No. 7', phone: '081216016016', job: 'Guru', poli: 'Poli KIA', purpose: 'Imunisasi', referral: '-', complaint: 'Bayi imunisasi DPT', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 12, 0).toISOString() },
        { id: 'PAT_1017', queueNumber: 'A017', medicalRecordNumber: 'RM-2025-0017', name: 'Qoirul Anwar', nik: '3201011105820017', age: 43, gender: 'Laki-laki', address: 'Blok Sawah Indah', phone: '081317017017', job: 'Tukang Bangunan', poli: 'IGD', purpose: 'Berobat', referral: '-', complaint: 'Luka robek di tangan karena kecelakaan kerja', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 12, 15).toISOString() },
        { id: 'PAT_1018', queueNumber: 'A018', medicalRecordNumber: 'RM-2025-0018', name: 'Rani Safitri', nik: '3201012206930018', age: 32, gender: 'Perempuan', address: 'Jl. Kemuning Raya', phone: '081518018018', job: 'Penjahit', poli: 'Poli Umum', purpose: 'Berobat', referral: '-', complaint: 'Diare sudah 2 hari dan lemas', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 12, 30).toISOString() },
        { id: 'PAT_1019', queueNumber: 'A019', medicalRecordNumber: 'RM-2025-0019', name: 'Surya Dwi', nik: '3201011107780019', age: 47, gender: 'Laki-laki', address: 'Komplek Permata Hijau', phone: '081719019019', job: 'Supir', poli: 'Poli Umum', purpose: 'Kontrol', referral: '-', complaint: 'Kontrol gula darah', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 12, 45).toISOString() },
        { id: 'PAT_1020', queueNumber: 'A020', medicalRecordNumber: 'RM-2025-0020', name: 'Tia Monica', nik: '3201012208900020', age: 35, gender: 'Perempuan', address: 'Gg. Damai No. 9', phone: '081920020020', job: 'Pegawai Swasta', poli: 'Poli Umum', purpose: 'Berobat', referral: '-', complaint: 'Nyeri saat buang air kecil', status: 'Menunggu', createdAt: new Date(2025, 10, 15, 13, 0).toISOString() }
    ];
    patients.push(...patientData);
    localStorage.setItem('patients', JSON.stringify(patients));
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

// ========================================
// UTILITY FUNCTIONS
// ========================================

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

// ========================================
// PDF GENERATION FUNCTION
// ========================================

function generatePDF(patientId) {
    const patient = patients.find(p => p.id === patientId);
    const patientDiagnoses = diagnoses.filter(d => d.patientId === patientId);
    
    if (!patient) return;
    
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Riwayat Medis - ${patient.name}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 40px;
                line-height: 1.6;
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #667eea;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #667eea;
                margin: 0 0 10px 0;
            }
            .header p {
                color: #666;
                margin: 5px 0;
            }
            .section {
                margin-bottom: 30px;
            }
            .section-title {
                background: #667eea;
                color: white;
                padding: 10px 15px;
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 15px;
            }
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .data-table td {
                padding: 8px;
                border-bottom: 1px solid #e0e0e0;
            }
            .data-table td:first-child {
                font-weight: bold;
                width: 200px;
                color: #333;
            }
            .diagnosis-box {
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                background: #f9f9f9;
            }
            .diagnosis-box h3 {
                color: #667eea;
                margin-top: 0;
            }
            .diagnosis-item {
                margin-bottom: 10px;
            }
            .diagnosis-label {
                font-weight: bold;
                color: #555;
            }
            .footer {
                margin-top: 50px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
                text-align: center;
                color: #666;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🏥 RIWAYAT MEDIS PASIEN</h1>
            <p>PUSKESMAS 24 JAM</p>
            <p>Sistem Informasi Manajemen Kesehatan</p>
        </div>

        <div class="section">
            <div class="section-title">DATA IDENTITAS PASIEN</div>
            <table class="data-table">
                <tr>
                    <td>No. Rekam Medis</td>
                    <td>: ${patient.medicalRecordNumber}</td>
                </tr>
                <tr>
                    <td>NIK (No. KTP)</td>
                    <td>: ${patient.nik || '-'}</td>
                </tr>
                <tr>
                    <td>Nama Lengkap</td>
                    <td>: ${patient.name}</td>
                </tr>
                <tr>
                    <td>Usia</td>
                    <td>: ${patient.age} tahun</td>
                </tr>
                <tr>
                    <td>Jenis Kelamin</td>
                    <td>: ${patient.gender}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>: ${patient.address}</td>
                </tr>
                <tr>
                    <td>No. Telepon</td>
                    <td>: ${patient.phone}</td>
                </tr>
                <tr>
                    <td>Pekerjaan</td>
                    <td>: ${patient.job || '-'}</td>
                </tr>
                <tr>
                    <td>Poli Tujuan</td>
                    <td>: ${patient.poli || '-'}</td>
                </tr>
                <tr>
                    <td>Keperluan</td>
                    <td>: ${patient.purpose || '-'}</td>
                </tr>
                <tr>
                    <td>Rujukan Dari</td>
                    <td>: ${patient.referral || '-'}</td>
                </tr>
                <tr>
                    <td>Tanggal Pendaftaran</td>
                    <td>: ${formatDateOnly(patient.createdAt)}</td>
                </tr>
            </table>
        </div>

        <div class="section">
            <div class="section-title">RIWAYAT DIAGNOSIS & PEMERIKSAAN</div>
            ${patientDiagnoses.length === 0 ? 
                '<p style="padding: 20px; text-align: center; color: #999;">Belum ada riwayat diagnosis</p>' :
                patientDiagnoses.map((diag, index) => `
                    <div class="diagnosis-box">
                        <h3>Pemeriksaan ke-${index + 1}</h3>
                        <div class="diagnosis-item">
                            <span class="diagnosis-label">Tanggal Pemeriksaan:</span>
                            ${formatDateOnly(diag.createdAt)}
                        </div>
                        <div class="diagnosis-item">
                            <span class="diagnosis-label">Dokter Pemeriksa:</span>
                            ${diag.doctorName}
                        </div>
                        <div class="diagnosis-item">
                            <span class="diagnosis-label">Keluhan Pasien:</span><br>
                            ${diag.complaint}
                        </div>
                        <div class="diagnosis-item">
                            <span class="diagnosis-label">Diagnosis (ICD-10):</span><br>
                            ${diag.diagnosis}
                        </div>
                        <div class="diagnosis-item">
                            <span class="diagnosis-label">Tindakan Medis:</span><br>
                            ${diag.treatment}
                        </div>
                    </div>
                `).join('')
            }
        </div>

        <div class="footer">
            <p>Dokumen ini dicetak pada: ${getCurrentDate()}</p>
            <p><strong>Puskesmas 24 Jam</strong> - Sistem Informasi Manajemen</p>
            <p style="margin-top: 10px; font-size: 10px; color: #999;">
                Dokumen ini adalah salinan resmi dari sistem elektronik Puskesmas
            </p>
        </div>
    </body>
    </html>
    `;
    
    // Open print dialog with the HTML content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
        printWindow.print();
    };
    
    alert('✅ Silakan gunakan "Save as PDF" atau "Simpan sebagai PDF" pada dialog print!\n\nPilih printer: "Save as PDF" atau "Microsoft Print to PDF"');
}

// Alternative: Download as HTML file that can be printed to PDF
window.downloadPatientHTML = function(patientId) {
    const patient = patients.find(p => p.id === patientId);
    const patientDiagnoses = diagnoses.filter(d => d.patientId === patientId);
    
    if (!patient) return;
    
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Riwayat Medis - ${patient.name}</title>
        <style>
            @media print {
                body { margin: 0; }
                .no-print { display: none; }
            }
            body {
                font-family: Arial, sans-serif;
                padding: 40px;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #667eea;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #667eea;
                margin: 0 0 10px 0;
            }
            .print-btn {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #667eea;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            }
            .print-btn:hover {
                background: #5568d3;
            }
            .section-title {
                background: #667eea;
                color: white;
                padding: 10px 15px;
                font-size: 16px;
                font-weight: bold;
                margin: 30px 0 15px 0;
            }
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .data-table td {
                padding: 8px;
                border-bottom: 1px solid #e0e0e0;
            }
            .data-table td:first-child {
                font-weight: bold;
                width: 200px;
            }
            .diagnosis-box {
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 20px;
                background: #f9f9f9;
            }
            .diagnosis-box h3 {
                color: #667eea;
                margin-top: 0;
            }
        </style>
    </head>
    <body>
        <button class="print-btn no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
        
        <div class="header">
            <h1>🏥 RIWAYAT MEDIS PASIEN</h1>
            <p>PUSKESMAS 24 JAM</p>
        </div>

        <div class="section-title">DATA IDENTITAS PASIEN</div>
        <table class="data-table">
            <tr><td>No. Rekam Medis</td><td>: ${patient.medicalRecordNumber}</td></tr>
            <tr><td>NIK</td><td>: ${patient.nik || '-'}</td></tr>
            <tr><td>Nama Lengkap</td><td>: ${patient.name}</td></tr>
            <tr><td>Usia</td><td>: ${patient.age} tahun</td></tr>
            <tr><td>Jenis Kelamin</td><td>: ${patient.gender}</td></tr>
            <tr><td>Alamat</td><td>: ${patient.address}</td></tr>
            <tr><td>Telepon</td><td>: ${patient.phone}</td></tr>
            <tr><td>Pekerjaan</td><td>: ${patient.job || '-'}</td></tr>
            <tr><td>Poli</td><td>: ${patient.poli || '-'}</td></tr>
            <tr><td>Keperluan</td><td>: ${patient.purpose || '-'}</td></tr>
            <tr><td>Rujukan</td><td>: ${patient.referral || '-'}</td></tr>
        </table>

        <div class="section-title">RIWAYAT DIAGNOSIS & PEMERIKSAAN</div>
        ${patientDiagnoses.length === 0 ? 
            '<p style="padding: 20px; text-align: center; color: #999;">Belum ada riwayat diagnosis</p>' :
            patientDiagnoses.map((diag, index) => `
                <div class="diagnosis-box">
                    <h3>Pemeriksaan ke-${index + 1} - ${formatDateOnly(diag.createdAt)}</h3>
                    <p><strong>Dokter:</strong> ${diag.doctorName}</p>
                    <p><strong>Keluhan:</strong><br>${diag.complaint}</p>
                    <p><strong>Diagnosis:</strong><br>${diag.diagnosis}</p>
                    <p><strong>Tindakan:</strong><br>${diag.treatment}</p>
                </div>
            `).join('')
        }

        <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #666; font-size: 12px;">
            <p>Dicetak: ${getCurrentDate()}</p>
            <p><strong>Puskesmas 24 Jam</strong></p>
        </div>
    </body>
    </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Riwayat_Medis_${patient.name.replace(/\s+/g, '_')}_${patient.medicalRecordNumber}.html`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('✅ File HTML berhasil didownload!\n\n📝 Cara convert ke PDF:\n1. Buka file HTML yang didownload\n2. Klik tombol "Print / Save as PDF"\n3. Pilih "Save as PDF" sebagai printer\n4. Klik Save');
};

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
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const role = document.getElementById('loginRole').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!role) {
        alert('Pilih role terlebih dahulu!');
        return;
    }
    
    console.log('Attempting login:', { username, role });
    
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
        alert('Username, password salah');
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
            <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
                <button class="btn-primary" onclick="showAddPatientModal()">
                    ➕ Pasien Baru
                </button>
                <button class="btn-secondary" onclick="showReturnPatientModal()">
                    🔄 Pasien Kembali (Update Rekam Medis)
                </button>
            </div>
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
                            <th>NIK</th>
                            <th>Usia</th>
                            <th>Kunjungan</th>
                            <th>Status</th>
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
                        <label>Nama Lengkap <span style="color:red">*</span></label>
                        <input type="text" id="patientName" required>
                    </div>
                    <div class="form-group">
                        <label>NIK (No. KTP) <span style="color:red">*</span></label>
                        <input type="text" id="patientNIK" maxlength="16" placeholder="16 digit" required>
                    </div>
                    <div class="form-group">
                        <label>Usia (tahun) <span style="color:red">*</span></label>
                        <input type="number" id="patientAge" required>
                    </div>
                    <div class="form-group">
                        <label>Jenis Kelamin <span style="color:red">*</span></label>
                        <select id="patientGender" required>
                            <option value="">Pilih</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Alamat <span style="color:red">*</span></label>
                        <textarea id="patientAddress" rows="2" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>No. Telepon <span style="color:red">*</span></label>
                        <input type="tel" id="patientPhone" placeholder="08xxxxxxxxxx" required>
                    </div>
                    <div class="form-group">
                        <label>Pekerjaan <span style="color:red">*</span></label>
                        <input type="text" id="patientJob" placeholder="Contoh: Karyawan Swasta" required>
                    </div>
                    <div class="form-group">
                        <label>Poli Tujuan <span style="color:red">*</span></label>
                        <select id="patientPoli" required>
                            <option value="">Pilih Poli</option>
                            <option value="Poli Umum">Poli Umum</option>
                            <option value="Poli Gigi">Poli Gigi</option>
                            <option value="Poli KIA">Poli KIA (Ibu & Anak)</option>
                            <option value="Poli TB">Poli TB</option>
                            <option value="IGD">IGD (Gawat Darurat)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Keperluan <span style="color:red">*</span></label>
                        <select id="patientPurpose" required>
                            <option value="">Pilih Keperluan</option>
                            <option value="Berobat">Berobat</option>
                            <option value="Kontrol">Kontrol</option>
                            <option value="Imunisasi">Imunisasi</option>
                            <option value="Pemeriksaan Kesehatan">Pemeriksaan Kesehatan</option>
                            <option value="Rujukan">Rujukan</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Rujukan Dari</label>
                        <input type="text" id="patientReferral" placeholder="Kosongkan jika tidak ada rujukan">
                    </div>
                    <div class="form-group">
                        <label>Keluhan <span style="color:red">*</span></label>
                        <textarea id="patientComplaint" rows="2" placeholder="Keluhan utama pasien" required></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Daftarkan Pasien</button>
                </form>
            </div>
        </div>
        
        <!-- Modal Return Patient -->
        <div id="returnPatientModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🔄 Pasien Kembali - Update Rekam Medis</h3>
                    <span class="modal-close" onclick="closeReturnPatientModal()">&times;</span>
                </div>
                <div class="alert alert-info">
                    <strong>Info:</strong> Gunakan fitur ini untuk pasien yang sudah pernah terdaftar dan datang kembali untuk berobat.
                </div>
                <form id="returnPatientForm">
                    <div class="form-group">
                        <label>Cari Pasien (NIK atau No. RM) <span style="color:red">*</span></label>
                        <input type="text" id="searchReturnPatient" placeholder="Ketik NIK atau No. RM" required>
                        <div id="patientSearchResults" style="margin-top: 10px; max-height: 200px; overflow-y: auto;"></div>
                    </div>
                    
                    <div id="selectedPatientInfo" style="display: none;">
                        <div class="alert alert-success">
                            <strong>✅ Pasien Ditemukan!</strong>
                            <div id="patientInfoDisplay" style="margin-top: 10px;"></div>
                        </div>
                        
                        <input type="hidden" id="returnPatientId">
                        
                        <div class="form-group">
                            <label>Poli Tujuan <span style="color:red">*</span></label>
                            <select id="returnPatientPoli" required>
                                <option value="">Pilih Poli</option>
                                <option value="Poli Umum">Poli Umum</option>
                                <option value="Poli Gigi">Poli Gigi</option>
                                <option value="Poli KIA">Poli KIA (Ibu & Anak)</option>
                                <option value="Poli TB">Poli TB</option>
                                <option value="IGD">IGD (Gawat Darurat)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Keperluan <span style="color:red">*</span></label>
                            <select id="returnPatientPurpose" required>
                                <option value="">Pilih Keperluan</option>
                                <option value="Berobat">Berobat</option>
                                <option value="Kontrol">Kontrol</option>
                                <option value="Imunisasi">Imunisasi</option>
                                <option value="Pemeriksaan Kesehatan">Pemeriksaan Kesehatan</option>
                                <option value="Rujukan">Rujukan</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Keluhan Kali Ini <span style="color:red">*</span></label>
                            <textarea id="returnPatientComplaint" rows="3" placeholder="Keluhan pasien saat ini" required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Rujukan Dari</label>
                            <input type="text" id="returnPatientReferral" placeholder="Kosongkan jika tidak ada">
                        </div>
                        
                        <button type="submit" class="btn-primary">Update & Daftarkan Kunjungan</button>
                    </div>
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
    
    // Search return patient
    document.getElementById('searchReturnPatient').addEventListener('input', (e) => {
        searchExistingPatient(e.target.value);
    });
    
    document.getElementById('returnPatientForm').addEventListener('submit', (e) => {
        e.preventDefault();
        updateReturnPatient();
    });
    
    // NIK validation
    document.getElementById('patientNIK').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 16);
    });
    
    // Phone validation
    document.getElementById('patientPhone').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

function renderPatientsTable() {
    const tbody = document.getElementById('patientsTableBody');
    const searchTerm = document.getElementById('searchPatient').value.toLowerCase();
    
    let filteredPatients = patients.filter(patient => {
        return patient.name.toLowerCase().includes(searchTerm) || 
               patient.medicalRecordNumber.toLowerCase().includes(searchTerm) ||
               (patient.nik && patient.nik.includes(searchTerm));
    });
    
    tbody.innerHTML = filteredPatients.map(patient => `
        <tr>
            <td><strong>${patient.queueNumber}</strong></td>
            <td>${patient.medicalRecordNumber}</td>
            <td>${patient.name}</td>
            <td>${patient.nik || '-'}</td>
            <td>${patient.age}</td>
            <td>${patient.poli || '-'}</td>
            <td><span class="badge badge-${patient.status === 'Menunggu' ? 'warning' : patient.status === 'Diperiksa' ? 'info' : 'success'}">${patient.status}</span></td>
            <td>
                <button class="btn-secondary btn-sm" onclick="viewPatientDetail('${patient.id}')">Detail</button>
                <button class="btn-danger btn-sm" onclick="deletePatient('${patient.id}')">Hapus</button>
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
    const nikValue = document.getElementById('patientNIK').value;
    
    // Validate NIK
    if (nikValue.length !== 16) {
        alert('NIK harus 16 digit!');
        return;
    }
    
    const newPatient = {
        id: generateId('PAT'),
        queueNumber: 'A' + String(patients.length + 1).padStart(3, '0'),
        medicalRecordNumber: 'RM-' + new Date().getFullYear() + '-' + String(patients.length + 1).padStart(4, '0'),
        name: document.getElementById('patientName').value,
        nik: nikValue,
        age: document.getElementById('patientAge').value,
        gender: document.getElementById('patientGender').value,
        address: document.getElementById('patientAddress').value,
        phone: document.getElementById('patientPhone').value,
        job: document.getElementById('patientJob').value,
        poli: document.getElementById('patientPoli').value,
        purpose: document.getElementById('patientPurpose').value,
        referral: document.getElementById('patientReferral').value || '-',
        complaint: document.getElementById('patientComplaint').value,
        status: 'Menunggu',
        createdAt: new Date().toISOString()
    };
    
    patients.push(newPatient);
    saveData();
    
    alert(`✅ Pasien berhasil didaftarkan!\n\n📋 Nomor Antrian: ${newPatient.queueNumber}\n🏥 No. RM: ${newPatient.medicalRecordNumber}\n🩺 Poli: ${newPatient.poli}`);
    
    closeAddPatientModal();
    renderPatientsTable();
}

window.viewPatientDetail = function(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    alert(`📋 DETAIL PASIEN\n\n` +
          `Nama: ${patient.name}\n` +
          `NIK: ${patient.nik || '-'}\n` +
          `No. RM: ${patient.medicalRecordNumber}\n` +
          `Usia: ${patient.age} tahun\n` +
          `Jenis Kelamin: ${patient.gender}\n` +
          `Alamat: ${patient.address}\n` +
          `Telepon: ${patient.phone}\n` +
          `Pekerjaan: ${patient.job || '-'}\n` +
          `Poli Tujuan: ${patient.poli || '-'}\n` +
          `Keperluan: ${patient.purpose || '-'}\n` +
          `Rujukan Dari: ${patient.referral || '-'}\n` +
          `Keluhan: ${patient.complaint}\n` +
          `Status: ${patient.status}`);
};

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
                    <div class="btn-group">
                        <button class="btn-primary btn-sm" onclick="generatePDF('${diag.patientId}')" title="Print to PDF">
                            🖨️ Print PDF
                        </button>
                        <button class="btn-secondary btn-sm" onclick="downloadPatientHTML('${diag.patientId}')" title="Download HTML">
                            📄 HTML
                        </button>
                    </div>
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

function renderApotekerExpired() {
    const content = document.getElementById('apotekerContent');
    
    const expiredMeds = medicines.filter(m => {
        const expDate = new Date(m.expired);
        const today = new Date();
        const diffDays = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
        return diffDays < 90;
    });
    
    content.innerHTML = `
        <div class="card">
            <h3>Monitoring Obat Kadaluarsa</h3>
            ${expiredMeds.length === 0 ? 
                '<div class="alert alert-success">Tidak ada obat yang akan kadaluarsa dalam 90 hari ke depan.</div>' :
                `<div class="alert alert-warning">
                    <strong>Perhatian!</strong> Terdapat ${expiredMeds.length} obat yang akan atau sudah kadaluarsa.
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Nama Obat</th>
                                <th>Stok</th>
                                <th>Kadaluarsa</th>
                                <th>Sisa Hari</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${expiredMeds.map(med => {
                                const expDate = new Date(med.expired);
                                const today = new Date();
                                const diffDays = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
                                let statusText, badgeClass;
                                
                                if (diffDays < 0) {
                                    statusText = 'KADALUARSA';
                                    badgeClass = 'badge-danger';
                                } else if (diffDays < 30) {
                                    statusText = diffDays + ' Hari Lagi';
                                    badgeClass = 'badge-danger';
                                } else {
                                    statusText = diffDays + ' Hari Lagi';
                                    badgeClass = 'badge-warning';
                                }
                                
                                return `
                                    <tr>
                                        <td>${med.id}</td>
                                        <td>${med.name}</td>
                                        <td>${med.stock}</td>
                                        <td>${formatDateOnly(med.expired)}</td>
                                        <td>${diffDays < 0 ? 'Kadaluarsa' : diffDays + ' hari'}</td>
                                        <td><span class="badge ${badgeClass}">${statusText}</span></td>
                                        <td>
                                            ${diffDays < 0 || diffDays < 30 ? 
                                                `<button class="btn-danger" onclick="destroyMedicine('${med.id}')">Musnahkan</button>` :
                                                `<button class="btn-secondary">Monitor</button>`
                                            }
                                        </td>
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

window.destroyMedicine = function(medId) {
    const med = medicines.find(m => m.id === medId);
    if (med && confirm(`Yakin ingin memusnahkan obat ${med.name}?\nStok: ${med.stock} ${med.unit}`)) {
        medicines = medicines.filter(m => m.id !== medId);
        saveData();
        alert('Obat berhasil dimusnahkan dari sistem!');
        renderApotekerExpired();
    }
};

// ========================================
// INITIALIZATION
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('===========================================');
    console.log('SIM PUSKESMAS 24 JAM - SYSTEM LOADED');
    console.log('===========================================');
    console.log('Demo Admin Account:');
    console.log('Username: ihksan');
    console.log('Password: admin123');
    console.log('Role: Admin');
    console.log('===========================================');
    console.log('FITUR AKTIF:');
    console.log('✅ Login Multi-Role (Admin, Perawat, Dokter, SIMPUS, Apoteker)');
    console.log('✅ Admin: Input pasien, kelola jadwal perawat, hapus data');
    console.log('✅ Dokter: Diagnosis pasien, buat resep (kirim ke Apoteker)');
    console.log('✅ Perawat: Lihat riwayat diagnosis, download PDF, lihat jadwal');
    console.log('✅ Apoteker: Kelola stok obat, proses resep, hapus obat kadaluarsa');
    console.log('✅ SIMPUS: Backup data dari Admin & Dokter, generate laporan');
    console.log('✅ Data terintegrasi antar role');
    console.log('===========================================');
});

// Make generatePDF available globally
window.generatePDF = generatePDF;