"use client";

import React, { useRef, useEffect, useState } from "react";

const EnhancedDiamondStoneGlitchBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    let animationFrameId: number;

    const drawDiamond = (x: number, y: number, size: number) => {
      context.beginPath();
      context.moveTo(x, y - size / 2);
      context.lineTo(x + size / 4, y);
      context.lineTo(x, y + size / 2);
      context.lineTo(x - size / 6, y);
      context.closePath();
      context.fill();
    };

    const generateDiamondStones = () => {
      const numStones = Math.floor((canvas.width * canvas.height) / 2000);

      for (let i = 0; i < numStones; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 2;
        const size = Math.random() * 4 + 5;
        const brightness = Math.random() * 40 + 60;

        context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        drawDiamond(x, y, size);
      }
    };

    const generateGlitchNoise = (time: number) => {
      if (canvas.width === 0 || canvas.height === 0) {
        console.warn(
          "Canvas has zero width or height. Skipping glitch effect."
        );
        return;
      }

      try {
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 20 - 10;
          data[i] = Math.max(0, Math.min(255, data[i] + noise));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }

        context.putImageData(imageData, 0, 0);

        for (let i = 0; i < 20; i++) {
          const barHeight = Math.random() * 10 + 5;
          const y = Math.random() * canvas.height;
          const glitchWidth = Math.random() * canvas.width;

          context.fillStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.1)`;
          context.fillRect(
            Math.sin(time * 0.31) * canvas.width,
            y,
            glitchWidth,
            barHeight
          );
        }
      } catch (error) {
        console.error("Error generating glitch noise:", error);
      }
    };

    const generateFlickerEffect = (time: number) => {
      const flickerIntensity = Math.sin(time * 0.1) * 0.5 + 0.5;
      context.fillStyle = `rgba(255, 255, 255, ${flickerIntensity * 0.1})`;
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) {
        context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const animate = (time: number) => {
      if (canvas.width > 0 && canvas.height > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        generateDiamondStones();
        generateGlitchNoise(time);
        generateFlickerEffect(time);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    if (dimensions.width > 0 && dimensions.height > 0) {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      animate(0);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 20,
        pointerEvents: "none",
        opacity: 0.35,
      }}
    />
  );
};

export default EnhancedDiamondStoneGlitchBackground;
