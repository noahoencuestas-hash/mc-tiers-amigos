"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Plus, UserPlus } from "lucide-react";

interface TierPlayer {
  id: string;
  username: string;
}

// 10 tier levels: LT5 (lowest) -> HT1 (highest)
interface TierData {
  HT1: TierPlayer[];
  LT1: TierPlayer[];
  HT2: TierPlayer[];
  LT2: TierPlayer[];
  HT3: TierPlayer[];
  LT3: TierPlayer[];
  HT4: TierPlayer[];
  LT4: TierPlayer[];
  HT5: TierPlayer[];
  LT5: TierPlayer[];
}

// Color gradient from Dark Grey/Brown (LT5) to Bright Cyan/White (HT1)
const tierColors = {
  HT1: { bg: "bg-cyan-300/20", border: "border-cyan-300", header: "bg-cyan-400", text: "text-cyan-300" },
  LT1: { bg: "bg-cyan-500/20", border: "border-cyan-500", header: "bg-cyan-500", text: "text-cyan-400" },
  HT2: { bg: "bg-teal-400/20", border: "border-teal-400", header: "bg-teal-400", text: "text-teal-400" },
  LT2: { bg: "bg-teal-600/20", border: "border-teal-600", header: "bg-teal-600", text: "text-teal-500" },
  HT3: { bg: "bg-emerald-500/20", border: "border-emerald-500", header: "bg-emerald-500", text: "text-emerald-400" },
  LT3: { bg: "bg-green-600/20", border: "border-green-600", header: "bg-green-600", text: "text-green-500" },
  HT4: { bg: "bg-lime-600/20", border: "border-lime-600", header: "bg-lime-600", text: "text-lime-500" },
  LT4: { bg: "bg-yellow-700/20", border: "border-yellow-700", header: "bg-yellow-700", text: "text-yellow-600" },
  HT5: { bg: "bg-amber-700/20", border: "border-amber-700", header: "bg-amber-700", text: "text-amber-600" },
  LT5: { bg: "bg-stone-600/20", border: "border-stone-600", header: "bg-stone-600", text: "text-stone-500" },
};

type TierKey = keyof TierData;

// Order from highest to lowest
const tierOrder: TierKey[] = ["HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5"];

const tierLabels: Record<TierKey, string> = {
  HT1: "HT1",
  LT1: "LT1",
  HT2: "HT2",
  LT2: "LT2",
  HT3: "HT3",
  LT3: "LT3",
  HT4: "HT4",
  LT4: "LT4",
  HT5: "HT5",
  LT5: "LT5",
};

