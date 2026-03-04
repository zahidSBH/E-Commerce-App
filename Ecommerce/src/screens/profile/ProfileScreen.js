import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ScreenLabel from "@/components/ScreenLabel";
import theme from "@/constants/theme";

const ProfileScreen = () => {
  const renderIcon = () => (
    <Ionicons name="person" size={32} color={theme.colors.primary} />
  );

  return (
    <ScreenLabel
      title="Profile"
      subtitle="Manage your account"
      icon={renderIcon()}
    />
  );
};

export default ProfileScreen;
