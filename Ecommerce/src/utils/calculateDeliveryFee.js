import { DELIVERY_FEE } from "@/constants/orderConstants";

const calculateDeliveryFee = (subtotal = 0) => {
  if (subtotal >= 50) return 0;
  return DELIVERY_FEE;
};

export default calculateDeliveryFee;
