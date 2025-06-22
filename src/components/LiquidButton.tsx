"use client";

import React, { useEffect, useRef } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import gsap from "gsap";

interface ButtonProps {
  label?: string;
  href?: string;
}

const LiquidButtonInner: React.FC<ButtonProps> = ({
  label = "Default Text",
  href = "#",
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !flairRef.current) return;

    const button = buttonRef.current;
    const flair = flairRef.current;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    const getXY = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100)
      );
      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100)
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    };

    const onMouseEnter = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      xSet(x);
      ySet(y);

      gsap.to(flair, {
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      });
    };

    const onMouseLeave = (e: MouseEvent) => {
      const { x, y } = getXY(e);

      gsap.killTweensOf(flair);

      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.3,
        ease: "power2",
      });
    };

    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);
    button.addEventListener("mousemove", onMouseMove);

    return () => {
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
      button.removeEventListener("mousemove", onMouseMove);
      gsap.killTweensOf(flair);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.363636em;
          padding: 0.9375rem 1.5rem;
          border-radius: 6.25rem;
          font-weight: 600;
          font-size: 1.3rem;
          color: var(--foreground);
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          letter-spacing: -0.01em;
          line-height: 1.04545;
          user-select: none;
          border: 2px solid var(--foreground);
          transition: color 0.3s ease; /* Sólo cambia texto, no borde */
          text-decoration: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .button:hover {
          color: var(--background);
          /* border-color removed to keep border color always */
        }
        .button__flair {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          transform-origin: 0 0;
          will-change: transform;
          transform: scale(0);
          z-index: 0;
        }
        .button__flair > span {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 170%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background-color: var(--foreground);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .button__label {
          position: relative;
          z-index: 1;
          text-align: center;
          user-select: none;
          transition: color 0.3s cubic-bezier(0.77, 0, 0.175, 1);
        }
      `}</style>

      <a ref={buttonRef} className="button" href={href} data-block="button">
        <span ref={flairRef} className="button__flair">
          <span />
        </span>
        <span className="button__label">{label}</span>
      </a>
    </>
  );
};

const LiquidButton: React.FC<ButtonProps> = (props) => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <LiquidButtonInner {...props} />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <LiquidButtonInner {...props} />
      </SignedIn>
    </>
  );
};

export default LiquidButton;
