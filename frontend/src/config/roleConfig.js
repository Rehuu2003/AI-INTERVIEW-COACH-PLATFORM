import {
  Code2,
  Database,
  Layers3,
  BarChart3,
  BrainCircuit,
} from "lucide-react";

export const roleConfig = [
  {
    id: "frontend",

    title: "Frontend Developer",

    icon: Code2,

    color:
      "from-cyan-400 to-blue-500",

    description:
      "React, JavaScript, UI engineering and frontend architecture.",

    skills: [
      "React",
      "JavaScript",
      "CSS",
      "Performance",
    ],
  },

  {
    id: "backend",

    title: "Backend Developer",

    icon: Database,

    color:
      "from-emerald-400 to-green-500",

    description:
      "APIs, databases, authentication and backend systems.",

    skills: [
      "Node.js",
      "MongoDB",
      "API Design",
      "Authentication",
    ],
  },

  {
    id: "fullstack",

    title: "Full Stack Developer",

    icon: Layers3,

    color:
      "from-purple-400 to-pink-500",

    description:
      "Frontend + backend engineering with full product architecture.",

    skills: [
      "React",
      "Node.js",
      "Databases",
      "Deployment",
    ],
  },

  {
    id: "data",

    title: "Data Analyst",

    icon: BarChart3,

    color:
      "from-orange-400 to-yellow-500",

    description:
      "SQL, analytics, dashboards and data visualization.",

    skills: [
      "SQL",
      "Power BI",
      "Python",
      "Visualization",
    ],
  },

  {
    id: "aiml",

    title: "AI / ML Engineer",

    icon: BrainCircuit,

    color:
      "from-fuchsia-400 to-violet-500",

    description:
      "Machine learning, neural networks and AI systems.",

    skills: [
      "TensorFlow",
      "NLP",
      "Deep Learning",
      "Model Training",
    ],
  },
];