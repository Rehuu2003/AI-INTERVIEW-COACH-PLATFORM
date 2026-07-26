export const generateAnalytics = (
  role
) => {
  const analyticsMap = {
    frontend: {
      skills: [
        {
          subject: "React",
          score: 92,
        },

        {
          subject: "JavaScript",
          score: 88,
        },

        {
          subject: "CSS",
          score: 85,
        },

        {
          subject: "Performance",
          score: 80,
        },

        {
          subject: "Problem Solving",
          score: 90,
        },
      ],
    },

    backend: {
      skills: [
        {
          subject: "Node.js",
          score: 90,
        },

        {
          subject: "APIs",
          score: 87,
        },

        {
          subject: "MongoDB",
          score: 84,
        },

        {
          subject: "Authentication",
          score: 86,
        },

        {
          subject: "System Design",
          score: 82,
        },
      ],
    },

    fullstack: {
      skills: [
        {
          subject: "Frontend",
          score: 90,
        },

        {
          subject: "Backend",
          score: 85,
        },

        {
          subject: "Architecture",
          score: 82,
        },

        {
          subject: "Deployment",
          score: 78,
        },

        {
          subject: "Communication",
          score: 91,
        },
      ],
    },

    data: {
      skills: [
        {
          subject: "SQL",
          score: 91,
        },

        {
          subject: "Python",
          score: 86,
        },

        {
          subject: "Visualization",
          score: 88,
        },

        {
          subject: "Analytics",
          score: 90,
        },

        {
          subject: "Statistics",
          score: 82,
        },
      ],
    },

    aiml: {
      skills: [
        {
          subject: "TensorFlow",
          score: 87,
        },

        {
          subject: "NLP",
          score: 84,
        },

        {
          subject: "Deep Learning",
          score: 90,
        },

        {
          subject: "Model Training",
          score: 86,
        },

        {
          subject: "AI Concepts",
          score: 92,
        },
      ],
    },
  };

  return (
    analyticsMap[role] ||
    analyticsMap.frontend
  );
};