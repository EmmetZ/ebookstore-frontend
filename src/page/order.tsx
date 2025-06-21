import { BarChartOutlined } from "@ant-design/icons";
import { Flex, FloatButton, Tooltip, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import OrderList from "../components/order_list";
import { Role } from "../types";

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
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
      <OrderList type={Role.USER} />
      <Tooltip title="查看订单统计信息">
        <FloatButton
          onClick={() => navigate("/order/statistics")}
          icon={<BarChartOutlined />}
          type="primary"
          style={{ insetInlineEnd: 48 }}
        />
      </Tooltip>
    </div>
  );
};

export default OrderPage;
