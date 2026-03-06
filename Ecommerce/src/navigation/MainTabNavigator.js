import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabRoutes from "@/enums/TabRoutes";
import TabBarIcon from "@/components/TabBarIcon";
import theme from "@/constants/theme";

import HomeScreen from "@/screens/home/HomeScreen";
import ProductScreen from "@/screens/products/ProductScreen";
import ProfileScreen from "@/screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

const buildTabScreenOptions = (route) => ({
  tabBarIcon: ({ focused, color, size }) => (
    <TabBarIcon
      route={route.name}
      focused={focused}
      color={color}
      size={size}
    />
  ),
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: theme.colors.textMuted,
  headerShown: false,
});

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => buildTabScreenOptions(route)}>
      <Tab.Screen name={TabRoutes.HOME} component={HomeScreen} />
      <Tab.Screen name={TabRoutes.PRODUCTS} component={ProductScreen} />
      <Tab.Screen name={TabRoutes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
