"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Plus, UserPlus } from "lucide-react";

interface TierPlayer {
  id: string;
  username: string;
}

interface TierData {
  tier1: TierPlayer[];
  tier2: TierPlayer[];
  tier3: TierPlayer[];
  tier4: TierPlayer[];
  tier5: TierPlayer[];
}

const tierColors = {
  tier1: { bg: "bg-yellow-500/20", border: "border-yellow-500", header: "bg-yellow-500", text: "text-yellow-400" },
  tier2: { bg: "bg-gray-400/20", border: "border-gray-400", header: "bg-gray-400", text: "text-gray-300" },
  tier3: { bg: "bg-orange-500/20", border: "border-orange-500", header: "bg-orange-500", text: "text-orange-400" },
  tier4: { bg: "bg-slate-600/20", border: "border-slate-600", header: "bg-slate-600", text: "text-slate-400" },
  tier5: { bg: "bg-slate-700/20", border: "border-slate-700", header: "bg-slate-700", text: "text-slate-500" },
};

type TierKey = keyof TierData;

export function TierColumns() {
  const [tiers, setTiers] = useState<TierData>({
    tier1: [],
    tier2: [],
    tier3: [],
    tier4: [],
    tier5: [],
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
    setTiers((prev) => ({
      ...prev,
      tier5: [...prev.tier5, newPlayer],
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
    const tierOrder: TierKey[] = ["tier1", "tier2", "tier3", "tier4", "tier5"];
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
    const isTopTier1 = tier === "tier1" && index === 0;
    const tierIndex = ["tier1", "tier2", "tier3", "tier4", "tier5"].indexOf(tier);

    return (
      <div
        key={player.id}
        draggable
        onDragStart={() => handleDragStart(player, tier)}
        className={`flex items-center gap-2 p-2 rounded-md cursor-grab active:cursor-grabbing transition-all ${
          isTopTier1
            ? "bg-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            : "bg-secondary hover:bg-secondary/80"
        }`}
        style={
          isTopTier1
            ? { clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }
            : undefined
        }
      >
        {/* Avatar */}
        <div
          className={`relative w-10 h-10 rounded overflow-hidden shrink-0 ${
            isTopTier1 ? "shadow-[0_0_15px_5px_rgba(255,215,0,0.6)]" : ""
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
        <span className={`flex-1 font-medium text-sm truncate ${isTopTier1 ? "text-background" : "text-foreground"}`}>
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
              isTopTier1
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
            disabled={tierIndex === 4}
            className={`p-0.5 rounded transition-colors ${
              isTopTier1
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
        <div className={`flex-1 ${colors.bg} p-2 min-h-[300px] space-y-2 rounded-b-md`}>
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
          New players will be added to Tier 5. Drag and drop to move between tiers.
        </p>
      </div>

      {/* Tier Columns */}
      <div className="grid grid-cols-5 gap-4">
        {renderTierColumn("tier1", "Tier 1")}
        {renderTierColumn("tier2", "Tier 2")}
        {renderTierColumn("tier3", "Tier 3")}
        {renderTierColumn("tier4", "Tier 4")}
        {renderTierColumn("tier5", "Tier 5")}
      </div>
    </div>
  );
}
