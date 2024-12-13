import { gsap } from "gsap";
const letters = "!ABCDEFGHIJKLMNOPQRSTUVWXYZ#";

export const handleMouseEnter = (el: any) => {
  const audio = document.getElementById("backgroundAudio") as HTMLAudioElement;
  // audio.play();
  if (!el) return;
  el = el.target;
  let iteration: number = 0;
  const speed: number = el.dataset.value!.length > 7 ? 30 : 60;

  let lastTimestamp: number;
  let animationFrameId: number | null = null;

  const animate = (timestamp: number) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    // deltaTime is the time elapsed since the last animation frame
    // I use am to reduce or increase speed
    const deltaTime = timestamp - lastTimestamp;

    if (deltaTime >= speed) {
      el.innerText = el.innerText
        .split("")
        .map((_: string, index: number) => {
          if (index < iteration) {
            return el.dataset.value![index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= el.dataset.value!.length) {
        // Stop the animation if completed
        return;
      }

      iteration += 1 / 3;
      lastTimestamp = timestamp;
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  cancelAnimationFrame(animationFrameId!);
  animationFrameId = requestAnimationFrame(animate);
};

export const animateCircuitLines = (selector: string) => {
  gsap.to(selector, {
    strokeDashoffset: 0,
    duration: 2,
    ease: "power2.inOut",
    stagger: 0.1,
  });
};

export const pulseElement = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.1,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut",
  });
};

export const glitchText = (element: HTMLElement) => {
  const originalText = element.textContent;
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";

  gsap.to(element, {
    duration: 0.1,
    repeat: 5,
    onRepeat: () => {
      element.textContent = element
        .textContent!.split("")
        .map((char) =>
          Math.random() > 0.8
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : char
        )
        .join("");
    },
    onComplete: () => {
      element.textContent = originalText;
    },
  });
};
