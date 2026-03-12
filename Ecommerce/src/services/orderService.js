import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import createOrderModel from "@/models/orderModel";
import { convertTimestamp } from "@/utils/serializationHelpers";

const ORDERS_COLLECTION = "orders";

 
const saveOrder = async ({ uid = "", orderData = {} } = {}) => {
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

    const serializableData = {
      ...orderData,
      id: docRef.id,
      uid,
      createdAt: now,
      updatedAt: now,
    };

    return { data: serializableData, error: null };
  } catch (err) {
    console.error("Order service: saveOrder error:", err);
    return { data: null, error: "Failed to place order. Please try again." };
  }
};

const fetchOrders = async ({ uid = "" } = {}) => {
  if (!uid) return { data: [], error: "Unauthorized: User ID required." };

  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return createOrderModel({
          ...data,
          id: doc.id,
          createdAt: convertTimestamp(data.createdAt),
          updatedAt: convertTimestamp(data.updatedAt),
        });
      })
      .sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));

    return { data: orders, error: null };
  } catch (err) {
    console.error("Order service: fetchOrders error:", err);
    return { data: [], error: "Failed to fetch order history." };
  }
};

const fetchAllOrders = async () => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return createOrderModel({
        ...data,
        id: doc.id,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      });
    });

    return { data: orders, error: null };
  } catch (err) {
    console.error("Order service: fetchAllOrders error:", err);
    return { data: [], error: "Failed to fetch all orders." };
  }
};
 
const updateOrderStatus = async (orderId, status) => {
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
    console.error("Order service: updateOrderStatus error:", err);
    return { data: null, error: "Failed to update order status." };
  }
};

export { saveOrder, fetchOrders, fetchAllOrders, updateOrderStatus };
