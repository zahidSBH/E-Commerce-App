import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import createUserModel from "@/models/userModel";
import { convertTimestamp } from "@/utils/serializationHelpers";

const USERS_COLLECTION = "users";

const createUserProfile = async ({
  uid = "",
  fullName = "",
  email = "",
} = {}) => {
  if (!uid) {
    return { data: null, error: "Invalid user id." };
  }

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const existingUser = await getDoc(userRef);

    if (existingUser.exists()) {
      const data = existingUser.data() || {};
      return {
        data: createUserModel({
          ...data,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        }),
        error: null,
      };
    }

    const now = new Date().toISOString();
    const userProfile = createUserModel({
      uid,
      fullName,
      email,
      avatarUrl: null,
      createdAt: now,
      updatedAt: now,
    });

    const firestoreData = {
      uid,
      fullName,
      email,
      avatarUrl: null,
      role: userProfile.role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, firestoreData);

    return { data: userProfile, error: null };
  } catch (err) {
    console.error("Create user profile error:", err);
    return { data: null, error: "Failed to create user profile." };
  }
};

const fetchUserProfile = async ({ uid = "" } = {}) => {
  if (!uid) {
    return { data: null, error: "Invalid user id." };
  }

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return { data: null, error: "User profile not found." };
    }

    const data = userSnap.data() || {};
    return {
      data: createUserModel({
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      }),
      error: null,
    };
  } catch (err) {
    console.error("Fetch user profile error:", err);
    return { data: null, error: "Failed to fetch user profile." };
  }
};

const updateUserProfile = async ({ uid = "", payload = {} } = {}) => {
  if (!uid) {
    return { error: "Invalid user id." };
  }

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);

    const sanitizedPayload = {
      ...payload,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(userRef, sanitizedPayload);

    return { error: null };
  } catch (err) {
    console.error("Update user profile error:", err);
    return { error: "Failed to update user profile." };
  }
};

export { createUserProfile, fetchUserProfile, updateUserProfile };
