"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SkynetInterface() {
  const [messages] = useState([
    {
      id: 1,
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes",
      timestamp: "2m",
    },
    {
      id: 2,
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes",
      timestamp: "2m",
    },
  ]);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Starry background */}
      {/* <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      /> */}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col p-8">
        {/* Header */}
        <h1 className="lg:text-[50px] text-[33.05px]  font-mono font-extrabold text-center mb-8 tracking-widest">
          SKYNET_AGI
        </h1>

        {/* Triangular markers */}
        <div className="absolute  left-20 top-16 text-2xl rotate-45">△</div>
        <div className="absolute top-[30%] right-[20%] text-2xl -rotate-45">
          △
        </div>
        <div className="absolute top-[30%] right-[30%] text-2xl -rotate-45">
          △
        </div>
        <div className="absolute top-[40%]  right-[20%] text-2xl -rotate-45">
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
        </div>
        <div className="absolute top-[50%]  left-[30%] text-2xl -rotate-45">
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
        </div>

        {/* Side stripes */}
        <div className="fixed left-0 top-0 h-[82%] w-8 items-center  flex flex-col justify-end mb-10">
          <div className=" -rotate-90 font-bold text-3xl ml-6 hidden lg:block">
            \\\\\\\
          </div>
        </div>
        <div className="fixed right-0 top-0 h-[82%] w-8 items-center px-4 flex flex-col justify-end bottom-10">
          <div className=" -rotate-90 font-bold text-3xl mr-6">\\\\\\\</div>
        </div>
        {/* Central skull with aura */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Aura effect */}
            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-75 blur-xl animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-teal-500/30 backdrop-blur-sm" /> */}
            {/* Skull image */}
            <div className="relative w-full h-full">
              <img
                src="/sku.svg"
                alt="Skull"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="absolute mb-20 lg:mb-0 right-3 bottom-3 max-w-lg lg:px-10 px-4">
          {/* Messages feed */}
          <div className="max-w-xl mx-auto w-full space-y-4 mb-8  ">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-2">
                <div className="flex-1  rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">SKYNET_AGI</span>
                    <span className="lg:text-xs text-[8px] text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Input area */}
          <div className="w-full ">
            <div className="relative">
              <Input
                type="text"
                placeholder="What do you have to say?"
                className="w-full bg-white/5 border-white h-[50px] rounded-md text-white placeholder:text-white"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
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
              </button>
            </div>
          </div>
        </div>

        {/* AI indicator */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-white">
          <div className="tracking-[0.1em] font-bold text-lg">
            \\\\\\\ AI ///////
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-skull {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
      `}</style>
    </div>
  );
}
