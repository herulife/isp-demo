"use client";

import Image from "next/image";
import { Bell, Calendar, MessageSquare, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function DashboardHeader() {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="md:ml-0 ml-12 flex items-center justify-between w-full md:w-auto">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Good mornings, <span className="text-primary">Admin!</span>
        </h1>
      </div>
      <div className="flex items-center gap-5 ml-auto">
        <button onClick={toggle} className="p-2 border border-border rounded-xl hover:bg-muted text-muted-foreground transition" title="Toggle theme">
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="text-muted-foreground hover:text-primary transition">
          <Calendar className="w-5 h-5" />
        </button>
        <button className="text-muted-foreground hover:text-primary transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
        <button className="text-muted-foreground hover:text-primary transition">
          <MessageSquare className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-2 cursor-pointer">
          <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" width={36} height={36} className="rounded-full bg-primary/10 border border-border" />
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

