"use client";

// SVG Icons matching the reference image style
const ModeIcons = {
  overall: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#F59E0B" d="M12 2L9 7H3L6 12L3 17H9L12 22L15 17H21L18 12L21 7H15L12 2Z"/>
      <path fill="#FBBF24" d="M12 5L10 8H6L8 12L6 16H10L12 19L14 16H18L16 12L18 8H14L12 5Z"/>
      <circle fill="#F59E0B" cx="12" cy="12" r="3"/>
    </svg>
  ),
  ltms: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#6B7280" d="M6 4L4 6L14 16L12 18L14 20L16 18L18 20L20 18L18 16L20 14L18 12L8 2L6 4Z"/>
      <path fill="#9CA3AF" d="M4 18L6 20L10 16L8 14L4 18Z"/>
      <path fill="#6B7280" d="M18 4L20 6L10 16L12 18L10 20L8 18L6 20L4 18L6 16L4 14L6 12L16 2L18 4Z" transform="scale(-1,1) translate(-24,0)"/>
      <path fill="#9CA3AF" d="M20 18L18 20L14 16L16 14L20 18Z"/>
    </svg>
  ),
  vanilla: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <polygon fill="#10B981" points="12,2 22,12 12,22 2,12" />
      <polygon fill="#34D399" points="12,5 19,12 12,19 5,12" />
      <polygon fill="#6EE7B7" points="12,8 16,12 12,16 8,12" />
    </svg>
  ),
  uhc: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#EC4899" d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"/>
      <path fill="#F472B6" d="M12 18L11 17.1C7.5 13.9 5 11.6 5 8.7C5 6.5 6.7 4.8 8.9 4.8C10.1 4.8 11.3 5.4 12 6.3C12.7 5.4 13.9 4.8 15.1 4.8C17.3 4.8 19 6.5 19 8.7C19 11.6 16.5 13.9 13 17.1L12 18Z"/>
    </svg>
  ),
  pot: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#EF4444" d="M9 3V5H7V7H17V5H15V3H9Z"/>
      <path fill="#DC2626" d="M7 7L8 20C8 21 9 22 10 22H14C15 22 16 21 16 20L17 7H7Z"/>
      <path fill="#F87171" d="M9 9L10 19H14L15 9H9Z"/>
      <ellipse fill="#FCA5A5" cx="12" cy="12" rx="2" ry="3"/>
    </svg>
  ),
  nethop: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <circle fill="#A855F7" cx="12" cy="12" r="10"/>
      <circle fill="#7C3AED" cx="12" cy="12" r="7"/>
      <circle fill="#581C87" cx="12" cy="12" r="4"/>
    </svg>
  ),
  smp: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <circle fill="#22D3EE" cx="12" cy="12" r="10"/>
      <circle fill="#06B6D4" cx="12" cy="12" r="7"/>
      <circle fill="#0891B2" cx="12" cy="12" r="4"/>
    </svg>
  ),
  sword: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#38BDF8" d="M19 3L15 7L17 9L21 5L19 3Z"/>
      <path fill="#0EA5E9" d="M15 7L6 16L8 18L17 9L15 7Z"/>
      <path fill="#7DD3FC" d="M6 16L4 18L3 21L6 20L8 18L6 16Z"/>
      <path fill="#BAE6FD" d="M3 21L4 18L6 20L3 21Z"/>
    </svg>
  ),
  axe: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#0EA5E9" d="M12 2L8 6L6 4L4 6L8 10L2 16L4 18L10 12L12 14L14 12L10 8L14 4L12 2Z"/>
      <path fill="#38BDF8" d="M14 12L12 14L18 20L20 22L22 20L20 18L14 12Z"/>
      <path fill="#7DD3FC" d="M8 6L10 8L8 10L6 8L8 6Z"/>
    </svg>
  ),
  mace: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect fill="#38BDF8" x="11" y="12" width="2" height="10" rx="1"/>
      <path fill="#0EA5E9" d="M7 4H17L19 8L17 12H7L5 8L7 4Z"/>
      <path fill="#7DD3FC" d="M8 5H16L17 8L16 11H8L7 8L8 5Z"/>
      <circle fill="#38BDF8" cx="12" cy="8" r="2"/>
    </svg>
  ),
  // 1.8 Modes
  gapple: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#FFD700" d="M12 2C8 2 5 5 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5 16 2 12 2Z"/>
      <path fill="#FBBF24" d="M12 4C9 4 7 6.5 7 9C7 12.5 12 19 12 19C12 19 17 12.5 17 9C17 6.5 15 4 12 4Z"/>
      <path fill="#FEF3C7" d="M12 6C10.5 6 9 7.5 9 9.5C9 11.5 12 15 12 15C12 15 15 11.5 15 9.5C15 7.5 13.5 6 12 6Z"/>
      <ellipse fill="#FDE68A" cx="12" cy="9" rx="1.5" ry="2"/>
    </svg>
  ),
  classic: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#8B4513" d="M11 2L10 4L11 6L10 8L11 10L10 12L11 14L10 16L11 18L10 20L11 22H13L14 20L13 18L14 16L13 14L14 12L13 10L14 8L13 6L14 4L13 2H11Z"/>
      <path fill="#A0522D" d="M11 3L10.5 5L11 7L10.5 9L11 11L10.5 13L11 15L10.5 17L11 19L10.5 21H12.5L13 19L12.5 17L13 15L12.5 13L13 11L12.5 9L13 7L12.5 5L13 3H11Z"/>
      <circle fill="#D2691E" cx="12" cy="21" r="1.5"/>
      <path fill="#6B7280" d="M7 20L8 22H10L9 20H7Z"/>
      <path fill="#9CA3AF" d="M8 19L7 20H9L10 19H8Z"/>
    </svg>
  ),
  axepvp: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#8B4513" d="M14 10L20 16L22 14L16 8L14 10Z"/>
      <rect fill="#A0522D" x="15" y="11" width="6" height="2" transform="rotate(45 18 12)"/>
      <path fill="#6B7280" d="M4 4L6 6L12 6L14 4L12 2L4 2L4 4Z"/>
      <path fill="#9CA3AF" d="M6 6L4 8L10 14L12 12L6 6Z"/>
      <path fill="#6B7280" d="M4 4L2 6L2 10L4 12L6 10L4 4Z"/>
    </svg>
  ),
  soup: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <ellipse fill="#8B4513" cx="12" cy="16" rx="8" ry="3"/>
      <path fill="#A0522D" d="M4 13V16C4 18 7.5 19.5 12 19.5C16.5 19.5 20 18 20 16V13H4Z"/>
      <ellipse fill="#CD853F" cx="12" cy="13" rx="8" ry="3"/>
      <ellipse fill="#D2691E" cx="12" cy="12" rx="6" ry="2"/>
      <circle fill="#DC2626" cx="9" cy="12" r="1.5"/>
      <circle fill="#DC2626" cx="14" cy="11.5" r="1"/>
      <circle fill="#F5F5DC" cx="11" cy="11" r="0.8"/>
    </svg>
  ),
  debuff: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#1F2937" d="M9 2V4H7V6H17V4H15V2H9Z"/>
      <path fill="#374151" d="M7 6L8 20C8 21 9 22 10 22H14C15 22 16 21 16 20L17 6H7Z"/>
      <path fill="#4B5563" d="M9 8L10 19H14L15 8H9Z"/>
      <path fill="#6B7280" d="M10 10C10 10 11 14 12 14C13 14 14 10 14 10"/>
      <circle fill="#9CA3AF" cx="12" cy="12" r="2"/>
    </svg>
  ),
  nodebuff: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#7DD3FC" d="M9 2V4H7V6H17V4H15V2H9Z"/>
      <path fill="#38BDF8" d="M7 6L8 20C8 21 9 22 10 22H14C15 22 16 21 16 20L17 6H7Z"/>
      <path fill="#0EA5E9" d="M9 8L10 19H14L15 8H9Z"/>
      <path fill="#BAE6FD" d="M11 10L10 14L12 16L14 14L13 10H11Z"/>
      <circle fill="#E0F2FE" cx="12" cy="13" r="1.5"/>
    </svg>
  ),
  sumo: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#F5F5DC" d="M4 8C4 8 6 6 8 8C10 10 8 12 10 14C12 16 14 14 16 16C18 18 16 20 20 20"/>
      <path fill="#E5E5D0" d="M4 10C4 10 6 8 8 10C10 12 8 14 10 16C12 18 14 16 16 18C18 20 18 20 20 22"/>
      <path fill="#D4D4C4" d="M4 12C4 12 6 10 8 12C10 14 8 16 10 18C12 20 16 18 18 20"/>
    </svg>
  ),
  boxing: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <rect fill="#1E40AF" x="6" y="6" width="12" height="12" rx="2"/>
      <rect fill="#3B82F6" x="7" y="7" width="10" height="10" rx="1"/>
      <rect fill="#60A5FA" x="8" y="8" width="8" height="8"/>
      <rect fill="#93C5FD" x="9" y="9" width="6" height="6"/>
      <rect fill="#BFDBFE" x="10" y="10" width="4" height="4"/>
    </svg>
  ),
  builduhc: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path fill="#6B7280" d="M6 2H18V8H20V10H4V8H6V2Z"/>
      <path fill="#9CA3AF" d="M7 3H17V8H7V3Z"/>
      <path fill="#EF4444" d="M8 10V20H16V10H8Z"/>
      <path fill="#F87171" d="M9 11V19H15V11H9Z"/>
      <path fill="#FCA5A5" d="M10 12V14H14V12H10Z"/>
      <path fill="#FECACA" d="M11 13H13V14H11V13Z"/>
      <rect fill="#6B7280" x="10" y="18" width="4" height="4"/>
    </svg>
  ),
};

export type ModeId = "overall" | "tiers";

// Add tiers icon
const TiersIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <rect fill="#6366F1" x="2" y="14" width="6" height="8" rx="1"/>
    <rect fill="#8B5CF6" x="9" y="10" width="6" height="12" rx="1"/>
    <rect fill="#A855F7" x="16" y="6" width="6" height="16" rx="1"/>
    <rect fill="#818CF8" x="3" y="15" width="4" height="6"/>
    <rect fill="#A78BFA" x="10" y="11" width="4" height="10"/>
    <rect fill="#C084FC" x="17" y="7" width="4" height="14"/>
  </svg>
);

const modes: { id: ModeId; name: string; Icon: () => JSX.Element }[] = [
  { id: "overall", name: "Leaderboard", Icon: ModeIcons.overall },
  { id: "tiers", name: "Tier Management", Icon: TiersIcon },
];

interface ModeTabsProps {
  activeMode: ModeId;
  onModeChange: (mode: ModeId) => void;
}

export function ModeTabs({ activeMode, onModeChange }: ModeTabsProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-2 overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {modes.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <mode.Icon />
              <span className="text-sm font-semibold">
                {mode.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
