"use client";

import Image from "next/image";
import { TierBadge } from "./tier-badge";
import { Info, ExternalLink, Headphones } from "lucide-react";

type TierLevel = "HT1" | "HT2" | "HT3" | "HT4" | "LT1" | "LT2" | "LT3" | "LT4" | "-";
type Region = "NA" | "EU" | "AS" | "SA" | "OC" | "AR" | "PE" | "CL" | "CO" | "MX" | "EC" | "BL" | "VE";
type Title = "Combat Grandmaster" | "Combat Master" | "Combat Ace" | "Unranked";

interface Player {
  rank: number;
  username: string;
  title: Title;
  points: number;
  region: Region;
  tiers: {
    overall: TierLevel;
    ltms: TierLevel;
    vanilla: TierLevel;
    uhc: TierLevel;
    pot: TierLevel;
    nethop: TierLevel;
    smp: TierLevel;
    sword: TierLevel;
    mace: TierLevel;
    gapple18: TierLevel;
    classic18: TierLevel;
    axepvp18: TierLevel;
    soup18: TierLevel;
    debuff18: TierLevel;
    nodebuff18: TierLevel;
    sumo18: TierLevel;
    boxing18: TierLevel;
    builduhc18: TierLevel;
    axe: TierLevel;
  };
}

const defaultTiers = {
  overall: "-" as TierLevel,
  ltms: "-" as TierLevel,
  vanilla: "-" as TierLevel,
  uhc: "-" as TierLevel,
  pot: "-" as TierLevel,
  nethop: "-" as TierLevel,
  smp: "-" as TierLevel,
  sword: "-" as TierLevel,
  mace: "-" as TierLevel,
  gapple18: "-" as TierLevel,
  classic18: "-" as TierLevel,
  axepvp18: "-" as TierLevel,
  soup18: "-" as TierLevel,
  debuff18: "-" as TierLevel,
  nodebuff18: "-" as TierLevel,
  sumo18: "-" as TierLevel,
  boxing18: "-" as TierLevel,
  builduhc18: "-" as TierLevel,
  axe: "-" as TierLevel,
};

