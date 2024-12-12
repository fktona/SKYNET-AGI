"use client";
import { motion } from "framer-motion";
import React from "react";

function Footer() {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="tracking-[0.1em] w-[70vw] max-w-[400px] justify-center text-center items-center relative font-bold text-lg">
        {[
          {
            text: "\\\\\\\\\\\\\\ ",
            animation: {
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            },
          },
          {
            text: "AI",
            animation: {
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 },
            },
          },
          {
            text: " /////// ",
            animation: {
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            },
          },
        ].map((group, groupIndex) =>
          group.text.split("").map((char, charIndex) => (
            <motion.span
              key={`${groupIndex}-${charIndex}`}
              variants={group.animation}
            >
              {char.trim() || <>&nbsp;</>}
            </motion.span>
          ))
        )}
        <div
          style={{ perspective: 2000 }}
          className="absolute rotate-180 w-full h-10"
        >
          <div
            className="w-full h-full bg-white/15"
            style={{
              transform: "rotateX(45deg)",
              transformOrigin: "center top",
              backfaceVisibility: "hidden",
              clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)",
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
}

export default Footer;
