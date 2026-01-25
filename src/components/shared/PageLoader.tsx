import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated spinner */}
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-primary/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Spinning arc */}
          <motion.div
            className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Inner pulse */}
          <motion.div
            className="absolute inset-3 rounded-full bg-primary/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
          </motion.div>
        </div>
        
        {/* Loading text */}
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="text-sm font-medium text-muted-foreground">Loading</span>
          <motion.span
            className="flex gap-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1 h-1 rounded-full bg-primary"
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Skeleton components for content loading
export function SkeletonText({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`h-4 bg-muted/50 rounded ${className}`}
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`bg-card rounded-lg p-6 border border-border ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SkeletonText className="w-1/3 mb-4" />
      <SkeletonText className="w-full mb-2" />
      <SkeletonText className="w-2/3" />
    </motion.div>
  );
}