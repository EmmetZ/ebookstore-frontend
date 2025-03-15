import { Col, Flex, Row, Space, Spin, Typography } from "antd";
import React from "react";
import { useUser } from "../hook/user";
import Introduction from "./intro";
import ProfileAvatar from "./profile_avatar";

interface Props {
  userId: string;
}

const OtherUserProfile: React.FC<Props> = ({ userId }) => {
  const { data: user, isLoading } = useUser(userId);
  if (isLoading) {
    return <Spin />;
  }

  return (
    <Row justify="center" gutter={96} style={{ margin: "0 20px" }}>
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
              <Introduction user={user} />
            </Space>
          </Col>
        </>
      )}
    </Row>
  );
};

export default OtherUserProfile;
