const DEFAULT_CART_ITEM_MODEL = Object.freeze({
  id: "",
  productId: "",
  name: "",
  price: 0,
  imageUrl: "",
  quantity: 1,
  category: "",
});

const createCartItemModel = (data = {}) => ({
  ...DEFAULT_CART_ITEM_MODEL,
  ...data,
});

export { DEFAULT_CART_ITEM_MODEL };
export default createCartItemModel;
