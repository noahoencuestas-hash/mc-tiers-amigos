"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, Plus, UserPlus, X } from "lucide-react";
import { useTierContext, TIER_ORDER, type TierPlayer } from "@/lib/tier-context";
import { MODE_ORDER, MODE_LABELS, modeIcons, type ModeType, type TierLevel } from "./tier-badge";

// Color gradient from Dark Grey/Brown (LT5) to Bright Cyan/White (HT1)
const tierColors: Record<TierLevel, { bg: string; border: string; header: string; text: string }> = {
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
  "-": { bg: "bg-gray-800/20", border: "border-gray-600", header: "bg-gray-600", text: "text-gray-500" },
};

export function TierColumns() {
  const { players, addPlayer, removePlayer, setPlayerTier, getPlayersInTier } = useTierContext();
  const [newUsername, setNewUsername] = useState("");
  const [selectedMode, setSelectedMode] = useState<ModeType>("vanilla");
  const [draggedPlayer, setDraggedPlayer] = useState<{ player: TierPlayer; fromTier: TierLevel } | null>(null);
  const [dragOverTier, setDragOverTier] = useState<TierLevel | null>(null);

  const handleAddPlayer = () => {
    if (!newUsername.trim()) return;
    addPlayer(newUsername.trim());
    setNewUsername("");
  };

  const handleDragStart = (player: TierPlayer, fromTier: TierLevel) => {
    setDraggedPlayer({ player, fromTier });
  };

  const handleDragOver = (e: React.DragEvent, tier: TierLevel) => {
    e.preventDefault();
    setDragOverTier(tier);
  };

  const handleDragLeave = () => {
    setDragOverTier(null);
  };

  const handleDrop = (toTier: TierLevel) => {
    if (!draggedPlayer) return;
    const { player, fromTier } = draggedPlayer;
    if (fromTier !== toTier) {
      setPlayerTier(player.id, selectedMode, toTier);
    }
    setDraggedPlayer(null);
    setDragOverTier(null);
  };

  const movePlayer = (player: TierPlayer, fromTier: TierLevel, direction: "up" | "down") => {
    const currentIndex = TIER_ORDER.indexOf(fromTier);
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= TIER_ORDER.length) return;
    const toTier = TIER_ORDER[newIndex];
    setPlayerTier(player.id, selectedMode, toTier);
  };

  // Get unranked players (those with "-" tier in current mode)
  const unrankedPlayers = players.filter(p => p.tiers[selectedMode] === "-");

  const renderPlayerCard = (player: TierPlayer, tier: TierLevel, index: number) => {
    const isTopHT1 = tier === "HT1" && index === 0;
    const tierIndex = TIER_ORDER.indexOf(tier);

    return (
      <div
        key={player.id}
        draggable
        onDragStart={() => handleDragStart(player, tier)}
        className={`relative flex items-center gap-1.5 p-1.5 rounded-md cursor-grab active:cursor-grabbing transition-all ${
          isTopHT1
            ? "bg-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            : "bg-secondary hover:bg-secondary/80"
        }`}
        style={isTopHT1 ? { clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" } : undefined}
      >
        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Reset this mode to unranked
            setPlayerTier(player.id, selectedMode, "-");
          }}
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center transition-colors z-10 ${
            isTopHT1
              ? "bg-background/80 text-foreground hover:bg-background"
              : "bg-red-500/80 text-white hover:bg-red-500"
          }`}
        >
          <X className="w-3 h-3" />
        </button>

        {/* Avatar */}
        <div className={`relative w-8 h-8 rounded overflow-hidden shrink-0 ${isTopHT1 ? "shadow-[0_0_10px_3px_rgba(255,215,0,0.6)]" : ""}`}>
          <Image
            src={`https://mc-heads.net/avatar/${player.username}`}
            alt={player.username}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Username + Region */}
        <div className="flex-1 min-w-0">
          <span className={`font-medium text-xs truncate block ${isTopHT1 ? "text-background" : "text-foreground"}`}>
            {player.username}
          </span>
          <span className={`text-[9px] ${isTopHT1 ? "text-background/70" : "text-muted-foreground"}`}>
            {player.region}
          </span>
        </div>

        {/* Up/Down arrows */}
        <div className="flex flex-col gap-0 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              movePlayer(player, tier, "up");
            }}
            disabled={tierIndex === 0}
            className={`p-0 rounded transition-colors ${
              isTopHT1
                ? "text-background/60 hover:text-background disabled:opacity-30"
                : "text-muted-foreground hover:text-foreground disabled:opacity-30"
            }`}
          >
            <ChevronUp className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              movePlayer(player, tier, "down");
            }}
            disabled={tierIndex === TIER_ORDER.length - 1}
            className={`p-0 rounded transition-colors ${
              isTopHT1
                ? "text-background/60 hover:text-background disabled:opacity-30"
                : "text-muted-foreground hover:text-foreground disabled:opacity-30"
            }`}
          >
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  const renderTierColumn = (tier: TierLevel) => {
    const colors = tierColors[tier];
    const playersInTier = getPlayersInTier(selectedMode, tier);

    return (
      <div
        key={tier}
        className={`flex flex-col rounded-lg border ${colors.border} ${
          dragOverTier === tier ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
        }`}
        onDragOver={(e) => handleDragOver(e, tier)}
        onDragLeave={handleDragLeave}
        onDrop={() => handleDrop(tier)}
      >
        {/* Header */}
        <div className={`${colors.header} text-background font-bold text-center py-1.5 rounded-t-md text-xs`}>
          {tier}
        </div>

        {/* Players list */}
        <div className={`flex-1 ${colors.bg} p-1 min-h-[150px] space-y-1 rounded-b-md`}>
          {playersInTier.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-[10px] italic">
              Drop here
            </div>
          ) : (
            playersInTier.map((player, index) => renderPlayerCard(player, tier, index))
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
            onKeyDown={(e) => e.key === "Enter" && handleAddPlayer()}
            placeholder="Enter Minecraft username..."
            className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddPlayer}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Player
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Add players, then select a mode below to assign tiers. HT1 is the highest tier, LT5 is the lowest.
        </p>
      </div>

      {/* Mode Selection Tabs */}
      <div className="bg-card rounded-lg border border-border p-3">
        <h3 className="text-sm font-semibold text-foreground mb-2">Select Mode to Edit:</h3>
        <div className="flex flex-wrap gap-1.5">
          {MODE_ORDER.map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative w-4 h-4">
                <Image
                  src={modeIcons[mode] || "/placeholder.svg"}
                  alt={mode}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span>{MODE_LABELS[mode]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Currently Selected Mode Header */}
      <div className="flex items-center gap-3 bg-card rounded-lg border border-border p-3">
        <div className="relative w-8 h-8">
          <Image
            src={modeIcons[selectedMode] || "/placeholder.svg"}
            alt={selectedMode}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{MODE_LABELS[selectedMode]}</h3>
          <p className="text-xs text-muted-foreground">Drag players to assign tiers for this mode</p>
        </div>
      </div>

      {/* Unranked Players Pool */}
      {unrankedPlayers.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-3">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Unranked Players (drag to a tier):</h4>
          <div className="flex flex-wrap gap-2">
            {unrankedPlayers.map((player) => (
              <div
                key={player.id}
                draggable
                onDragStart={() => handleDragStart(player, "-")}
                className="relative flex items-center gap-2 bg-secondary px-2 py-1.5 rounded-md cursor-grab active:cursor-grabbing"
              >
                {/* Remove player entirely button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePlayer(player.id);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500/80 text-white hover:bg-red-500 flex items-center justify-center z-10"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="relative w-6 h-6 rounded overflow-hidden">
                  <Image
                    src={`https://mc-heads.net/avatar/${player.username}`}
                    alt={player.username}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-sm text-foreground">{player.username}</span>
                <span className="text-xs text-muted-foreground">({player.region})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier Columns - 10 levels */}
      <div className="grid grid-cols-10 gap-1.5">
        {TIER_ORDER.map((tier) => renderTierColumn(tier))}
      </div>
    </div>
  );
}
