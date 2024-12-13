"use client";

import React, { useRef, useEffect } from "react";

const GlitchNoiseBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    const generateGlitchNoise = () => {
      const imageData = context.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;

          // Static noise with reduced opacity
          const value = Math.random() * 255;
          data[index] = value; // Red
          data[index + 1] = value; // Green
          data[index + 2] = value; // Blue
          data[index + 3] = Math.random() * 50 + 50; // Very low alpha (50-100)
        }
      }

      context.putImageData(imageData, 0, 0);

      // Add horizontal glitch bars
      for (let i = 0; i < 10; i++) {
        // Frequency of glitch bars
        const barHeight = Math.random() * 5 + 3; // Bar height between 3-8px
        const y = Math.random() * canvas.height;
        const glitchWidth = Math.random() * canvas.width * 0.8; // Wider bars

        context.fillStyle = `rgba(${Math.random() * 255}, ${
          Math.random() * 255
        }, ${Math.random() * 255}, 0.9)`; // Prominent glitch bars
        context.fillRect(
          Math.random() * canvas.width - glitchWidth / 2,
          y,
          glitchWidth,
          barHeight
        );
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animateNoise = () => {
      generateGlitchNoise();
      requestAnimationFrame(animateNoise);
    };

    resizeCanvas();
    animateNoise();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

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
        opacity: 0.095, // Slightly visible background overall
      }}
    />
  );
};

export default GlitchNoiseBackground;
