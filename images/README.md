# 画像フォルダ構造

このフォルダには、プレミアムマーケットで使用する画像ファイルを配置します。

## フォルダ構成

```
images/
├── products/          # 商品画像
│   ├── leather-bag.jpg
│   ├── skincare-set.jpg
│   └── ...
├── categories/        # カテゴリー画像
│   ├── fashion.jpg
│   ├── electronics.jpg
│   └── ...
├── banners/          # バナー画像
│   ├── hero-banner.jpg
│   └── ...
└── icons/            # アイコン画像
    └── ...
```

## 商品画像の推奨仕様

### サイズ
- **商品一覧**: 600x600px（正方形）
- **商品詳細**: 1200x1200px（正方形）
- **サムネイル**: 300x300px（正方形）

### フォーマット
- **推奨**: WebP（軽量で高品質）
- **代替**: JPEG（互換性重視）
- **透過が必要な場合**: PNG

### ファイルサイズ
- 商品一覧用: 50KB以下
- 商品詳細用: 200KB以下

### 命名規則
```
{カテゴリー}-{商品名}-{連番}.{拡張子}

例:
fashion-leather-bag-01.jpg
beauty-skincare-set-01.jpg
electronics-wireless-earphones-01.jpg
```

## カテゴリー別の商品例

### ファッション (fashion)
- leather-bag.jpg - プレミアムレザーバッグ
- cashmere-stole.jpg - カシミヤストール
- leather-wallet.jpg - レザーウォレット

### 家電・デジタル (electronics)
- wireless-earphones.jpg - ワイヤレスイヤホン
- smartwatch.jpg - スマートウォッチ
- portable-speaker.jpg - ポータブルスピーカー

### ホーム・インテリア (home)
- aroma-diffuser.jpg - アロマディフューザー
- ceramic-dishes.jpg - セラミック食器セット
- designer-chair.jpg - デザイナーズチェア

### 美容・コスメ (beauty)
- skincare-set.jpg - オーガニックスキンケアセット
- hair-oil.jpg - プレミアムヘアオイル
- facial-mask.jpg - フェイシャルマスクセット

### スポーツ (sports)
- yoga-mat.jpg - ヨガマット
- running-shoes.jpg - ランニングシューズ
- fitness-bands.jpg - フィットネスバンドセット

### 食品・グルメ (food)
- coffee-beans.jpg - プレミアムコーヒー豆セット
- organic-honey.jpg - オーガニックハチミツ
- green-tea.jpg - プレミアム緑茶セット

## 画像の最適化

### 推奨ツール
1. **ImageOptim** (Mac) - 無料、簡単
2. **TinyPNG** (Web) - オンラインで圧縮
3. **Squoosh** (Web) - Googleの画像最適化ツール

### 最適化のポイント
- 適切なサイズにリサイズ
- 品質を保ちながら圧縮
- WebP形式への変換を検討
- メタデータの削除

## 画像の追加方法

1. 適切なフォルダに画像を配置
2. `js/products-data.js`の商品データを更新
3. 画像パスを正しく設定

```javascript
{
    id: 1,
    name: '商品名',
    image: 'images/products/product-name.jpg',
    // ...
}
```

## フォールバック画像

画像が見つからない場合、自動的にSVGプレースホルダーが表示されます。
`js/image-generator.js`で生成されます。

## ライセンスと著作権

- 商品画像は各出品者が所有
- 使用前に権利を確認
- 著作権を尊重した使用を

---

**注意**: 実際の商品画像を使用する際は、適切な権利処理を行ってください。
