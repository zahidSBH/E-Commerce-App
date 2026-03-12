import PaymentMethod from "@/enums/PaymentMethod";
import OrderStatus from "@/enums/OrderStatus";

const DEFAULT_ORDER_MODEL = Object.freeze({
  invoiceNumber: "",
  items: [],
  address: {
    fullName: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
  },
  paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
  transactionId: "",
  subtotal: 0,
  deliveryFee: 0,
  total: 0,
  status: OrderStatus.PENDING,
  estimatedDelivery: "",
  placedAt: "",
});

const generateInvoiceNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `INV-${timestamp}-${random}`;
};

const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toDateString();
};

const createOrderModel = (data = {}) => ({
  ...DEFAULT_ORDER_MODEL,
  ...data,
  invoiceNumber: data.invoiceNumber || generateInvoiceNumber(),
  estimatedDelivery: data.estimatedDelivery || getEstimatedDelivery(),
  placedAt: data.placedAt || new Date().toISOString(),
});

export { DEFAULT_ORDER_MODEL, generateInvoiceNumber, getEstimatedDelivery };
export default createOrderModel;
