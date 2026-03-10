import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSearchQuery,
  clearFilters,
  selectAllProducts,
  selectFeaturedProducts,
  selectNewArrivals,
  selectFilteredProducts,
  selectSelectedCategory,
  selectSearchQuery,
} from "@/store/slices/productSlice";
import Category from "@/enums/Category";

const useProducts = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector(selectAllProducts);
  const featuredProducts = useSelector(selectFeaturedProducts);
  const newArrivals = useSelector(selectNewArrivals);
  const filteredProducts = useSelector(selectFilteredProducts);
  const selectedCategory = useSelector(selectSelectedCategory);
  const searchQuery = useSelector(selectSearchQuery);

  const filterByCategory = useCallback(
    (category = Category.ALL) => {
      dispatch(setCategory(category));
    },
    [dispatch]
  );

  const searchProducts = useCallback(
    (query = "") => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const getProductById = useCallback(
    (id = "") => allProducts.find((p) => p.id === id) ?? null,
    [allProducts]
  );

  return {
    allProducts,
    featuredProducts,
    newArrivals,
    filteredProducts,
    selectedCategory,
    searchQuery,
    filterByCategory,
    searchProducts,
    resetFilters,
    getProductById,
  };
};

export default useProducts;