export function TierColumns() {
  const [tiers, setTiers] = useState<TierData>({
    HT1: [],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: [],
  });

  const [newUsername, setNewUsername] = useState("");
  const [draggedPlayer, setDraggedPlayer] = useState<{ player: TierPlayer; fromTier: TierKey } | null>(null);
  const [dragOverTier, setDragOverTier] = useState<TierKey | null>(null);

  const addPlayer = () => {
    if (!newUsername.trim()) return;
    const newPlayer: TierPlayer = {
      id: `${newUsername}-${Date.now()}`,
      username: newUsername.trim(),
    };
    // New players start at LT5 (lowest tier)
    setTiers((prev) => ({
      ...prev,
      LT5: [...prev.LT5, newPlayer],
    }));
    setNewUsername("");
  };

  const handleDragStart = (player: TierPlayer, fromTier: TierKey) => {
    setDraggedPlayer({ player, fromTier });
  };

  const handleDragOver = (e: React.DragEvent, tier: TierKey) => {
    e.preventDefault();
    setDragOverTier(tier);
  };

  const handleDragLeave = () => {
    setDragOverTier(null);
  };

  const handleDrop = (toTier: TierKey) => {
    if (!draggedPlayer) return;

    const { player, fromTier } = draggedPlayer;
    if (fromTier === toTier) {
      setDraggedPlayer(null);
      setDragOverTier(null);
      return;
    }

    setTiers((prev) => ({
      ...prev,
      [fromTier]: prev[fromTier].filter((p) => p.id !== player.id),
      [toTier]: [...prev[toTier], player],
    }));

    setDraggedPlayer(null);
    setDragOverTier(null);
  };

  const movePlayer = (player: TierPlayer, fromTier: TierKey, direction: "up" | "down") => {
    const currentIndex = tierOrder.indexOf(fromTier);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= tierOrder.length) return;

    const toTier = tierOrder[newIndex];

    setTiers((prev) => ({
      ...prev,
      [fromTier]: prev[fromTier].filter((p) => p.id !== player.id),
      [toTier]: [...prev[toTier], player],
    }));
  };

  const renderPlayerCard = (player: TierPlayer, tier: TierKey, index: number) => {
    const isTopHT1 = tier === "HT1" && index === 0;
    const tierIndex = tierOrder.indexOf(tier);

    return (
      <div
        key={player.id}
        draggable
        onDragStart={() => handleDragStart(player, tier)}
        className={`flex items-center gap-2 p-2 rounded-md cursor-grab active:cursor-grabbing transition-all ${
          isTopHT1
            ? "bg-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            : "bg-secondary hover:bg-secondary/80"
        }`}
        style={
          isTopHT1
            ? { clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }
            : undefined
        }
      >
        {/* Avatar */}
        <div
          className={`relative w-10 h-10 rounded overflow-hidden shrink-0 ${
            isTopHT1 ? "shadow-[0_0_15px_5px_rgba(255,215,0,0.6)]" : ""
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

        {/* Username */}
        <span className={`flex-1 font-medium text-sm truncate ${isTopHT1 ? "text-background" : "text-foreground"}`}>
          {player.username}
        </span>

        {/* Up/Down arrows */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              movePlayer(player, tier, "up");
            }}
            disabled={tierIndex === 0}
            className={`p-0.5 rounded transition-colors ${
              isTopHT1
                ? "text-background/60 hover:text-background disabled:opacity-30"
                : "text-muted-foreground hover:text-foreground disabled:opacity-30"
            }`}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              movePlayer(player, tier, "down");
            }}
            disabled={tierIndex === 9}
            className={`p-0.5 rounded transition-colors ${
              isTopHT1
                ? "text-background/60 hover:text-background disabled:opacity-30"
                : "text-muted-foreground hover:text-foreground disabled:opacity-30"
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderTierColumn = (tier: TierKey, label: string) => {
    const colors = tierColors[tier];
    const players = tiers[tier];

    return (
      <div
        key={tier}
        className={`flex flex-col rounded-lg border-2 ${colors.border} ${
          dragOverTier === tier ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
        }`}
        onDragOver={(e) => handleDragOver(e, tier)}
        onDragLeave={handleDragLeave}
        onDrop={() => handleDrop(tier)}
      >
        {/* Header */}
        <div className={`${colors.header} text-background font-bold text-center py-2 rounded-t-md`}>
          {label}
        </div>

        {/* Players list */}
        <div className={`flex-1 ${colors.bg} p-1.5 min-h-[200px] space-y-1.5 rounded-b-md`}>
          {players.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm italic">
              Drop players here
            </div>
          ) : (
            players.map((player, index) => renderPlayerCard(player, tier, index))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Add Player Input */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center gap-3">
          <UserPlus className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPlayer()}
            placeholder="Enter Minecraft username..."
            className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={addPlayer}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Player
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          New players will be added to LT5 (lowest). Drag and drop to move between tiers. HT1 is the highest tier.
        </p>
      </div>

      {/* Tier Columns - 10 levels */}
      <div className="grid grid-cols-10 gap-2">
        {tierOrder.map((tier) => renderTierColumn(tier, tierLabels[tier]))}
      </div>
    </div>
  );
}
