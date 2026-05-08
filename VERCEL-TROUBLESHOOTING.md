# 🔧 Vercel トラブルシューティング

## よくあるエラーと解決方法

---

## エラー1: "Build Command Failed"

### 症状
```
Error: Command "npm run build" exited with 1
```

### 原因
- Vercelがビルドコマンドを実行しようとしている
- 静的サイトなのでビルドは不要

### 解決方法

**方法A: Vercel Dashboardで設定**
1. プロジェクトを開く
2. **Settings** → **General**
3. **Build & Development Settings**
4. **Build Command**: 空欄にする（または`echo "No build required"`）
5. **Output Directory**: `./` に設定
6. **Install Command**: 空欄にする
7. **Save** → **Deployments** → **Redeploy**

**方法B: vercel.jsonで設定**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ]
}
```

---

## エラー2: "404 Not Found" (ページが見つからない)

### 症状
- デプロイは成功するが、ページにアクセスすると404エラー

### 原因
- ルートディレクトリの設定が間違っている
- ファイル名の大文字小文字が違う

### 解決方法

**ステップ1: ルートディレクトリを確認**
1. Settings → General
2. Root Directory: `./` に設定
3. Save

**ステップ2: ファイル構造を確認**
```
プロジェクトルート/
├── index.html          ← ルートに配置
├── login.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

**ステップ3: vercel.jsonのルーティングを確認**
```json
{
  "routes": [
    {
      "src": "/",
      "dest": "/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## エラー3: "CSS/JavaScriptが読み込まれない"

### 症状
- ページは表示されるが、スタイルが適用されない
- JavaScriptが動作しない

### 原因
- パスの指定が間違っている
- ファイルが存在しない

### 解決方法

**ステップ1: HTMLのパスを確認**
```html
<!-- 正しい例 -->
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>

<!-- または -->
<link rel="stylesheet" href="/css/style.css">
<script src="/js/main.js"></script>
```

**ステップ2: ファイルの存在を確認**
```bash
# ローカルで確認
ls css/style.css
ls js/main.js
```

**ステップ3: GitHubにプッシュされているか確認**
```bash
git status
git add css/style.css js/main.js
git commit -m "Add CSS and JS files"
git push origin main
```

**ステップ4: ブラウザのキャッシュをクリア**
- Ctrl + Shift + R (Windows)
- Cmd + Shift + R (Mac)

---

## エラー4: "日本語が文字化けする"

### 症状
- 日本語が正しく表示されない

### 原因
- 文字エンコーディングの問題

### 解決方法

**ステップ1: HTMLのmetaタグを確認**
```html
<head>
    <meta charset="UTF-8">
    <!-- 必ず最初に配置 -->
</head>
```

**ステップ2: ファイルをUTF-8で保存**
- エディタでファイルを開く
- "Save with Encoding" → "UTF-8" を選択

**ステップ3: .gitattributesを確認**
```
*.html text eol=lf
*.css text eol=lf
*.js text eol=lf
```

---

## エラー5: "デプロイが遅い・タイムアウト"

### 症状
- デプロイに10分以上かかる
- タイムアウトエラー

### 原因
- 大きなファイルが含まれている
- 不要なファイルがデプロイされている

### 解決方法

**ステップ1: .vercelignoreを作成**
```
# 不要なファイルを除外
.git/
.vscode/
node_modules/
*.log
test.html
css/*.scss
```

**ステップ2: 画像を最適化**
- 画像サイズを縮小
- WebP形式に変換
- 不要な画像を削除

**ステップ3: ファイルサイズを確認**
```bash
# 大きなファイルを探す
find . -type f -size +1M
```

---

## エラー6: "Environment Variables not working"

### 症状
- 環境変数が読み込まれない

### 原因
- Vercelの環境変数設定が必要

### 解決方法

**ステップ1: Vercel Dashboardで設定**
1. Settings → Environment Variables
2. 変数を追加:
   - Name: `API_URL`
   - Value: `https://api.example.com`
   - Environment: Production, Preview, Development

**ステップ2: JavaScriptで使用**
```javascript
// ブラウザ環境では使用不可
// サーバーサイドまたはビルド時のみ

// 代わりに、設定ファイルを使用
const config = {
    apiUrl: 'https://api.example.com'
};
```

---

## エラー7: "Git push rejected"

### 症状
```
error: failed to push some refs
```

### 原因
- リモートに新しいコミットがある

### 解決方法

```bash
# リモートの変更を取得
git pull origin main

# コンフリクトがある場合は解決

# 再度プッシュ
git push origin main
```

---

## エラー8: "Vercel CLI login failed"

### 症状
- `vercel login` が失敗する

### 解決方法

**方法A: ブラウザで認証**
```bash
vercel login
# ブラウザが開くので認証
```

**方法B: トークンを使用**
```bash
# Vercel Dashboardでトークンを取得
# Settings → Tokens → Create

# トークンを設定
vercel login --token YOUR_TOKEN
```

---

## 🔍 デバッグ方法

### ステップ1: ローカルで動作確認

```bash
# ローカルサーバーを起動
python -m http.server 8000

# ブラウザで確認
http://localhost:8000
```

### ステップ2: Vercelのログを確認

```bash
# Vercel CLIでログを確認
vercel logs

# または、Dashboardで確認
# Deployments → 該当のデプロイ → View Function Logs
```

### ステップ3: ブラウザのコンソールを確認

1. F12キーを押す
2. Consoleタブを開く
3. エラーメッセージを確認

### ステップ4: ネットワークタブを確認

1. F12キーを押す
2. Networkタブを開く
3. ページをリロード
4. 赤いエラー（404, 500など）を確認

---

## 📋 デプロイ前チェックリスト

デプロイ前に以下を確認：

- [ ] `vercel.json` が存在する
- [ ] `package.json` が存在する
- [ ] `.vercelignore` が設定されている
- [ ] `index.html` がルートディレクトリにある
- [ ] `css/style.css` が存在する
- [ ] すべてのJSファイルが存在する
- [ ] HTMLのパスが正しい（相対パスまたは絶対パス）
- [ ] ローカルで動作確認済み
- [ ] GitHubにプッシュ済み
- [ ] 文字エンコーディングがUTF-8
- [ ] 大きなファイル（>10MB）がない

---

## 🆘 それでも解決しない場合

### 1. Vercelサポートに問い合わせ
https://vercel.com/support

### 2. Vercel Communityで質問
https://github.com/vercel/vercel/discussions

### 3. GitHubリポジトリのIssuesで報告
https://github.com/diamondcrypto0808-svg/EC-Paid-Membership-Site/issues

### 4. 完全に再デプロイ

```bash
# プロジェクトを削除
vercel remove premium-market

# 再度デプロイ
vercel --prod
```

---

## ✅ デプロイ成功の確認

デプロイが成功すると：

1. ✅ Vercel Dashboardに緑のチェックマーク
2. ✅ "Ready" ステータス
3. ✅ URLが発行される
4. ✅ "Visit" ボタンでサイトにアクセス可能
5. ✅ すべてのページが正常に表示
6. ✅ CSS/JSが正しく読み込まれる
7. ✅ 日本語が正しく表示される

---

## 📞 追加サポート

- **Vercel公式ドキュメント**: https://vercel.com/docs
- **Vercel Status**: https://www.vercel-status.com/
- **Twitter**: @vercel

---

**最終更新**: 2026年5月8日
