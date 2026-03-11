import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "@/config/firebase";
import {
  fetchProfile,
  clearProfile,
  setProfile,
} from "@/store/slices/userSlice";
import { createUserProfile } from "@/services/userService";

import AuthState from "@/enums/AuthState";
import UserRole from "@/enums/UserRole";
import AuthNavigator from "@/navigation/AuthNavigator";
import MainNavigator from "@/navigation/MainNavigator";
import AdminNavigator from "@/navigation/AdminNavigator";
import theme from "@/constants/theme";
import { selectUserProfile } from "@/store/slices/userSlice";

const RootNavigator = () => {
  const [authState, setAuthState] = useState(AuthState.LOADING);
  const dispatch = useDispatch();

  const syncUserProfile = async (user = null) => {
    if (!user?.uid) return;

    const result = await dispatch(fetchProfile({ uid: user.uid }));

    if (result.meta.requestStatus === "rejected") {
      const { data } = await createUserProfile({
        uid: user.uid,
        fullName: user.displayName ?? "",
        email: user.email ?? "",
      });

      if (data) dispatch(setProfile(data));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await syncUserProfile(user);
        setAuthState(AuthState.AUTHENTICATED);
      } else {
        dispatch(clearProfile());
        setAuthState(AuthState.UNAUTHENTICATED);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const profile = useSelector(selectUserProfile);

  if (authState === AuthState.LOADING) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (authState === AuthState.AUTHENTICATED) {
    return profile?.role === UserRole.ADMIN ? (
      <AdminNavigator />
    ) : (
      <MainNavigator />
    );
  }

  return <AuthNavigator />;
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
