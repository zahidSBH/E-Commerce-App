import { createSlice } from "@reduxjs/toolkit";
import { isAnyOf } from "@reduxjs/toolkit";
import productsData from "@/data/products.json";
import createProductModel from "@/models/productModel";
import Category from "@/enums/Category";
import SliceStatus from "@/enums/SliceStatus";

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
});

const selectAllProducts = (state) => state.product.all;
const selectFeaturedProducts = (state) => state.product.featured;
const selectNewArrivals = (state) => state.product.newArrivals;
const selectFilteredProducts = (state) => state.product.filtered;
const selectSelectedCategory = (state) => state.product.selectedCategory;
const selectSearchQuery = (state) => state.product.searchQuery;
const selectProductById = (id) => (state) =>
  state.product.all.find((p) => p.id === id) ?? null;

export const { setCategory, setSearchQuery, clearFilters } =
  productSlice.actions;
export {
  selectAllProducts,
  selectFeaturedProducts,
  selectNewArrivals,
  selectFilteredProducts,
  selectSelectedCategory,
  selectSearchQuery,
  selectProductById,
};
export default productSlice.reducer;
