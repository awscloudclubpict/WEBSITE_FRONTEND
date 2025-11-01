/**
 * Intersection Observer + Reveal Animation Utility
 * This utility provides a comprehensive solution for applying reveal animations
 * to any component or section when it enters the viewport
 */

export class RevealAnimationManager {
  constructor(options = {}) {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Return a dummy instance for SSR
      return this.createSSRInstance();
    }

    this.options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
      once: true,
      stagger: false,
      staggerDelay: 100,
      animationDuration: 600,
      animationType: 'fadeInUp',
      ...options
    };

    this.observers = new Map();
    this.isSSR = false;
    this.initializeCSS();
    this.createObserver();
  }

  // Create a dummy instance for SSR that doesn't do anything
  createSSRInstance() {
    this.isSSR = true;
    this.options = {};
    this.observers = new Map();
    
    // Return no-op methods for SSR
    ['initializeCSS', 'createObserver', 'observe', 'observeElements', 'autoInit', 
     'setupMutationObserver', 'revealElement', 'hideElement', 'handleStaggerAnimation',
     'triggerReveal', 'resetElement', 'destroy', 'updateOptions'].forEach(method => {
      this[method] = () => {};
    });
    
    return this;
  }

  // Initialize CSS animations dynamically
  initializeCSS() {
    // Skip if SSR or document not available
    if (this.isSSR || typeof document === 'undefined') return;
    
    if (document.getElementById('reveal-animations-css')) return;

    const style = document.createElement('style');
    style.id = 'reveal-animations-css';
    style.textContent = `
      /* Base reveal classes */
      .reveal {
        opacity: 0;
        visibility: hidden;
        transition: all ${this.options.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: opacity, transform;
      }

      .reveal.is-visible {
        opacity: 1;
        visibility: visible;
      }

      /* Animation types */
      .reveal-fade-in {
        opacity: 0;
      }
      .reveal-fade-in.is-visible {
        opacity: 1;
      }

      .reveal-fade-in-up {
        opacity: 0;
        transform: translateY(40px);
      }
      .reveal-fade-in-up.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .reveal-fade-in-down {
        opacity: 0;
        transform: translateY(-40px);
      }
      .reveal-fade-in-down.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .reveal-fade-in-left {
        opacity: 0;
        transform: translateX(-40px);
      }
      .reveal-fade-in-left.is-visible {
        opacity: 1;
        transform: translateX(0);
      }

      .reveal-fade-in-right {
        opacity: 0;
        transform: translateX(40px);
      }
      .reveal-fade-in-right.is-visible {
        opacity: 1;
        transform: translateX(0);
      }

      .reveal-scale-in {
        opacity: 0;
        transform: scale(0.8);
      }
      .reveal-scale-in.is-visible {
        opacity: 1;
        transform: scale(1);
      }

      .reveal-rotate-in {
        opacity: 0;
        transform: rotate(-10deg) scale(0.8);
      }
      .reveal-rotate-in.is-visible {
        opacity: 1;
        transform: rotate(0deg) scale(1);
      }

      .reveal-slide-in-up {
        opacity: 0;
        transform: translateY(100px);
      }
      .reveal-slide-in-up.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Stagger animations */
      .reveal-stagger {
        transition-delay: var(--stagger-delay, 0ms);
      }

      /* Special animations for different content types */
      .reveal-card {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
        transition: all ${this.options.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .reveal-card.is-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      .reveal-text {
        opacity: 0;
        transform: translateY(20px);
        transition: all ${this.options.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .reveal-text.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .reveal-image {
        opacity: 0;
        transform: scale(1.1);
        transition: all ${this.options.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .reveal-image.is-visible {
        opacity: 1;
        transform: scale(1);
      }

      /* Utility classes */
      .reveal-delay-100 { transition-delay: 100ms !important; }
      .reveal-delay-200 { transition-delay: 200ms !important; }
      .reveal-delay-300 { transition-delay: 300ms !important; }
      .reveal-delay-400 { transition-delay: 400ms !important; }
      .reveal-delay-500 { transition-delay: 500ms !important; }
      .reveal-delay-600 { transition-delay: 600ms !important; }
      .reveal-delay-700 { transition-delay: 700ms !important; }
      .reveal-delay-800 { transition-delay: 800ms !important; }

      /* Responsive animations */
      @media (prefers-reduced-motion: reduce) {
        .reveal, .reveal.is-visible {
          transition: none !important;
          transform: none !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create the intersection observer
  createObserver() {
    // Skip if SSR or IntersectionObserver not available
    if (this.isSSR || typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
          this.revealElement(element);
          
          // Handle stagger animations for child elements
          if (element.hasAttribute('data-reveal-stagger')) {
            this.handleStaggerAnimation(element);
          }
          
          // Unobserve if once is true
          if (this.options.once || element.hasAttribute('data-reveal-once')) {
            this.observer.unobserve(element);
          }
        } else if (!this.options.once && !element.hasAttribute('data-reveal-once')) {
          this.hideElement(element);
        }
      });
    }, {
      root: this.options.root,
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    });
  }

  // Reveal an element
  revealElement(element) {
    element.classList.add('is-visible');
    
    // Trigger custom event
    element.dispatchEvent(new CustomEvent('reveal:visible', {
      detail: { element }
    }));
  }

  // Hide an element (for repeat animations)
  hideElement(element) {
    element.classList.remove('is-visible');
    
    // Trigger custom event
    element.dispatchEvent(new CustomEvent('reveal:hidden', {
      detail: { element }
    }));
  }

  // Handle stagger animations for child elements
  handleStaggerAnimation(parentElement) {
    const children = parentElement.querySelectorAll('[data-reveal-stagger-item]');
    children.forEach((child, index) => {
      const delay = index * (parseInt(parentElement.getAttribute('data-reveal-stagger-delay')) || this.options.staggerDelay);
      child.style.setProperty('--stagger-delay', `${delay}ms`);
      child.classList.add('reveal-stagger');
      
      setTimeout(() => {
        child.classList.add('is-visible');
      }, delay);
    });
  }

  // Observe a single element
  observe(element) {
    if (!element || this.isSSR || !this.observer) return;
    
    // Add base reveal class if not present
    if (!element.classList.contains('reveal')) {
      element.classList.add('reveal');
    }
    
    // Add animation type class
    const animationType = element.getAttribute('data-reveal-animation') || this.options.animationType;
    element.classList.add(`reveal-${animationType.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
    
    this.observer.observe(element);
  }

  // Observe multiple elements
  observeElements(selector) {
    if (this.isSSR || typeof document === 'undefined') return;
    
    const elements = typeof selector === 'string' 
      ? document.querySelectorAll(selector) 
      : selector;
      
    elements.forEach(element => this.observe(element));
  }

  // Auto-initialize based on data attributes
  autoInit() {
    if (this.isSSR || typeof document === 'undefined') return;
    
    // Observe elements with data-reveal attribute
    this.observeElements('[data-reveal]');
    
    // Set up mutation observer for dynamically added content
    this.setupMutationObserver();
  }

  // Set up mutation observer for dynamic content
  setupMutationObserver() {
    if (this.isSSR || typeof window === 'undefined' || !window.MutationObserver) return;
    
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node itself has data-reveal
            if (node.hasAttribute && node.hasAttribute('data-reveal')) {
              this.observe(node);
            }
            
            // Check for child elements with data-reveal
            if (node.querySelectorAll) {
              const revealElements = node.querySelectorAll('[data-reveal]');
              revealElements.forEach(element => this.observe(element));
            }
          }
        });
      });
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Manually trigger reveal for an element
  triggerReveal(element) {
    if (element && !this.isSSR) {
      this.revealElement(element);
    }
  }

  // Reset an element (remove reveal state)
  resetElement(element) {
    if (element && !this.isSSR) {
      element.classList.remove('is-visible');
    }
  }

  // Destroy the manager and clean up
  destroy() {
    if (this.isSSR) return;
    
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    
    // Remove CSS only if in browser
    if (typeof document !== 'undefined') {
      const style = document.getElementById('reveal-animations-css');
      if (style) {
        style.remove();
      }
    }
  }

  // Update options
  updateOptions(newOptions) {
    if (this.isSSR) return;
    
    this.options = { ...this.options, ...newOptions };
    
    // Recreate observer with new options
    if (this.observer) {
      this.observer.disconnect();
    }
    this.createObserver();
  }
}

