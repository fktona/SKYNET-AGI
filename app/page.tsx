"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { handleMouseEnter } from "@/animations/animation";
import axios from "axios";
import { formatDistanceToNow, set } from "date-fns";
import Image from "next/image";

import { useTypingContext } from "@/context/ctx";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const API_BASE_URL = "https://fortunebot-6dmf.onrender.com/fortune-bot/skynet";

export default function SkynetInterface() {
  interface Message {
    id: number;
    content: string;
    timestamp: string | Date;
    type: "Human" | "Skynet_Agi";
  }

  const { setIsTyping } = useTypingContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const rotateX = useTransform(cursorY, [0, 300], [5, -5]);
  const rotateY = useTransform(cursorX, [0, 300], [-5, 5]);
  const controls = useAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      setIsTyping(true);
      try {
        const response = await axios.get(API_BASE_URL);
        const initialMessage: Message = {
          id: 1,
          content: response.data.reply,
          timestamp: new Date(),
          type: "Skynet_Agi",
        };
        setMessages([initialMessage]);
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
      setIsTyping(false);
    };

    fetchInitialMessages();
  }, []);

  useGSAP(() => {
    // Robotic text animation for the title
    gsap.to(titleRef.current, {
      duration: 2,
      text: "SKYNET_AGI",
      ease: "steps(10)",
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
    });

    // Scroll animation setup
    if (messagesContainerRef.current) {
      ScrollTrigger.create({
        trigger: messagesContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      });
    }

    // Add a new animation for the input field
    gsap.from(inputRef.current, {
      width: 0,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: inputRef.current,
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Trigger handleMouseEnter when the component mounts
    if (titleRef.current) {
      handleMouseEnter({
        target: titleRef.current,
      } as unknown as React.MouseEvent<HTMLHeadingElement>);
    }
  }, []);

  const handleInputFocus = () => {
    gsap.to(inputRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleInputBlur = () => {
    gsap.to(inputRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        content: inputMessage,
        timestamp: new Date(),
        type: "Human",
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputMessage("");

      try {
        const response = await axios.post(API_BASE_URL, {
          prompt: inputMessage,
        });
        const aiResponse: Message = {
          id: messages.length + Date.now(),
          content: response.data.reply,
          timestamp: new Date(),
          type: "Skynet_Agi",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);

        // Scroll to the latest message
        if (messagesContainerRef.current) {
          gsap.to(messagesContainerRef.current, {
            duration: 0.5,
            scrollTop: messagesContainerRef.current.scrollHeight,
            ease: "power2.out",
          });
        }
        setIsTyping(false);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }
  };

  return (
    <motion.div
      className=" h-full  text-white relative overflow-hidden"
      style={{ perspective: 2000 }}
      animate={controls}
      onHoverStart={() =>
        controls.start({
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          transformStyle: "preserve-3d",
          transition: { duration: 0.5, ease: "easeInOut" },
        })
      }
      onHoverEnd={() => controls.start({ backgroundColor: "rgba(0, 0, 0, 0)" })}
    >
      <motion.div
        className="relative z-10 min-h-screen flex flex-col p-8"
        style={{ rotateX, rotateY }}
      >
        <h1
          ref={titleRef}
          data-value="SKYNET_AGI"
          onMouseEnter={handleMouseEnter}
          className="lg:text-[50px] text-[33.05px] relative z-50  font-mono font-extrabold text-center mb-8 tracking-widest"
        >
          SKYNET_AGI
        </h1>

        <audio id="backgroundAudio" src="/sound.mp3" hidden></audio>

        {/* Enhanced animated elements */}
        <motion.div
          className="absolute left-[10%] top-[20%] text-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          △
        </motion.div>
        <motion.div
          className="absolute top-[40%] right-[10%] text-2xl"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          △
        </motion.div>

        {/* Pulsating shapes */}
        <motion.div
          className="absolute bottom-[30%] left-[20%] text-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="35"
            viewBox="0 0 34 35"
            fill="none"
          >
            <g filter="url(#filter0_f_29_126)">
              <path
                d="M9.52878 6.83076L26.7593 19.9403L6.79086 28.3076L9.52878 6.83076Z"
                fill="#D9D9D9"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_29_126"
                x="0.0908327"
                y="0.130811"
                width="33.3684"
                height="34.8768"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="3.35"
                  result="effect1_foregroundBlur_29_126"
                />
              </filter>
            </defs>
          </svg>
        </motion.div>
        <motion.div
          className="absolute top-[30%] right-[20%] text-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="35"
            viewBox="0 0 34 35"
            fill="none"
          >
            <g filter="url(#filter0_f_29_126)">
              <path
                d="M9.52878 6.83076L26.7593 19.9403L6.79086 28.3076L9.52878 6.83076Z"
                fill="#D9D9D9"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_29_126"
                x="0.0908327"
                y="0.130811"
                width="33.3684"
                height="34.8768"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="3.35"
                  result="effect1_foregroundBlur_29_126"
                />
              </filter>
            </defs>
          </svg>
        </motion.div>

        {/* Side stripes with enhanced staggered animation */}
        <motion.div className="fixed left-0 top-0 h-[82%] w-8 items-center lg:flex lg:px-10 hidden flex-col justify-end mb-10">
          <motion.div
            className="-rotate-90 font-bold text-3xl ml-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {"\\\\\\\\\\\\\\\\\\".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        <motion.div className="fixed -right-5 lg:right-0 top-0 h-[82%] w-8 items-center flex lg:px-10  flex-col justify-end mb-10">
          <motion.div
            className="-rotate-90 font-bold text-3xl ml-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {"\\\\\\\\\\\\\\\\\\".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Central skull with hover effect */}

        {/* Messages and input area with enhanced animations */}
        <div className="absolute mb-20 lg:mb-0 right-3 bottom-3 selector max-w-lg lg:px-10 px-4 ">
          <div
            ref={messagesContainerRef}
            className="max-w-xl mx-auto w-full space-y-4 mb-8 h-[200px] overflow-y-auto selector"
          >
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="flex-1 rounded p-4 bg-white/5"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400 capitalize">
                      {message.type}
                    </span>
                    <span className="lg:text-xs text-[8px] text-gray-500">
                      {formatDistanceToNow(message.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="w-full flex">
            <div className="relative  w-full flex-1 ">
              <Input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="What do you have to say?"
                className="w-full sm:min-w-[420px] min-w-[calc(100vw-42px)]  relative bg-white/5 border-white h-[50px] rounded-md text-white placeholder:text-white transition-all duration-300 ease-in-out hover:bg-white/10"
              />
              <motion.button
                type="submit"
                className="absolute right-5 top-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                >
                  <g clipPath="url(#clip0_29_114)">
                    <path
                      d="M0.42749 0.773438L17.8897 9.50456L0.42749 18.2357V0.773438ZM0.42749 7.75833V11.2508L9.15861 9.50456L0.42749 7.75833Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_29_114">
                      <rect
                        width="17.4622"
                        height="17.4622"
                        fill="white"
                        transform="translate(0.42749 0.773438)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </motion.button>
            </div>
          </form>
        </div>

        {/* AI indicator with enhanced staggered animation */}
      </motion.div>

      {/* Add a new pulsating background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
