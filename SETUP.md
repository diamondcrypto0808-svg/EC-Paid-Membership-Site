# セットアップガイド

## 📋 必要な環境

- モダンなWebブラウザ（Chrome, Firefox, Safari, Edge）
- テキストエディタ（VS Code推奨）
- Node.js（SCSSコンパイル用、オプション）

## 🚀 クイックスタート

### 方法1: 直接HTMLファイルを開く（最も簡単）

1. プロジェクトフォルダをダウンロード
2. `index.html` をダブルクリックしてブラウザで開く
3. 各ページへのリンクから移動可能

**注意**: この方法では一部のJavaScript機能が制限される場合があります。

### 方法2: ローカルサーバーを使用（推奨）

#### Python 3を使用する場合

```bash
# プロジェクトフォルダに移動
cd premium-market

# サーバーを起動
python -m http.server 8000

# ブラウザで開く
# http://localhost:8000
```

#### Node.jsを使用する場合

```bash
# http-serverをインストール（初回のみ）
npm install -g http-server

# サーバーを起動
http-server -p 8000

# ブラウザで開く
# http://localhost:8000
```

#### VS Code Live Serverを使用する場合

1. VS Codeで拡張機能「Live Server」をインストール
2. `index.html` を右クリック
3. 「Open with Live Server」を選択

## 🎨 SCSSのコンパイル

CSSファイルは既に含まれていますが、SCSSを編集する場合は以下の手順でコンパイルしてください。

### Sassのインストール

```bash
# npmを使用
npm install -g sass

# または、Homebrewを使用（Mac）
brew install sass/sass/sass
```

### コンパイル方法

```bash
# 1回だけコンパイル
sass css/style.scss css/style.css --no-source-map

# 監視モード（ファイル変更時に自動コンパイル）
sass --watch css/style.scss:css/style.css --no-source-map
```

## 📱 動作確認

### デモアカウント

開発中は以下の情報でログインできます（デモモード）：

**一般ユーザー**
- メールアドレス: user@example.com
- パスワード: password123

**出品者**
- メールアドレス: seller@example.com
- パスワード: password123

**管理者**
- メールアドレス: admin@premium-market.jp
- パスワード: admin123

### 主要ページのURL

- トップページ: `/index.html`
- ログイン: `/login.html`
- 会員登録: `/register.html`
- マーケットプレイス: `/marketplace.html`
- 出品者ダッシュボード: `/seller.html`
- 管理者ダッシュボード: `/admin.html`

## 🔧 カスタマイズ

### 色の変更

`css/_variables.scss` を編集してください：

```scss
// プライマリーカラーを変更
$primary-color: #4A90A4;  // お好みの色に変更

// セカンダリーカラーを変更
$secondary-color: #8B7355;  // お好みの色に変更
```

変更後、SCSSを再コンパイルしてください。

### ロゴの変更

各HTMLファイルの `.logo-text` クラスのテキストを変更：

```html
<span class="logo-text">あなたのサイト名</span>
```

### フォントの変更

`css/_variables.scss` でフォントファミリーを変更：

```scss
$font-family-base: 'Noto Sans JP', sans-serif;
```

HTMLファイルの `<head>` 内のGoogle Fontsリンクも更新してください。

## 🐛 トラブルシューティング

### スタイルが適用されない

1. ブラウザのキャッシュをクリア（Ctrl+Shift+R / Cmd+Shift+R）
2. `css/style.css` ファイルが存在するか確認
3. SCSSをコンパイルし直す

### JavaScriptが動作しない

1. ブラウザのコンソールでエラーを確認（F12キー）
2. ローカルサーバーを使用しているか確認
3. ブラウザのJavaScriptが有効になっているか確認

### ページ遷移ができない

1. ファイルパスが正しいか確認
2. HTMLファイルが同じフォルダにあるか確認
3. 大文字小文字が一致しているか確認（特にLinux/Mac）

## 📦 本番環境へのデプロイ

### 静的ホスティングサービス

以下のサービスで簡単にデプロイできます：

- **Netlify**: ドラッグ&ドロップでデプロイ
- **Vercel**: GitHubと連携して自動デプロイ
- **GitHub Pages**: 無料でホスティング
- **Firebase Hosting**: Googleのホスティングサービス

### デプロイ前のチェックリスト

- [ ] SCSSをCSSにコンパイル済み
- [ ] 画像ファイルを最適化
- [ ] APIエンドポイントを本番環境に変更
- [ ] 環境変数を設定
- [ ] セキュリティ設定を確認
- [ ] HTTPS設定を有効化

## 🔐 セキュリティ設定

本番環境では以下の設定を必ず行ってください：

1. **HTTPS化**: SSL証明書を設定
2. **環境変数**: APIキーなどを環境変数で管理
3. **CORS設定**: 適切なCORS設定を行う
4. **認証強化**: JWT、OAuth等の実装
5. **バリデーション**: サーバーサイドでの入力検証

## 📞 サポート

問題が解決しない場合は、以下をご確認ください：

1. README.mdの内容を確認
2. ブラウザのコンソールログを確認
3. 各JavaScriptファイルのコメントを確認

---

**最終更新**: 2026年5月8日
