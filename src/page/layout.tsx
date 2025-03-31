import { Card, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import useMessage from "antd/es/message/useMessage";
import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/navbar";
import { getMe } from "../service/user";
import { User } from "../types";
import { UserContext } from "../context/user";

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
      <Header className="header">
        <div
          style={{ display: "inline-block", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Book Store
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        <div>电子书城 SE2321 2025</div>
      </Footer>
    </Layout>
  );
};

const DefaultLayout: React.FC = () => {
  const [messageApi, contextHolder] = useMessage();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const checkLogin = async () => {
      console.log("checkLogin");
      const me = await getMe();
      if (!me) {
        await messageApi.error("请先登录", 1);
        navigate("/login");
      } else {
        setUser(me);
      }
    };
    checkLogin();
  }, []);

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

export default DefaultLayout;
