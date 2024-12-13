"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTypingContext } from "@/context/ctx";

const SkullInWave = () => {
  const { isSpeaking, isSoundAllowed } = useTypingContext();
  return (
    <motion.div
      className="fixed inset-0 flex items-center  justify-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="absolute inset-0 flex lg:items-center items-start top-[15%] lg:top-0 justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          perspective: "1000px",
        }}
      >
        <div className="relative isolate lg:scale-[1.4] w-80 h-90 custom-style">
          {/* Skull Image */}
          <Image
            src={isSpeaking && isSoundAllowed ? "/skull.gif" : "/skull2.gif"}
            alt="Skull"
            width={500}
            height={500}
            priority
            unoptimized
            className="object-contain"
          />
        </div>

        {/* <style jsx>{`
         .custom-style {
              width: 30%;
              height: 30%;
          @media (max-width: 640px) {
            .custom-style {
              width: 100%;
              height: 100%;
            }
          }
        `}</style> */}
      </motion.div>
    </motion.div>
  );
};

export default SkullInWave;
