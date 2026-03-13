import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "@/constants/theme";

const ProfileNotLoaded = () => (
  <View style={styles.center}>
    <Text style={styles.email}>No profile data found.</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  email: {
    fontSize: theme.typography.fontSizeSM,
    color: theme.colors.textMuted,
    letterSpacing: 0.2,
  },
});

export default ProfileNotLoaded;
