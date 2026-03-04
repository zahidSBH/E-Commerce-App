import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/config/firebase";
import AuthNavigator from "@/navigation/AuthNavigator";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import theme from "@/constants/theme";

const AuthState = Object.freeze({
  LOADING: "LOADING",
  AUTHENTICATED: "AUTHENTICATED",
  UNAUTHENTICATED: "UNAUTHENTICATED",
});

const resolveNavigator = (authState) => {
  switch (authState) {
    case AuthState.AUTHENTICATED:
      return <MainTabNavigator />;
    case AuthState.UNAUTHENTICATED:
      return <AuthNavigator />;
    default:
      return null;
  }
};

const RootNavigator = () => {
  const [authState, setAuthState] = useState(AuthState.LOADING);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(user ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED);
    });
    return unsubscribe;
  }, []);

  const Loader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );

  if (authState === AuthState.LOADING) {
    return <Loader />;
  }

  return resolveNavigator(authState);
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
});

export default RootNavigator;
