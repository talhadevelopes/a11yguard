
import { motion } from 'framer-motion';

export function HexagonalBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 1 }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexagons"
            width="50"
            height="43.3"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0,0)"
          >
            <polygon
              points="24.5,43.3 49,21.65 24.5,0 0,21.65"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </motion.div>
  );
}