import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const SelfWarning = () => (
  <View style={styles.container}>
    <Ionicons
      name="information-circle-outline"
      size={theme.iconSizes.sm}
      color={theme.colors.warning}
    />
    <Text style={styles.text}>You cannot modify your own account.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.warningFaded,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  text: {
    flex: 1,
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.warning,
  },
});

export default SelfWarning;
