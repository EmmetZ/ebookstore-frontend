import { Card, Space, Statistic } from "antd";
import React from "react";
import useUserContext from "../context/user";

const BalanceCard: React.FC = () => {
  const { user } = useUserContext();

  return (
    user && (
      <Space>
        <Card style={{ marginTop: "20px", borderColor: "#d9d9d9" }}>
          <Statistic title="Account Balance (CNY)" value={user.balance} />
        </Card>
      </Space>
    )
  );
};

export default BalanceCard;
