# 画像使用ガイド

## 📸 現在の画像システム

プレミアムマーケットでは、以下の3つの方法で商品画像を表示できます：

### 1. SVG自動生成（現在のデフォルト）✅

カテゴリーに応じた色とアイコンで自動的にSVG画像を生成します。

**メリット**:
- 画像ファイル不要
- 軽量で高速
- カテゴリーごとに統一感のあるデザイン
- レスポンシブ対応

**使用方法**:
```javascript
// 自動的に生成されます
const imageUrl = window.imageGenerator.generateProductImage('fashion', '商品名');
```

### 2. 実際の商品画像を使用

`images/products/`フォルダに画像を配置して使用します。

**手順**:

1. **画像を準備**
   ```
   images/products/
   ├── leather-bag.jpg
   ├── skincare-set.jpg
   └── wireless-earphones.jpg
   ```

2. **商品データを更新** (`js/products-data.js`)
   ```javascript
   {
       id: 1,
       name: 'プレミアムレザーバッグ',
       image: 'images/products/leather-bag.jpg', // パスを変更
       // ...
   }
   ```

3. **フォールバック処理**
   ```html
   <img src="images/products/leather-bag.jpg" 
        onerror="this.src=window.imageGenerator.generateProductImage('fashion', 'プレミアムレザーバッグ')"
        alt="プレミアムレザーバッグ">
   ```

### 3. 外部URL（プレースホルダーサービス）

開発中やテスト用に外部サービスを使用できます。

```javascript
image: 'https://via.placeholder.com/300x300/E8F4F8/4A90A4?text=商品画像'
```

## 🎨 カテゴリー別カラーパレット

各カテゴリーには専用の色が設定されています：

| カテゴリー | 背景色 | アクセント色 | アイコン |
|-----------|--------|------------|---------|
| ファッション | #E8F4F8 | #4A90A4 | 👔 |
| 家電・デジタル | #E8E8F0 | #6B6B8B | 📱 |
| ホーム・インテリア | #F0E8E0 | #9B8B7E | 🏠 |
| 美容・コスメ | #F5E6D3 | #8B7355 | 💄 |
| スポーツ | #E0F0E8 | #6B8B7E | ⚽ |
| 食品・グルメ | #F8E8E8 | #A47B7B | 🍽️ |

## 📦 商品画像の推奨仕様

### サイズ
- **一覧表示**: 600x600px（正方形）
- **詳細表示**: 1200x1200px（正方形）
- **サムネイル**: 300x300px（正方形）

### フォーマット
1. **WebP** - 最も推奨（軽量・高品質）
2. **JPEG** - 互換性重視
3. **PNG** - 透過が必要な場合

### ファイルサイズ
- 一覧用: 50KB以下
- 詳細用: 200KB以下

### 最適化ツール
- [TinyPNG](https://tinypng.com/) - オンライン圧縮
- [Squoosh](https://squoosh.app/) - Google製
- [ImageOptim](https://imageoptim.com/) - Mac用

## 🔧 実装例

### 商品カードに画像を表示

```html
<div class="product-card">
    <div class="product-card__image">
        <img src="images/products/leather-bag.jpg" 
             alt="プレミアムレザーバッグ"
             onerror="handleImageError(this, 'fashion')"
             loading="lazy">
    </div>
    <!-- ... -->
</div>
```

### JavaScriptで動的に生成

```javascript
function displayProduct(product) {
    // 実際の画像がある場合はそれを使用、なければSVG生成
    const imageUrl = product.image || 
        window.imageGenerator.generateProductImage(product.category, product.name);
    
    return `
        <img src="${imageUrl}" 
             alt="${product.name}"
             onerror="handleImageError(this, '${product.category}')">
    `;
}
```

## 📁 推奨フォルダ構造

```
images/
├── products/              # 商品画像
│   ├── fashion/          # カテゴリー別
│   │   ├── leather-bag-01.jpg
│   │   ├── leather-bag-02.jpg
│   │   └── cashmere-stole-01.jpg
│   ├── electronics/
│   │   ├── wireless-earphones-01.jpg
│   │   └── smartwatch-01.jpg
│   └── ...
├── categories/           # カテゴリーバナー
│   ├── fashion-banner.jpg
│   └── electronics-banner.jpg
├── banners/             # ヒーローバナー
│   └── hero-main.jpg
└── icons/               # アイコン
    └── logo.svg
```

## 🚀 画像の追加手順

### ステップ1: 画像を準備
```bash
# 画像を適切なサイズにリサイズ
# 600x600pxの正方形に
```

### ステップ2: 画像を配置
```bash
# imagesフォルダに配置
cp my-product.jpg images/products/
```

### ステップ3: 商品データを更新
```javascript
// js/products-data.js
{
    id: 1,
    name: 'プレミアムレザーバッグ',
    image: 'images/products/leather-bag.jpg', // ← パスを更新
    category: 'fashion',
    // ...
}
```

### ステップ4: 確認
```bash
# ローカルサーバーで確認
python -m http.server 8000
# http://localhost:8000/products.html
```

## 🎯 無料画像素材サイト

実際の商品画像が必要な場合、以下のサイトが利用できます：

### 商用利用可能
1. **[Unsplash](https://unsplash.com/)** - 高品質な写真
2. **[Pexels](https://www.pexels.com/)** - 豊富な素材
3. **[Pixabay](https://pixabay.com/)** - 多言語対応
4. **[Burst by Shopify](https://burst.shopify.com/)** - EC向け

### 日本語対応
1. **[写真AC](https://www.photo-ac.com/)** - 日本の素材
2. **[ぱくたそ](https://www.pakutaso.com/)** - 日本人モデル

## ⚠️ 注意事項

### 著作権
- 商品画像の権利を確認
- ライセンスを遵守
- クレジット表記が必要な場合は記載

### パフォーマンス
- 画像を最適化してから使用
- 遅延読み込み（lazy loading）を活用
- WebP形式を優先的に使用

### アクセシビリティ
- alt属性を必ず設定
- 意味のある説明文を記載
- 装飾的な画像にはalt=""を使用

## 🔄 画像の切り替え方法

### SVGから実画像へ切り替え

**現在（SVG自動生成）**:
```javascript
image: window.imageGenerator.generateProductImage('fashion', '商品名')
```

**実画像に変更**:
```javascript
image: 'images/products/leather-bag.jpg'
```

### 一括変更スクリプト

```javascript
// すべての商品画像を実画像に切り替え
productsData.forEach(product => {
    product.image = `images/products/${product.category}/${product.id}.jpg`;
});
```

## 📊 パフォーマンス最適化

### 遅延読み込み
```html
<img src="placeholder.jpg" 
     data-src="images/products/actual-image.jpg"
     loading="lazy"
     alt="商品名">
```

### レスポンシブ画像
```html
<picture>
    <source srcset="images/products/product-large.webp" media="(min-width: 1024px)" type="image/webp">
    <source srcset="images/products/product-medium.webp" media="(min-width: 768px)" type="image/webp">
    <img src="images/products/product-small.jpg" alt="商品名">
</picture>
```

---

**現在の状態**: SVG自動生成で完全に動作しています。実際の商品画像を追加する場合は、このガイドに従ってください。
