import { Flex, Typography } from "antd";
import OrderList from "../../components/order_list";
import { Role } from "../../types";

const AdminOrderPage: React.FC = () => {
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
          订单
        </Typography.Title>
      </Flex>
      <OrderList type={Role.ADMIN} />
    </div>
  );
};

export default AdminOrderPage;
