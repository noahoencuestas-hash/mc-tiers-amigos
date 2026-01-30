"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { ModeTabs, type ModeId } from "@/components/mode-tabs";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { TierColumns } from "@/components/tier-columns";

export default function Home() {
  const [activeMode, setActiveMode] = useState<ModeId>("overall");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <ModeTabs activeMode={activeMode} onModeChange={setActiveMode} />
        {activeMode === "overall" && <LeaderboardTable />}
        {activeMode === "tiers" && <TierColumns />}
      </main>
    </div>
  );
}
