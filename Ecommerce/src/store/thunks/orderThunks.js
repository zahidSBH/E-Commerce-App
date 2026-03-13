import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveOrder,
  fetchOrders,
  fetchAllOrders,
  updateOrderStatus,
  fetchTotalOrderCount,
} from "@/services/orderService";

export const fetchOrdersHistory = createAsyncThunk(
  "order/fetchHistory",
  async (
    { uid, pageSize = 5, isRefresh = false } = {},
    { rejectWithValue, getState }
  ) => {
    const currentLastVisible = isRefresh
      ? null
      : getState().order.lastVisible;

    const { data, lastVisible: nextLastVisible, error } = await fetchOrders({
      uid,
      pageSize,
      lastVisible: currentLastVisible,
    });

    if (error) return rejectWithValue(error);
    return { data, lastVisible: nextLastVisible, isRefresh };
  }
);

export const fetchAllAdminOrders = createAsyncThunk(
  "order/fetchAllAdminOrders",
  async (payload = {}, { rejectWithValue }) => {
    const { data, error } = await fetchAllOrders();
    if (error) return rejectWithValue(error);
    return data;
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, status } = {}, { rejectWithValue }) => {
    const { data, error } = await updateOrderStatus(orderId, status);
    if (error) return rejectWithValue(error);
    return data;
  }
);

export const savePlacedOrder = createAsyncThunk(
  "order/saveOrder",
  async ({ uid = "", orderData = {} } = {}, { rejectWithValue }) => {
    const { data, error } = await saveOrder({ uid, orderData });
    if (error) return rejectWithValue(error);
    return data;
  }
);

export const fetchOrderCount = createAsyncThunk(
  "order/fetchCount",
  async ({ uid = "" } = {}, { rejectWithValue }) => {
    const { data, error } = await fetchTotalOrderCount({ uid });
    if (error) return rejectWithValue(error);
    return data;
  }
);