import { Col, Flex, Row, Space, Typography } from "antd";
import useMessage from "antd/es/message/useMessage";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useUserContext from "../context/user";
import AddressCard from "./address_card";
import BalanceCard from "./balance_card";
import ChangePasswordModal from "./change_password_modal";
import Introduction from "./intro";
import ProfileAvatar from "./profile_avatar";

const UserProfile: React.FC = () => {
  const { user, isLoading } = useUserContext();
  const [messageApi, contextHolder] = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      console.log(user);
      const msg = async () => await messageApi.error("请先登录!", 0.5);
      msg();
      navigate("/login");
    }
  }, [user, isLoading, messageApi, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <Row justify="center" gutter={96} style={{ margin: "0 20px" }}>
      {contextHolder}
      {user && (
        <>
          <Col span={8}>
            <Flex vertical align="flex-end">
              <Space direction="vertical">
                <ProfileAvatar user={user} />
                <Typography.Title
                  style={{
                    margin: "20px 0px 0px 20px",
                  }}
                  level={2}
                >
                  {user.nickname}
                </Typography.Title>
                <Typography.Title
                  level={4}
                  style={{ fontWeight: "normal", margin: "0 0 0 20px" }}
                >
                  {user.username}
                </Typography.Title>
              </Space>
            </Flex>
          </Col>
          <Col span={16}>
            <Space direction="vertical" style={{ marginTop: "30px" }}>
              <Introduction />
              <BalanceCard />
              <AddressCard />
              <ChangePasswordModal />
            </Space>
          </Col>
        </>
      )}
    </Row>
  );
};

export default UserProfile;
