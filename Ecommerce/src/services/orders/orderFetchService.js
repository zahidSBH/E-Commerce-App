import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { mapSnapshotToOrder } from "./orderMapper";

const ORDERS_COLLECTION = "orders";

 
export const fetchOrders = async ({ uid = "", pageSize = 5, lastVisible = null } = {}) => {
  if (!uid) {
    return { data: [], lastVisible: null, error: "Unauthorized: User ID required." };
  }

  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    let q;

    if (lastVisible) {
      q = query(
        ordersRef,
        where("uid", "==", uid),
        orderBy("placedAt", "desc"),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      q = query(
        ordersRef,
        where("uid", "==", uid),
        orderBy("placedAt", "desc"),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const orders = querySnapshot.docs.map(mapSnapshotToOrder);

    return { data: orders, lastVisible: lastDoc, error: null };
  } catch (err) {
    console.error("Order fetch service: fetchOrders error:", err);
    if (err.message?.includes("index")) {
      return {
        data: [],
        lastVisible: null,
        error: "This feature requires a Firestore index. Please check the terminal for the link to create it.",
      };
    }
    return { data: [], lastVisible: null, error: "Failed to fetch order history." };
  }
};

export const fetchAllOrders = async () => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(mapSnapshotToOrder);

    return { data: orders, error: null };
  } catch (err) {
    console.error("Order fetch service: fetchAllOrders error:", err);
    return { data: [], error: "Failed to fetch all orders." };
  }
};

 
export const fetchTotalOrderCount = async ({ uid = "" } = {}) => {
  if (!uid) return { data: 0, error: "Unauthorized: User ID required." };

  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, where("uid", "==", uid));
    const snapshot = await getCountFromServer(q);

    return { data: snapshot.data().count, error: null };
  } catch (err) {
    console.error("Order fetch service: fetchTotalOrderCount error:", err);
    return { data: 0, error: "Failed to fetch order count." };
  }
};
