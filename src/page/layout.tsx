import { Card, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import useMessage from "antd/es/message/useMessage";
import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/navbar";
import useUserContext, { UserContext } from "../context/user";
import { useMe } from "../hook/user";
import { Role, User } from "../types";

interface LayoutProps {
  children: ReactNode;
}

export const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header className="header" style={{ flexShrink: 0 }}>
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Book Store
        </div>
      </Header>
      <Content
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundImage: "url(/login.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", flexShrink: 0 }}>
        <div>电子书城 SE2321 2025</div>
      </Footer>
    </Layout>
  );
};

const DefaultLayout: React.FC = () => {
  const [messageApi, contextHolder] = useMessage();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { data: me, isPending } = useMe();
  useEffect(() => {
    const checkLogin = async () => {
      if (!me && !isPending) {
        await messageApi.error("请先登录", 1);
        navigate("/login");
        return;
      }
      if (me) {
        setUser(me);
      }
    };
    checkLogin();
  }, [me, isPending]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {contextHolder}
      <Header className="header">{user && <NavBar user={user} />}</Header>
      <Content>
        {user && (
          <UserContext.Provider value={{ user, setUser }}>
            <Card style={{ margin: "20px" }}>
              <Outlet />
            </Card>
          </UserContext.Provider>
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <div>电子书城 SE2321 2025</div>
      </Footer>
    </Layout>
  );
};

export const AdminLayout: React.FC = () => {
  const { user } = useUserContext();
  const [messageApi, contextHolder] = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      if (!user) {
        await messageApi.error("请先登录", 1);
        navigate("/login");
        return;
      }
      if (user.role !== Role.ADMIN) {
        await messageApi.error("没有权限访问", 1);
        navigate("/");
        return;
      }
    };
    check();
  }, [user]);

  return (
    <>
      {contextHolder}
      <Outlet />
    </>
  );
};

export default DefaultLayout;
