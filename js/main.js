// メインJavaScript

// モバイルメニュートグル
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // フェードインアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card, .step').forEach(el => {
        observer.observe(el);
    });
});

// ユーティリティ関数
const utils = {
    // 数値をフォーマット
    formatPrice: function(price) {
        return '¥' + price.toLocaleString('ja-JP');
    },

    // 日付をフォーマット
    formatDate: function(date) {
        const d = new Date(date);
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
    },

    // ローカルストレージ操作
    storage: {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('ストレージへの保存に失敗しました:', e);
                return false;
            }
        },
        get: function(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('ストレージからの取得に失敗しました:', e);
                return null;
            }
        },
        remove: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('ストレージからの削除に失敗しました:', e);
                return false;
            }
        }
    },

    // 通知表示
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background-color: ${type === 'success' ? '#6B8B7E' : type === 'error' ? '#A47B7B' : '#4A90A4'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// グローバルに公開
window.utils = utils;
