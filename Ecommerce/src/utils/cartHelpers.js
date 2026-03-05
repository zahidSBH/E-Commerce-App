const findByProductId = (items = [], productId = "") =>
  items.find((item) => item.productId === productId);

const removeByProductId = (items = [], productId = "") =>
  items.filter((item) => item.productId !== productId);

export { findByProductId, removeByProductId };
