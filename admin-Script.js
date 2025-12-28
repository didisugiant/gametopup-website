// admin-script.js - Untuk halaman admin

// Login credentials (simpan di localStorage untuk simulasi)
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin123';

// Check if user is logged in
function checkLogin() {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (isLoggedIn) {
        showAdminDashboard();
    }
}

// Login form handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        // Save login state
        localStorage.setItem('admin_logged_in', 'true');
        localStorage.setItem('admin_username', username);
        
        showAdminDashboard();
        showNotification('Login berhasil!', 'success');
    } else {
        showNotification('Username atau password salah!', 'error');
    }
});

// Show admin dashboard
function showAdminDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    
    // Update admin name
    const adminName = localStorage.getItem('admin_username') || 'Admin';
    document.getElementById('admin-name').textContent = adminName;
    
    // Load dashboard
    showTab('dashboard');
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_username');
        
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
        
        // Reset login form
        document.getElementById('login-form').reset();
        
        showNotification('Anda telah logout', 'info');
    }
}

// Tab navigation
function showTab(tabId) {
    const tabs = ['dashboard', 'transactions', 'products', 'orders', 'settings'];
    
    // Remove active class from all menu items
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked menu item
    event.target.classList.add('active');
    
    // Load tab content
    loadTabContent(tabId);
}

// Load tab content
function loadTabContent(tabId) {
    const contentArea = document.getElementById('admin-content');
    
    switch(tabId) {
        case 'dashboard':
            contentArea.innerHTML = getDashboardContent();
            initDashboardCharts();
            break;
        case 'transactions':
            contentArea.innerHTML = getTransactionsContent();
            loadTransactions();
            break;
        case 'products':
            contentArea.innerHTML = getProductsContent();
            loadProducts();
            break;
        case 'orders':
            contentArea.innerHTML = getOrdersContent();
            loadOrders();
            break;
        case 'settings':
            contentArea.innerHTML = getSettingsContent();
            break;
    }
}

// Dashboard content
function getDashboardContent() {
    return `
        <div class="admin-title">
            <h1><i class="fas fa-tachometer-alt"></i> Dashboard</h1>
            <div style="font-size: 0.9rem; color: #666;">
                ${new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background-color: #6c5ce7;">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="stat-info">
                    <h3>Rp 12.450.000</h3>
                    <p>Pendapatan Hari Ini</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background-color: #00b894;">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="stat-info">
                    <h3 id="today-orders">0</h3>
                    <p>Transaksi Hari Ini</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background-color: #74b9ff;">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-info">
                    <h3 id="total-users">0</h3>
                    <p>Total Pengguna</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon" style="background-color: #fdcb6e;">
                    <i class="fas fa-box-open"></i>
                </div>
                <div class="stat-info">
                    <h3 id="active-products">0</h3>
                    <p>Produk Aktif</p>
                </div>
            </div>
        </div>
        
        <div class="table-container">
            <h2><i class="fas fa-history"></i> Transaksi Terbaru</h2>
            <div id="recent-transactions">
                <p>Memuat data transaksi...</p>
            </div>
        </div>
        
        <div class="table-container">
            <h2><i class="fas fa-chart-line"></i> Statistik Penjualan</h2>
            <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 5px;">
                <div style="text-align: center; color: #666;">
                    <i class="fas fa-chart-bar" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Grafik penjualan akan ditampilkan di sini</p>
                    <p><small>Integrasikan dengan Chart.js untuk visualisasi data</small></p>
                </div>
            </div>
        </div>
    `;
}

// Initialize dashboard charts
function initDashboardCharts() {
    // Simulate loading data
    setTimeout(() => {
        document.getElementById('today-orders').textContent = '156';
        document.getElementById('total-users').textContent = '3,245';
        document.getElementById('active-products').textContent = '89';
        
        // Load recent transactions
        const transactions = [
            { id: '#TRX001', game: 'Mobile Legends', user: 'john_doe', amount: 'Rp 50.000', status: 'success', time: '10:25' },
            { id: '#TRX002', game: 'Free Fire', user: 'gamer_ff', amount: 'Rp 25.000', status: 'success', time: '09:15' },
            { id: '#TRX003', game: 'PUBG Mobile', user: 'pubg_master', amount: 'Rp 100.000', status: 'pending', time: '08:42' },
            { id: '#TRX004', game: 'Valorant', user: 'valorant_fan', amount: 'Rp 75.000', status: 'success', time: '22:30' }
        ];
        
        let html = '<table><thead><tr><th>ID</th><th>Game</th><th>Pengguna</th><th>Jumlah</th><th>Status</th><th>Waktu</th></tr></thead><tbody>';
        
        transactions.forEach(tx => {
            html += `
                <tr>
                    <td>${tx.id}</td>
                    <td>${tx.game}</td>
                    <td>${tx.user}</td>
                    <td>${tx.amount}</td>
                    <td><span class="status ${tx.status}">${tx.status === 'success' ? 'Sukses' : 'Pending'}</span></td>
                    <td>${tx.time}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        document.getElementById('recent-transactions').innerHTML = html;
    }, 500);
}

// Other content functions (simplified for example)
function getTransactionsContent() {
    return `
        <div class="admin-title">
            <h1><i class="fas fa-exchange-alt"></i> Transaksi</h1>
            <button class="btn btn-primary" onclick="exportData()">
                <i class="fas fa-download"></i> Export
            </button>
        </div>
        <div class="table-container">
            <p>Daftar transaksi akan ditampilkan di sini</p>
        </div>
    `;
}

function getProductsContent() {
    return `
        <div class="admin-title">
            <h1><i class="fas fa-gamepad"></i> Produk</h1>
            <button class="btn btn-success" onclick="addProduct()">
                <i class="fas fa-plus"></i> Tambah Produk
            </button>
        </div>
        <div class="table-container">
            <p>Daftar produk akan ditampilkan di sini</p>
        </div>
    `;
}

function getOrdersContent() {
    return `
        <div class="admin-title">
            <h1><i class="fas fa-shopping-cart"></i> Pesanan</h1>
        </div>
        <div class="table-container">
            <p>Daftar pesanan akan ditampilkan di sini</p>
        </div>
    `;
}

function getSettingsContent() {
    return `
        <div class="admin-title">
            <h1><i class="fas fa-cog"></i> Pengaturan</h1>
        </div>
        <div class="table-container">
            <h2>Ubah Password Admin</h2>
            <div style="max-width: 500px;">
                <div class="form-group">
                    <label>Password Baru</label>
                    <input type="password" id="new-password" placeholder="Masukkan password baru">
                </div>
                <div class="form-group">
                    <label>Konfirmasi Password</label>
                    <input type="password" id="confirm-password" placeholder="Konfirmasi password baru">
                </div>
                <button class="btn btn-success" onclick="changePassword()">Simpan Password</button>
            </div>
        </div>
    `;
}

// Helper functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    
    notification.innerHTML = `
        <strong>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</strong>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function addProduct() {
    alert('Fitur tambah produk akan diimplementasikan dengan backend.');
}

function exportData() {
    alert('Fitur export data akan diimplementasikan dengan backend.');
}

function changePassword() {
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    
    if (newPass && newPass === confirmPass) {
        showNotification('Password berhasil diubah!', 'success');
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
    } else {
        showNotification('Password tidak cocok atau kosong!', 'error');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
});
