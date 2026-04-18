# ai-wails

使用 [Wails v2](https://wails.io/) 构建的桌面应用：Go 后端 + **React** + **TypeScript** + **Vite** + **Tailwind CSS**。界面布局参考 VS Code（活动栏、侧边栏、编辑器标签、底部面板、状态栏）。

## 环境要求

- **Go** 1.22+（见 `go.mod` 与 `toolchain`）
- **Node.js** 与 **npm**（用于前端依赖与构建）
- （可选）**Wails CLI**，用于 `wails dev` / `wails build`  
  ```bash
  go install github.com/wailsapp/wails/v2/cmd/wails@latest
  ```

## 开发

在项目根目录：

```bash
wails dev
```

该命令会安装前端依赖、启动 Vite 开发服务并启动桌面窗口。

若你更习惯手动分步执行：

```bash
cd frontend
npm install
npm run dev
```

另开一个终端，在生成好 `frontend/dist` 的前提下用 Go 运行（通常仍推荐直接使用 `wails dev`）。

## 生产构建

```bash
wails build
```

或自行构建前端后再编译 Go：

```bash
cd frontend && npm run build && cd ..
go build -o build/ai-wails .
```

嵌入资源依赖 `frontend/dist`（见 `main.go` 中的 `//go:embed all:frontend/dist`），请先完成前端 `npm run build`。

## npm 异常时的辅助脚本

若本机 `~/.npmrc` 配置不当，可能出现 **`npm` 无输出、立即失败** 的情况。可在仓库根目录使用：

```bash
./scripts/npm.sh install
./scripts/npm.sh run build
./scripts/npm.sh run dev
```

该脚本在隔离环境下调用 npm，并固定使用项目内 `frontend/.npmrc` 中的官方源。长期建议在 `~/.npmrc` 中使用合法的 `registry=...` 行（不要使用错误的 `//registry=...` 形式）。

## 目录结构

| 路径 | 说明 |
|------|------|
| `main.go` / `app.go` | Wails 入口与可绑定到前端的 Go API |
| `wails.json` | Wails 构建与前端脚本配置 |
| `frontend/` | Vite + React + TS 源码与 `package.json` |
| `frontend/src/components/` | VS Code 风格布局相关组件 |
| `scripts/npm.sh` | 可选的 npm 包装脚本 |

## 参考

- [Wails 文档](https://wails.io/docs/introduction)
- [Vite](https://vitejs.dev/) · [Tailwind CSS](https://tailwindcss.com/)
