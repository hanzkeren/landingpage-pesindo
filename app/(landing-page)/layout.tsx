import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";
import { Inter, Anton } from "next/font/google";

const fontInter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans", // Tetapkan Inter sebagai font utama
});

const fontAnton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton", // Tetapkan Anton sebagai font untuk judul
})

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Features", href: "/#features" },
          { title: "Pricing", href: "/#pricing" },
          { title: "Github", href: "https://github.com/stack-auth/stack-template", external: true },
        ]}
      />
      <main className="flex-1">{props.children}</main>
      <Footer
        builtBy="Stack Auth"
        builtByLink="https://stack-auth.com/"
        githubLink="https://github.com/stack-auth/stack-template"
        twitterLink="https://twitter.com/stack_auth"
        linkedinLink="linkedin.com/company/stack-auth"
      />
    </div>
  );
}
