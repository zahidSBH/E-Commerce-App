import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import productsData from "@/data/products.json";
import createProductModel from "@/models/productModel";
import Category from "@/enums/Category";
import SliceStatus from "@/enums/SliceStatus";
import * as productService from "@/services/productService";

const allProducts = productsData.map(createProductModel);

const initialState = {
  all: allProducts,
  featured: allProducts.filter((p) => p.isFeatured),
  newArrivals: allProducts.filter((p) => p.isNew),
  filtered: allProducts,
  selectedCategory: Category.ALL,
  searchQuery: "",
  status: SliceStatus.IDLE,
  error: null,
};

const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    const { data, error } = await productService.getProducts();
    if (error) return rejectWithValue(error);
    return data;
  }
);

const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    const { data, error } = await productService.addProduct(productData);
    if (error) return rejectWithValue(error);
    return data;
  }
);

const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, payload }, { rejectWithValue }) => {
    const { error } = await productService.updateProduct(id, payload);
    if (error) return rejectWithValue(error);
    return { id, ...payload };
  }
);

const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    const { error } = await productService.deleteProduct(id);
    if (error) return rejectWithValue(error);
    return id;
  }
);

const applyFilters = ({
  products = [],
  category = Category.ALL,
  query = "",
} = {}) => {
  let result = [...products];

  if (category && category !== Category.ALL) {
    result = result.filter((p) => p.category === category);
  }

  if (query && query.trim().length > 0) {
    const lowerQuery = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  }

  return result;
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload ?? Category.ALL;
      state.filtered = applyFilters({
        products: state.all,
        category: state.selectedCategory,
        query: state.searchQuery,
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload ?? "";
      state.filtered = applyFilters({
        products: state.all,
        category: state.selectedCategory,
        query: state.searchQuery,
      });
    },
    clearFilters: (state) => {
      state.selectedCategory = Category.ALL;
      state.searchQuery = "";
      state.filtered = state.all;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        
         
        const firestoreProducts = action.payload.map(createProductModel);
        const localProducts = productsData.map(createProductModel);
        
        const mergedMap = new Map();
        localProducts.forEach(p => mergedMap.set(p.id, p));
        firestoreProducts.forEach(p => mergedMap.set(p.id, p));
        
        const finalProducts = Array.from(mergedMap.values());
        
        state.all = finalProducts;
        state.featured = finalProducts.filter((p) => p.isFeatured);
        state.newArrivals = finalProducts.filter((p) => p.isNew);
        state.filtered = applyFilters({
          products: state.all,
          category: state.selectedCategory,
          query: state.searchQuery,
        });
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        const newProduct = createProductModel(action.payload);
        state.all.unshift(newProduct);
        state.filtered.unshift(newProduct);
        if (newProduct.isFeatured) state.featured.unshift(newProduct);
        if (newProduct.isNew) state.newArrivals.unshift(newProduct);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        const updatedData = action.payload;
        
        const updateArray = (arr) => {
          const index = arr.findIndex((p) => p.id === updatedData.id);
          if (index !== -1) {
            arr[index] = { ...arr[index], ...updatedData };
            return true;
          }
          return false;
        };

        updateArray(state.all);
        updateArray(state.filtered);
        
     
        const wasFeatured = state.featured.some(p => p.id === updatedData.id);
        const isFeatured = updatedData.isFeatured !== undefined ? updatedData.isFeatured : wasFeatured;
        
        if (isFeatured) {
          if (!wasFeatured) {
            const product = state.all.find(p => p.id === updatedData.id);
            state.featured.unshift(product);
          } else {
            updateArray(state.featured);
          }
        } else {
          state.featured = state.featured.filter(p => p.id !== updatedData.id);
        }
 
        const wasNew = state.newArrivals.some(p => p.id === updatedData.id);
        const isNew = updatedData.isNew !== undefined ? updatedData.isNew : wasNew;

        if (isNew) {
          if (!wasNew) {
            const product = state.all.find(p => p.id === updatedData.id);
            state.newArrivals.unshift(product);
          } else {
            updateArray(state.newArrivals);
          }
        } else {
          state.newArrivals = state.newArrivals.filter(p => p.id !== updatedData.id);
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        const id = action.payload;
        state.all = state.all.filter((p) => p.id !== id);
        state.filtered = state.filtered.filter((p) => p.id !== id);
        state.featured = state.featured.filter((p) => p.id !== id);
        state.newArrivals = state.newArrivals.filter((p) => p.id !== id);
      })
      .addMatcher(
        isAnyOf(
          fetchProducts.pending,
          addProduct.pending,
          updateProduct.pending,
          deleteProduct.pending
        ),
        (state) => {
          state.status = SliceStatus.LOADING;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchProducts.rejected,
          addProduct.rejected,
          updateProduct.rejected,
          deleteProduct.rejected
        ),
        (state, action) => {
          state.status = SliceStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export const selectAllProducts = (state) => state.product.all;
export const selectFeaturedProducts = (state) => state.product.featured;
export const selectNewArrivals = (state) => state.product.newArrivals;
export const selectFilteredProducts = (state) => state.product.filtered;
export const selectSelectedCategory = (state) => state.product.selectedCategory;
export const selectSearchQuery = (state) => state.product.searchQuery;
export const selectProductById = (id) => (state) =>
  state.product.all.find((p) => p.id === id) ?? null;

export const { setCategory, setSearchQuery, clearFilters } =
  productSlice.actions;

export { fetchProducts, addProduct, updateProduct, deleteProduct };

export default productSlice.reducer;
