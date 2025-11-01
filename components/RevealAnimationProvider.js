/**
 * RevealAnimationProvider - Global setup component for reveal animations
 * Import this in your main App component or layout to ensure reveal animations work across the site
 */
import { useEffect } from 'react';

export default function RevealAnimationProvider({ children }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Dynamic import to avoid SSR issues
    import('../utils/revealAnimation').then(({ revealAnimationManager }) => {
      // Initialize the reveal animation system
      revealAnimationManager.autoInit();
      
      // Optional: Set global configuration
      revealAnimationManager.updateOptions({
        // Customize global settings here if needed
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
        animationDuration: 600
      });
    });

    // Cleanup function
    return () => {
      import('../utils/revealAnimation').then(({ revealAnimationManager }) => {
        revealAnimationManager.destroy();
      });
    };
  }, []);

  return children;
}

// Alternative: Hook version for functional components
export function useRevealAnimationSetup() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    import('../utils/revealAnimation').then(({ revealAnimationManager }) => {
      revealAnimationManager.autoInit();
    });
  }, []);
}