import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const PRODUCTS_COLLECTION = "products";

const getProducts = async () => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis?.() || Date.now(),
        updatedAt: data.updatedAt?.toMillis?.() || Date.now(),
      });
    });
    return { data: products, error: null };
  } catch (err) {
    console.error("Get products error:", err);
    return { data: [], error: "Failed to fetch products." };
  }
};

const addProduct = async (productData = {}) => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { data: { id: docRef.id, ...productData }, error: null };
  } catch (err) {
    console.error("Add product error:", err);
    return { data: null, error: "Failed to add product." };
  }
};

const updateProduct = async (id = "", payload = {}) => {
  if (!id) return { error: "Invalid product id." };
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(productRef, {
      ...payload,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (err) {
    console.error("Update product error:", err);
    return { error: "Failed to update product." };
  }
};

const deleteProduct = async (id = "") => {
  if (!id) return { error: "Invalid product id." };
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(productRef);
    return { error: null };
  } catch (err) {
    console.error("Delete product error:", err);
    return { error: "Failed to delete product." };
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct };
