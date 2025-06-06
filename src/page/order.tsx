import React from "react";
import OrderList from "../components/order_list";
import { Flex, Typography } from "antd";

const OrderPage: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1360px",
        margin: "0 auto",
      }}
    >
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
          我的订单
        </Typography.Title>
      </Flex>
      <OrderList />
    </div>
  );
};

export default OrderPage;
