import type { TabsProps } from "antd";
import { Tabs, Typography } from "antd";
import React from "react";
import { useSearchParams } from "react-router";
import AdminUserList from "../../components/admin_user_list";
import { Role } from "../../types";

const AdminUserPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize =
    searchParams.get("pageSize") != null
      ? parseInt(searchParams.get("pageSize")!)
      : 10;

  const role = searchParams.get("role") || Role.USER.toLowerCase();

  const items: TabsProps["items"] = [
    {
      key: Role.USER,
      label: "用户",
      children: <AdminUserList role={Role.USER} />,
    },
    {
      key: Role.ADMIN,
      label: "管理员",
      children: <AdminUserList role={Role.ADMIN} />,
    },
  ];

  return (
    <div style={{ width: "80%", margin: "0 auto", minWidth: "800px" }}>
      <Typography.Title level={3} style={{ margin: "0 0 20px 0" }}>
        用户列表
      </Typography.Title>
      <Tabs
        defaultActiveKey={role}
        items={items}
        onChange={(key) => {
          setSearchParams({
            role: key,
            page: "0",
            pageSize: pageSize.toString(),
          });
        }}
      />
    </div>
  );
};

export default AdminUserPage;
