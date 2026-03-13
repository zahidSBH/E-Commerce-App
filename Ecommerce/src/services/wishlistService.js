import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const WISHLIST_COLLECTION = "wishlist";
 
export const fetchWishlist = async (uid = "") => {
  if (!uid) return { data: [], error: "User ID required." };

  try {
    const wishlistRef = collection(db, WISHLIST_COLLECTION);
    const q = query(wishlistRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    const items = querySnapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      wishlistId: docSnap.id,  
    }));

    return { data: items, error: null };
  } catch (err) {
    console.error("Wishlist service: fetchWishlist error:", err);
    return { data: [], error: "Failed to fetch wishlist." };
  }
};

 
export const addToWishlist = async (uid = "", product = {}) => {
  if (!uid || !product.id) return { data: null, error: "Invalid parameters." };

  try {
    
    const docId = `${uid}_${product.id}`;
    const wishlistDocRef = doc(db, WISHLIST_COLLECTION, docId);

    const wishlistData = {
      ...product,
      uid,
      addedAt: serverTimestamp(),
    };

    await setDoc(wishlistDocRef, wishlistData);

    return { data: { ...wishlistData, wishlistId: docId }, error: null };
  } catch (err) {
    console.error("Wishlist service: addToWishlist error:", err);
    return { data: null, error: "Failed to add to wishlist." };
  }
};

 
export const removeFromWishlist = async (uid = "", productId = "") => {
  if (!uid || !productId) return { success: false, error: "Invalid parameters." };

  try {
    const docId = `${uid}_${productId}`;
    const wishlistDocRef = doc(db, WISHLIST_COLLECTION, docId);
    await deleteDoc(wishlistDocRef);

    return { success: true, error: null };
  } catch (err) {
    console.error("Wishlist service: removeFromWishlist error:", err);
    return { success: false, error: "Failed to remove from wishlist." };
  }
};
