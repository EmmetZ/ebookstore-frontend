import { Bar, PlotEvent } from "@ant-design/charts";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Empty,
  Flex,
  Space,
  Statistic,
  Typography,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useStatistics } from "../hook/order";

const { RangePicker } = DatePicker;

const StatisticPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("start") || undefined;
  const endDate = searchParams.get("end") || undefined;

  const { data, isPending, error } = useStatistics(startDate, endDate);

  if (isPending || error) {
    return null;
  }

  const handleDateChange: RangePickerProps["onChange"] = (dates) => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      const start = dates[0].format("YYYY-MM-DD");
      const end = dates[1].format("YYYY-MM-DD");

      setSearchParams(
        {
          start: start,
          end: end,
        },
        { replace: true }
      );
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  console.log("data", data);

  return (
    <div>
      <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
        统计信息
      </Typography.Title>

      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "20px" }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
        <RangePicker
          value={
            startDate && endDate
              ? [dayjs(startDate), dayjs(endDate)]
              : undefined
          }
          onChange={handleDateChange}
          style={{ width: "300px" }}
        />
      </Flex>
      {data.length === 0 ? (
        <Empty />
      ) : (
        <>
          <Bar
            title={{
              title:
                startDate && endDate
                  ? `${startDate} - ${endDate} 购买量统计`
                  : "全部购买量统计",
              align: "center",
            }}
            data={data}
            xField="title"
            yField="number"
            tooltip={{
              items: [
                {
                  name: "购买量",
                  channel: "y",
                },
              ],
            }}
            onReady={({ chart }) => {
              chart.on("element:click", (e: PlotEvent) => {
                navigate(`/book/${e.data.data.id}`);
              });
            }}
          />
          <Space style={{ marginLeft: "20px" }}>
            <Statistic
              title="总购买量"
              valueStyle={{ fontSize: "24px" }}
              value={data.reduce((acc, item) => acc + item.number, 0)}
              suffix="本"
            />
            <Divider type="vertical" style={{ padding: "10px" }} />
            <Statistic
              title="总销售额"
              valueStyle={{ fontSize: "24px" }}
              value={data.reduce(
                (acc, item) => acc + (item.number * item.price) / 100,
                0
              )}
              prefix="¥"
            />
          </Space>
        </>
      )}
    </div>
  );
};

export default StatisticPage;
