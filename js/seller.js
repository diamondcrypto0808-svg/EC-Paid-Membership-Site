// 出品者ページJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 出品者権限チェック
    if (!checkSellerAuth()) {
        utils.showNotification('出品者権限が必要です', 'error');
        setTimeout(() => {
            window.location.href = 'subscription.html';
        }, 1500);
        return;
    }

    // ダッシュボードデータ読み込み
    loadSellerDashboard();

    // 定期更新
    setInterval(loadSellerDashboard, 60000);
});

// 出品者権限チェック
function checkSellerAuth() {
    const user = utils.storage.get('user');
    if (!user) return false;
    
    // ビジネスプランまたは出品者権限を持つユーザー
    return user.plan === 'business' || user.isSeller === true;
}

// 出品者ダッシュボード読み込み
async function loadSellerDashboard() {
    try {
        const response = await fetch('/api/seller/dashboard', {
            headers: {
                'Authorization': `Bearer ${utils.storage.get('authToken')}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateSellerDashboard(data);
        }
    } catch (error) {
        console.error('ダッシュボード読み込みエラー:', error);
        
        // デモ用：サンプルデータ
        const sampleData = {
            stats: {
                monthlyRevenue: 342500,
                revenueGrowth: 18.2,
                monthlyOrders: 47,
                orderGrowth: 12,
                activeProducts: 24,
                totalViews: 3842,
                viewsGrowth: 24.5
            },
            recentOrders: [
                {
                    id: 'ORD-2847',
                    product: 'プレミアムレザーバッグ',
                    customer: '山田太郎',
                    amount: 28000,
                    status: 'delivered',
                    date: '2026/05/08 14:32'
                },
                {
                    id: 'ORD-2843',
                    product: 'レザーウォレット',
                    customer: '高橋健太',
                    amount: 12000,
                    status: 'shipping',
                    date: '2026/05/08 09:05'
                },
                {
                    id: 'ORD-2838',
                    product: 'レザーキーケース',
                    customer: '伊藤美咲',
                    amount: 6500,
                    status: 'processing',
                    date: '2026/05/07 16:20'
                }
            ],
            topProducts: [
                {
                    name: 'プレミアムレザーバッグ',
                    sales: 18,
                    views: 842,
                    revenue: 504000,
                    image: 'https://via.placeholder.com/80x80/E8F4F8/4A90A4?text=商品'
                },
                {
                    name: 'レザーウォレット',
                    sales: 24,
                    views: 1124,
                    revenue: 288000,
                    image: 'https://via.placeholder.com/80x80/F5E6D3/8B7355?text=商品'
                },
                {
                    name: 'レザーキーケース',
                    sales: 32,
                    views: 956,
                    revenue: 208000,
                    image: 'https://via.placeholder.com/80x80/E8E8F0/6B6B8B?text=商品'
                }
            ]
        };
        
        updateSellerDashboard(sampleData);
    }
}

// ダッシュボード更新
function updateSellerDashboard(data) {
    // 統計カード更新
    if (data.stats) {
        updateSellerStatCard(0, utils.formatPrice(data.stats.monthlyRevenue), data.stats.revenueGrowth);
        updateSellerStatCard(1, data.stats.monthlyOrders, data.stats.orderGrowth);
        updateSellerStatCard(2, data.stats.activeProducts);
        updateSellerStatCard(3, data.stats.totalViews, data.stats.viewsGrowth);
    }

    // 最近の注文更新
    if (data.recentOrders) {
        updateSellerOrders(data.recentOrders);
    }

    // 人気商品更新
    if (data.topProducts) {
        updateTopProducts(data.topProducts);
    }
}

// 統計カード更新
function updateSellerStatCard(index, value, change) {
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards[index]) {
        const valueEl = statCards[index].querySelector('.stat-card__value');
        const changeEl = statCards[index].querySelector('.stat-card__change');
        
        if (valueEl) {
            valueEl.textContent = value;
        }
        
        if (changeEl && change !== undefined) {
            changeEl.textContent = `${change > 0 ? '+' : ''}${change}%`;
            changeEl.className = `stat-card__change ${change > 0 ? 'stat-card__change--up' : 'stat-card__change--down'}`;
        }
    }
}

// 注文更新
function updateSellerOrders(orders) {
    const tbody = document.querySelector('.data-table tbody');
    if (!tbody) return;

    const statusMap = {
        'delivered': { text: '配送済み', class: 'badge--success' },
        'shipping': { text: '配送中', class: 'badge--warning' },
        'processing': { text: '処理中', class: 'badge--info' }
    };

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.product}</td>
            <td>${order.customer}</td>
            <td>${utils.formatPrice(order.amount)}</td>
            <td><span class="badge ${statusMap[order.status].class}">${statusMap[order.status].text}</span></td>
            <td>${order.date}</td>
            <td>
                <button class="btn btn-sm ${order.status === 'processing' ? 'btn-primary' : 'btn-outline'}" 
                        onclick="handleOrderAction('${order.id}', '${order.status}')">
                    ${order.status === 'processing' ? '発送する' : order.status === 'shipping' ? '配送完了' : '詳細'}
                </button>
            </td>
        </tr>
    `).join('');
}

// 人気商品更新
function updateTopProducts(products) {
    const container = document.querySelector('.product-performance');
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="performance-item">
            <div class="performance-item__image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="performance-item__info">
                <h4 class="performance-item__name">${product.name}</h4>
                <p class="performance-item__stats">販売数: ${product.sales} | 閲覧数: ${product.views.toLocaleString()}</p>
            </div>
            <div class="performance-item__revenue">
                <span class="performance-item__amount">${utils.formatPrice(product.revenue)}</span>
                <span class="performance-item__label">売上</span>
            </div>
        </div>
    `).join('');
}

// 注文アクション処理
async function handleOrderAction(orderId, currentStatus) {
    let action, newStatus, message;
    
    switch (currentStatus) {
        case 'processing':
            action = 'ship';
            newStatus = 'shipping';
            message = '発送処理を実行しますか？';
            break;
        case 'shipping':
            action = 'complete';
            newStatus = 'delivered';
            message = '配送完了にしますか？';
            break;
        default:
            // 詳細表示
            viewOrderDetail(orderId);
            return;
    }
    
    if (!confirm(message)) return;
    
    try {
        const response = await fetch(`/api/seller/orders/${orderId}/${action}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${utils.storage.get('authToken')}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            utils.showNotification('注文ステータスを更新しました', 'success');
            
            // 購入者にメール通知
            sendOrderNotification(orderId, newStatus);
            
            // ダッシュボード再読み込み
            loadSellerDashboard();
        }
    } catch (error) {
        console.error('注文更新エラー:', error);
        
        // デモ用
        utils.showNotification('注文ステータスを更新しました（デモモード）', 'success');
        setTimeout(() => {
            loadSellerDashboard();
        }, 1000);
    }
}

// 注文詳細表示
function viewOrderDetail(orderId) {
    console.log('注文詳細:', orderId);
    utils.showNotification(`注文 #${orderId} の詳細を表示`, 'info');
    // 実際の実装では、モーダルやページ遷移で詳細を表示
}

// 注文通知メール送信
async function sendOrderNotification(orderId, status) {
    try {
        await fetch('/api/notifications/order', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${utils.storage.get('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId, status })
        });
        
        console.log(`注文 #${orderId} の通知メールを送信しました`);
    } catch (error) {
        console.error('通知メール送信エラー:', error);
    }
}

// グローバルに公開
window.sellerUtils = {
    handleOrderAction,
    viewOrderDetail
};
