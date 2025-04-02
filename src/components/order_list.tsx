import React from "react";
import { Order } from "../types";
import { Collapse, List, Typography } from "antd";
import OrderListItem from "./order_item";

interface Props {
  orders: Order[];
}

const OrderList: React.FC<Props> = ({ orders }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1360px",
        margin: " 0 auto",
      }}
    >
      <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
        我的订单
      </Typography.Title>
      <List
        dataSource={orders}
        renderItem={(order) => (
          <List.Item key={order.id}>
            <OrderListItem order={order} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrderList;
