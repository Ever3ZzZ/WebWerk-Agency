export const EASE_CUSTOM = [0.22, 1, 0.36, 1];
export const fillDuration = 0.8;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, delay, ease: EASE_CUSTOM },
  }),
};

export const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const slideUpVariants = {
  initial: { y: "100%" },
  hover: (delay = 0) => ({ 
    y: 0,
    transition: { duration: fillDuration, delay, ease: EASE_CUSTOM }
  })
};

export const pricingVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: (i) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", duration: 1.4, bounce: 0.3, delay: i * 0.12 }
  }),
  hover: { 
    y: -12, 
    scale: 1.015,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const portfolioVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: (i) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", duration: 1.2, bounce: 0.3, delay: i * 0.1 }
  }),
  hover: { 
    y: -12, 
    scale: 1.015,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const benefitBoxVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: EASE_CUSTOM }
  },
  hover: {
    y: -8,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const benefitFillVariants = {
  initial: { y: "100%" },
  hover: (i) => ({
    y: 0,
    transition: { 
      duration: fillDuration * 1.5, 
      delay: i * 0.15, 
      ease: EASE_CUSTOM 
    }
  }),
  show: (i) => ({
    y: "100%",
    transition: { 
      duration: fillDuration * 1.5, 
      delay: (6 - i) * 0.1 + 2.5, 
      ease: EASE_CUSTOM 
    }
  })
};

export const processRaceVariants = {
  initial: { y: "100%" },
  race: (i) => ({
    y: 0,
    transition: { duration: 1.2, delay: i * 0.3, ease: EASE_CUSTOM }
  })
};

export const buttonTap = { scale: 0.98 };

export const headerFade = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export const faqContentVariants = {
  open: { height: "auto", opacity: 1, transition: { duration: 0.4 } },
  closed: { height: 0, opacity: 0, transition: { duration: 0.3 } }
};

export const faqIconVariants = {
  open: { rotate: 45 },
  closed: { rotate: 0 }
};