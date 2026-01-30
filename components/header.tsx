"use client";

import { Search, Home, Trophy, MessageCircle, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wider">
            <span className="text-primary">MC</span>
            <span className="text-accent">TIERS</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-foreground font-medium"
          >
            <Trophy className="w-4 h-4" />
            <span>Rankings</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Discords</span>
            <ChevronDown className="w-3 h-3" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>API Docs</span>
          </a>
        </nav>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary border border-border rounded-lg pl-10 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-40 md:w-52"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">/</span>
        </div>
      </div>
    </header>
  );
}
