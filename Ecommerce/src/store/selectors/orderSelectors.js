import { createSelector } from "@reduxjs/toolkit";

export const selectAddress = (state) => state.order?.address;
export const selectPaymentMethod = (state) => state.order?.paymentMethod;
export const selectTransactionId = (state) => state.order?.transactionId;
export const selectCurrentOrder = (state) => state.order?.currentOrder;
export const selectOrderHistory = (state) => state.order?.history ?? [];
export const selectOrderStatus = (state) => state.order?.status;
export const selectOrderError = (state) => state.order?.error;
export const selectHasMoreOrders = (state) => state.order?.hasMore;
export const selectTotalOrderCount = (state) =>
  state.order?.totalOrderCount ?? state.order?.history?.length ?? 0;
export const selectLastVisibleOrder = (state) => state.order?.lastVisible;
export const selectAdminOrders = (state) => state.order?.adminOrders ?? [];

export const selectOrderById = createSelector(
  [selectAdminOrders, (state, orderId) => orderId],
  (adminOrders = [], orderId = "") => adminOrders.find((o) => o?.id === orderId) ?? null
);
