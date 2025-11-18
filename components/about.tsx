import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang MPL Indonesia",
  description: "Pelajari lebih lanjut tentang Mobile Legends: Bang Bang Professional League (MPL) Indonesia, kompetisi MLBB tingkat tertinggi di Indonesia.",
  openGraph: {
    title: "Tentang MPL Indonesia",
    description: "Kompetisi esports MLBB terbesar di Indonesia dengan hadiah total miliaran rupiah.",
  },
};

const AboutPage = () => {
  return (
    <div className="container py-8 md:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-shrink-0 w-full md:w-1/3 lg:w-2/5 flex justify-center">
          <div className="relative w-[600px] h-[600px] md:w-full md:max-w-md">
            <Image src="./logo.png" alt="MPL Indonesia Logo" fill className="object-contain" unoptimized priority />
            <div className="absolute inset-0 bg-gradient-to-t from-white/100 to-transparent pointer-events-none"></div>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="relative mb-4 w-fit">
            <h1 className="font-anton text-5xl md:text-6xl lg:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-white text-neutral-800 dark:text-neutral-200">TENTANG PESINDO</h1>
            <div className="absolute right-[200px] top-[10px] h-3 w-10 bg-red-600 z-[-1]"></div>
          </div>

          <div className="space-y-5 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
              Mobile Legends: Bang Bang Professional League (MPL) Indonesia is the highest-level Mobile Legends: Bang Bang competition in Indonesia, with a total prize pool of Rp 5 billion per season. In Season 15, MPL Indonesia broke a
              record with 4.1 million viewers watching live simultaneously.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