const players: Player[] = [
  { rank: 1, username: "AntiNoah159", title: "Unranked", points: 0, region: "AR", tiers: { ...defaultTiers } },
  { rank: 2, username: "BlackHer", title: "Unranked", points: 0, region: "AR", tiers: { ...defaultTiers } },
  { rank: 3, username: "Pokelexstoll", title: "Unranked", points: 0, region: "AR", tiers: { ...defaultTiers } },
  { rank: 4, username: "Zokex_", title: "Unranked", points: 0, region: "PE", tiers: { ...defaultTiers } },
  { rank: 5, username: "MIKA350KA", title: "Unranked", points: 0, region: "CL", tiers: { ...defaultTiers } },
  { rank: 6, username: "Krzctm", title: "Unranked", points: 0, region: "CL", tiers: { ...defaultTiers } },
  { rank: 7, username: "SaukTRed", title: "Unranked", points: 0, region: "CL", tiers: { ...defaultTiers } },
  { rank: 8, username: "iTzQuasar", title: "Unranked", points: 0, region: "AR", tiers: { ...defaultTiers } },
  { rank: 9, username: "zmv_", title: "Unranked", points: 0, region: "CO", tiers: { ...defaultTiers } },
  { rank: 10, username: "yEmii1", title: "Unranked", points: 0, region: "AR", tiers: { ...defaultTiers } },
  { rank: 11, username: "CounterENNor", title: "Unranked", points: 0, region: "AR", tiers: { ...defaultTiers } },
  { rank: 12, username: "DiscosRayado", title: "Unranked", points: 0, region: "EC", tiers: { ...defaultTiers } },
  { rank: 13, username: "ABILACH", title: "Unranked", points: 0, region: "PE", tiers: { ...defaultTiers } },
  { rank: 14, username: "Murder_Back", title: "Unranked", points: 0, region: "PE", tiers: { ...defaultTiers } },
  { rank: 15, username: "Fooglees", title: "Unranked", points: 0, region: "PE", tiers: { ...defaultTiers } },
  { rank: 16, username: "IBRUCEI", title: "Unranked", points: 0, region: "BL", tiers: { ...defaultTiers } },
  { rank: 17, username: "Itachi2305", title: "Unranked", points: 0, region: "VE", tiers: { ...defaultTiers } },
  { rank: 18, username: "LinoGuaton", title: "Unranked", points: 0, region: "PE", tiers: { ...defaultTiers } },
  { rank: 19, username: "TS_Danco", title: "Unranked", points: 0, region: "MX", tiers: { ...defaultTiers } },
  { rank: 20, username: "Chiku2325", title: "Unranked", points: 0, region: "PE", tiers: { ...defaultTiers } },
  { rank: 21, username: "Player_21", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 22, username: "Player_22", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 23, username: "Player_23", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 24, username: "Player_24", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 25, username: "Player_25", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 26, username: "Player_26", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 27, username: "Player_27", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 28, username: "Player_28", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 29, username: "Player_29", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
  { rank: 30, username: "Player_30", title: "Unranked", points: 0, region: "NA", tiers: { ...defaultTiers } },
];

const regionColors: Record<Region, string> = {
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

const rowGlow = (rank: number, points: number) => {
  if (points <= 0) return "";
  if (rank === 1) return "shadow-[0_0_20px_rgba(250,204,21,0.3)] bg-yellow-500/5";
  if (rank === 2) return "shadow-[0_0_20px_rgba(192,192,192,0.25)] bg-gray-400/5";
  if (rank === 3) return "shadow-[0_0_20px_rgba(251,146,60,0.25)] bg-orange-500/5";
  return "";
};

export function LeaderboardTable() {
  const allPlayers = players; // Declare the allPlayers variable

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
        <div className="text-right">Tiers</div>
      </div>

      {/* Table body */}
      <div className="divide-y divide-border">
        {allPlayers.map((player) => (
          <div
            key={`${player.username}-${player.rank}`}
            className={`grid grid-cols-[140px_1fr_80px_auto] gap-4 px-4 py-3 items-center hover:bg-secondary/30 transition-colors ${rowGlow(player.rank, player.points)}`}
          >
            {/* Rank + Avatar with trapezoid */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-2 ${
                  player.rank === 1
                    ? "bg-[#FFD700]"
                    : player.rank === 2
                      ? "bg-gray-500"
                      : player.rank === 3
                        ? "bg-orange-600"
                        : "bg-secondary"
                }`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
                }}
              >
                <span className={`${player.rank <= 3 ? "text-background font-bold text-xl" : rankStyles(player.rank)}`}>
                  {player.rank}.
                </span>
                <div
                  className={`relative w-10 h-10 rounded overflow-hidden ${
                    player.rank === 1 ? "shadow-[0_0_15px_5px_rgba(255,215,0,0.6)]" : ""
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
                      src={titleIcons[player.title] || "/placeholder.svg"}
                      alt={player.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className={titleColors[player.title]}>
                    {player.title}
                  </span>
                  {player.points > 0 && (
                    <span className="text-muted-foreground">
                      ({player.points} points)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Region */}
            <div className="flex justify-center">
              <span
                className={`${regionColors[player.region]} text-white text-xs font-bold px-3 py-1 rounded-md`}
              >
                {player.region}
              </span>
            </div>

            {/* Tiers - 19 mode slots */}
            <div className="flex justify-end gap-0.5">
              <TierBadge tier={player.tiers.overall} mode="overall" />
              <TierBadge tier={player.tiers.ltms} mode="ltms" />
              <TierBadge tier={player.tiers.vanilla} mode="vanilla" />
              <TierBadge tier={player.tiers.uhc} mode="uhc" />
              <TierBadge tier={player.tiers.pot} mode="pot" />
              <TierBadge tier={player.tiers.nethop} mode="nethop" />
              <TierBadge tier={player.tiers.smp} mode="smp" />
              <TierBadge tier={player.tiers.sword} mode="sword" />
              <TierBadge tier={player.tiers.mace} mode="mace" />
              <TierBadge tier={player.tiers.gapple18} mode="gapple18" />
              <TierBadge tier={player.tiers.classic18} mode="classic18" />
              <TierBadge tier={player.tiers.axepvp18} mode="axepvp18" />
              <TierBadge tier={player.tiers.soup18} mode="soup18" />
              <TierBadge tier={player.tiers.debuff18} mode="debuff18" />
              <TierBadge tier={player.tiers.nodebuff18} mode="nodebuff18" />
              <TierBadge tier={player.tiers.sumo18} mode="sumo18" />
              <TierBadge tier={player.tiers.boxing18} mode="boxing18" />
              <TierBadge tier={player.tiers.builduhc18} mode="builduhc18" />
              <TierBadge tier={player.tiers.axe} mode="axe" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
