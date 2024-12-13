"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTypingContext } from "@/context/ctx";
import { useState, useEffect } from "react";

const SkullInWave = () => {
  const { isSpeaking, isSoundAllowed } = useTypingContext();
  const [corruptionKey, setCorruptionKey] = useState(0);

  useEffect(() => {
    setCorruptionKey((prevKey) => prevKey + 1);
  }, [isSpeaking, isSoundAllowed]);

  const containerVariants = {
    hidden: { scale: 0.5, z: -200 },
    visible: { scale: 1.2, z: 0 },
  };

  const corruptionVariants = {
    hidden: { opacity: 1, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 1,
      scale: 1.2,
      filter: "blur(10px) hue-rotate(-8deg)", // Adjust to -90deg for a reddish effect
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="absolute inset-0 flex lg:items-center items-start justify-center"
        initial="hidden"
        animate={isSpeaking && isSoundAllowed ? "visible" : "hidden"}
        variants={containerVariants}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={corruptionKey}
              variants={corruptionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  x: [0, -5, 5, -5, 5, 0],
                  y: [0, -5, 5, -5, 5, 0],
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={
                    isSpeaking && isSoundAllowed ? "/skull.gif" : "/skull2.gif"
                  }
                  alt={
                    isSpeaking && isSoundAllowed
                      ? "Speaking Skull"
                      : "Silent Skull"
                  }
                  width={400}
                  height={400}
                  priority
                  unoptimized
                  className="object-contain corruption-effect"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkullInWave;
