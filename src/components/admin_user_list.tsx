import {
  Button,
  Col,
  Flex,
  List,
  Pagination,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import React from "react";
import { Link, useSearchParams } from "react-router";
import { useBanUser, useUsers } from "../hook/user";
import { AdminUser, Role } from "../types";
import UserAvatar from "./avatar";
import useMessage from "antd/es/message/useMessage";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  role: Role;
}

const AdminUserList: React.FC<Props> = ({ role }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex =
    searchParams.get("page") != null ? parseInt(searchParams.get("page")!) : 0;
  const pageSize =
    searchParams.get("pageSize") != null
      ? parseInt(searchParams.get("pageSize")!)
      : 10;
  const mutation = useBanUser();
  const [MessageApi, contextHolder] = useMessage();
  const queryClient = useQueryClient();

  const { data: users, error, isPending } = useUsers(pageIndex, pageSize, role);

  const handlePageChange = (page: number, size: number) => {
    setSearchParams({
      role: role.toLowerCase(),
      page: (page - 1).toString(),
      pageSize: size.toString(),
    });
  };

  const handleBanUser = (user: AdminUser) => {
    mutation.mutate(
      {
        id: user.id,
        status: !user.isBanned,
      },
      {
        onSuccess: () => {
          const msg = user.isBanned ? "解封成功" : "封禁成功";
          MessageApi.success(msg);
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        },
        onError: (error) => {
          const msg = user.isBanned ? "解封成功" : "封禁成功";
          MessageApi.error(`${msg}: ${error.message}`);
          console.error(error);
        },
      },
    );
  };

  if (isPending || error) {
    return null;
  }

  return (
    <>
      {contextHolder}
      <List
        dataSource={users.items}
        renderItem={(user) => (
          <List.Item key={user.username}>
            <Row style={{ width: "100%" }} align="middle">
              {user.role === Role.USER && (
                <Col span={2}>
                  <Tag
                    color={user.isBanned ? "red" : "green"}
                    style={{ marginRight: "3em" }}
                  >
                    {user.isBanned ? "已封禁" : "普通用户"}
                  </Tag>
                </Col>
              )}
              <Col span={10}>
                <Flex align="center">
                  <UserAvatar src={user.avatar} size={40} />
                  <Space.Compact
                    direction="vertical"
                    style={{ marginLeft: "1em" }}
                  >
                    <Link to={`/profile/${user.id}`}>
                      <Typography.Text className="list-book-info hover-underline">
                        {user.username}
                      </Typography.Text>
                    </Link>
                    <Typography.Text style={{ color: "gray" }}>
                      {user.nickname}
                    </Typography.Text>
                  </Space.Compact>
                </Flex>
              </Col>
              <Col span={8}>
                {user.introduction && (
                  <Typography.Text>
                    个人简介：{user.introduction}
                  </Typography.Text>
                )}
              </Col>
              <Col span={4} style={{ textAlign: "right" }}>
                {user.role === Role.USER && (
                  <Button
                    color={user.isBanned ? "green" : "red"}
                    variant="outlined"
                    style={{ marginRight: "2em" }}
                    onClick={() => handleBanUser(user)}
                  >
                    {user.isBanned ? "解封" : "封禁"}
                  </Button>
                )}
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Pagination
        style={{ marginTop: "1em", textAlign: "center" }}
        size="small"
        align="center"
        current={pageIndex + 1}
        pageSize={pageSize}
        total={users.total}
        showSizeChanger
        onChange={handlePageChange}
      />
    </>
  );
};

export default AdminUserList;
