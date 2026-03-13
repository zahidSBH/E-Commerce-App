import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import createOrderModel from "@/models/orderModel";

const ORDERS_COLLECTION = "orders";

 
export const saveOrder = async ({ uid = "", orderData = {} } = {}) => {
  if (!uid) return { data: null, error: "Unauthorized: User ID required." };

  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const now = new Date().toISOString();

    const firestoreData = {
      ...orderData,
      uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(ordersRef, firestoreData);

    const serializableData = createOrderModel({
      ...orderData,
      id: docRef.id,
      uid,
      createdAt: now,
      updatedAt: now,
    });

    return { data: serializableData, error: null };
  } catch (err) {
    console.error("Order mutation service: saveOrder error:", err);
    return { data: null, error: "Failed to place order. Please try again." };
  }
};

 
export const updateOrderStatus = async (orderId = "", status = "") => {
  if (!orderId || !status) return { data: null, error: "Missing parameters." };

  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const now = new Date().toISOString();

    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    return { data: { id: orderId, status, updatedAt: now }, error: null };
  } catch (err) {
    console.error("Order mutation service: updateOrderStatus error:", err);
    return { data: null, error: "Failed to update order status." };
  }
};