// Create and export a default instance (only in browser)
export const revealAnimationManager = typeof window !== 'undefined' 
  ? new RevealAnimationManager()
  : new RevealAnimationManager().createSSRInstance();

// Auto-initialize when DOM is ready (only in browser)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      revealAnimationManager.autoInit();
    });
  } else {
    revealAnimationManager.autoInit();
  }
}

// Export utility functions for easy use
export const observeElement = (element, animationType = 'fadeInUp') => {
  if (typeof window === 'undefined' || !element) return;
  
  element.setAttribute('data-reveal', '');
  element.setAttribute('data-reveal-animation', animationType);
  revealAnimationManager.observe(element);
};

export const observeElements = (selector, animationType = 'fadeInUp') => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => observeElement(element, animationType));
};

// React hook for use in React components
export const useRevealAnimation = (ref, options = {}) => {
  if (typeof window === 'undefined') return; // SSR check
  
  const defaultOptions = {
    animationType: 'fadeInUp',
    once: true,
    ...options
  };

  if (ref && ref.current) {
    const element = ref.current;
    element.setAttribute('data-reveal', '');
    element.setAttribute('data-reveal-animation', defaultOptions.animationType);
    
    if (defaultOptions.once) {
      element.setAttribute('data-reveal-once', '');
    }
    
    revealAnimationManager.observe(element);
  }
};

export default RevealAnimationManager;