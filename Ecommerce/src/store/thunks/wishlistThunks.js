import { createAsyncThunk } from "@reduxjs/toolkit";
import * as wishlistService from "@/services/wishlistService";

export const getWishlist = createAsyncThunk(
  "wishlist/fetch",
  async ({ uid = "" } = {}, { rejectWithValue }) => {
    const { data, error } = await wishlistService.fetchWishlist(uid);
    if (error) return rejectWithValue(error);
    return data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async ({ uid = "", product = {} } = {}, { rejectWithValue }) => {
    const { data, error } = await wishlistService.addToWishlist(uid, product);
    if (error) return rejectWithValue(error);
    return data;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async ({ uid = "", productId = "" } = {}, { rejectWithValue }) => {
    const { success, error } = await wishlistService.removeFromWishlist(uid, productId);
    if (error) return rejectWithValue(error);
    return productId;  
  }
);
