"use client";

import { cn } from "@/lib/utils";
import { useStackApp, useUser } from "@stackframe/stack";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";
import { ColorModeSwitcher } from "./color-mode-switcher";
import { Logo } from "./logo";
import { Button, buttonVariants } from "./ui/button";

interface NavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

function SignInSignUpButtons() {
  const app = useStackApp();
  return (
    <>
      <Link
        href={app.urls.signIn}
        className={buttonVariants({ variant: "secondary" })}
      >
        Sign In
      </Link>

      <Link
        href={app.urls.signUp}
        className={buttonVariants({ variant: "default" })}
      >
        Sign Up
      </Link>
    </>
  );
}

function AuthButtonsInner() {
  const user = useUser();

  if (user) {
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({ variant: "default" })}
      >
        Dashboard
      </Link>
    );
  } else {
    return <SignInSignUpButtons />;
  }
}

function AuthButtons() {
  return (
    <React.Suspense fallback={<SignInSignUpButtons />}>
      <AuthButtonsInner />
    </React.Suspense>
  );
}

function MobileItems(props: NavProps) {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md max-w-sm mx-auto w-full">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {props.items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center justify-center text-center rounded-md p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.title}
            </Link>
          ))}

          <div className="flex flex-col gap-2 mt-6">
            <AuthButtons />
          </div>
        </nav>
      </div>
    </div>
  );
}

function DesktopItems(props: NavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="hidden md:flex gap-6 justify-center items-center">
      {props.items?.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-foreground/80 whitespace-nowrap",
            item.href.startsWith(`/${segment}`)
              ? "text-foreground"
              : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LandingPageHeader(props: NavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <header className="fixed w-full z-50 bg-background/80 px-4 md:px-8 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl grid h-16 items-center grid-cols-[auto_1fr_auto]">
        {/* Left: logo */}
        <div className="flex items-center gap-4 md:gap-6 col-start-1 shrink-0">
          <Logo />
        </div>

        {/* Center: nav items (desktop) */}
        <div className="hidden md:flex justify-center col-start-2 min-w-0 flex-1">
          {props.items?.length ? <DesktopItems items={props.items} /> : null}
        </div>

        {/* Right: actions */}
        <div className="flex gap-3 items-center justify-end col-start-3 shrink-0">
          {/* Theme switch sits left of hamburger on mobile */}
          <ColorModeSwitcher />

          {/* Mobile hamburger at the far right edge */}
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Open navigation menu"
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          <nav className="gap-4 items-center hidden md:flex">
            <AuthButtons />
          </nav>
          {showMobileMenu && props.items && <MobileItems items={props.items} />}
        </div>
      </div>
    </header>
  );
}
