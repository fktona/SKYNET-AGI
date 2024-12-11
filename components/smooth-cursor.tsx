"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const RoboticCursor = () => {
  const pointRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const [showPointer, setShowPointer] = useState(true);

  const lerp = (start: number, end: number, amount: number) => {
    return (1 - amount) * start + amount * end;
  };

  useEffect(() => {
    document.addEventListener("mouseleave", () => {
      setShowPointer(false);
    });
    document.addEventListener("mouseenter", () => {
      setShowPointer(true);
    });
  }, []);

  useGSAP(() => {
    if (!pointRef.current || !circleRef.current) return;
    if ("ontouchstart" in window) return;
    document.body.style.cursor = "none";
    const cursorInner = pointRef.current;
    const cursorOuter = circleRef.current;
    let cursorX = 0;
    let cursorY = 0;
    let pageX = 0;
    let pageY = 0;
    let size = 12;
    let size2 = 50;
    let trailSpeed = 0.2;

    cursorInner.style.setProperty("--size", size + "px");
    cursorOuter.style.setProperty("--size", size2 + "px");

    const getMousePos = (e: MouseEvent) => {
      pageX = e.clientX;
      pageY = e.clientY;
      cursorInner.style.left = pageX - size / 2 + "px";
      cursorInner.style.top = pageY - size / 2 + "px";
    };

    const mousedown = () => {
      gsap.to(cursorInner, {
        scale: 1.5,
        duration: 0.1,
        ease: "power3.out",
        backgroundColor: "#00ffff",
        boxShadow: "0 0 15px #00ffff",
      });
      gsap.to(cursorOuter, {
        scale: 0.5,
        duration: 0.2,
        ease: "power3.out",
        borderColor: "#00ffff",
      });
    };

    const mouseup = () => {
      gsap.to(cursorInner, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px #00ffff",
      });
      gsap.to(cursorOuter, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
        borderColor: "rgba(255, 255, 255, 0.2)",
      });
    };

    const loop = () => {
      cursorX = lerp(cursorX, pageX, trailSpeed);
      cursorY = lerp(cursorY, pageY, trailSpeed);
      cursorOuter.style.top = cursorY - size2 / 2 + "px";
      cursorOuter.style.left = cursorX - size2 / 2 + "px";
      requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousedown", mousedown);
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", getMousePos);

    return () => {
      window.removeEventListener("mousemove", getMousePos);
      window.removeEventListener("mousedown", mousedown);
      window.removeEventListener("mouseup", mouseup);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div
        ref={pointRef}
        style={{
          width: "var(--size)",
          height: "var(--size)",
          opacity: showPointer ? 1 : 0,
          boxShadow: "0 0 10px #00ffff",
          backgroundColor: "#ffffff",
        }}
        className="pointer-events-none fixed z-[999999] rounded-full transition-opacity duration-500 [mix-blend-mode:difference]"
      />
      <div
        ref={circleRef}
        style={{
          opacity: showPointer ? 1 : 0,
          width: "var(--size)",
          height: "var(--size)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10 50L90 50M50 10L50 90' stroke='%23ffffff' strokeWidth='5'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          mixBlendMode: "difference",
        }}
        className="pointer-events-none fixed left-0 top-0 z-[999999] transition-opacity duration-500"
      />
    </>
  );
};

export default RoboticCursor;
