import { DatePicker, Empty, Flex, List, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Order } from "../types";
import OrderListItem from "./order_item";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

interface Props {
  orders: Order[];
}

const { RangePicker } = DatePicker;

const OrderList: React.FC<Props> = ({ orders }) => {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

  useEffect(() => {
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      setFilteredOrders(orders);
      return;
    }

    const startDate = dateRange[0].startOf("day");
    const endDate = dateRange[1].endOf("day");

    const filtered = orders.filter((order) => {
      const orderDate = dayjs(order.createdAt);
      return orderDate.isAfter(startDate) && orderDate.isBefore(endDate);
    });

    setFilteredOrders(filtered);
  }, [orders, dateRange]);

  const handleDateChange: RangePickerProps["onChange"] = (dates) => {
    setDateRange(dates);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1360px",
        margin: " 0 auto",
      }}
    >
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
          我的订单
        </Typography.Title>
        <div>
          <Typography.Text>筛选订单:</Typography.Text>
          <RangePicker
            onChange={handleDateChange}
            placeholder={["开始日期", "结束日期"]}
            allowClear
            style={{ marginLeft: "10px" }}
          />
        </div>
      </Flex>
      <List
        dataSource={filteredOrders}
        renderItem={(order) => (
          <List.Item key={order.id}>
            <OrderListItem order={order} />
          </List.Item>
        )}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="没有找到符合条件的订单"
            />
          ),
        }}
      />
    </div>
  );
};

export default OrderList;
