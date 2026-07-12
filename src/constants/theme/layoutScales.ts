import { Dimensions } from "react-native";

export const LayoutScale = {
  // --- MICRO SPACING (Tight element gaps, borders, badges) ---
  /** 2px - Micro padding, small borders, tight dividers */
  nano_2: 2,
  /** 4px - Text-to-label gaps, list item sub-gaps, tiny badges */
  xs_4: 4,
  /** 6px - Inner checkbox gaps, dense card elements */
  xsm_6: 6,

  // --- BASE COGNITIVE LAYOUT (Paddings, margins, element gaps) ---
  /** 8px - List item row padding, small outer card gaps */
  sm_8: 8,
  /** 12px - Compact container padding, inner card content gaps */
  ms_12: 12,
  /** 16px - Standard global app margin, default body padding */
  md_16: 16,
  /** 20px - Medium-large structural section padding */
  ml_20: 20,
  /** 24px - Large outer container layout margins, main header spacing */
  lg_24: 24,

   /** 18px - extra Large outer container layout margins, main header spacing, radius */
  xl_18: 18,

  // --- MACRO SPACING (Sections, layout grids, screen gaps) ---
  /** 32px - Large structural component gaps, section headers */
  xl_32: 32,
  /** 40px - Extra-large spacing between layout chunks */
  xxl_40: 40,
  /** 48px - Top screen safety header gaps, large splash graphics */
  huge_48: 48,
  /** 64px - Massive hero image padding, layout footer gaps */
  massive_64: 64,
  /** 80px - Bottom-tab navigation element safe view buffer zones */
  giant_80: 80,

  // --- COMPONENT FIXED DIMENSIONS (Buttons, inputs, UI targets) ---
  /** 24px - Small action chip buttons, notification dot graphics */
  chip_24: 24,
  /** 36px - Compact buttons, secondary search bars, small icons */
  controlSM_36: 36,
  /** 44px - Target height for standard forms, standard text inputs */
  controlMD_44: 44,
  /** 56px - Primary CTA block action buttons, standard bottom bars */
  controlLG_56: 56,

  // --- RECURRING ICON SIZES ---
  /** 16px - Small descriptive metadata icons (e.g., star icons) */
  iconSM_16: 16,
  /** 24px - Standard touchable navigation bar action icons */
  iconMD_24: 24,
  /** 32px - Focus graphics, detail page configuration buttons */
  iconLG_32: 32,

  // --- IMAGE & AVATAR HEIGHTS ---
  /** 40px - Standard comment block/list row user avatar bubbles */
  avatarSM_40: 40,
  /** 56px - Settings screen profile user avatar graphics */
  avatarMD_56: 56,

  avtarBorder_60: 60,
  /** 96px - High-focus edit profile view display avatars */
  avatarLG_96: 96,
  /** 100px - High-focus splash imagery banner configurations */
  bannerSM_100: 100,
} as const;

export type LayoutScaleType = typeof LayoutScale;

export const { width, height } = Dimensions.get('window');