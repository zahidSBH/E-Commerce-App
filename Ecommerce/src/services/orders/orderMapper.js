import createOrderModel from "@/models/orderModel";
import { convertTimestamp } from "@/utils/serializationHelpers";

 
export const mapSnapshotToOrder = (docSnap) => {
  if (!docSnap?.exists()) return null;
  
  const raw = docSnap.data();
  return createOrderModel({
    ...raw,
    id: docSnap.id,
    createdAt: convertTimestamp(raw.createdAt),
    updatedAt: convertTimestamp(raw.updatedAt),
  });
};

 
export const mapDataToOrder = (id, raw) => {
  return createOrderModel({
    ...raw,
    id,
    createdAt: convertTimestamp(raw.createdAt),
    updatedAt: convertTimestamp(raw.updatedAt),
  });
};
