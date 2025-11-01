# Reveal Animation System Documentation

This documentation explains how to use the comprehensive reveal animation system that has been implemented across all components and sections of the website.

## Overview

The reveal animation system combines **Intersection Observer API** with **CSS animations** to create smooth, performant animations that trigger when elements enter the viewport. The system supports multiple animation types, staggered animations, and is fully responsive with accessibility considerations.

## Core Files

### 1. `utils/revealAnimation.js`
- Main animation manager with comprehensive API
- Handles intersection observation and animation triggering
- Provides different animation types and configurations
- Auto-initializes and handles dynamic content

### 2. `hooks/useRevealAnimation.js`
- React hooks and components for easy integration
- Provides `useRevealAnimation`, `RevealWrapper`, and specialized components
- Handles React lifecycle and cleanup

### 3. `styles/globals.css`
- Enhanced CSS with reveal animation classes
- Multiple animation types and utilities
- Accessibility support (respects `prefers-reduced-motion`)

## Animation Types

### Basic Animations
- `fadeIn` - Simple fade in
- `fadeInUp` - Fade in from bottom (default)
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale from 80% to 100%
- `rotateIn` - Rotate and scale in
- `slideInUp` - Slide in from bottom with larger distance

### Specialized Animations
- `card` - Optimized for card components
- `text` - Optimized for text content
- `image` - Optimized for images with scale effect

## Usage Methods

### Method 1: Data Attributes (Recommended for HTML/JSX)

```jsx
{/* Basic reveal animation */}
<div data-reveal data-reveal-animation="fadeInUp">
  Content that will animate in
</div>

{/* With delay */}
<div data-reveal data-reveal-animation="fadeInLeft" data-reveal-delay="300">
  Delayed animation
</div>

{/* Staggered animations for multiple children */}
<div data-reveal data-reveal-animation="fadeInUp" data-reveal-stagger data-reveal-stagger-delay="150">
  <div data-reveal-stagger-item>Item 1</div>
  <div data-reveal-stagger-item>Item 2</div>
  <div data-reveal-stagger-item>Item 3</div>
</div>
```

### Method 2: React Components

```jsx
import { RevealWrapper, RevealText, RevealImage, RevealCard } from '../hooks/useRevealAnimation';

// Wrapper component
<RevealWrapper animationType="fadeInUp" delay={200}>
  <div>Your content</div>
</RevealWrapper>

// Specialized components
<RevealText tag="h1" animationType="fadeInUp" delay={100}>
  Your heading
</RevealText>

<RevealImage 
  src="/image.jpg" 
  alt="Description" 
  animationType="scaleIn" 
  delay={300}
/>

<RevealCard animationType="card" delay={400}>
  <div>Card content</div>
</RevealCard>
```

### Method 3: React Hook

```jsx
import { useRevealAnimation } from '../hooks/useRevealAnimation';

function MyComponent() {
  const ref = useRevealAnimation({
    animationType: 'fadeInUp',
    delay: 200,
    once: true
  });

  return (
    <div ref={ref}>
      Content that will animate
    </div>
  );
}
```

### Method 4: Staggered Animations Hook

