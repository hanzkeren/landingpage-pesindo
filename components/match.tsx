"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Match, MatchStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data
const matches: Match[] = [
  {
    id: 1,
    date: "24 Aug",
    time: "18.15 WIB",
    team1: { name: "Chelsea", logoUrl: "/chelsea.png" },
    team2: { name: "Real Madrid", logoUrl: "/realmadrid.png" },
    status: MatchStatus.Available,
  },
  {
    id: 2,
    date: "24 Aug",
    time: "14.15 WIB",
    team1: { name: "Real Madrid", logoUrl: "/realmadrid.png" },
    team2: { name: "Chelsea", logoUrl: "/chelsea.png" },
    status: MatchStatus.Available,
  },
  {
    id: 3,
    date: "23 Aug",
    time: "20.15 WIB",
    team1: { name: "Chelsea", logoUrl: "/chelsea.png" },
    team2: { name: "Real Madrid", logoUrl: "/realmadrid.png" },
    status: MatchStatus.Available,
  },
  {
    id: 4,
    date: "23 Aug",
    time: "17.15 WIB",
    team1: { name: "Real Madrid", logoUrl: "/realmadrid.png" },
    team2: { name: "Chelsea", logoUrl: "/chelsea.png" },
    status: MatchStatus.Available,
  },
  {
    id: 5,
    date: "23 Aug",
    time: "14.15 WIB",
    team1: { name: "Chelsea", logoUrl: "/chelsea.png" },
    team2: { name: "Real Madrid", logoUrl: "/realmadrid.png" },
    status: MatchStatus.Available,
  },
  {
    id: 6,
    date: "22 Aug",
    time: "18.15 WIB",
    team1: { name: "Real Madrid", logoUrl: "/realmadrid.png" },
    team2: { name: "Chelsea", logoUrl: "/chelsea.png" },
    status: MatchStatus.Available,
  },
  {
    id: 7,
    date: "22 Aug",
    time: "15.15 WIB",
    team1: { name: "Chelsea", logoUrl: "/chelsea.png" },
    team2: { name: "Real Madrid", logoUrl: "/realmadrid.png" },
    status: MatchStatus.Available,
  },
];

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className={`flex-shrink-0 w-60 md:w-64 transition-all duration-500 ease-out select-none
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      hover:scale-105 hover:shadow-xl bg-white`}
      style={{
        border: "1px solid rgba(254, 202, 202, 0.5)",
      }}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4 font-medium">
          <span>{match.date}</span>
          <span>{match.time}</span>
        </div>
        <div className="flex-grow flex justify-around items-center mb-4">
          <Image src={match.team1.logoUrl} alt={match.team1.name} width={48} height={48} className="h-12 w-auto object-contain pointer-events-none" />
          <span className="text-xl font-bold text-gray-700 mx-2">VS</span>
          <Image src={match.team2.logoUrl} alt={match.team2.name} width={48} height={48} className="h-12 w-auto object-contain pointer-events-none" />
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button className="w-full bg-[#8B0000] hover:bg-red-900 text-white transition-all duration-200 transform hover:-translate-y-0.5">Buy Ticket</Button>
      </CardFooter>
    </Card>
  );
};

const ScheduleMatch: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScrollButtons, { passive: true });
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      container?.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [checkScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector(":scope > div") as HTMLElement;
      if (!card) return;

      const gap = 16; // from space-x-4 which is 1rem
      const scrollAmount = card.offsetWidth + gap;

      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = scrollContainerRef.current;
    if (!slider) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return; // Don't drag when clicking buttons

    isDragging.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeftStart.current = slider.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const slider = scrollContainerRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 2; // multiplier for faster scroll
    slider.scrollLeft = scrollLeftStart.current - walk;
    checkScrollButtons();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const slider = scrollContainerRef.current;
    if (!slider) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    isDragging.current = true;
    startX.current = e.touches[0].pageX - slider.offsetLeft;
    scrollLeftStart.current = slider.scrollLeft;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const slider = scrollContainerRef.current;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 2;
    slider.scrollLeft = scrollLeftStart.current - walk;
    checkScrollButtons();
  };

  return (
    <div className="w-full font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center mb-6">
        <div className="relative mb-4 w-fit">
            <h1 className="font-anton text-4xl md:text-5xl lg:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-white text-neutral-800 dark:text-neutral-200">
              SCHEDULE MATCH
            </h1>
            <div className="absolute left-[160px] top-[8px] h-3 w-10 bg-red-600 z-[-1]"></div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            variant="outline"
            size="icon"
            className={`w-9 h-9 rounded-full transition-all duration-200 ${canScrollLeft ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            variant="outline"
            size="icon"
            className={`w-9 h-9 rounded-full transition-all duration-200 ${canScrollRight ? "bg-[#980909] text-white hover:bg-red-900" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="mx-auto w-full max-w-7xl flex space-x-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none px-4 md:px-8"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
      `}</style>
    </div>
  );
};

export default ScheduleMatch;
