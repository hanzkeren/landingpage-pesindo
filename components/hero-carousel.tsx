"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function MscCarousel() {
  const slides = [
    "/banner1.jpeg",
    "/banner2.jpeg",
    "/banner3.jpeg",
  ];

  return (
    <div className="w-full px-4 md:px-8">
      {/* Lebar mengikuti navbar: full-width + padding yang sama */}
      <div className="mx-auto w-full max-w-7xl">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((src, i) => (
              <CarouselItem key={i} className="basis-full">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Gunakan aspect box + fill agar responsif & penuh lebar */}
                    <div className="relative w-full aspect-[3/2]">
                      <Image
                        src={src}
                        alt={`banner-${i + 1}`}
                        fill
                        sizes="100vw"
                        quality={90}
                        className="object-cover"
                        priority={i === 0}
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>


        </Carousel>
      </div>
    </div>
  );
}
