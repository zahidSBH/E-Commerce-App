import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import useUserProfile from "@/hooks/useUserProfile";
import useAuth from "@/hooks/useAuth";
import useOrder from "@/hooks/useOrder";
import { selectTotalOrderCount } from "@/store/selectors/orderSelectors";
import { selectWishlistCount } from "@/store/selectors/wishlistSelectors";
import useWishlist from "@/hooks/useWishlist";

import Avatar from "@/components/profile/Avatar";
import StatItem from "@/components/profile/StatItem";
import LogoutButton from "@/components/profile/LogoutButton";
import ProfileNotLoaded from "@/components/profile/ProfileNotLoaded";

import theme from "@/constants/theme";
import ProfileRoutes from "@/enums/ProfileRoutes";
 
const ProfileScreen = () => {
  const navigation = useNavigation();
  const { profile, isProfileLoaded, uid } = useUserProfile();
  const { logout, loading } = useAuth();
  const { loadOrderHistory, loadOrderCount } = useOrder();
  const { fetchItems: fetchWishlist } = useWishlist();
  
  const totalOrderCount = useSelector(selectTotalOrderCount);
  const wishlistCount = useSelector(selectWishlistCount);

  useEffect(() => {
    if (uid) {
      loadOrderHistory(uid);
      // Removed loadOrderCount and fetchWishlist from here as they are now
      // pre-fetched in RootNavigator during login sync for an "instant" feel.
    }
  }, [uid, loadOrderHistory]);

  const navigateToOrders = useCallback(() => {
    navigation.navigate(ProfileRoutes.ORDER_HISTORY);
  }, [navigation]);

  const navigateToWishlist = useCallback(() => {
    navigation.navigate(ProfileRoutes.WISHLIST);
  }, [navigation]);

  if (!isProfileLoaded) {
    return <ProfileNotLoaded />;
  }

  const orderCount = totalOrderCount !== null ? totalOrderCount.toString() : "0";

  return (
    <View style={styles.container}>
      <View style={styles.headerBand} />
      <View style={styles.card}>
        <Avatar />
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{profile?.fullName ?? ""}</Text>
          <View style={styles.emailRow}>
            <Ionicons
              name="mail-outline"
              size={theme.iconSizes.xs}
              color={theme.colors.textMuted}
            />
            <Text style={styles.email}>{profile?.email ?? ""}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statsRow}>
          <StatItem
            icon="bag-handle-outline"
            label="Orders"
            value={orderCount}
            onPress={navigateToOrders}
            highlight={true}
          />
          <View style={styles.statDivider} />
          <StatItem
            icon="heart-outline"
            label="Wishlist"
            value={wishlistCount.toString()}
            onPress={navigateToWishlist}
            highlight={true}
          />
        </View>

        <View style={styles.divider} />
        
        <LogoutButton onPress={logout} loading={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  headerBand: {
    height: theme.sizes.headerBand,
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
    marginBottom: theme.spacing.lg,
  },
  statDivider: {
    width: 1,
    height: theme.sizes.iconButton,
    backgroundColor: theme.colors.border,
  },
});

export default ProfileScreen;
