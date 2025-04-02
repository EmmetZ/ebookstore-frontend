import React from "react";
import { useOrders } from "../hook/order";
import OrderList from "../components/order_list";

const OrderPage: React.FC = () => {
  const { data, isPending, error } = useOrders();

  if (isPending || error) {
    return null;
  }

  return <OrderList orders={data} />;
};

export default OrderPage;
