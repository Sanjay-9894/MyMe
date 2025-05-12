"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const textRef = useRef<HTMLSpanElement>(null);
  const roles = ["Frontend Developer", "Backend Developer", "Full-Stack Developer"];
  
  useEffect(() => {
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseEnd = 2000;
    
    const type = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        if (textRef.current) {
          textRef.current.textContent = currentRole.substring(0, currentCharIndex - 1);
        }
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        if (textRef.current) {
          textRef.current.textContent = currentRole.substring(0, currentCharIndex + 1);
        }
        currentCharIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && currentCharIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = pauseEnd;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      }
      
      setTimeout(type, typingSpeed);
    };
    
    const typingAnimation = setTimeout(type, 1000);
    
    return () => clearTimeout(typingAnimation);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating"></div>
        <div
          className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl floating"
          style={{ animationDelay: "-3s" }}
        ></div>
      </div>
  
      {/* Content */}
      <div className="z-10 max-w-8xl w-[100%] px-4 md:px-8 text-center">
        {/* <br></br>
        <br></br> */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* <p className="text-xl font-semibold mb-4 hero-text">Hi, I'm Sanjay Raj.M</p> */}
        <h1 className="text-8xl md:text-6xl font-bold tracking-tight mb-6 hero-text">
          <span className=" text-6xl block mb-6"><span className="text-8xl">Building <span className="text-primary text-8xl">Digital</span> Products,</span></span>
          <span className="text-6xl block"><span className="text-7xl">Brands & Experience as a </span></span>
          <br></br>
          <span ref={textRef} className="text-primary text-7xl inline-block min-h-[1.5em] rotate-3d">
            Full-Stack Developer
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto hero-text">
          I help companies and organizations build modern, responsive, and user-friendly
          web applications using cutting-edge technologies.
        </p>
  
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="px-8 card-3d">
            <Link href="#projects">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="card-3d">
          <Link href="#contact">
              Contact Me
            </Link>
          </Button>
        </div>
  
        <div className="mt-16 sm:mt-24 flex justify-center">
          <Link
            href="#about"
            className="animate-bounce flex items-center justify-center w-20 h-15 rounded-full border border-border hover:border-primary transition-colors card-3d"
          >
            <ArrowDown className="h-10 w-10" />
          </Link>
        </div>
      </div>
    </section>
  );
}