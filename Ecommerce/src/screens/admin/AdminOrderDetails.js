import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import theme from "@/constants/theme";
import ScreenHeader from "@/components/common/ScreenHeader";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import SuccessModal from "@/components/common/SuccessModal";
import ErrorModal from "@/components/common/ErrorModal";
import {
  selectOrderStatus,
  selectOrderById,
} from "@/store/selectors/orderSelectors";
import { updateOrder } from "@/store/thunks/orderThunks";
import useOrderCustomer from "@/hooks/useOrderCustomer";
import SliceStatus from "@/enums/SliceStatus";
import formatDate from "@/utils/formatDate";
 
import OrderCustomerCard from "@/components/admin/OrderCustomerCard";
import OrderItemsCard from "@/components/admin/OrderItemsCard";
import OrderShippingCard from "@/components/admin/OrderShippingCard";
import OrderStatusManager from "@/components/admin/OrderStatusManager";
import AdminOrderInfoCard from "@/components/admin/AdminOrderInfoCard";
import AdminOrderNotFound from "@/components/admin/AdminOrderNotFound";

const AdminOrderDetails = ({ route, navigation }) => {
  const orderId = route?.params?.orderId;
  const dispatch = useDispatch();
  const order = useSelector((state) => selectOrderById(state, orderId));
  const status = useSelector(selectOrderStatus);

  const { customer, loadingCustomer } = useOrderCustomer(order?.uid);

  const [selectedStatus, setSelectedStatus] = useState(order?.status);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 
  useEffect(() => {
    if (order?.status) {
      setSelectedStatus(order.status);
    }
  }, [order?.status]);

  if (!orderId || !order) {
    return <AdminOrderNotFound onBack={() => navigation.goBack()} />;
  }

  const handleUpdateStatus = () => {
    if (selectedStatus === order.status) return;
    setShowConfirmModal(true);
  };

  const confirmUpdateStatus = async () => {
    const result = await dispatch(
      updateOrder({ orderId, status: selectedStatus })
    );
    setShowConfirmModal(false);
    if (!result.error) {
      setShowSuccessModal(true);
    } else {
      setErrorMessage(result.error || "Failed to update order status.");
      setShowErrorModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Order Details"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <OrderCustomerCard customer={customer} loading={loadingCustomer} />

        <AdminOrderInfoCard order={order} />

        <OrderStatusManager
          currentStatus={order.status}
          selectedStatus={selectedStatus}
          onStatusSelect={setSelectedStatus}
          onUpdateStatus={handleUpdateStatus}
          updateStatus={status}
        />

        <OrderItemsCard items={order.items} total={order.total} />

        <OrderShippingCard address={order.address} />
      </ScrollView>

      <ConfirmationModal
        visible={showConfirmModal}
        title="Update Status"
        message={`Are you sure you want to update the status to ${selectedStatus}?`}
        onConfirm={confirmUpdateStatus}
        onClose={() => setShowConfirmModal(false)}
        loading={status === SliceStatus.LOADING}
        confirmLabel="Update"
      />

      <SuccessModal
        visible={showSuccessModal}
        message="Order status has been updated successfully."
        onClose={() => setShowSuccessModal(false)}
      />

      <ErrorModal
        visible={showErrorModal}
        message={errorMessage}
        onClose={() => setShowErrorModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl * 2,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdminOrderDetails;
