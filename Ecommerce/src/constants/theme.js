const theme = Object.freeze({
  colors: {
    primary: "#e66d16",
    primary20: "rgb(248, 194, 156)",
    primaryLight: "#FF8C33",
    primaryDark: "#CC5500",
    primaryFaded: "#FFF0E6",
    background: "#FFFFFF",
    surface: "#FAFAFA",
    border: "#F0E8E0",
    textPrimary: "#1A1A1A",
    textSecondary: "#6B6B6B",
    textMuted: "#AAAAAA",
    white: "#FFFFFF",
    black: "#000000",

    error: "#D32F2F",
    error20: "rgb(248, 183, 183)",
    errorFaded: "#FFF5F5",

    success: "#388E3C",
    success20: "rgb(180, 243, 190)",
    successFaded: "#E8F5E9",
    successDark: "#2E7D32",

    info: "#2196F3",
    infoFaded: "#E3F2FD",

    modalOverlay: "rgba(0, 0, 0, 0.5)",

    warningFaded: "#FFF8E1",
    warning: "#F59E0B",

    pending: "#F59E0B",
    pendingBg: "#FFF8E1",

    processing: "#2196F3",
    processingBg: "#E3F2FD",

    shipped: "#6366F1",
    shippedBg: "#E0E7FF",

    delivered: "#388E3C",
    deliveredBg: "#E8F5E9",

    cancelled: "#D32F2F",
    cancelledBg: "#FFF5F5",
  },

  typography: {
    fontSizeXS: 10,
    fontSizeSM: 12,
    fontSizeMD: 14,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeXXL: 24,
    fontWeightRegular: "400",
    fontWeightMedium: "500",
    fontWeightSemiBold: "600",
    fontWeightBold: "700",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    badgeGap: 3,
    badgeVertical: 2,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  tabBar: {
    height: 65,
    iconSize: 22,
  },

  iconSizes: {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 44,
  },

  sizes: {
    input: 48,
    button: 48,
    iconButton: 40,
    badge: 16,
    iconCircleXL: 120,
    iconCircleLG: 96,
    iconCircleMD: 72,
    headerBand: 140,
    avatarOuter: 104,
    avatarInner: 88,
    avatarSM: 44,
  },

  opacity: {
    shadow: 0.06,
    buttonPress: 0.85,
    disabled: 0.5,
  },

  borderWidth: {
    hairline: 0.5,
    sm: 1,
    md: 2,
  },

  elevation: {
    sm: 2,
    md: 4,
    lg: 8,
  },

  shadows: {
    modal: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    card: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
  },
});

export default theme;
