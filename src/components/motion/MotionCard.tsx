'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function MotionCard({
  children,
  onClick,
  className = '',
}: MotionCardProps) {
  return (
    <motion.div
      className={`rounded-lg border-[--border] bg-[--card] shadow-lg overflow-hidden cursor-pointer ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
