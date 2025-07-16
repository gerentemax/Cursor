'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export default function Logo({ size = 'md', animate = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-32 h-8',
    md: 'w-48 h-12',
    lg: 'w-64 h-16',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} flex items-center justify-center`}
      initial={animate ? { opacity: 0, y: -20 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center space-x-2">
        {/* Icon/Symbol */}
        <motion.div
          className="relative"
          animate={animate ? { rotate: [0, 360] } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-gerente-blue to-gerente-gray rounded-lg flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex flex-col"
          initial={animate ? { opacity: 0, x: -20 } : {}}
          animate={animate ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={`${textSizeClasses[size]} font-bold text-gerente-blue leading-none`}>
            Gerente
          </span>
          <span className={`${textSizeClasses[size]} font-light text-gerente-gray leading-none`}>
            Max
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}