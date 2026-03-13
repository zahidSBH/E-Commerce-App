import {
  fetchOrders,
  fetchAllOrders,
  fetchTotalOrderCount,
} from "./orders/orderFetchService";
import { saveOrder, updateOrderStatus } from "./orders/orderMutationService";

export {
  saveOrder,
  fetchOrders,
  fetchAllOrders,
  updateOrderStatus,
  fetchTotalOrderCount,
};