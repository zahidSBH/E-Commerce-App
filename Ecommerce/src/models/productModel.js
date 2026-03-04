const DEFAULT_PRODUCT_MODEL = Object.freeze({
  id: "",
  name: "",
  description: "",
  price: 0,
  originalPrice: 0,
  discount: 0,
  category: "",
  rating: 0,
  reviewCount: 0,
  imageUrl: "",
  images: [],
  isFeatured: false,
  isNew: false,
  inStock: true,
  tags: [],
});

const createProductModel = (data = {}) => ({
  ...DEFAULT_PRODUCT_MODEL,
  ...data,
});

export { DEFAULT_PRODUCT_MODEL };
export default createProductModel;
