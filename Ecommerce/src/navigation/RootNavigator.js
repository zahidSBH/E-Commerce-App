import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "@/config/firebase";
import {
  fetchProfile,
  clearProfile,
  setProfile,
  selectUserProfile,
} from "@/store/slices/userSlice";
import { createUserProfile } from "@/services/userService";
import { getWishlist } from "@/store/thunks/wishlistThunks";
import { fetchOrderCount } from "@/store/thunks/orderThunks";
import { clearHistory } from "@/store/slices/orderSlice";
import { clearWishlistState } from "@/store/slices/wishlistSlice";
import { clearCart } from "@/store/slices/cartSlice";

import AuthState from "@/enums/AuthState";
import UserRole from "@/enums/UserRole";
import AuthNavigator from "@/navigation/AuthNavigator";
import MainNavigator from "@/navigation/MainNavigator";
import AdminNavigator from "@/navigation/AdminNavigator";
import theme from "@/constants/theme";

const resolveNavigator = (role = UserRole.USER) => {
  switch (role) {
    case UserRole.ADMIN:
      return <AdminNavigator />;
    default:
      return <MainNavigator />;
  }
};

const RootNavigator = () => {
  const [authState, setAuthState] = useState(AuthState.LOADING);
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);

  const syncUserProfile = async (user = null) => {
    if (!user?.uid) return null;

    const result = await dispatch(fetchProfile({ uid: user.uid }));

    if (result.meta.requestStatus === "rejected") {
      const { data } = await createUserProfile({
        uid: user.uid,
        fullName: user.displayName ?? "",
        email: user.email ?? "",
      });
      if (data) {
        dispatch(setProfile(data));
        return data;
      }
      return null;
    }

     
    await Promise.allSettled([
      dispatch(getWishlist({ uid: user.uid })),
      dispatch(fetchOrderCount({ uid: user.uid })),
    ]);

    return result.payload ?? null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profileData = await syncUserProfile(user);

        if (profileData?.isDisabled) {
          await signOut(auth);
          dispatch(clearProfile());
          dispatch(clearHistory());
          dispatch(clearWishlistState());
          dispatch(clearCart());
          setAuthState(AuthState.DISABLED);
          return;
        }

        setAuthState(AuthState.AUTHENTICATED);
      } else {
        setAuthState((prev) => {
          if (prev === AuthState.DISABLED) return AuthState.DISABLED;
          dispatch(clearProfile());
          dispatch(clearHistory());
          dispatch(clearWishlistState());
          dispatch(clearCart());
          return AuthState.UNAUTHENTICATED;
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (authState === AuthState.LOADING) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (authState === AuthState.AUTHENTICATED) {
    return resolveNavigator(profile?.role);
  }

  return <AuthNavigator disabledError={authState === AuthState.DISABLED} />;
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
