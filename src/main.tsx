// src/main.tsx
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App"; // ✅ 注意：从 App.tsx 拿 routes（不是 import App）
import "./index.css";

export const createRoot = ViteReactSSG(
  { routes },
  ({ app }) => {
    return app;
  }
);
