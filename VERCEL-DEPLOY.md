# Vercelデプロイガイド

## 🚀 Vercelへのデプロイ方法

このガイドでは、プレミアムマーケットをVercelにデプロイする手順を説明します。

---

## 📋 前提条件

- Vercelアカウント（無料）: https://vercel.com/signup
- GitHubアカウント
- このリポジトリがGitHubにプッシュされていること

---

## 方法1: Vercel CLI（推奨）

### ステップ1: Vercel CLIをインストール

```bash
# npmを使用
npm install -g vercel

# または、yarnを使用
yarn global add vercel
```

### ステップ2: Vercelにログイン

```bash
vercel login
```

ブラウザが開き、認証を求められます。

### ステップ3: プロジェクトをデプロイ

```bash
# プロジェクトディレクトリで実行
vercel

# 初回デプロイ時の質問に答える
# - Set up and deploy? Yes
# - Which scope? (あなたのアカウント)
# - Link to existing project? No
# - What's your project's name? premium-market
# - In which directory is your code located? ./
```

### ステップ4: 本番環境にデプロイ

```bash
vercel --prod
```

---

## 方法2: Vercel Dashboard（簡単）

### ステップ1: Vercelにログイン

https://vercel.com/login にアクセスしてログイン

### ステップ2: 新しいプロジェクトをインポート

1. **"Add New..."** → **"Project"** をクリック
2. **"Import Git Repository"** を選択
3. GitHubリポジトリを接続
4. リポジトリを選択:
   ```
   diamondcrypto0808-svg/EC-Paid-Membership-Site
   ```

### ステップ3: プロジェクト設定

**Configure Project** 画面で以下を設定：

- **Project Name**: `premium-market`（または任意の名前）
- **Framework Preset**: `Other`
- **Root Directory**: `./`（デフォルト）
- **Build Command**: 空欄（静的サイトのため不要）
- **Output Directory**: `./`（デフォルト）
- **Install Command**: 空欄（依存関係なし）

### ステップ4: デプロイ

**"Deploy"** ボタンをクリック

数分後、デプロイが完了します！

---

## 🌐 デプロイ後のURL

デプロイが成功すると、以下のようなURLが発行されます：

```
https://premium-market.vercel.app
```

または

```
https://premium-market-[ランダム文字列].vercel.app
```

---

## ⚙️ カスタムドメインの設定

### ステップ1: Vercel Dashboardでプロジェクトを開く

### ステップ2: Settings → Domains

### ステップ3: カスタムドメインを追加

1. ドメイン名を入力（例: `premium-market.com`）
2. **"Add"** をクリック
3. DNSレコードを設定（Vercelが指示を表示）

### DNSレコード例

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🔄 自動デプロイの設定

Vercelは自動的にGitHubと連携します：

- **mainブランチへのプッシュ** → 本番環境に自動デプロイ
- **他のブランチへのプッシュ** → プレビュー環境を自動作成

### 自動デプロイの流れ

```bash
# ローカルで変更
git add .
git commit -m "Update: 変更内容"
git push origin main

# Vercelが自動的に検知してデプロイ
# 数分後、本番環境が更新される
```

---

## 🐛 トラブルシューティング

### エラー1: "Build failed"

**原因**: ビルドコマンドが設定されている

**解決策**:
1. Vercel Dashboardでプロジェクトを開く
2. Settings → General
3. Build & Development Settings
4. Build Command を空欄にする
5. 再デプロイ

### エラー2: "404 Not Found"

**原因**: ルーティング設定の問題

**解決策**:
- `vercel.json`が正しく配置されているか確認
- ファイル名が正しいか確認（大文字小文字）

### エラー3: "CSS/JSが読み込まれない"

**原因**: パスの問題

**解決策**:
- HTMLファイル内のパスが相対パスになっているか確認
- 例: `href="css/style.css"`（正）
- 例: `href="/css/style.css"`（正）
- 例: `href="./css/style.css"`（正）

### エラー4: "デプロイが遅い"

**原因**: 大きなファイルが含まれている

**解決策**:
- `.vercelignore`で不要なファイルを除外
- 画像を最適化
- SCSSソースファイルを除外

---

## 📊 デプロイ設定の確認

### vercel.json の内容

```json
{
  "version": 2,
  "name": "premium-market",
  "routes": [
    {
      "src": "/",
      "dest": "/index.html"
    }
  ]
}
```

### package.json の内容

```json
{
  "name": "premium-market",
  "version": "1.0.0",
  "scripts": {
    "build": "echo 'Static site - no build required'"
  }
}
```

---

## 🔐 環境変数の設定（将来の拡張用）

### Vercel Dashboardで設定

1. プロジェクトを開く
2. Settings → Environment Variables
3. 変数を追加:
   - Name: `API_URL`
   - Value: `https://api.premium-market.com`
   - Environment: Production

### JavaScriptで使用

```javascript
const apiUrl = process.env.API_URL || 'http://localhost:3000';
```

---

## 📈 パフォーマンス最適化

### Vercelの自動最適化

Vercelは自動的に以下を最適化します：

- ✅ CDN配信（世界中のエッジサーバー）
- ✅ 自動HTTPS
- ✅ 画像最適化
- ✅ Gzip/Brotli圧縮
- ✅ HTTP/2対応

### 追加の最適化

1. **画像の最適化**
   ```html
   <!-- Vercel Image Optimization -->
   <img src="/_next/image?url=/images/product.jpg&w=640&q=75" alt="商品">
   ```

2. **キャッシュ設定**
   - `vercel.json`のheadersセクションで設定済み

---

## 🎯 デプロイチェックリスト

デプロイ前に確認：

- [ ] `vercel.json` が存在する
- [ ] `package.json` が存在する
- [ ] `.vercelignore` が設定されている
- [ ] すべてのHTMLファイルが正しいパスを使用
- [ ] CSSファイルがコンパイルされている（`css/style.css`）
- [ ] JavaScriptファイルにエラーがない
- [ ] 画像パスが正しい
- [ ] ローカルで動作確認済み

---

## 🚀 デプロイコマンド一覧

```bash
# 開発環境でプレビュー
vercel dev

# プレビューデプロイ
vercel

# 本番環境にデプロイ
vercel --prod

# デプロイ履歴を確認
vercel ls

# ログを確認
vercel logs

# プロジェクト情報を確認
vercel inspect

# プロジェクトを削除
vercel remove premium-market
```

---

## 📞 サポート

### Vercel公式ドキュメント
- https://vercel.com/docs

### よくある質問
- https://vercel.com/support

### コミュニティ
- https://github.com/vercel/vercel/discussions

---

## ✅ デプロイ成功の確認

デプロイが成功すると：

1. ✅ Vercel Dashboardに緑のチェックマーク
2. ✅ デプロイURLが発行される
3. ✅ ブラウザでサイトが表示される
4. ✅ すべてのページが正常に動作
5. ✅ CSS/JSが正しく読み込まれる

---

## 🎊 完了！

Vercelへのデプロイが完了しました！

**デプロイURL**: https://premium-market.vercel.app

世界中からアクセス可能な高速なWebサイトが完成しました！🚀

---

**最終更新**: 2026年5月8日
