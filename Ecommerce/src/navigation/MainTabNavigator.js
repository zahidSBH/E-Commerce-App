import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabRoutes from '@/enums/TabRoutes';
import TabBarIcon from '@/components/TabBarIcon';
import theme from '@/constants/theme';

import HomeScreen from '@/screens/home/HomeScreen';
import ProductScreen from '@/screens/products/ProductScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const resolveScreen = (route) => {
  switch (route) {
    case TabRoutes.HOME:
      return HomeScreen;
    case TabRoutes.PRODUCTS:
      return ProductScreen;
    case TabRoutes.PROFILE:
      return ProfileScreen;
    default:
      return HomeScreen;
  }
};

const buildTabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => (
    <TabBarIcon route={route.name} focused={focused} color={color} size={size} />
  ),
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: theme.colors.textMuted,
  tabBarLabelStyle: {
    fontSize: theme.typography.fontSizeSM,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginBottom: 4,
  },
  tabBarStyle: {
    height: theme.tabBar.height,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 6,
    elevation: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabBarItemStyle: {
    paddingVertical: 2,
  },
  headerShown: false,
});

const TAB_ROUTES = [TabRoutes.HOME, TabRoutes.PRODUCTS, TabRoutes.PROFILE];

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={buildTabScreenOptions}>
      {TAB_ROUTES.map((route) => (
        <Tab.Screen
          key={route}
          name={route}
          component={resolveScreen(route)}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;