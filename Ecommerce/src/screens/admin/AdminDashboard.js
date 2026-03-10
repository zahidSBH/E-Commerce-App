import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";
import AdminRoutes from "@/enums/AdminRoutes";
import ADMIN_FEATURES from "@/constants/adminFeatures";
import useAuth from "@/hooks/useAuth";

const AdminDashboard = ({ navigation = null }) => {
  const { logout } = useAuth();

  const AdminCard = ({
    title = "",
    icon = "",
    onPress = () => {},
    subtitle = "",
  }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={theme.iconSizes.xl}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={theme.iconSizes.md}
        color={theme.colors.textMuted}
      />
    </TouchableOpacity>
  );

  const handleNavigate = (route = "") => {
    if (!route) return;
    navigation?.navigate(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Panel</Text>

        <TouchableOpacity onPress={logout}>
          <Ionicons
            name="log-out-outline"
            size={theme.iconSizes.lg}
            color={theme.colors.error}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {ADMIN_FEATURES.map((feature) => (
          <AdminCard
            key={feature.title}
            title={feature.title}
            subtitle={feature.subtitle}
            icon={feature.icon}
            onPress={() => handleNavigate(feature.route)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSizeXXL,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: theme.elevation.sm,
  },
  iconContainer: {
    width: theme.sizes.iconButton * 1.5,
    height: theme.sizes.iconButton * 1.5,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: theme.typography.fontSizeLG,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textMuted,
  },
});

export default AdminDashboard;
