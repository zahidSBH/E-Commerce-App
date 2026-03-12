import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthRoutes from "@/enums/AuthRoutes";
import LoginScreen from "@/screens/auth/LoginScreen";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import theme from "@/constants/theme";

const Stack = createNativeStackNavigator();

const DISABLED_ERROR =
  "Your account has been disabled. Please contact support.";

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

const buildLoginComponent =
  (disabledError = false) =>
  (props) => (
    <LoginScreen
      {...props}
      initialError={disabledError ? DISABLED_ERROR : null}
    />
  );

const AuthNavigator = ({ disabledError = false }) => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name={AuthRoutes.LOGIN}
      component={buildLoginComponent(disabledError)}
      options={{ title: "Login" }}
    />
    <Stack.Screen
      name={AuthRoutes.SIGN_UP}
      component={SignUpScreen}
      options={{ title: "Create Account" }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
