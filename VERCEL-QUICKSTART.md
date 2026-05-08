# 🚀 Vercel クイックスタート

## 最も簡単なデプロイ方法（3ステップ）

### ステップ1: Vercelにログイン
https://vercel.com/login

### ステップ2: GitHubリポジトリをインポート
1. **"Add New..."** → **"Project"** をクリック
2. GitHubリポジトリを選択:
   ```
   diamondcrypto0808-svg/EC-Paid-Membership-Site
   ```

### ステップ3: デプロイ設定
以下の設定で **"Deploy"** をクリック：

```
Framework Preset: Other
Root Directory: ./
Build Command: (空欄)
Output Directory: ./
Install Command: (空欄)
```

**完了！** 数分後にサイトが公開されます。

---

## 🐛 エラーが発生した場合

### エラー: "Build failed"

**解決策1**: Build Commandを空にする
1. Vercel Dashboard → Settings → General
2. Build & Development Settings
3. Build Command: 空欄にする
4. Save → Redeploy

**解決策2**: vercel.jsonを確認
- リポジトリに`vercel.json`があることを確認
- GitHubにプッシュされているか確認

### エラー: "404 Not Found"

**解決策**: ルートディレクトリを確認
1. Settings → General
2. Root Directory: `./` に設定
3. Save → Redeploy

### エラー: "CSS/JSが読み込まれない"

**解決策**: ファイル構造を確認
```
プロジェクトルート/
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

すべてのファイルがルートディレクトリにあることを確認。

---

## ✅ デプロイ成功の確認

デプロイが成功すると：
- ✅ 緑のチェックマーク表示
- ✅ URLが発行される（例: `https://premium-market.vercel.app`）
- ✅ "Visit" ボタンでサイトにアクセス可能

---

## 🔄 更新方法

GitHubにプッシュすると自動的にデプロイされます：

```bash
git add .
git commit -m "Update"
git push origin main
```

Vercelが自動的に検知して再デプロイします。

---

## 📞 まだエラーが出る場合

1. **このファイルを確認**: `VERCEL-DEPLOY.md`（詳細ガイド）
2. **Vercelサポート**: https://vercel.com/support
3. **GitHub Issues**: リポジトリのIssuesタブで報告

---

**デプロイURL**: https://premium-market.vercel.app（デプロイ後）
