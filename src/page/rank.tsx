import { Typography } from "antd";
import React from "react";
import RankChart from "../components/rank_chart";
import useBookRank from "../hook/rank";

const RankPage: React.FC = () => {
  const { data: rank, isPending, error } = useBookRank();
  if (isPending || error) {
    return null;
  }
  const data = rank.map((item) => ({
    title: item.title,
    sales: item.sales,
  }));

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "1360px",
          margin: " 0 auto",
        }}
      >
        <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
          销量
        </Typography.Title>
      </div>
      <RankChart data={data} />
    </>
  );
};

export default RankPage;
