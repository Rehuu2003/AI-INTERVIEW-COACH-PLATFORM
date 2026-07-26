export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const fadeDown = {
  hidden: {
    opacity: 0,
    y: -40,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const staggerContainer = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],

    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const glowAnimation = {
  animate: {
    opacity: [0.4, 1, 0.4],

    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};