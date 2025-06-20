import { Bar, PlotEvent } from "@ant-design/charts";
import { DatePicker, Tabs, TabsProps, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import React, { useState } from "react";

import { useNavigate } from "react-router";
import { useBookRank } from "../../hook/book";
import { useUsersConsumption } from "../../hook/user";

const { RangePicker } = DatePicker;

const AdminStatisticPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  const handleDateChange: RangePickerProps["onChange"] = (dates) => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      const start = dates[0].format("YYYY-MM-DD");
      const end = dates[1].format("YYYY-MM-DD");
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "book",
      label: "书籍",
      children: <BookRankBarPlot startDate={startDate} endDate={endDate} />,
    },
    {
      key: "user",
      label: "用户",
      children: <UserRankBarPlot startDate={startDate} endDate={endDate} />,
    },
  ];

  return (
    <div style={{ width: "90%", margin: "0 auto", minWidth: "800px" }}>
      <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
        统计
      </Typography.Title>
      <RangePicker
        onChange={handleDateChange}
        placeholder={["开始日期", "结束日期"]}
        allowClear
        style={{ marginRight: "10px" }}
        value={startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : null}
      />
      <Tabs
        destroyOnHidden
        defaultActiveKey="book"
        items={items}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

interface PlotProps {
  startDate?: string;
  endDate?: string;
}

const BookRankBarPlot: React.FC<PlotProps> = ({ startDate, endDate }) => {
  const { data, error, isPending } = useBookRank(startDate, endDate);
  const navigate = useNavigate();
  if (error || isPending) {
    return null;
  }

  return (
    <Bar
      data={data}
      xField="title"
      yField="sales"
      title={{
        align: "center",
        title: "图书销售情况",
      }}
      onReady={({ chart }) => {
        chart.on("element:click", (e: PlotEvent) => {
          navigate(`/book/${e.data.data.id}`);
        });
      }}
    />
  );
};

const UserRankBarPlot: React.FC<PlotProps> = ({ startDate, endDate }) => {
  const { data, error, isPending } = useUsersConsumption(startDate, endDate);
  const navigate = useNavigate();

  if (error || isPending) {
    return null;
  }

  const formattedData = data.map((item) => ({
    id: item.user.id,
    username: item.user.username,
    consumption: item.consumption / 100,
  }));
  console.log(formattedData);

  return (
    <Bar
      data={formattedData}
      xField="username"
      yField="consumption"
      title={{
        align: "center",
        title: "用户消费情况",
      }}
      onReady={({ chart }) => {
        chart.on("element:click", (e: PlotEvent) => {
          navigate(`/profile/${e.data.data.id}`);
        });
      }}
    />
  );
};

export default AdminStatisticPage;
