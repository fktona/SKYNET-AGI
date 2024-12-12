"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTypingContext } from "@/context/ctx";

const SkullInWave = () => {
  const { isTyping } = useTypingContext();
  const glowVariants = {
    typing: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    idle: {
      opacity: 0,
      scale: 1,
    },
  };
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center  scaling-box"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="absolute inset-0 flex lg:items-center items-start top-[25%] lg:top-0 justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          perspective: "1000px",
        }}
      >
        <div className="relative isolate scale-[1.4] w-80 h-90">
          {/* Wave GIF */}
          <Image
            src={isTyping ? "/waving.gif" : "/no-wave.gif"}
            alt="Wave Animation"
            width={1000}
            height={1000}
            className="w-full h-full relative -z-20 object-contain"
          />
          {/* Skull Image */}
          <Image
            src="/skull.png"
            alt="Skull"
            width={300}
            height={200}
            className="absolute w-1/2 h-1/2 object-contain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="absolute w-full -z-10 h-full top-0 left-0 bg-blue-500 rounded-full filter opacity-45 blur-3xl"
                variants={glowVariants}
                initial="idle"
                animate="typing"
                exit="idle"
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkullInWave;
