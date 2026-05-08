// SVG画像生成ヘルパー

// 商品カテゴリーに応じたSVG画像を生成
function generateProductImage(category, productName) {
    const colors = {
        fashion: { bg: '#E8F4F8', accent: '#4A90A4' },
        electronics: { bg: '#E8E8F0', accent: '#6B6B8B' },
        home: { bg: '#F0E8E0', accent: '#9B8B7E' },
        beauty: { bg: '#F5E6D3', accent: '#8B7355' },
        sports: { bg: '#E0F0E8', accent: '#6B8B7E' },
        food: { bg: '#F8E8E8', accent: '#A47B7B' }
    };

    const categoryIcons = {
        fashion: `
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="${colors.fashion.accent}" opacity="0.2"/>
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="${colors.fashion.accent}" stroke-width="2" fill="none"/>
            <circle cx="12" cy="12" r="3" fill="${colors.fashion.accent}"/>
        `,
        electronics: `
            <rect x="4" y="4" width="16" height="16" rx="2" fill="${colors.electronics.accent}" opacity="0.2"/>
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="${colors.electronics.accent}" stroke-width="2" fill="none"/>
            <circle cx="12" cy="12" r="4" fill="${colors.electronics.accent}"/>
            <line x1="12" y1="8" x2="12" y2="16" stroke="white" stroke-width="2"/>
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" stroke-width="2"/>
        `,
        home: `
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="${colors.home.accent}" opacity="0.2"/>
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="${colors.home.accent}" stroke-width="2" fill="none"/>
            <path d="M9 22V12h6v10" stroke="${colors.home.accent}" stroke-width="2" fill="none"/>
        `,
        beauty: `
            <circle cx="12" cy="8" r="5" fill="${colors.beauty.accent}" opacity="0.2"/>
            <circle cx="12" cy="8" r="5" stroke="${colors.beauty.accent}" stroke-width="2" fill="none"/>
            <path d="M8 13c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="${colors.beauty.accent}" stroke-width="2" fill="none"/>
            <line x1="12" y1="17" x2="12" y2="22" stroke="${colors.beauty.accent}" stroke-width="2"/>
            <line x1="9" y1="22" x2="15" y2="22" stroke="${colors.beauty.accent}" stroke-width="2"/>
        `,
        sports: `
            <circle cx="12" cy="12" r="9" fill="${colors.sports.accent}" opacity="0.2"/>
            <circle cx="12" cy="12" r="9" stroke="${colors.sports.accent}" stroke-width="2" fill="none"/>
            <path d="M12 3v18M3 12h18" stroke="${colors.sports.accent}" stroke-width="2"/>
            <path d="M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66" stroke="${colors.sports.accent}" stroke-width="1.5"/>
        `,
        food: `
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="${colors.food.accent}" opacity="0.2"/>
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="${colors.food.accent}" stroke-width="2" fill="none"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="${colors.food.accent}" stroke-width="2" fill="none"/>
        `
    };

    const color = colors[category] || colors.fashion;
    const icon = categoryIcons[category] || categoryIcons.fashion;

    const svg = `
        <svg width="300" height="300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="${color.bg}"/>
            ${icon}
        </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// カテゴリーアイコンを生成
function generateCategoryIcon(categoryId) {
    const icons = {
        fashion: '👔',
        electronics: '📱',
        home: '🏠',
        beauty: '💄',
        sports: '⚽',
        food: '🍽️'
    };
    return icons[categoryId] || '📦';
}

// プレースホルダー画像を生成
function generatePlaceholder(width, height, text, bgColor, textColor) {
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${width}" height="${height}" fill="${bgColor}"/>
            <text x="50%" y="50%" font-family="Noto Sans JP, sans-serif" font-size="16" 
                  fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
                ${text}
            </text>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// 商品画像のフォールバック処理
function handleImageError(img, category) {
    img.onerror = null; // 無限ループ防止
    img.src = generateProductImage(category, '商品画像');
}

// 画像の遅延読み込み
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// グローバルに公開
window.imageGenerator = {
    generateProductImage,
    generateCategoryIcon,
    generatePlaceholder,
    handleImageError,
    lazyLoadImages
};
