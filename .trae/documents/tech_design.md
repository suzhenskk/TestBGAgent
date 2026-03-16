## 1. 架构设计

```mermaid
graph TD
    subgraph Frontend[React SPA]
        Router[React Router]
        Store[Context / Hooks]
        UI[Components]
        Assets[Static Assets (Images/Videos)]
        Liquid[3D Liquid Scene (R3F)]
    end
    
    subgraph Data[Static Data]
        Projects[projects.json]
        Profile[profile.json]
    end
    
    UI --> Router
    UI --> Store
    Store --> Projects
    Store --> Profile
    UI --> Liquid
```

## 2. 技术描述
- **核心框架**: React 18 + TypeScript + Vite
- **样式方案**: Tailwind CSS v3 + CSS Modules (用于复杂特效)
    - **Glassmorphism**: 使用 `backdrop-filter`, `background-blur`, `border-gradient` 实现多层玻璃质感。
    - **Liquid Effect**: WebGL Shader (GLSL) via `@react-three/fiber` & `@react-three/drei`，或高性能 CSS 滤镜组合。
- **动画库**: `framer-motion` (页面过渡、滚动视差、元素入场), `gsap` (可选，复杂时间轴)。
- **3D 引擎**: Three.js / `@react-three/fiber` (用于首页核心液态视觉)。
- **图标**: `lucide-react` (极简线条风格)。
- **字体**: 系统字体栈 (San Francisco / Inter) + 特色展示字体 (如 Clash Display 或 Syne)。

## 3. 路由定义
| 路由 | 用途 |
|------|------|
| `/` | **首页**：全屏液态 Hero，作品精选集，关于简介。 |
| `/project/:id` | **作品详情页**：展示特定设计案例的深度内容。 |
| `/about` | **关于页**：详细个人介绍，经历，技能，简历。 |
| `/404` | **404 页**：趣味动效引导返回。 |

## 4. 数据模型 (静态 JSON)
由于是个人作品集，不涉及后端数据库，数据存储在 `src/data` 目录下的 JSON 文件中。

### 4.1 项目数据结构 (Project)
```typescript
interface Project {
  id: string;           // 唯一标识符 (slug)
  title: string;        // 项目标题
  subtitle: string;     // 副标题/类别 (e.g., "Mobile App • FinTech")
  coverImage: string;   // 封面图路径 (支持透明背景 PNG 或高质 JPG)
  description: string;  // 简短描述
  tags: string[];       // 标签 (e.g., "UX Research", "UI Design", "Prototyping")
  content: {
    type: 'image' | 'text' | 'video' | 'gallery';
    data: string | string[]; // 内容数据
    style?: string; // 可选样式类名
  }[];
  date: string;         // 完成日期
  link?: string;        // 在线演示链接
}
```

### 4.2 个人资料数据结构 (Profile)
```typescript
interface Profile {
  name: string;
  role: string;
  bio: string;
  skills: {
    category: string;
    items: string[];
  }[];
  social: {
    platform: string;
    url: string;
    icon: string;
  }[];
  contactEmail: string;
}
```

## 5. 目录结构
```
src/
├── assets/          # 静态资源 (图片, 字体, 视频)
├── components/      # React 组件
│   ├── common/      # 通用组件 (Button, GlassCard, Navigation)
│   ├── layout/      # 布局组件 (Header, Footer, Layout)
│   ├── liquid/      # 3D 液态效果组件
│   └── project/     # 项目相关组件
├── data/            # 静态数据 (JSON)
├── hooks/           # 自定义 Hooks (useScroll, useMousePosition)
├── pages/           # 页面组件
├── styles/          # 全局样式 & Tailwind 配置
└── utils/           # 工具函数
```
