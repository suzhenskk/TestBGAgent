export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  coverImage: string;
  images: string[];
  tags: string[];
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  email: string;
  socialLinks: {
    platform: string;
    url: string;
    label: string;
  }[];
}

export const profile: Profile = {
  name: "Alex Chen",
  role: "Product Designer & Developer",
  bio: "专注于极简主义设计与高性能前端开发的数字工匠。致力于创造直观、优雅且富有深度的用户体验。",
  email: "alex@example.com",
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com", label: "Twitter" },
    { platform: "github", url: "https://github.com", label: "GitHub" },
    { platform: "instagram", url: "https://instagram.com", label: "Instagram" },
    { platform: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
  ],
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Lumina Interface",
    category: "UI/UX Design",
    year: "2023",
    description: "为下一代智能家居控制中心设计的界面系统。强调光影与深度的结合，通过微妙的动态效果提供直观的操作反馈。",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    ],
    tags: ["UI Design", "Smart Home", "Mobile App"],
  },
  {
    id: "2",
    title: "Nebula Brand Identity",
    category: "Branding",
    year: "2022",
    description: "一家探索太空科技的初创公司的品牌形象设计。灵感来源于星云的有机形态与深邃色彩，传达探索未知与无限可能的品牌精神。",
    coverImage: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?q=80&w=2670&auto=format&fit=crop",
    ],
    tags: ["Branding", "Logo Design", "Typography"],
  },
  {
    id: "3",
    title: "Mono Architecture",
    category: "Photography",
    year: "2024",
    description: "一系列探索现代建筑几何美学的黑白摄影作品。通过光影对比和构图，展现建筑在剥离色彩后的纯粹形态。",
    coverImage: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2576&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2576&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1479839672679-a455b180eda8?q=80&w=2576&auto=format&fit=crop",
    ],
    tags: ["Photography", "Architecture", "Minimalism"],
  },
  {
    id: "4",
    title: "Flow State",
    category: "Web Development",
    year: "2023",
    description: "专注于提升生产力的任务管理应用。采用 React 和 Framer Motion 构建，拥有丝滑的交互体验和禅意风格的界面。",
    coverImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481487484168-9b930d55208d?q=80&w=2570&auto=format&fit=crop",
    ],
    tags: ["React", "Web App", "Productivity"],
  },
];
