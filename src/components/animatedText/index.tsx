import { motion, type Transition } from 'motion/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type BlurTextProps = {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, (string | number | null)[]> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, (string | number | null)[]> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k] ?? null, ...steps.map(s => s[k] ?? null)];
  });
  return keyframes;
};

const countAnimatableElements = (nodes: React.ReactNode, animateBy: 'words' | 'letters'): number => {
  let count = 0;
  React.Children.forEach(nodes, child => {
    if (typeof child === 'string') {
      count += animateBy === 'words' ? child.split(' ').length : child.length;
    } else if (React.isValidElement(child)) {
      const props = child.props as { children?: React.ReactNode };
      if (props.children) {
        count += countAnimatableElements(props.children, animateBy);
      }
    }
  });
  return count;
};

const BlurText: React.FC<BlurTextProps> = ({
  children,
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));
  const totalElements = useMemo(() => countAnimatableElements(children, animateBy), [children, animateBy]);
  const elementIndex = useRef(0);

  const renderAnimatedChildren = (nodes: React.ReactNode): React.ReactNode => {
    return React.Children.map(nodes, (child, childIndex) => {
      if (typeof child === 'string') {
        const segments = animateBy === 'words' ? child.split(' ') : child.split('');
        return segments.map((segment, index) => {
          elementIndex.current++;
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

          const spanTransition: Transition = {
            duration: totalDuration,
            times,
            delay: ((elementIndex.current - 1) * delay) / 1000,
            ease: easing
          };

          const isLast = elementIndex.current === totalElements;

          return (
            <motion.span
              key={index}
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={spanTransition}
              onAnimationComplete={isLast ? onAnimationComplete : undefined}
              style={{
                display: 'inline-block',
                willChange: 'transform, filter, opacity'
              }}
            >
              {segment === ' ' ? '\u00A0' : segment}
              {animateBy === 'words' && index < segments.length - 1 && '\u00A0'}
            </motion.span>
          );
        });
      }

      if (React.isValidElement(child)) {
        const props = child.props as { children?: React.ReactNode; [key: string]: unknown };
        return React.cloneElement(
          child,
          { ...props, key: `child-${childIndex}` },
          renderAnimatedChildren(props.children)
        );
      }

      return child;
    });
  };

  elementIndex.current = 0; // Reset for each render

  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {renderAnimatedChildren(children)}
    </div>
  );
};

export default BlurText;
