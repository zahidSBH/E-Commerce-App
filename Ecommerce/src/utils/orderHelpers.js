 
export const mergeOrderHistory = (existing = [], incoming = []) => {
  const existingIds = new Set(existing.map((o) => o?.id));
  const unique = incoming.filter((o) => !existingIds.has(o?.id));
  return [...existing, ...unique];
};

 
export const updateOrderInList = (list = [], updated = {}) => {
  if (!updated?.id) return list;
  return list.map((item) =>
    item.id === updated.id ? { ...item, ...updated } : item
  );
};
