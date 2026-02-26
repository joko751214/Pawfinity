# 🐾 Pawfinity

> 給毛孩的日常好物，一站式挑選完成

Pawfinity 是一個專為寵物量身打造的電商平台，提供精選寵物用品、優質購物體驗與完善的後台管理系統。

## ✨ 專案特色

- 🛍️ **完整電商功能**：商品瀏覽、購物車、結帳流程一應俱全
- 🎨 **現代化介面**：採用 Tailwind CSS 與 Ant Design 打造精美 UI
- 🚀 **效能優化**：使用 Vite 建構工具，提供極速開發體驗
- 🔐 **權限管理**：具備管理員登入與商品管理後台
- 📱 **響應式設計**：支援各種裝置螢幕尺寸
- ⚡ **自動化導入**：透過 unplugin-auto-import 自動匯入常用模組

## 🛠️ 技術棧

### 核心技術

- **React 19** - UI 框架
- **Vite** - 現代化建構工具
- **React Router** - 路由管理

### 狀態管理

- **Redux Toolkit** - 全域狀態管理
- **Context API** - 購物車狀態管理

### UI 框架

- **Ant Design** - UI 組件庫
- **Tailwind CSS 4** - 原子化 CSS 框架
- **Sass** - CSS 預處理器

### 表單與資料

- **React Hook Form** - 表單處理
- **Axios** - HTTP 請求

### 開發工具

- **ESLint** - 程式碼檢查
- **unplugin-auto-import** - 自動導入模組

## 📁 專案結構

```
Pawfinity/
├── src/
│   ├── api/              # API 請求封裝
│   │   ├── axios.js      # Axios 實例配置
│   │   └── server/       # API 端點
│   ├── assets/           # 靜態資源
│   ├── component/        # 共用組件
│   ├── context/          # Context 狀態管理
│   ├── router/           # 路由配置
│   ├── slices/           # Redux Slices
│   ├── store/            # Redux Store
│   ├── styles/           # 全域樣式
│   ├── utils/            # 工具函數
│   ├── SVGIcons/         # SVG 圖標組件
│   └── views/            # 頁面組件
│       ├── frontend/     # 前台頁面
│       └── backend/      # 後台頁面
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 快速開始

### 環境需求

- Node.js >= 16.0.0
- npm 或 yarn

### 安裝步驟

1. **Clone 專案**

```bash
git clone <repository-url>
cd Pawfinity
```

2. **安裝依賴**

```bash
npm install
```

3. **設定環境變數**

在專案根目錄建立 `.env` 檔案：

```env
VITE_API_BASE_URL=your_api_base_url
VITE_API_PATH=your_api_path
```

4. **啟動開發伺服器**

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:8080`

## 📝 可用指令

```bash
# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# 執行 ESLint 檢查
npm run lint

# 部署到 GitHub Pages
npm run deploy
```

## 🌐 功能模組

### 前台功能

- **首頁** - 展示特色商品與品牌介紹
- **商品列表** - 瀏覽所有寵物用品
- **商品詳情** - 查看商品詳細資訊
- **購物車** - 管理選購商品
- **結帳頁面** - 完成訂單結帳
- **關於我們** - 品牌故事與聯絡資訊

### 後台功能

- **管理員登入** - 安全的身份驗證
- **商品管理** - 新增、編輯、刪除商品

## 🔑 環境變數說明

| 變數名稱            | 說明         | 範例                      |
| ------------------- | ------------ | ------------------------- |
| `VITE_API_BASE_URL` | API 基礎路徑 | `https://api.example.com` |
| `VITE_API_PATH`     | API 個人路徑 | `yourName-hexschool`      |

## 📦 部署

### 手動部署

專案已配置 GitHub Pages 部署：

```bash
npm run deploy
```

此指令會自動建構專案並推送至 `gh-pages` 分支。

### CI/CD 自動化部署

專案支援透過 GitHub Actions 進行自動化部署流程：

#### 設定步驟

1. **建立 GitHub Actions 工作流程**

在專案根目錄建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # 當推送到 main 分支時觸發

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_API_PATH: ${{ secrets.VITE_API_PATH }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **設定 GitHub Secrets**

前往 GitHub 專案設定：

- Settings → Secrets and variables → Actions
- 新增以下 secrets：
  - `VITE_API_BASE_URL`
  - `VITE_API_PATH`

3. **啟用 GitHub Pages**

- Settings → Pages
- Source 選擇 `gh-pages` 分支
- 儲存設定

#### 部署流程

每次推送程式碼至 `main` 分支時，將自動執行：

1. ✅ 檢出程式碼
2. ✅ 安裝 Node.js 環境
3. ✅ 安裝專案依賴
4. ✅ 執行建構（包含環境變數注入）
5. ✅ 部署至 GitHub Pages

#### 查看部署狀態

前往專案的 **Actions** 頁面查看部署進度與日誌。

## 👤 作者

如有任何問題或建議，歡迎聯繫！

---

**Made with ❤️ for pets and their owners**
