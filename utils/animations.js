import { useEffect, useRef, useState } from "react";

// Custom hook for click animations with delayed actions
export const useClickAnimation = (action, delay = 1500, type = "default") => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    // Start loading animation
    setIsLoading(true);
    setShouldPulse(true);

    // Remove pulse effect after animation
    setTimeout(() => setShouldPulse(false), 800);

    // Execute action after delay
    setTimeout(() => {
      setIsLoading(false);
      if (action) {
        action();
      }
    }, delay);
  };

  const getClassName = () => {
    let classes = "";
    if (isLoading) {
      classes += "btn-loading";
      if (type === "redirect") {
        classes += " redirect";
      }
    }
    if (shouldPulse) {
      classes += " btn-click-pulse";
    }
    return classes;
  };

  return {
    handleClick,
    isLoading,
    shouldPulse,
    className: getClassName(),
  };
};

// Custom hook for intersection observer
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "-20px 0px",
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, options]);

  return [ref, isInView];
};

// Custom hook for animated counting
export const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutCubic * (end - start) + start);

      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    updateCount();
  }, [end, duration, start, isInView]);

  const startCounting = () => setIsInView(true);

  return [count, startCounting];
};

// Animated Number Component
export const AnimatedNumber = ({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
  trigger = false,
}) => {
  // Extract number from string (e.g., "200+" -> 200)
  const numberMatch = value.toString().match(/\d+/);
  const targetNumber = numberMatch ? parseInt(numberMatch[0]) : 0;

  // Extract non-numeric parts
  const nonNumericSuffix = value.toString().replace(/\d+/, "");

  const [count, startCounting] = useCounter(targetNumber, duration);

  // React to trigger prop
  useEffect(() => {
    if (trigger) {
      startCounting();
    }
  }, [trigger, startCounting]);

  return (
    <span>
      {prefix}
      {count}
      {nonNumericSuffix || suffix}
    </span>
  );
};

// Animation variants for different use cases
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideInUp = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const bounceIn = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

export const rotateIn = {
  hidden: {
    opacity: 0,
    rotate: -180,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const typewriter = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

// Hover animations
export const hoverScale = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const hoverLift = {
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const buttonHover = {
  hover: {
    scale: 1.03,
    boxShadow: "0 8px 25px rgba(50, 125, 214, 0.3)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const cardHover = {
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      duration: 0.1,
    },
  },
};
