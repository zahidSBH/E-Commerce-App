import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import AppConstants from "@/constants/AppConstants";
import {
  validateSignUpPayload,
  validateLoginPayload,
} from "@/utils/authPayloadValidators";
import { fetchUserProfile } from "@/services/userService";

const DEFAULT_STATE = {
  loading: false,
  error: null,
};

const resolveFirebaseError = (code = "") => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const useAuth = () => {
  const [loading, setLoading] = useState(DEFAULT_STATE.loading);
  const [error, setError] = useState(DEFAULT_STATE.error);

  const clearError = () => setError(null);

  const signUp = async ({ fullName = "", email = "", password = "" } = {}) => {
    const validationError = validateSignUpPayload({
      fullName,
      email,
      password,
    });
    if (validationError) {
      setError(validationError);
      return { user: null, error: validationError };
    }

    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: fullName.trim(),
      });
      return { user: userCredential.user, error: null };
    } catch (err) {
      const message = resolveFirebaseError(err.code);
      setError(message);
      return { user: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email = "", password = "" } = {}) => {
    const validationError = validateLoginPayload({ email, password });
    if (validationError) {
      setError(validationError);
      return { user: null, error: validationError };
    }

    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const { data: profile, error: profileError } = await fetchUserProfile({
        uid: userCredential.user.uid,
      });

      if (profileError) {
        await signOut(auth);
        const message = "Failed to verify account. Please try again.";
        setError(message);
        return { user: null, error: message };
      }

      if (profile?.isDisabled) {
        await signOut(auth);
        const message =
          "Your account has been disabled. Please contact support.";
        setError(message);
        return { user: null, error: message };
      }

      return { user: userCredential.user, error: null };
    } catch (err) {
      const message = resolveFirebaseError(err.code);
      setError(message);
      return { user: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      return { error: null };
    } catch (err) {
      const message = resolveFirebaseError(err.code);
      setError(message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clearError,
    signUp,
    login,
    logout,
  };
};

export default useAuth;
