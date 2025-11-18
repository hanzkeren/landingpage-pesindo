import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import MscCarousel from "./hero-carousel";

export function Hero(props: {
  capsuleText: string;
  capsuleLink: string;
  title: string;
  subtitle: string;
  credits?: React.ReactNode;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}) {
  return (
    <section className="space-y-6 pt-24 pb-16 md:pt-24 md:pb-20 lg:pt-18 lg:pb-24">
      <MscCarousel />
    </section>
  );
}