```jsx
import { useStaggeredReveal } from '../hooks/useRevealAnimation';

function MyList() {
  const { setRef } = useStaggeredReveal(items.length, {
    animationType: 'fadeInUp',
    staggerDelay: 100
  });

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} ref={setRef(index)}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

## Configuration Options

### Global Options
```javascript
// Default configuration in RevealAnimationManager
{
  root: null,                    // Intersection root
  rootMargin: '0px 0px -10% 0px', // Margin before triggering
  threshold: 0.1,                // Percentage of element visible
  once: true,                    // Animate only once
  animationDuration: 600,        // Animation duration in ms
  animationType: 'fadeInUp'      // Default animation type
}
```

### Data Attributes
- `data-reveal` - Mark element for observation
- `data-reveal-animation` - Animation type
- `data-reveal-delay` - Delay in ms (can also use classes like `reveal-delay-300`)
- `data-reveal-once` - Animate only once
- `data-reveal-stagger` - Enable staggered children
- `data-reveal-stagger-delay` - Delay between stagger items
- `data-reveal-stagger-item` - Mark child for stagger animation

## Applied Sections

The reveal animation system has been implemented across all major sections:

### 1. Home Section (`sections/home/index.js`)
- **Navbar**: `fadeInDown` with staggered menu items
- **Logo**: `fadeInLeft`
- **Main content**: `fadeInUp` with progressive delays
- **Hero image**: `scaleIn` with delay
- **Feature list**: Staggered `fadeInUp`

### 2. About Section (`sections/about/index.js`)
- **Title**: `fadeInUp`
- **Content**: `fadeInLeft` and `fadeInRight` split
- **Stats**: Staggered animations
- **Timeline**: Staggered vertical animation
- **Images**: `scaleIn` effects

### 3. Events Section (`sections/event/index.js`)
- **Header**: `fadeInUp` and `fadeInLeft`/`fadeInRight` split
- **Filters**: Staggered button animations
- **Event cards**: Staggered card animations
- **Carousel controls**: `fadeInLeft`/`fadeInRight`
- **CTA section**: Progressive `fadeInUp` with delays

### 4. Blog Section (`sections/blog/index.js`)
- **Header content**: `fadeInLeft` and `fadeInRight` split
- **Filter buttons**: Staggered animations
- **Blog cards**: Staggered card reveals
- **Images**: `scaleIn` effect

### 5. Members Section (`sections/members/index.js`)
- **Title and subtitle**: Progressive `fadeInUp`
- **Category selector**: `fadeInUp`
- **Member cards**: Staggered grid animation
- **Profile images**: Integrated with card animation

### 6. Contact Section (`sections/contact-us/index.js`)
- **Title**: `fadeInUp`
- **Contact info**: `fadeInLeft` with staggered items
- **Social links**: Staggered animations
- **Contact form**: `fadeInRight` with field progression
- **Background cloud**: `fadeInRight`

## Best Practices

### 1. Animation Timing
```jsx
// Progressive delays for related content
<h1 data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="0">Title</h1>
<p data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="200">Subtitle</p>
<button data-reveal data-reveal-animation="fadeInUp" data-reveal-delay="400">CTA</button>
```

### 2. Direction Guidelines
- **Headers**: `fadeInUp` or `fadeInDown`
- **Side content**: `fadeInLeft` or `fadeInRight`
- **Cards/Images**: `scaleIn` or `card`/`image` types
- **Lists**: Use staggered animations
- **CTAs**: `scaleIn` for emphasis

### 3. Stagger Timing
```jsx
// Recommended stagger delays
data-reveal-stagger-delay="100"  // Fast items (menu, tags)
data-reveal-stagger-delay="150"  // Medium items (cards, features)
data-reveal-stagger-delay="200"  // Slow items (large content blocks)
```

### 4. Performance Considerations
- Use `once: true` for most animations
- Avoid excessive stagger items (limit to 10-15)
- Use appropriate `rootMargin` to trigger at right time
- Respect `prefers-reduced-motion`

### 5. Accessibility
The system automatically respects user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.is-visible {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
}
```

## Advanced Usage

### Custom Animation Types
You can add custom animations by extending the CSS in `globals.css`:

```css
.reveal-custom-bounce {
  opacity: 0;
  transform: scale(0.3) rotate(45deg);
}
.reveal-custom-bounce.is-visible {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
```

### Dynamic Content
The system automatically handles dynamically added content through MutationObserver. New elements with `data-reveal` attributes will be automatically observed.

### Manual Control
```javascript
// Manually trigger animations
import { revealAnimationManager } from '../utils/revealAnimation';

// Trigger specific element
revealAnimationManager.triggerReveal(element);

// Reset element
revealAnimationManager.resetElement(element);

// Update global options
revealAnimationManager.updateOptions({
  animationDuration: 800,
  threshold: 0.2
});
```

## Browser Support

- **Modern browsers**: Full support with Intersection Observer
- **Fallback**: Graceful degradation for older browsers
- **Mobile**: Optimized for touch devices and reduced motion

## Troubleshooting

### Common Issues

1. **Animations not triggering**
   - Check if `data-reveal` attribute is present
   - Verify element is in viewport
   - Check console for JavaScript errors

2. **Stagger not working**
   - Ensure parent has `data-reveal-stagger`
   - Children need `data-reveal-stagger-item`
   - Check stagger delay value

3. **Performance issues**
   - Reduce number of animated elements
   - Increase `rootMargin` for earlier triggering
   - Use `once: true` to prevent repeated animations

### Debug Mode
```javascript
// Enable debug logging
revealAnimationManager.options.debug = true;
```

This comprehensive reveal animation system provides a consistent, performant, and accessible way to add engaging animations throughout the website while maintaining excellent user experience across all devices and user preferences.