import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthRoutes from "@/enums/AuthRoutes";
import LoginScreen from "@/screens/auth/LoginScreen";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import theme from "@/constants/theme";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.background,
  },
  headerTintColor: theme.colors.textPrimary,
  headerTitleStyle: {
    fontWeight: theme.typography.fontWeightSemiBold,
    fontSize: theme.typography.fontSizeLG,
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
};

const resolveScreen = (route) => {
  switch (route) {
    case AuthRoutes.LOGIN:
      return LoginScreen;
    case AuthRoutes.SIGN_UP:
      return SignUpScreen;
    default:
      return LoginScreen;
  }
};

const AUTH_STACK = [
  { name: AuthRoutes.LOGIN, title: "Login" },
  { name: AuthRoutes.SIGN_UP, title: "Create Account" },
];

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {AUTH_STACK.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={resolveScreen(screen.name)}
          options={{ title: screen.title }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
