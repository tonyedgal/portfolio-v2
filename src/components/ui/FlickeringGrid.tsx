"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type FlickeringGridProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "color"
> & {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  paused?: boolean;
};

const frameInterval = 1000 / 12;

export function FlickeringGrid({
  squareSize = 3,
  gridGap = 7,
  flickerChance = 0.2,
  color = "var(--primary)",
  maxOpacity = 0.24,
  paused = false,
  className,
  ...props
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resolveColor = useCallback(() => {
    const container = containerRef.current;

    if (!container) return "rgb(0, 0, 0)";

    const sample = document.createElement("span");
    sample.style.color = color;
    container.appendChild(sample);
    const resolvedColor = getComputedStyle(sample).color;
    sample.remove();

    const colorCanvas = document.createElement("canvas");
    colorCanvas.width = 1;
    colorCanvas.height = 1;
    const colorContext = colorCanvas.getContext("2d");

    if (!colorContext) return "rgb(0, 0, 0)";

    colorContext.fillStyle = resolvedColor;
    colorContext.fillRect(0, 0, 1, 1);
    const [red, green, blue] = colorContext.getImageData(0, 0, 1, 1).data;

    return `rgb(${red}, ${green}, ${blue})`;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !container || !context) return;

    const reducedMotion =
      paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    let cancelStart = () => {};
    let isVisible = true;
    let lastTime = 0;
    let columns = 0;
    let rows = 0;
    let opacities = new Float32Array();
    let rgb = "";

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = rgb;

      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          context.globalAlpha = opacities[column * rows + row];
          context.fillRect(
            column * (squareSize + gridGap) * dpr,
            row * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      columns = Math.ceil(width / (squareSize + gridGap));
      rows = Math.ceil(height / (squareSize + gridGap));
      opacities = Float32Array.from(
        { length: columns * rows },
        () => Math.random() * maxOpacity,
      );
      rgb = resolveColor();
      draw();
    };

    const animate = (time: number) => {
      if (!isVisible) return;

      // the flicker is random and slow, so a low frame rate looks the same
      if (time - lastTime < frameInterval) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      for (let index = 0; index < opacities.length; index += 1) {
        if (Math.random() < flickerChance * deltaTime) {
          opacities[index] = Math.random() * maxOpacity;
        }
      }

      draw();
      frameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      cancelAnimationFrame(frameId);

      if (isVisible && !reducedMotion) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(animate);
      }
    });

    const start = () => {
      resize();
      resizeObserver.observe(container);
      intersectionObserver.observe(canvas);
    };

    // keep canvas setup off the critical path during hydration
    if (typeof requestIdleCallback === "function") {
      const idleId = requestIdleCallback(start, { timeout: 2000 });
      cancelStart = () => cancelIdleCallback(idleId);
    } else {
      const timeoutId = setTimeout(start, 200);
      cancelStart = () => clearTimeout(timeoutId);
    }

    return () => {
      cancelStart();
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [flickerChance, gridGap, maxOpacity, paused, resolveColor, squareSize]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none block" />
    </div>
  );
}
