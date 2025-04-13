# Shortcut Practice Web App

このリポジトリは、React と TypeScript を利用して Vite で構築したキーボードショートカット練習用 Web アプリケーションです。  
各アプリ（VSCode、Excel、PowerPoint、ChatGPT、Linux Terminal、Ubuntu Terminal、Mac Terminal など）のショートカットを、アイコン形式で選択し、実際のキー入力をもとに練習できるインターフェースで提供します。

## 特徴

- **多彩なアプリケーション対応**  
  VSCode、Excel、PowerPoint、ChatGPT、Linux、Ubuntu、Mac の各ショートカットを学習可能。

- **リアルタイムキー入力解析**  
  ユーザーが実際にキーを押した入力をキャプチャし、正解判定を行います。

- **洗練された UI デザイン**  
  アイコン一覧によるアプリ選択、キー入力の表示はキーボタン風のデザイン、正解メッセージは緑色で強調表示しています。

- **GitHub Pages へのデプロイ対応**  
  gh-pages パッケージを利用して、静的サイトとして簡単に GitHub Pages 上に公開できます。

## ディレクトリ構成

```
shortcut_memorizer/
├── public/
│   ├── data/
│   │   ├── vscode.json
│   │   ├── excel.json
│   │   ├── powerpoint.json
│   │   ├── chatgpt.json
│   │   ├── linuxterminal.json
│   │   ├── ubuntuterminal.json
│   │   └── macterminal.json
│   └── icons/
│       ├── vscode.png
│       ├── excel.png
│       ├── powerpoint.png
│       ├── chatgpt.png
│       ├── linuxterminal.png
│       ├── ubuntuterminal.png
│       └── macterminal.png
├── src/
│   ├── components/
│   │   ├── AppSelection.tsx
│   │   ├── AppSelection.css
│   │   ├── PracticeMode.tsx
│   │   └── KeyDisplay.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## セットアップ

### 前提条件

- [Node.js](https://nodejs.org/)（推奨バージョン 14 以上）
- npm または yarn

### インストール手順

1. このリポジトリをクローンします。

   ```bash
   git clone https://github.com/あなたのユーザー名/my-shortcut-app.git
   cd my-shortcut-app
   ```

2. 依存パッケージをインストールします。

   ```bash
   npm install
   ```

## 開発

ローカル環境での開発用サーバーを起動するには、以下のコマンドを実行します。

```bash
npm run dev
```

通常、ブラウザは [http://localhost:3000](http://localhost:3000) または [http://localhost:5173](http://localhost:5173) を開いて確認できます。

## ビルド

本番用の静的ファイルを生成するには、以下のコマンドを実行してください。

```bash
npm run build
```

ビルド完了後、`dist` ディレクトリに生成されたファイルが配置されます。

## GitHub Pages へのデプロイ

このアプリは GitHub Pages で公開できるように構成されています。以下の手順で公開してください。

### 1. Vite の `base` 設定

GitHub Pages でサブパス (例: `https://あなたのユーザー名.github.io/my-shortcut-app/`) として公開する場合、`vite.config.ts` の `base` オプションを次のように設定します。

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-shortcut-app/',  // リポジトリ名に合わせる
});
```

### 2. gh-pages パッケージのインストールとスクリプト追加

1. gh-pages パッケージをインストールします。

   ```bash
   npm install gh-pages --save-dev
   ```

2. `package.json` の `scripts` セクションに以下を追加します。

   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

### 3. デプロイ手順

1. ビルドを実行します。

   ```bash
   npm run build
   ```

2. ビルド完了後、以下のコマンドでデプロイを実行します。

   ```bash
   npm run deploy
   ```

3. GitHub リポジトリの [Settings] > [Pages] にアクセスし、公開ブランチ（通常は `gh-pages` ブランチ、ルート `/`）を設定します。  
   数分後にサイトが公開され、URL（例: `https://あなたのユーザー名.github.io/my-shortcut-app/`）が発行されます。

## 静的アセットのパスについて

GitHub Pages ではサブパスでの公開となるため、以下のようにコード内で静的アセットのパスを指定してください。

- JSON の読み込み例 (PracticeMode.tsx)：

  ```ts
  fetch(`${import.meta.env.BASE_URL}data/${appName.toLowerCase()}.json`)
  ```

- アイコン画像の例 (AppSelection.tsx)：

  ```ts
  const availableApps: AppIcon[] = [
    { name: 'VSCode', icon: `${import.meta.env.BASE_URL}icons/vscode.png` },
    // ・・・
  ];
  ```

## その他の注意事項

- キー入力の際、Shift キーが自動で補正されキー自体の値が取得されるように調整しています。  
- UI のデザインは、CSS で装飾済みのコンポーネント（例：KeyDisplay、AppSelection.css など）により実現されています。  
- デプロイ後にリソースが 404 エラーとなる場合は、パス指定（`import.meta.env.BASE_URL` の利用）および Vite の `base` 設定が正しいか確認してください。

## ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。  
（※LICENSE ファイルを別途用意してください）

## コントリビューション

ご意見・プルリクエストは歓迎します。  
Issue や Pull Request を通じて、バグ報告や機能改善の提案をお寄せください。

## 連絡先

ご質問やご提案がある場合は、GitHub の [Issues](https://github.com/QijunTong0/shortcut_memorizer/issues) をご利用ください。
```

---

この README.md は、プロジェクトの概要、セットアップ、開発、ビルド、GitHub Pages へのデプロイ手順などを含む内容となっています。ご自身の環境やリポジトリに合わせて適宜編集してください。
