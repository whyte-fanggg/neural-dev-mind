export type NodeData = {
  id: number
  title: string
  description: string
  tags: string[]
  year: number
}

export const nodeData: NodeData[] = [
  {
    id: 0,
    title: "React Portfolio",
    year: 2018,
    description: "A modern portfolio built with React, TailwindCSS, and Vite.",
    tags: ["React", "TailwindCSS", "Vite"],
  },
  {
    id: 1,
    title: "3D Brain Network",
    year: 2021,
    description: "Interactive WebGL-based neural network simulation.",
    tags: ["Three.js", "React-Three-Fiber", "GLSL"],
  },
  {
    id: 2,
    title: "Expense Tracker",
    year: 2024,
    description: "A finance tracker app with charts and Firebase backend.",
    tags: ["Firebase", "Chart.js", "React"],
  },
  // Add more...
]
