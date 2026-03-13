import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "@/constants/theme";

const AuthFooter = ({ onPress = () => {} }) => (
  <View style={styles.footer}>
    <Text style={styles.text}>Don't have an account? </Text>

    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Navigate to sign up"
    >
      <Text style={styles.link}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
  },
  text: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.textSecondary,
  },
  link: {
    fontSize: theme.typography.fontSizeMD,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeightSemiBold,
  },
});

export default AuthFooter;