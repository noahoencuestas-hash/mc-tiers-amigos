"use client";

import Image from "next/image";
import { TierBadge, MODE_ORDER } from "./tier-badge";
import { Info, ExternalLink, Headphones } from "lucide-react";
import { useTierContext, calculateOverallTier, type PlayerTiers } from "@/lib/tier-context";

// Overall badge component (calculated from all modes)
function OverallBadge({ tiers }: { tiers: PlayerTiers }) {
  const overallTier = calculateOverallTier(tiers);
  const isEmpty = overallTier === "-";
  
  const tierBgColors: Record<string, string> = {
    HT1: "bg-cyan-300/30 border-cyan-300",
    LT1: "bg-cyan-500/25 border-cyan-400",
    HT2: "bg-teal-400/25 border-teal-400",
    LT2: "bg-teal-600/20 border-teal-500",
    HT3: "bg-emerald-500/20 border-emerald-400",
    LT3: "bg-green-600/20 border-green-500",
    HT4: "bg-lime-600/20 border-lime-500",
    LT4: "bg-yellow-700/20 border-yellow-600",
    HT5: "bg-amber-700/20 border-amber-600",
    LT5: "bg-stone-700/25 border-stone-500",
    "-": "bg-gray-800/50 border-gray-600",
  };

  const tierTextColors: Record<string, string> = {
    HT1: "text-cyan-300",
    LT1: "text-cyan-400",
    HT2: "text-teal-400",
    LT2: "text-teal-500",
    HT3: "text-emerald-400",
    LT3: "text-green-500",
    HT4: "text-lime-500",
    LT4: "text-yellow-600",
    HT5: "text-amber-600",
    LT5: "text-stone-500",
    "-": "text-gray-600",
  };

  return (
    <div className="flex flex-col items-center gap-0 mr-2">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 ${tierBgColors[overallTier]}`}
      >
        {!isEmpty && (
          <div className="relative w-5 h-5">
            <Image
              src="https://minecraft.wiki/images/Totem_of_Undying_JE2_BE2.png"
              alt="Overall"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        )}
      </div>
      <span className={`text-[8px] font-bold ${tierTextColors[overallTier]}`}>
        {isEmpty ? "-" : overallTier}
      </span>
    </div>
  );
}

type Title = "Combat Grandmaster" | "Combat Master" | "Combat Ace" | "Unranked";

const regionColors: Record<string, string> = {
  NA: "bg-green-600",
  EU: "bg-blue-600",
  AS: "bg-yellow-600",
  SA: "bg-purple-600",
  OC: "bg-teal-600",
  AR: "bg-sky-500",
  PE: "bg-emerald-500",
  CL: "bg-red-500",
  CO: "bg-amber-500",
  MX: "bg-green-600",
  EC: "bg-yellow-500",
  BL: "bg-indigo-500",
  VE: "bg-rose-600",
};

const titleColors: Record<Title, string> = {
  "Combat Grandmaster": "text-yellow-400",
  "Combat Master": "text-green-400",
  "Combat Ace": "text-red-400",
  "Unranked": "text-gray-500",
};

const titleIcons: Record<Title, string> = {
  "Combat Grandmaster": "https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif",
  "Combat Master": "https://minecraft.wiki/images/Diamond_JE3_BE3.png",
  "Combat Ace": "https://minecraft.wiki/images/Redstone_Dust_JE2_BE2.png",
  "Unranked": "https://minecraft.wiki/images/Barrier_JE2_BE2.png",
};

const rankStyles = (rank: number) => {
  if (rank === 1) return "text-yellow-400 font-bold text-2xl";
  if (rank === 2) return "text-gray-300 font-bold text-2xl";
  if (rank === 3) return "text-orange-400 font-bold text-2xl";
  return "text-muted-foreground font-semibold text-xl";
};

const rowGlow = (rank: number, hasRankedTiers: boolean) => {
  if (!hasRankedTiers) return "";
  if (rank === 1) return "shadow-[0_0_20px_rgba(250,204,21,0.3)] bg-yellow-500/5";
  if (rank === 2) return "shadow-[0_0_20px_rgba(192,192,192,0.25)] bg-gray-400/5";
  if (rank === 3) return "shadow-[0_0_20px_rgba(251,146,60,0.25)] bg-orange-500/5";
  return "";
};

export function LeaderboardTable() {
  const { players } = useTierContext();

  // Sort players by overall tier (calculated)
  const sortedPlayers = [...players].sort((a, b) => {
    const aOverall = calculateOverallTier(a.tiers);
    const bOverall = calculateOverallTier(b.tiers);
    const tierOrder = ["HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5", "-"];
    return tierOrder.indexOf(aOverall) - tierOrder.indexOf(bOverall);
  }).map((player, index) => ({ ...player, rank: index + 1 }));

  if (players.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">No players added yet. Add players in the Tier Management section below.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Info bar */}
      <div className="flex justify-end items-center gap-3 p-3 border-b border-border">
        <button className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Info className="w-4 h-4" />
          <span>Information</span>
        </button>
        <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-md">
          <div className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            PVP
          </div>
          <span className="text-xs text-muted-foreground">SERVER IP</span>
          <span className="text-sm text-foreground font-medium">mcpvp.club</span>
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
          <Headphones className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[140px_1fr_80px_auto] gap-4 px-4 py-3 border-b border-border text-sm text-muted-foreground uppercase tracking-wider">
        <div>#</div>
        <div>Player</div>
        <div className="text-center">Region</div>
        <div className="text-right">Overall + 17 Modes</div>
      </div>

      {/* Table body */}
      <div className="divide-y divide-border">
        {sortedPlayers.map((player) => {
          const hasRankedTiers = MODE_ORDER.some(mode => player.tiers[mode] !== "-");
          return (
            <div
              key={player.id}
              className={`grid grid-cols-[140px_1fr_80px_auto] gap-4 px-4 py-3 items-center hover:bg-secondary/30 transition-colors ${rowGlow(player.rank, hasRankedTiers)}`}
            >
              {/* Rank + Avatar with trapezoid */}
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 px-3 py-2 ${
                    player.rank === 1 && hasRankedTiers
                      ? "bg-[#FFD700]"
                      : player.rank === 2 && hasRankedTiers
                        ? "bg-gray-500"
                        : player.rank === 3 && hasRankedTiers
                          ? "bg-orange-600"
                          : "bg-secondary"
                  }`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                  }}
                >
                  <span className={`${player.rank <= 3 && hasRankedTiers ? "text-background font-bold text-xl" : rankStyles(player.rank)}`}>
                    {player.rank}.
                  </span>
                  <div
                    className={`relative w-10 h-10 rounded overflow-hidden ${
                      player.rank === 1 && hasRankedTiers ? "shadow-[0_0_15px_5px_rgba(255,215,0,0.6)]" : ""
                    }`}
                  >
                    <Image
                      src={`https://mc-heads.net/avatar/${player.username}`}
                      alt={player.username}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Player */}
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold text-foreground">
                    {player.username}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <div className="relative w-4 h-4">
                      <Image
                        src={titleIcons["Unranked"] || "/placeholder.svg"}
                        alt="Unranked"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className={titleColors["Unranked"]}>
                      Unranked
                    </span>
                  </div>
                </div>
              </div>

              {/* Region */}
              <div className="flex justify-center">
                <span className={`${regionColors[player.region] || "bg-gray-600"} text-white text-xs font-bold px-3 py-1 rounded-md`}>
                  {player.region}
                </span>
              </div>

              {/* Tiers - Overall badge + 17 mode slots */}
              <div className="flex justify-end items-center gap-0.5">
                {/* Overall Badge (calculated) */}
                <OverallBadge tiers={player.tiers} />
                
                {/* 17 Mode slots in strict order */}
                {MODE_ORDER.map((mode) => (
                  <TierBadge key={mode} tier={player.tiers[mode]} mode={mode} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
