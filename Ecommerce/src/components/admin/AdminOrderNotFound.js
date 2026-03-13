import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "@/constants/theme";

const AdminOrderNotFound = ({ onBack = () => {} }) => (
  <SafeAreaView style={styles.centered}>
    <Text style={styles.errorText}>Order not found</Text>
    <TouchableOpacity
      style={styles.backButton}
      onPress={onBack}
    >
      <Text style={styles.backButtonText}>Go Back</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  backButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeightBold,
  },
});

export default React.memo(AdminOrderNotFound);
