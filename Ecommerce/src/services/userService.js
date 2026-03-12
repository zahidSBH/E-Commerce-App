 
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import createUserModel from '@/models/userModel';
import createOrderModel from '@/models/orderModel';
import UserRole from '@/enums/UserRole';
import { convertTimestamp } from '@/utils/serializationHelpers';

const USERS_COLLECTION = 'users';
const ORDERS_COLLECTION = 'orders';

const sanitizeUser = (data = {}) =>
  createUserModel({
    ...data,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  });

const sanitizeOrder = (docSnap = {}) => {
  const data = docSnap.data?.() ?? {};
  return createOrderModel({
    ...data,
    id: docSnap.id,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt),
  });
};

const createUserProfile = async ({
  uid = '',
  fullName = '',
  email = '',
} = {}) => {
  if (!uid) return { data: null, error: 'Invalid user id.' };

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const existingUser = await getDoc(userRef);

    if (existingUser.exists()) {
      return { data: sanitizeUser(existingUser.data()), error: null };
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
      isDisabled: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, firestoreData);
    return { data: userProfile, error: null };
  } catch (err) {
    console.error('Create user profile error:', err);
    return { data: null, error: 'Failed to create user profile.' };
  }
};

const fetchUserProfile = async ({ uid = '' } = {}) => {
  if (!uid) return { data: null, error: 'Invalid user id.' };

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return { data: null, error: 'User profile not found.' };
    }

    return { data: sanitizeUser(userSnap.data()), error: null };
  } catch (err) {
    console.error('Fetch user profile error:', err);
    return { data: null, error: 'Failed to fetch user profile.' };
  }
};

const fetchAllUsers = async () => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const snapshot = await getDocs(usersRef);
    const users = snapshot.docs.map((d) => sanitizeUser(d.data()));
    return { data: users, error: null };
  } catch (err) {
    console.error('Fetch all users error:', err);
    return { data: null, error: 'Failed to fetch users.' };
  }
};

const fetchUserOrders = async ({ uid = '' } = {}) => {
  if (!uid) return { data: [], error: 'Invalid user id.' };

  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    const orders = snapshot.docs
      .map(sanitizeOrder)
      .sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
    return { data: orders, error: null };
  } catch (err) {
    console.error('Fetch user orders error:', err);
    return { data: [], error: 'Failed to fetch user orders.' };
  }
};

const updateUserProfile = async ({ uid = '', payload = {} } = {}) => {
  if (!uid) return { error: 'Invalid user id.' };

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, { ...payload, updatedAt: serverTimestamp() });
    return { error: null };
  } catch (err) {
    console.error('Update user profile error:', err);
    return { error: 'Failed to update user profile.' };
  }
};

const updateUserRole = async ({ uid = '', role = UserRole.USER } = {}) => {
  if (!uid) return { error: 'Invalid user id.' };
  if (!Object.values(UserRole).includes(role)) return { error: 'Invalid role.' };

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, { role, updatedAt: serverTimestamp() });
    return { error: null };
  } catch (err) {
    console.error('Update user role error:', err);
    return { error: 'Failed to update user role.' };
  }
};

const toggleUserStatus = async ({ uid = '', isDisabled = false } = {}) => {
  if (!uid) return { error: 'Invalid user id.' };

  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, { isDisabled, updatedAt: serverTimestamp() });
    return { error: null };
  } catch (err) {
    console.error('Toggle user status error:', err);
    return { error: 'Failed to update user status.' };
  }
};

export {
  createUserProfile,
  fetchUserProfile,
  fetchAllUsers,
  fetchUserOrders,
  updateUserProfile,
  updateUserRole,
  toggleUserStatus,
};