// 管理画面JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 管理者権限チェック
    if (!checkAdminAuth()) {
        utils.showNotification('管理者権限が必要です', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    // ダッシュボードデータ読み込み
    loadDashboardData();

    // リアルタイム更新（30秒ごと）
    setInterval(loadDashboardData, 30000);

    // データテーブルのソート機能
    initTableSort();

    // レポート出力ボタン
    const reportBtn = document.querySelector('.admin-header__actions .btn-outline');
    if (reportBtn) {
        reportBtn.addEventListener('click', exportReport);
    }
});

// 管理者権限チェック
function checkAdminAuth() {
    const user = utils.storage.get('user');
    if (!user) return false;
    
    // 実際の実装では、ユーザーの役割をチェック
    return user.role === 'admin' || user.email === 'admin@premium-market.jp';
}

// ダッシュボードデータ読み込み
async function loadDashboardData() {
    try {
        const response = await fetch('/api/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${utils.storage.get('authToken')}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            updateDashboard(data);
        }
    } catch (error) {
        console.error('ダッシュボードデータ読み込みエラー:', error);
        
        // デモ用：サンプルデータ
        const sampleData = {
            stats: {
                totalMembers: 2847,
                memberGrowth: 12.5,
                monthlyRevenue: 8542000,
                revenueGrowth: 8.2,
                monthlyOrders: 1284,
                orderGrowth: 15.3,
                totalProducts: 3456,
                productGrowth: 24
            },
            recentOrders: [
                {
                    id: 'ORD-2847',
                    customer: '山田太郎',
                    product: 'プレミアムレザーバッグ',
                    amount: 28000,
                    status: 'delivered',
                    date: '2026/05/08 14:32'
                },
                {
                    id: 'ORD-2846',
                    customer: '佐藤花子',
                    product: 'オーガニックスキンケアセット',
                    amount: 9600,
                    status: 'shipping',
                    date: '2026/05/08 13:15'
                },
                {
                    id: 'ORD-2845',
                    customer: '鈴木一郎',
                    product: 'ワイヤレスイヤホン Pro',
                    amount: 15800,
                    status: 'processing',
                    date: '2026/05/08 11:48'
                }
            ],
            newMembers: [
                {
                    name: '中村優子',
                    email: 'nakamura@example.com',
                    plan: 'プレミアム',
                    date: '2026/05/08'
                },
                {
                    name: '小林大輔',
                    email: 'kobayashi@example.com',
                    plan: 'スタンダード',
                    date: '2026/05/07'
                },
                {
                    name: '加藤真理子',
                    email: 'kato@example.com',
                    plan: 'ビジネス',
                    date: '2026/05/07'
                }
            ]
        };
        
        updateDashboard(sampleData);
    }
}

// ダッシュボード更新
function updateDashboard(data) {
    // 統計カード更新
    if (data.stats) {
        updateStatCard(0, data.stats.totalMembers, data.stats.memberGrowth);
        updateStatCard(1, utils.formatPrice(data.stats.monthlyRevenue), data.stats.revenueGrowth);
        updateStatCard(2, data.stats.monthlyOrders, data.stats.orderGrowth);
        updateStatCard(3, data.stats.totalProducts, data.stats.productGrowth);
    }

    // 最近の注文更新
    if (data.recentOrders) {
        updateRecentOrders(data.recentOrders);
    }

    // 新規会員更新
    if (data.newMembers) {
        updateNewMembers(data.newMembers);
    }
}

// 統計カード更新
function updateStatCard(index, value, change) {
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

// 最近の注文更新
function updateRecentOrders(orders) {
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
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${utils.formatPrice(order.amount)}</td>
            <td><span class="badge ${statusMap[order.status].class}">${statusMap[order.status].text}</span></td>
            <td>${order.date}</td>
            <td>
                <button class="btn-icon" title="詳細" onclick="viewOrderDetail('${order.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// 新規会員更新
function updateNewMembers(members) {
    const userList = document.querySelector('.user-list');
    if (!userList) return;

    userList.innerHTML = members.map(member => `
        <div class="user-item">
            <div class="user-item__avatar">${member.name.charAt(0)}</div>
            <div class="user-item__info">
                <h4 class="user-item__name">${member.name}</h4>
                <p class="user-item__email">${member.email}</p>
            </div>
            <span class="user-item__plan">${member.plan}</span>
            <span class="user-item__date">${member.date}</span>
        </div>
    `).join('');
}

// テーブルソート初期化
function initTableSort() {
    const headers = document.querySelectorAll('.data-table th');
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => sortTable(index));
    });
}

// テーブルソート
function sortTable(columnIndex) {
    const table = document.querySelector('.data-table table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // 数値の場合
        if (!isNaN(aValue) && !isNaN(bValue)) {
            return parseFloat(aValue) - parseFloat(bValue);
        }
        
        // 文字列の場合
        return aValue.localeCompare(bValue, 'ja');
    });
    
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

// 注文詳細表示
function viewOrderDetail(orderId) {
    console.log('注文詳細:', orderId);
    utils.showNotification(`注文 #${orderId} の詳細を表示`, 'info');
    // 実際の実装では、モーダルやページ遷移で詳細を表示
}

// レポート出力
async function exportReport() {
    try {
        utils.showNotification('レポートを生成中...', 'info');
        
        const response = await fetch('/api/admin/export-report', {
            headers: {
                'Authorization': `Bearer ${utils.storage.get('authToken')}`
            }
        });
        
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            utils.showNotification('レポートをダウンロードしました', 'success');
        }
    } catch (error) {
        console.error('レポート出力エラー:', error);
        utils.showNotification('レポート出力に失敗しました', 'error');
    }
}

// グローバルに公開
window.adminUtils = {
    viewOrderDetail,
    exportReport
};
