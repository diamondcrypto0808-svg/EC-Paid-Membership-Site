// マーケットプレイスJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 認証チェック
    if (!window.authUtils.checkAuth()) {
        utils.showNotification('ログインが必要です', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    // ユーザー情報表示
    displayUserInfo();

    // 商品データ読み込み
    loadProducts();

    // 検索機能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // フィルター機能
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilter);
    });

    // お気に入りボタン
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card__favorite')) {
            handleFavorite(e.target.closest('.product-card__favorite'));
        }
    });

    // カートに追加
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-primary') && e.target.textContent.includes('カートに追加')) {
            handleAddToCart(e.target.closest('.product-card'));
        }
    });

    // ログアウトボタン
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.authUtils.logout();
        });
    }
});

// ユーザー情報表示
function displayUserInfo() {
    const user = utils.storage.get('user');
    if (user) {
        const userName = document.querySelector('.user-name');
        const userAvatar = document.querySelector('.user-avatar');
        
        if (userName) {
            userName.textContent = user.name;
        }
        
        if (userAvatar) {
            userAvatar.textContent = user.name.charAt(0);
        }
    }
}

// 商品データ読み込み
async function loadProducts(filters = {}) {
    try {
        // APIリクエスト（実装例）
        const queryParams = new URLSearchParams(filters);
        const response = await fetch(`/api/products?${queryParams}`);
        
        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
        } else {
            throw new Error('商品の読み込みに失敗しました');
        }
    } catch (error) {
        console.error('商品読み込みエラー:', error);
        
        // デモ用：サンプルデータ
        const sampleProducts = generateSampleProducts();
        displayProducts(sampleProducts);
    }
}

// サンプル商品データ生成（products-data.jsから取得）
function generateSampleProducts() {
    // products-data.jsが読み込まれている場合はそちらを使用
    if (window.productsData && window.productsData.products) {
        return window.productsData.products;
    }
    
    // フォールバック用のサンプルデータ
    return [
        {
            id: 1,
            name: 'プレミアムレザーバッグ',
            category: 'fashion',
            seller: 'レザークラフト工房',
            price: 28000,
            image: generateProductImageURL('fashion', 'プレミアムレザーバッグ'),
            badge: '新着',
            isFavorite: false
        },
        {
            id: 2,
            name: 'オーガニックスキンケアセット',
            category: 'beauty',
            seller: 'ナチュラルビューティー',
            price: 9600,
            originalPrice: 12000,
            image: generateProductImageURL('beauty', 'オーガニックスキンケアセット'),
            badge: '20%OFF',
            badgeType: 'sale',
            isFavorite: false
        }
    ];
}

// 商品画像URLを生成
function generateProductImageURL(category, productName) {
    if (window.imageGenerator) {
        return window.imageGenerator.generateProductImage(category, productName);
    }
    // フォールバック
    const colors = {
        fashion: 'E8F4F8/4A90A4',
        electronics: 'E8E8F0/6B6B8B',
        home: 'F0E8E0/9B8B7E',
        beauty: 'F5E6D3/8B7355',
        sports: 'E0F0E8/6B8B7E',
        food: 'F8E8E8/A47B7B'
    };
    const color = colors[category] || 'E8F4F8/4A90A4';
    return `https://via.placeholder.com/300x300/${color}?text=${encodeURIComponent(productName)}`;
}

// 商品表示
function displayProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            ${product.badge ? `<div class="product-card__badge ${product.badgeType === 'sale' ? 'product-card__badge--sale' : ''}">${product.badge}</div>` : ''}
            <div class="product-card__image">
                <img src="${product.image}" alt="${product.name}">
                <button class="product-card__favorite" data-favorite="${product.isFavorite}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="${product.isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                </button>
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__seller">出品者: ${product.seller}</p>
                <div class="product-card__footer">
                    <span class="product-card__price">
                        ${product.originalPrice ? `<span class="price-original">${utils.formatPrice(product.originalPrice)}</span>` : ''}
                        ${utils.formatPrice(product.price)}
                    </span>
                    <button class="btn btn-sm btn-primary">カートに追加</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 検索処理
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log('検索:', query);
        loadProducts({ search: query });
    }
}

// フィルター処理
function handleFilter(e) {
    const filterSelects = document.querySelectorAll('.filter-select');
    const filters = {};
    
    filterSelects.forEach(select => {
        if (select.value) {
            const name = select.name || 'filter';
            filters[name] = select.value;
        }
    });
    
    console.log('フィルター:', filters);
    loadProducts(filters);
}

// お気に入り処理
async function handleFavorite(button) {
    const productCard = button.closest('.product-card');
    const productId = productCard.dataset.productId;
    const isFavorite = button.dataset.favorite === 'true';
    
    try {
        // APIリクエスト（実装例）
        const response = await fetch(`/api/favorites/${productId}`, {
            method: isFavorite ? 'DELETE' : 'POST',
            headers: {
                'Authorization': `Bearer ${utils.storage.get('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            button.dataset.favorite = !isFavorite;
            const svg = button.querySelector('svg');
            svg.setAttribute('fill', !isFavorite ? 'currentColor' : 'none');
            
            utils.showNotification(
                !isFavorite ? 'お気に入りに追加しました' : 'お気に入りから削除しました',
                'success'
            );
        }
    } catch (error) {
        console.error('お気に入りエラー:', error);
        
        // デモ用
        button.dataset.favorite = !isFavorite;
        const svg = button.querySelector('svg');
        svg.setAttribute('fill', !isFavorite ? 'currentColor' : 'none');
        
        utils.showNotification(
            !isFavorite ? 'お気に入りに追加しました' : 'お気に入りから削除しました',
            'success'
        );
    }
}

// カートに追加
async function handleAddToCart(productCard) {
    const productId = productCard.dataset.productId;
    
    try {
        // APIリクエスト（実装例）
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${utils.storage.get('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        if (response.ok) {
            utils.showNotification('カートに追加しました', 'success');
            updateCartCount();
        }
    } catch (error) {
        console.error('カート追加エラー:', error);
        
        // デモ用
        const cart = utils.storage.get('cart') || [];
        cart.push({ productId, quantity: 1, addedAt: new Date().toISOString() });
        utils.storage.set('cart', cart);
        
        utils.showNotification('カートに追加しました', 'success');
        updateCartCount();
    }
}

// カート数更新
function updateCartCount() {
    const cart = utils.storage.get('cart') || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}
