import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import AppConstants from "@/constants/AppConstants";

const DEFAULT_STATE = {
  loading: false,
  error: null,
};

const resolveFirebaseError = (code) => {
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

const validateSignUpPayload = ({ fullName, email, password }) => {
  if (
    !fullName ||
    typeof fullName !== "string" ||
    fullName.trim().length === 0
  ) {
    return "Full name is required.";
  }
  if (fullName.trim().length < AppConstants.FULL_NAME_MIN_LENGTH) {
    return `Full name must be at least ${AppConstants.FULL_NAME_MIN_LENGTH} characters.`;
  }
  if (fullName.trim().length > AppConstants.FULL_NAME_MAX_LENGTH) {
    return `Full name must be less than ${AppConstants.FULL_NAME_MAX_LENGTH} characters.`;
  }
  if (!AppConstants.FULL_NAME_PATTERN.test(fullName.trim())) {
    return "Full name can only contain letters and spaces.";
  }
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return "Email address is required.";
  }
  if (!AppConstants.EMAIL_PATTERN.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!password || typeof password !== "string" || password.length === 0) {
    return "Password is required.";
  }
  if (password.length < AppConstants.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${AppConstants.PASSWORD_MIN_LENGTH} characters.`;
  }
  if (!AppConstants.PASSWORD_PATTERN.test(password)) {
    return "Password must contain at least one uppercase letter and one number.";
  }
  return null;
};

const validateLoginPayload = ({ email, password }) => {
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    return "Email address is required.";
  }
  if (!AppConstants.EMAIL_PATTERN.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!password || typeof password !== "string" || password.length === 0) {
    return "Password is required.";
  }
  if (password.length < AppConstants.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${AppConstants.PASSWORD_MIN_LENGTH} characters.`;
  }
  return null;
};

const useAuth = () => {
  const [loading, setLoading] = useState(DEFAULT_STATE.loading);
  const [error, setError] = useState(DEFAULT_STATE.error);

  const clearError = () => setError(null);

  const signUp = async ({ fullName = "", email = "", password = "" }) => {
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

  const login = async ({ email = "", password = "" }) => {
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
