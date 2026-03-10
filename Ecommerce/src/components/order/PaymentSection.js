import React from "react";
import Section from "@/components/order/Section";
import InfoRow from "@/components/order/InfoRow";

const PaymentSection = ({ paymentMethod = "", transactionId = "" }) => {
  return (
    <Section title="Payment">
      <InfoRow label="Method" value={paymentMethod} />
      {!!transactionId && (
        <InfoRow label="Transaction ID" value={transactionId} />
      )}
    </Section>
  );
};

export default PaymentSection;
