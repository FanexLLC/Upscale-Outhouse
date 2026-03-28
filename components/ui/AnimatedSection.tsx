'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  scaleUp,
  slideInLeft,
  slideInRight,
} from '@/lib/animations';

const variantMap: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  stagger: staggerContainer,
  scaleUp,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variantMap;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'ul';
}

const motionComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
};

export default function AnimatedSection({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  as = 'div',
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const selectedVariant = variantMap[variant];
  const MotionTag = motionComponents[as];

  // Apply delay by wrapping the variant
  const variants: Variants = delay
    ? {
        ...selectedVariant,
        visible: {
          ...(typeof selectedVariant.visible === 'object' ? selectedVariant.visible : {}),
          transition: {
            ...((typeof selectedVariant.visible === 'object' && selectedVariant.visible !== null && 'transition' in selectedVariant.visible
              ? selectedVariant.visible.transition
              : {}) as Record<string, unknown>),
            delay,
          },
        },
      }
    : selectedVariant;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </MotionTag>
  );
}
