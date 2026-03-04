import React from "react";
import { Ionicons } from "@expo/vector-icons";
import TabRoutes from "@/enums/TabRoutes";

const resolveIconName = ({ route = TabRoutes.HOME, focused = false }) => {
  switch (route) {
    case TabRoutes.HOME:
      return focused ? "home" : "home-outline";
    case TabRoutes.PRODUCTS:
      return focused ? "bag-handle" : "bag-handle-outline";
    case TabRoutes.PROFILE:
      return focused ? "person" : "person-outline";
    default:
      return "ellipse-outline";
  }
};

const TabBarIcon = ({
  route = TabRoutes.HOME,
  focused = false,
  color = "#000000",
  size = 22,
}) => {
  const iconName = resolveIconName({ route, focused });

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
