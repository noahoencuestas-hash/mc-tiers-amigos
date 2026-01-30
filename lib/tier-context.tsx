"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type TierLevel, type ModeType, MODE_ORDER } from "@/components/tier-badge";

// Player tier data for all 17 modes
export type PlayerTiers = Record<ModeType, TierLevel>;

// Region type
export type Region = "NA" | "EU" | "AS" | "SA" | "OC" | "AR" | "PE" | "CL" | "CO" | "MX" | "EC" | "BL" | "VE" | "NI";

// Default tiers (all unranked)
export const createDefaultTiers = (): PlayerTiers => {
  const tiers: Partial<PlayerTiers> = {};
  for (const mode of MODE_ORDER) {
    tiers[mode] = "-";
  }
  return tiers as PlayerTiers;
};

// Player in tier system
export interface TierPlayer {
  id: string;
  username: string;
  region: Region;
  tiers: PlayerTiers;
}

// Tier order from highest to lowest
export const TIER_ORDER: TierLevel[] = ["HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5"];

// Get numeric value for tier (for calculating overall)
export const getTierValue = (tier: TierLevel): number => {
  const values: Record<TierLevel, number> = {
    "HT1": 10,
    "LT1": 9,
    "HT2": 8,
    "LT2": 7,
    "HT3": 6,
    "LT3": 5,
    "HT4": 4,
    "LT4": 3,
    "HT5": 2,
    "LT5": 1,
    "-": 0,
  };
  return values[tier];
};

// Calculate overall tier from all 17 modes
export const calculateOverallTier = (tiers: PlayerTiers): TierLevel => {
  const rankedModes = MODE_ORDER.filter(mode => tiers[mode] !== "-");
  if (rankedModes.length === 0) return "-";
  
  const totalValue = rankedModes.reduce((sum, mode) => sum + getTierValue(tiers[mode]), 0);
  const avgValue = totalValue / rankedModes.length;
  
  // Map average to tier
  if (avgValue >= 9.5) return "HT1";
  if (avgValue >= 8.5) return "LT1";
  if (avgValue >= 7.5) return "HT2";
  if (avgValue >= 6.5) return "LT2";
  if (avgValue >= 5.5) return "HT3";
  if (avgValue >= 4.5) return "LT3";
  if (avgValue >= 3.5) return "HT4";
  if (avgValue >= 2.5) return "LT4";
  if (avgValue >= 1.5) return "HT5";
  return "LT5";
};

interface TierContextType {
  players: TierPlayer[];
  addPlayer: (username: string, region?: Region) => void;
  removePlayer: (playerId: string) => void;
  setPlayerTier: (playerId: string, mode: ModeType, tier: TierLevel) => void;
  getPlayersInTier: (mode: ModeType, tier: TierLevel) => TierPlayer[];
}

const TierContext = createContext<TierContextType | null>(null);

// Initial player list with regions
const INITIAL_PLAYERS: { username: string; region: Region }[] = [
  { username: "AntiNoah159", region: "AR" },
  { username: "BlackHer", region: "AR" },
  { username: "Pokelexstoll", region: "AR" },
  { username: "Zokex_", region: "PE" },
  { username: "MIKA350KA", region: "CL" },
  { username: "Krzctm", region: "CL" },
  { username: "SaukTred", region: "CL" },
  { username: "iTzQuasar", region: "AR" },
  { username: "zmv_", region: "CO" },
  { username: "yEmiii", region: "AR" },
  { username: "CounterENNor", region: "AR" },
  { username: "DiscosRayado", region: "EC" },
  { username: "ABILACH", region: "PE" },
  { username: "Murder_Back", region: "PE" },
  { username: "Fooglees", region: "PE" },
  { username: "IBRUCEI", region: "BL" },
  { username: "Itachi2305", region: "VE" },
  { username: "LinoGuaton", region: "PE" },
  { username: "TS_Danco", region: "MX" },
  { username: "Chiku2325", region: "PE" },
  { username: "BluDef", region: "MX" },
  { username: "Gianxd123456", region: "NI" },
  { username: "ito097012", region: "NI" },
  { username: "Player_24", region: "NA" },
  { username: "Player_25", region: "NA" },
  { username: "Player_26", region: "NA" },
  { username: "Player_27", region: "NA" },
  { username: "Player_28", region: "NA" },
  { username: "Player_29", region: "NA" },
  { username: "Player_30", region: "NA" },
];

// Create initial player objects
const createInitialPlayers = (): TierPlayer[] => {
  return INITIAL_PLAYERS.map((p, i) => ({
    id: `${p.username}-${i}`,
    username: p.username,
    region: p.region,
    tiers: createDefaultTiers(),
  }));
};

export function TierProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<TierPlayer[]>(createInitialPlayers);

  const addPlayer = (username: string, region: Region = "NA") => {
    const newPlayer: TierPlayer = {
      id: `${username}-${Date.now()}`,
      username: username.trim(),
      region,
      tiers: createDefaultTiers(),
    };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const removePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(p => p.id !== playerId));
  };

  const setPlayerTier = (playerId: string, mode: ModeType, tier: TierLevel) => {
    setPlayers(prev => prev.map(p => {
      if (p.id !== playerId) return p;
      return {
        ...p,
        tiers: { ...p.tiers, [mode]: tier },
      };
    }));
  };

  const getPlayersInTier = (mode: ModeType, tier: TierLevel): TierPlayer[] => {
    return players.filter(p => p.tiers[mode] === tier);
  };

  return (
    <TierContext.Provider value={{ players, addPlayer, removePlayer, setPlayerTier, getPlayersInTier }}>
      {children}
    </TierContext.Provider>
  );
}

export function useTierContext() {
  const context = useContext(TierContext);
  if (!context) {
    throw new Error("useTierContext must be used within a TierProvider");
  }
  return context;
}
