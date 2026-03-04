import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

const DEFAULT_STATE = {
  loading: false,
  error: null,
};

const resolveFirebaseError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

const useAuth = () => {
  const [loading, setLoading] = useState(DEFAULT_STATE.loading);
  const [error, setError] = useState(DEFAULT_STATE.error);

  const clearError = () => setError(null);

  const signUp = async ({ fullName = '', email = '', password = '' }) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      return { user: userCredential.user, error: null };
    } catch (err) {
      const message = resolveFirebaseError(err.code);
      setError(message);
      return { user: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email = '', password = '' }) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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