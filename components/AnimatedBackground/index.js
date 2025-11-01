"use client";

import { useMemo } from "react";

/*
  Optimized but visible AWS-themed animated background
*/

export default function AnimatedBackground({ count = 5 }) {
  const blobs = useMemo(() => {
    const arr = [];
    const awsColors = [210, 220, 230, 240, 250]; // Blue hues
    const sizes = [180, 220, 160, 200, 140];
    
    for (let i = 0; i < count; i++) {
      const size = sizes[i % sizes.length];
      const left = 10 + Math.round(Math.random() * 80);
      const top = 10 + Math.round(Math.random() * 80);
      const duration = 20 + Math.round(Math.random() * 15);
      const delay = -(Math.random() * 6).toFixed(2) + "s";
      const blur = 25 + Math.round(Math.random() * 10); // Increased blur for softness
      const hue = awsColors[i % awsColors.length];
      const opacity = 0.35 + (Math.random() * 0.15); // Increased opacity for visibility
      const scale = 0.9 + Math.random() * 0.3;
      
      arr.push({ 
        id: i, 
        size, 
        left, 
        top, 
        duration, 
        delay, 
        blur, 
        hue, 
        opacity,
        scale 
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="animated-bg-root" aria-hidden="true">
      {blobs.map((b) => (
        <div
          key={b.id}
          className="bg-blob"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s, ${b.duration * 1.4}s`,
            animationDelay: `${b.delay}, ${b.delay}`,
            filter: `blur(${b.blur}px)`,
            opacity: b.opacity,
            transform: `scale(${b.scale})`,
            ["--blob-hue"]: b.hue,
          }}
        />
      ))}
    </div>
  );
}