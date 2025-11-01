/**
 * React hooks and components for reveal animations
 */
import { useEffect, useRef } from 'react';

// React hook for reveal animations
export const useRevealAnimation = (options = {}) => {
  const ref = useRef(null);
  
  const defaultOptions = {
    animationType: 'fadeInUp',
    once: true,
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px',
    ...options
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (ref.current) {
      const element = ref.current;
      
      // Set data attributes
      element.setAttribute('data-reveal', '');
      element.setAttribute('data-reveal-animation', defaultOptions.animationType);
      
      if (defaultOptions.once) {
        element.setAttribute('data-reveal-once', '');
      }
      
      if (defaultOptions.delay) {
        element.classList.add(`reveal-delay-${defaultOptions.delay}`);
      }
      
      // Dynamically import and observe the element
      import('../utils/revealAnimation').then(({ revealAnimationManager }) => {
        revealAnimationManager.observe(element);
      });
      
      // Cleanup function
      return () => {
        if (element) {
          import('../utils/revealAnimation').then(({ revealAnimationManager }) => {
            if (revealAnimationManager.observer) {
              revealAnimationManager.observer.unobserve(element);
            }
          });
        }
      };
    }
  }, [defaultOptions.animationType, defaultOptions.once, defaultOptions.delay]);

  return ref;
};

// React component wrapper for reveal animations
export const RevealWrapper = ({ 
  children, 
  animationType = 'fadeInUp',
  once = true,
  delay = 0,
  stagger = false,
  staggerDelay = 100,
  className = '',
  tag = 'div',
  ...props 
}) => {
  const ref = useRevealAnimation({
    animationType,
    once,
    delay
  });

  const Tag = tag;
  
  const additionalProps = {};
  
  if (stagger) {
    additionalProps['data-reveal-stagger'] = '';
    additionalProps['data-reveal-stagger-delay'] = staggerDelay;
  }

  return (
    <Tag 
      ref={ref}
      className={`${className}`}
      {...additionalProps}
      {...props}
    >
      {stagger && Array.isArray(children) 
        ? children.map((child, index) => (
            <div key={index} data-reveal-stagger-item>
              {child}
            </div>
          ))
        : children
      }
    </Tag>
  );
};

// Higher-order component for adding reveal animations
export const withRevealAnimation = (WrappedComponent, options = {}) => {
  return function RevealAnimatedComponent(props) {
    return (
      <RevealWrapper {...options}>
        <WrappedComponent {...props} />
      </RevealWrapper>
    );
  };
};

// Hook for staggered animations
export const useStaggeredReveal = (itemsCount, options = {}) => {
  const refs = useRef([]);
  
  const defaultOptions = {
    animationType: 'fadeInUp',
    staggerDelay: 100,
    once: true,
    ...options
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    refs.current.forEach((ref, index) => {
      if (ref) {
        const element = ref;
        
        // Set data attributes
        element.setAttribute('data-reveal', '');
        element.setAttribute('data-reveal-animation', defaultOptions.animationType);
        
        if (defaultOptions.once) {
          element.setAttribute('data-reveal-once', '');
        }
        
        // Add stagger delay
        const delay = index * defaultOptions.staggerDelay;
        element.style.setProperty('--stagger-delay', `${delay}ms`);
        element.classList.add('reveal-stagger');
        
        // Dynamically import and observe the element
        import('../utils/revealAnimation').then(({ revealAnimationManager }) => {
          revealAnimationManager.observe(element);
        });
      }
    });

    // Cleanup
    return () => {
      refs.current.forEach(ref => {
        if (ref) {
          import('../utils/revealAnimation').then(({ revealAnimationManager }) => {
            if (revealAnimationManager.observer) {
              revealAnimationManager.observer.unobserve(ref);
            }
          });
        }
      });
    };
  }, [itemsCount, defaultOptions.animationType, defaultOptions.staggerDelay, defaultOptions.once]);

  const setRef = (index) => (el) => {
    refs.current[index] = el;
  };

  return { setRef, refs: refs.current };
};

// Component for section animations
export const RevealSection = ({ 
  children, 
  animationType = 'fadeInUp',
  className = '',
  id,
  ...props 
}) => {
  const ref = useRevealAnimation({ animationType, once: true });

  return (
    <section 
      ref={ref}
      id={id}
      className={`section-reveal ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

// Component for card animations
export const RevealCard = ({ 
  children, 
  animationType = 'card',
  delay = 0,
  className = '',
  ...props 
}) => {
  const ref = useRevealAnimation({ animationType, delay, once: true });

  return (
    <div 
      ref={ref}
      className={`card-reveal ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Component for text animations
export const RevealText = ({ 
  children, 
  animationType = 'text',
  delay = 0,
  className = '',
  tag = 'div',
  ...props 
}) => {
  const ref = useRevealAnimation({ animationType, delay, once: true });
  const Tag = tag;

  return (
    <Tag 
      ref={ref}
      className={`text-reveal ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Component for image animations
export const RevealImage = ({ 
  src,
  alt,
  animationType = 'image',
  delay = 0,
  className = '',
  ...props 
}) => {
  const ref = useRevealAnimation({ animationType, delay, once: true });

  return (
    <img 
      ref={ref}
      src={src}
      alt={alt}
      className={`image-reveal ${className}`}
      {...props}
    />
  );
};

export default {
  useRevealAnimation,
  RevealWrapper,
  RevealSection,
  RevealCard,
  RevealText,
  RevealImage,
  withRevealAnimation,
  useStaggeredReveal
};