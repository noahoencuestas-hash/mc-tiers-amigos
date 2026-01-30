import Image from "next/image";

type TierLevel = "HT1" | "HT2" | "HT3" | "HT4" | "LT1" | "LT2" | "LT3" | "LT4" | "-";
type ModeType = 
  | "overall" 
  | "ltms" 
  | "vanilla" 
  | "uhc" 
  | "pot" 
  | "nethop" 
  | "smp" 
  | "sword" 
  | "mace" 
  | "gapple18" 
  | "classic18" 
  | "axepvp18" 
  | "soup18" 
  | "debuff18" 
  | "nodebuff18" 
  | "sumo18" 
  | "boxing18" 
  | "builduhc18" 
  | "axe";

interface TierBadgeProps {
  tier: TierLevel;
  mode: ModeType;
}

const modeIcons: Record<ModeType, string> = {
  overall: "https://minecraft.wiki/images/Totem_of_Undying_JE2_BE2.png",
  ltms: "https://minecraft.wiki/images/Clock_JE3_BE3.gif",
  vanilla: "https://minecraft.wiki/images/End_Crystal_JE2_BE2.gif",
  uhc: "https://minecraft.wiki/images/Hardcore_Heart.svg",
  pot: "https://minecraft.wiki/images/Splash_Potion_of_Healing_JE2_BE2.png",
  nethop: "https://minecraft.wiki/images/Netherite_Helmet_JE2_BE2.png",
  smp: "https://minecraft.wiki/images/Ender_Pearl_JE3_BE2.png",
  sword: "https://minecraft.wiki/images/Diamond_Sword_JE3_BE3.png",
  mace: "https://minecraft.wiki/images/Mace_JE1_BE1.png",
  gapple18: "https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif",
  classic18: "https://minecraft.wiki/images/Fishing_Rod_JE2_BE2.png",
  axepvp18: "https://minecraft.wiki/images/Wooden_Axe_JE3_BE3.png",
  soup18: "https://minecraft.wiki/images/Mushroom_Stew_JE2_BE2.png",
  debuff18: "https://minecraft.wiki/images/Splash_Potion_of_Weakness_JE2_BE2.png",
  nodebuff18: "https://minecraft.wiki/images/Splash_Potion_of_Swiftness_JE2_BE2.png",
  sumo18: "https://minecraft.wiki/images/String_JE2_BE2.png",
  boxing18: "https://minecraft.wiki/images/Lapis_Lazuli_JE2_BE2.png",
  builduhc18: "https://minecraft.wiki/images/Lava_Bucket_JE3_BE2.png",
  axe: "https://minecraft.wiki/images/Diamond_Axe_JE3_BE3.png",
};

const modeBorderColors: Record<ModeType, string> = {
  overall: "border-yellow-500",
  ltms: "border-amber-400",
  vanilla: "border-cyan-400",
  uhc: "border-red-500",
  pot: "border-pink-500",
  nethop: "border-purple-600",
  smp: "border-violet-500",
  sword: "border-cyan-400",
  mace: "border-gray-400",
  gapple18: "border-yellow-400",
  classic18: "border-orange-400",
  axepvp18: "border-amber-600",
  soup18: "border-red-400",
  debuff18: "border-gray-500",
  nodebuff18: "border-sky-400",
  sumo18: "border-stone-400",
  boxing18: "border-blue-500",
  builduhc18: "border-orange-500",
  axe: "border-emerald-400",
};

const tierBgColors: Record<TierLevel, string> = {
  HT1: "bg-green-500/20",
  HT2: "bg-cyan-500/20",
  HT3: "bg-orange-500/20",
  HT4: "bg-gray-500/20",
  LT1: "bg-red-500/20",
  LT2: "bg-purple-500/20",
  LT3: "bg-yellow-500/20",
  LT4: "bg-pink-500/20",
  "-": "bg-gray-800/50",
};

const tierTextColors: Record<TierLevel, string> = {
  HT1: "text-green-400",
  HT2: "text-cyan-400",
  HT3: "text-orange-400",
  HT4: "text-gray-400",
  LT1: "text-red-400",
  LT2: "text-purple-400",
  LT3: "text-yellow-400",
  LT4: "text-pink-400",
  "-": "text-gray-600",
};

export function TierBadge({ tier, mode }: TierBadgeProps) {
  const iconSrc = modeIcons[mode];
  const isEmpty = tier === "-";

  return (
    <div className="flex flex-col items-center gap-0">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center border ${isEmpty ? "border-gray-600 bg-gray-800/30" : `${modeBorderColors[mode]} ${tierBgColors[tier]}`}`}
      >
        {!isEmpty && (
          <div className="relative w-3.5 h-3.5">
            <Image
              src={iconSrc || "/placeholder.svg"}
              alt={mode}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        )}
      </div>
      <span className={`text-[8px] font-bold ${tierTextColors[tier]}`}>
        {tier}
      </span>
    </div>
  );
}
