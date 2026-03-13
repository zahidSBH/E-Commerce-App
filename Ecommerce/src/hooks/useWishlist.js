import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserProfile from "./useUserProfile";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/store/thunks/wishlistThunks";
import {
  selectWishlistItems,
  selectWishlistStatus,
  selectWishlistError,
  selectIsInWishlist,
} from "@/store/selectors/wishlistSelectors";

const useWishlist = () => {
  const dispatch = useDispatch();
  const { uid } = useUserProfile();

  const items = useSelector(selectWishlistItems);
  const status = useSelector(selectWishlistStatus);
  const error = useSelector(selectWishlistError);

  const fetchItems = useCallback(() => {
    if (uid) {
      dispatch(getWishlist({ uid }));
    }
  }, [dispatch, uid]);

  const toggleWishlist = useCallback(
    (product = {}) => {
      if (!uid || !product.id) return;

      const isInWishlist = items.some((item) => item.id === product.id);

      if (isInWishlist) {
        dispatch(removeFromWishlist({ uid, productId: product.id }));
      } else {
        dispatch(addToWishlist({ uid, product }));
      }
    },
    [dispatch, uid, items]
  );

  const isItemInWishlist = useCallback(
    (productId = "") => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  return {
    items,
    status,
    error,
    fetchItems,
    toggleWishlist,
    isItemInWishlist,
  };
};

export default useWishlist;
