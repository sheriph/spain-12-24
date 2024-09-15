"use client";

import RetroGrid from "@/components/magicui/retro-grid";

export function RetroGridDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl">
      <span className="z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center font-bold leading-none tracking-tighter text-transparent">
        {children}
      </span>

      <RetroGrid />
    </div>
  );
}
