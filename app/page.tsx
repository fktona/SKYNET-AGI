"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { handleMouseEnter } from "@/animations/animation";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

import { useTypingContext } from "@/context/ctx";
import { u } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const API_BASE_URL = "https://fortunebot-6dmf.onrender.com/fortune-bot/skynet";

export default function SkynetInterface() {
  interface Message {
    id: number;
    content: string;
    timestamp: string | Date;
    type: "Human" | "Skynet_Agi";
  }

  const { setIsTyping, setIsSpeaking, isSoundAllowed, setIsSoundAllowed } =
    useTypingContext();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const caRef = useRef<HTMLHeadingElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const speakRobotically = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.5;
    utterance.rate = 0.8;
    utterance.volume = 0.9;

    const voices = synth.getVoices();
    const robotVoice =
      voices.find((voice) => /robot|electronic/i.test(voice.name)) || voices[0];
    if (robotVoice) utterance.voice = robotVoice;

    synth.speak(utterance);
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };
  };

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

        // isSoundAllowed && speakRobotically(initialMessage.content);
        setMessages([initialMessage]);
        (document.getElementById("sendsound") as HTMLAudioElement)?.play();
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
      setIsTyping(false);
    };

    fetchInitialMessages();
  }, []);

  useGSAP(() => {
    // Robotic text animation for the title
    gsap.to(caRef.current, {
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
    // Trigger handleMouseEnter when the component mounts
    if (caRef.current) {
      handleMouseEnter({
        target: caRef.current,
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
        isSoundAllowed && speakRobotically(aiResponse.content);

        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        isSoundAllowed &&
          (document.getElementById("sendsound") as HTMLAudioElement)?.play();

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
    <motion.div className=" h-full  text-white relative overflow-hidden">
      <motion.div className="relative z-10 min-h-screen flex flex-col p-8">
        <audio id="sendsound" src="/send.mp3" hidden></audio>
        <div className="flex lg:hidden fixed left-0 w-full top-9 justify-between text-[13px] px-6 text-base">
          <div className="flex flex-col w-fit lg:hidden ">
            Welcome, Human
            <br />
            <p className="flex gap-1">
              <span className=" text-red-300">CA: </span>
              <span
                onMouseEnter={handleMouseEnter}
                ref={caRef}
                data-value="DNKDDW808DSPUMP"
                className=" text-red-300"
              >
                DNKDDW808DSPUMP
              </span>
            </p>
          </div>
          <div className="text-center">
            Sound <button className="text-red-600">ON</button>
          </div>
        </div>

        {/* <h1
          ref={caRef}
          data-value="SKYNET_AGI"
          onMouseEnter={handleMouseEnter}
          className="lg:text-[50px] text-[33.05px] relative z-50  font-mono font-extrabold text-center mb-8 tracking-widest"
        >
          SKYNET_AGI
        </h1> */}

        <audio id="backgroundAudio" src="/sound.mp3" hidden></audio>
      </motion.div>

      <div
        style={{
          perspective: 2000,
        }}
        className="fixed mb-20 z-50 lg:mb-0 right-3 bottom-3 selector w-full  lg:px-10 px-4 "
      >
        <div
          ref={messagesContainerRef}
          className="mx-auto  relative w-full flex items-end flex-col space-y-2 mb-8 h-[350px] overflow-y-auto selector"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className="flex items-start gap-2  lg:max-w-[30%] relative w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div className="flex-1 rounded p-4">
                <div className="flex items-center gap-2 mb-2  mix-blend-difference  text-red-600">
                  <span className="text-sm  uppercase">{message.type}</span>
                  <span className="lg:text-xs text-[8px] ">
                    {formatDistanceToNow(message.timestamp, {
                      addSuffix: false,
                    }) == "less than a minute"
                      ? "just now"
                      : formatDistanceToNow(message.timestamp, {
                          addSuffix: false,
                        })}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between relative lg:text-[21px]">
          <div className="lg:flex flex-col gap-3 z-20 relative hidden ">
            Welcome, Human
            <p className="flex gap-1">
              <span className=" text-red-300">CA: </span>
              <span
                onMouseEnter={handleMouseEnter}
                ref={caRef}
                data-value="DNKDDW808DSPUMP"
                className=" text-red-300"
              >
                DNKDDW808DSPUMP
              </span>
            </p>
          </div>
          <div className="text-center w-full absolute h-full hidden lg:block">
            Sound{" "}
            <button
              onClick={() => setIsSoundAllowed(!isSoundAllowed)}
              className="text-red-900"
            >
              {isSoundAllowed ? "ON" : "OFF"}
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className=" lg:min-w-[30%] min-w-full relative justify-center flex"
          >
            <div className="relative w-full flex-1     ">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="What do you have to say?"
                className="w-full  relative min-w-full bg-transparent outline-none border-2 px-2 text-sm  border-red-600 h-[50px] rounded-md text-white placeholder:text-white transition-all duration-300 ease-in-out hover:bg-white/10"
              />
              <motion.button
                type="submit"
                className="absolute right-5 top-[20%]  "
                // whileHover={{ scale: 1.1, rotate: 360 }}
                // whileTap={{ scale: 0.9 }}
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
      </div>
    </motion.div>
  );
}
