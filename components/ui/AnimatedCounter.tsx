'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);

  const isDecimal = value % 1 !== 0;
  const decimalPlaces = isDecimal ? (value.toString().split('.')[1]?.length ?? 1) : 0;

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function easeOutQuad(t: number): number {
      return 1 - (1 - t) * (1 - t);
    }

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const current = easedProgress * value;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, prefersReducedMotion]);

  const formattedValue = isDecimal
    ? displayValue.toFixed(decimalPlaces)
    : Math.round(displayValue).toLocaleString();

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <span className="block font-display text-h2 text-gold-primary leading-tight">
        {prefix}
        {formattedValue}
        {suffix}
      </span>
      <span className="block mt-sm font-body text-small text-text-muted">
        {label}
      </span>
    </div>
  );
}
