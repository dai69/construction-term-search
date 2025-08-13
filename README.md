# 積算・業界用語検索

積算や建設業界で使用される専門用語を簡単に検索できるWebアプリケーションです。

## アプリケーション概要

- 積算・業界用語で使用される専門用語を検索できるアプリケーション
- Being社の[積算・業界用語集](https://www.beingcorp.co.jp/column/sekisan-gyoukai-yougo-shu/)の情報を基に作成
- シンプルな検索インターフェースで、必要な用語をすぐに見つけることが可能

## デプロイURL

https://construction-term-search-993b.vercel.app/

## 技術スタック

- フロントエンド
  - Next.js 15.4
  - React 19.1
  - TypeScript
  - TailwindCSS

- その他
  - Vercel (ホスティング)
  - ESLint (コード品質管理)

## 使い方

1. アプリケーションにアクセス
2. 検索ボックスに知りたい用語を入力
3. 該当する用語の説明が表示されます

## ローカルでの開発方法

```bash
# リポジトリのクローン
git clone https://github.com/dai69/construction-term-search.git

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバー起動後、`http://localhost:3000`にアクセスすることでアプリケーションを確認できます。