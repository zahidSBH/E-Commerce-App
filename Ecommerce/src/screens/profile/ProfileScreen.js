import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUserProfile from "@/hooks/useUserProfile";
import theme from "@/constants/theme";

const ProfileScreen = () => {
  const { profile, isProfileLoaded } = useUserProfile();

  const Avatar = () => (
    <View style={styles.avatarWrapper}>
      <View style={styles.avatarRing}>
        <View style={styles.avatarInner}>
          <Ionicons name="person" size={44} color={theme.colors.primary} />
        </View>
      </View>
    </View>
  );

  const ProfileInfo = () => (
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{profile.fullName}</Text>
      <View style={styles.emailRow}>
        <Ionicons
          name="mail-outline"
          size={14}
          color={theme.colors.textMuted}
        />
        <Text style={styles.email}>{profile.email}</Text>
      </View>
    </View>
  );

  const Divider = () => <View style={styles.divider} />;

  const StatItem = ({ icon = "cube-outline", label = "", value = "0" }) => (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={20} color={theme.colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const StatsRow = () => (
    <View style={styles.statsRow}>
      <StatItem icon="bag-handle-outline" label="Orders" value="0" />
      <View style={styles.statDivider} />
      <StatItem icon="heart-outline" label="Wishlist" value="0" />
      <View style={styles.statDivider} />
      <StatItem icon="star-outline" label="Reviews" value="0" />
    </View>
  );

  const NotLoaded = () => (
    <View style={styles.center}>
      <Text style={styles.email}>No profile data found.</Text>
    </View>
  );

  if (!isProfileLoaded) {
    return <NotLoaded />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBand} />
      <View style={styles.card}>
        <Avatar />
        <ProfileInfo />
        <Divider />
        <StatsRow />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  headerBand: {
    height: 140,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  card: {
    marginHorizontal: theme.spacing.lg,
    marginTop: -60,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    paddingTop: 70,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  avatarWrapper: {
    position: "absolute",
    top: -50,
    alignSelf: "center",
  },
  avatarRing: {
    width: 104,
    height: 104,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarInner: {
    width: 88,
    height: 88,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primaryFaded,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignItems: "center",
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  name: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textMuted,
    letterSpacing: 0.2,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    gap: theme.spacing.xs,
    flex: 1,
  },
  statValue: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  statLabel: {
    fontSize: theme.typography.fontSizeXS,
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border,
  },
});

export default ProfileScreen;
