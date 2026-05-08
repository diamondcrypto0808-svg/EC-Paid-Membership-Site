// 商品データ管理

// 商品カテゴリー定義
const categories = {
    fashion: {
        id: 'fashion',
        name: 'ファッション',
        icon: '👔',
        color: '#E8F4F8'
    },
    electronics: {
        id: 'electronics',
        name: '家電・デジタル',
        icon: '📱',
        color: '#E8E8F0'
    },
    home: {
        id: 'home',
        name: 'ホーム・インテリア',
        icon: '🏠',
        color: '#F0E8E0'
    },
    beauty: {
        id: 'beauty',
        name: '美容・コスメ',
        icon: '💄',
        color: '#F5E6D3'
    },
    sports: {
        id: 'sports',
        name: 'スポーツ',
        icon: '⚽',
        color: '#E0F0E8'
    },
    food: {
        id: 'food',
        name: '食品・グルメ',
        icon: '🍽️',
        color: '#F8E8E8'
    }
};

// 商品データ
const productsData = [
    // ファッション
    {
        id: 1,
        name: 'プレミアムレザーバッグ',
        category: 'fashion',
        seller: 'レザークラフト工房',
        price: 28000,
        originalPrice: null,
        description: '職人が一つ一つ丁寧に仕上げた本革バッグ。使い込むほどに味わいが増します。',
        image: 'images/products/leather-bag.svg',
        badge: '新着',
        badgeType: 'new',
        stock: 15,
        rating: 4.8,
        reviews: 24,
        isFavorite: false,
        tags: ['本革', 'ハンドメイド', '日本製']
    },
    {
        id: 2,
        name: 'カシミヤストール',
        category: 'fashion',
        seller: 'ラグジュアリーテキスタイル',
        price: 15800,
        originalPrice: null,
        description: '上質なカシミヤ100%の柔らかなストール。肌触りが抜群です。',
        image: 'images/products/cashmere-stole.svg',
        badge: null,
        stock: 8,
        rating: 4.9,
        reviews: 18,
        isFavorite: false,
        tags: ['カシミヤ', '高級', '防寒']
    },
    {
        id: 3,
        name: 'レザーウォレット',
        category: 'fashion',
        seller: 'レザークラフト工房',
        price: 12000,
        originalPrice: null,
        description: 'シンプルで機能的な本革財布。長く愛用できる逸品です。',
        image: 'images/products/leather-wallet.svg',
        badge: null,
        stock: 20,
        rating: 4.7,
        reviews: 32,
        isFavorite: false,
        tags: ['本革', 'コンパクト', '日本製']
    },

    // 家電・デジタル
    {
        id: 4,
        name: 'ワイヤレスイヤホン Pro',
        category: 'electronics',
        seller: 'テックストア',
        price: 15800,
        originalPrice: null,
        description: 'ノイズキャンセリング機能搭載。クリアな音質で音楽を楽しめます。',
        image: 'images/products/wireless-earphones.svg',
        badge: '人気',
        badgeType: 'popular',
        stock: 30,
        rating: 4.6,
        reviews: 45,
        isFavorite: false,
        tags: ['ノイズキャンセリング', 'Bluetooth', '高音質']
    },
    {
        id: 5,
        name: 'スマートウォッチ',
        category: 'electronics',
        seller: 'テックストア',
        price: 24800,
        originalPrice: 29800,
        description: '健康管理からスマホ連携まで。多機能スマートウォッチ。',
        image: 'images/products/smartwatch.svg',
        badge: '17%OFF',
        badgeType: 'sale',
        stock: 12,
        rating: 4.5,
        reviews: 28,
        isFavorite: false,
        tags: ['健康管理', 'GPS', '防水']
    },
    {
        id: 6,
        name: 'ポータブルスピーカー',
        category: 'electronics',
        seller: 'オーディオプロ',
        price: 8900,
        originalPrice: null,
        description: 'コンパクトながらパワフルなサウンド。アウトドアにも最適。',
        image: 'images/products/portable-speaker.svg',
        badge: null,
        stock: 25,
        rating: 4.4,
        reviews: 19,
        isFavorite: false,
        tags: ['防水', 'Bluetooth', 'ポータブル']
    },

    // ホーム・インテリア
    {
        id: 7,
        name: 'アロマディフューザー',
        category: 'home',
        seller: 'リラックスライフ',
        price: 8500,
        originalPrice: null,
        description: '超音波式で静音設計。LEDライト付きでリラックス空間を演出。',
        image: 'images/products/aroma-diffuser.svg',
        badge: '会員限定',
        badgeType: 'exclusive',
        stock: 18,
        rating: 4.7,
        reviews: 36,
        isFavorite: false,
        tags: ['アロマ', 'LED', '静音']
    },
    {
        id: 8,
        name: 'セラミック食器セット',
        category: 'home',
        seller: 'キッチンアート',
        price: 12500,
        originalPrice: null,
        description: '職人が作る美しいセラミック食器。日常を彩る器です。',
        image: 'images/products/ceramic-dishes.svg',
        badge: '新着',
        badgeType: 'new',
        stock: 10,
        rating: 4.8,
        reviews: 22,
        isFavorite: false,
        tags: ['ハンドメイド', '日本製', '食洗機対応']
    },
    {
        id: 9,
        name: 'デザイナーズチェア',
        category: 'home',
        seller: 'モダンファニチャー',
        price: 38000,
        originalPrice: 45000,
        description: '北欧デザインの美しいチェア。座り心地も抜群です。',
        image: 'images/products/designer-chair.svg',
        badge: '16%OFF',
        badgeType: 'sale',
        stock: 5,
        rating: 4.9,
        reviews: 15,
        isFavorite: false,
        tags: ['北欧デザイン', '高品質', 'おしゃれ']
    },

    // 美容・コスメ
    {
        id: 10,
        name: 'オーガニックスキンケアセット',
        category: 'beauty',
        seller: 'ナチュラルビューティー',
        price: 9600,
        originalPrice: 12000,
        description: '天然成分100%のスキンケアセット。敏感肌にも優しい処方。',
        image: 'images/products/skincare-set.svg',
        badge: '20%OFF',
        badgeType: 'sale',
        stock: 22,
        rating: 4.8,
        reviews: 58,
        isFavorite: false,
        tags: ['オーガニック', '無添加', '敏感肌']
    },
    {
        id: 11,
        name: 'プレミアムヘアオイル',
        category: 'beauty',
        seller: 'ナチュラルビューティー',
        price: 5800,
        originalPrice: null,
        description: 'アルガンオイル配合。髪に潤いとツヤを与えます。',
        image: 'images/products/hair-oil.svg',
        badge: null,
        stock: 35,
        rating: 4.6,
        reviews: 41,
        isFavorite: false,
        tags: ['アルガンオイル', '保湿', 'ツヤ']
    },
    {
        id: 12,
        name: 'フェイシャルマスクセット',
        category: 'beauty',
        seller: 'ビューティーラボ',
        price: 3200,
        originalPrice: null,
        description: '週に一度のスペシャルケア。10枚入りでお得です。',
        image: 'images/products/facial-mask.svg',
        badge: null,
        stock: 50,
        rating: 4.5,
        reviews: 67,
        isFavorite: false,
        tags: ['保湿', 'スペシャルケア', 'お得']
    },

    // スポーツ
    {
        id: 13,
        name: 'ヨガマット プレミアム',
        category: 'sports',
        seller: 'フィットネスプロ',
        price: 6800,
        originalPrice: null,
        description: '厚さ6mmで膝に優しい。滑り止め加工で安全にヨガができます。',
        image: 'images/products/yoga-mat.svg',
        badge: null,
        stock: 28,
        rating: 4.7,
        reviews: 34,
        isFavorite: false,
        tags: ['ヨガ', '滑り止め', '厚手']
    },
    {
        id: 14,
        name: 'ランニングシューズ',
        category: 'sports',
        seller: 'スポーツギア',
        price: 14800,
        originalPrice: null,
        description: 'クッション性抜群。長距離ランニングにも対応。',
        image: 'images/products/running-shoes.svg',
        badge: '人気',
        badgeType: 'popular',
        stock: 16,
        rating: 4.8,
        reviews: 52,
        isFavorite: false,
        tags: ['ランニング', 'クッション', '軽量']
    },
    {
        id: 15,
        name: 'フィットネスバンドセット',
        category: 'sports',
        seller: 'フィットネスプロ',
        price: 3500,
        originalPrice: null,
        description: '3種類の強度で自宅トレーニングに最適。',
        image: 'images/products/fitness-bands.svg',
        badge: null,
        stock: 40,
        rating: 4.4,
        reviews: 29,
        isFavorite: false,
        tags: ['自宅トレーニング', 'コンパクト', '3種類']
    },

    // 食品・グルメ
    {
        id: 16,
        name: 'プレミアムコーヒー豆セット',
        category: 'food',
        seller: 'カフェセレクト',
        price: 4800,
        originalPrice: null,
        description: '世界各地から厳選した3種類のコーヒー豆セット。',
        image: 'images/products/coffee-beans.svg',
        badge: '新着',
        badgeType: 'new',
        stock: 25,
        rating: 4.9,
        reviews: 38,
        isFavorite: false,
        tags: ['スペシャルティ', '厳選', '3種類']
    },
    {
        id: 17,
        name: 'オーガニックハチミツ',
        category: 'food',
        seller: 'ナチュラルフード',
        price: 2800,
        originalPrice: null,
        description: '国産100%の純粋ハチミツ。自然の甘さをお楽しみください。',
        image: 'images/products/organic-honey.svg',
        badge: null,
        stock: 30,
        rating: 4.7,
        reviews: 44,
        isFavorite: false,
        tags: ['国産', '無添加', 'オーガニック']
    },
    {
        id: 18,
        name: 'プレミアム緑茶セット',
        category: 'food',
        seller: '茶匠',
        price: 5500,
        originalPrice: null,
        description: '京都宇治の高級緑茶。贈り物にも最適です。',
        image: 'images/products/green-tea.svg',
        badge: '会員限定',
        badgeType: 'exclusive',
        stock: 15,
        rating: 4.8,
        reviews: 26,
        isFavorite: false,
        tags: ['京都', '高級', 'ギフト']
    }
];

// 商品を取得する関数
function getProducts(filters = {}) {
    let filtered = [...productsData];

    // カテゴリーフィルター
    if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    // 検索フィルター
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    // 価格範囲フィルター
    if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    // ソート
    if (filters.sort) {
        switch (filters.sort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
            default:
                // デフォルトは新着順（IDの降順）
                filtered.sort((a, b) => b.id - a.id);
        }
    }

    return filtered;
}

// 商品IDから商品を取得
function getProductById(id) {
    return productsData.find(p => p.id === parseInt(id));
}

// カテゴリー情報を取得
function getCategories() {
    return categories;
}

// カテゴリーIDからカテゴリー情報を取得
function getCategoryById(id) {
    return categories[id];
}

// グローバルに公開
window.productsData = {
    products: productsData,
    categories: categories,
    getProducts: getProducts,
    getProductById: getProductById,
    getCategories: getCategories,
    getCategoryById: getCategoryById
};
