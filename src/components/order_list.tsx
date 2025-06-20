import {
  DatePicker,
  Empty,
  Flex,
  Input,
  List,
  Pagination,
  Spin,
  Typography,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import React from "react";
import { useSearchParams } from "react-router";
import { useOrders } from "../hook/order";
import OrderListItem from "./order_item";
import { Role } from "../types";

const { RangePicker } = DatePicker;
const { Search } = Input;

interface Props {
  type: Role;
}

const OrderList: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const startDate = searchParams.get("start") || undefined;
  const endDate = searchParams.get("end") || undefined;
  const pageIndex =
    searchParams.get("page") != null ? parseInt(searchParams.get("page")!) : 0;
  const pageSize =
    searchParams.get("pageSize") != null
      ? parseInt(searchParams.get("pageSize")!)
      : 10;

  const {
    data: orders,
    isPending,
    error,
  } = useOrders(type, keyword, pageIndex, pageSize, startDate, endDate);

  const handleDateChange: RangePickerProps["onChange"] = (dates) => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      const start = dates[0].format("YYYY-MM-DD");
      const end = dates[1].format("YYYY-MM-DD");

      setSearchParams({
        keyword,
        start: start,
        end: end,
        page: "0",
        pageSize: pageSize.toString(),
      });
    } else {
      const params: Record<string, string> = {
        keyword,
        page: "0",
        pageSize: pageSize.toString(),
      };
      setSearchParams(params);
    }
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchParams({
      keyword: value,
      start: startDate || "",
      end: endDate || "",
      page: "0",
      pageSize: pageSize.toString(),
    });
  };

  const handlePageChange = (page: number, newPageSize: number) => {
    setSearchParams({
      keyword: keyword || "",
      start: startDate || "",
      end: endDate || "",
      page: (page - 1).toString(),
      pageSize: newPageSize.toString(),
    });
  };

  if (isPending) {
    return (
      <Spin
        size="large"
        tip="加载中..."
        style={{ width: "100%", margin: "40px 0" }}
      />
    );
  }

  if (error || !orders) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="获取订单失败" />
    );
  }

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "20px" }}
      >
        <Search
          placeholder="书籍名称"
          allowClear
          onSearch={handleSearch}
          style={{ width: 300 }}
          defaultValue={keyword}
        />

        <Flex align="center">
          <Typography.Text style={{ marginRight: "10px" }}>
            按日期筛选:
          </Typography.Text>
          <RangePicker
            onChange={handleDateChange}
            placeholder={["开始日期", "结束日期"]}
            allowClear
            style={{ marginRight: "10px" }}
            value={
              startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : null
            }
          />
        </Flex>
      </Flex>

      <List
        dataSource={orders.items}
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

      {orders.items.length > 0 && (
        <Flex justify="center" style={{ marginTop: "20px" }}>
          <Pagination
            current={pageIndex + 1}
            pageSize={pageSize}
            total={orders.total * pageSize}
            onChange={handlePageChange}
            showSizeChanger
          />
        </Flex>
      )}
    </>
  );
};

export default OrderList;
