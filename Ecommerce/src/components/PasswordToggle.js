import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/constants/theme";

const PasswordToggle = ({
  secure = false,
  visible = false,
  onToggle = () => {},
  style,
}) => {
  if (!secure) return null;
  const iconName = visible ? "eye" : "eye-off";
  return (
    <TouchableOpacity onPress={onToggle} style={[styles.eyeIcon, style]}>
      <Ionicons name={iconName} size={20} color={theme.colors.textMuted} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eyeIcon: {
    padding: theme.spacing.xs,
  },
});

export default PasswordToggle;
