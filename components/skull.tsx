"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTypingContext } from "@/context/ctx";
import { cn } from "@/lib/utils";

const SkullInWave = () => {
  const { isTyping } = useTypingContext();
  const glowVariants = {
    typing: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.15, 1],
      background: [
        "linear-gradient(45deg, #ff6ec7, #7873f5)",
        "linear-gradient(45deg, #56d8ff, #ff758c)",
        "linear-gradient(45deg, #ff6ec7, #7873f5)",
      ],
      transition: {
        duration: 2.5,
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
        className="absolute inset-0 flex lg:items-center  items-start top-[15%] lg:top-0 justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          perspective: "1000px",
        }}
      >
        <div className="relative  isolate lg:scale-[1.4] md:w-80 md:h-90 w-72 h-90">
          {/* Wave GIF */}
          <Image
            src={"/waving.gif"}
            alt="Wave Animation"
            width={1000}
            height={1000}
            className={cn(
              "w-full h-full relative -z-20 object-contain hidden transition-opacity duration-500",
              isTyping ? "opacity-1" : "opacity-0"
            )}
          />
          {/* Skull Image */}
          <Image
            src="/skull2.png"
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
