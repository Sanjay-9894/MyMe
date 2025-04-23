"use client";

import React from "react";

// This is a simplified mock of framer-motion to provide basic animation functionality
// In a real project, you'd install and use the actual framer-motion library

interface MotionProps {
  initial?: any;
  animate?: any;
  transition?: any;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const motion = {
  div: ({ 
    initial, 
    animate, 
    transition, 
    className, 
    children,
    ...props
  }: MotionProps) => {
    const [style, setStyle] = React.useState(initial || {});

    React.useEffect(() => {
      if (animate) {
        const timeout = setTimeout(() => {
          setStyle(animate);
        }, 50);
        
        return () => clearTimeout(timeout);
      }
    }, [animate]);

    const transitionStyle = transition ? {
      transition: `all ${transition.duration || 0.3}s ease`,
    } : {};

    return (
      <div 
        className={className} 
        style={{ ...style, ...transitionStyle, ...props.style }}
        {...props}
      >
        {children}
      </div>
    );
  },
};