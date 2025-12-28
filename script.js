// script.js - Untuk website utama
document.addEventListener('DOMContentLoaded', function() {
    // Data game populer
    const popularGames = [
        {
            name: 'Mobile Legends',
            icon: 'fab fa-android',
            color: '#ff6b6b',
            description: 'Topup Diamond MLBB dengan harga termurah',
            price: 'Mulai Rp 20.000'
        },
        {
            name: 'Free Fire',
            icon: 'fas fa-fire',
            color: '#1dd1a1',
            description: 'Isi ulang Diamond Free Fire dengan harga spesial',
            price: 'Mulai Rp 15.000'
        },
        {
            name: 'PUBG Mobile',
            icon: 'fas fa-crosshairs',
            color: '#54a0ff',
            description: 'Topup UC PUBG Mobile dengan proses cepat',
            price: 'Mulai Rp 18.000'
        },
        {
            name: 'Valorant',
            icon: 'fas fa-ghost',
            color: '#ff9ff3',
            description: 'Isi ulang Points Valorant untuk skin terbaru',
            price: 'Mulai Rp 75.000'
        }
    ];

    // Load game cards
    const gamesGrid = document.querySelector('.games-grid');
    
    popularGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        gameCard.innerHTML = `
            <div class="game-img" style="background-color: ${game.color};">
                <i class="${game.icon}"></i>
            </div>
            <div class="game-info">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <p class="price">${game.price}</p>
                <a href="#" class="btn-buy">Beli Sekarang</a>
            </div>
        `;
        
        gamesGrid.appendChild(gameCard);
    });

    // Search functionality
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Mencari topup untuk: ${searchTerm}\n\nFitur pencarian akan dihubungkan dengan database produk.`);
            searchInput.value = '';
        }
    });

    // Buy button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-buy')) {
            e.preventDefault();
            const gameName = e.target.closest('.game-card').querySelector('h3').textContent;
            alert(`Anda akan membeli topup untuk: ${gameName}\n\nHalaman checkout akan muncul setelah backend diimplementasikan.`);
        }
    });

    // Admin button - Show login prompt
    const adminBtn = document.querySelector('.admin-btn');
    if (adminBtn) {
        adminBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Mengarahkan ke halaman admin...');
            // Di website sebenarnya, ini akan redirect ke admin.html
            // Untuk simulasi, kita bisa buka admin.html di tab baru
            window.open('admin.html', '_blank');
        });
    }

    // Auto update year in copyright
    document.querySelector('.copyright p').textContent = 
        `© ${new Date().getFullYear()} GameTopUp. All rights reserved.`;
}); 
