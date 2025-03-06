import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import useMessage from "antd/es/message/useMessage";
import React, { ReactNode, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { getMe } from "../service/user";

interface LayoutProps {
  children: ReactNode;
}

export const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Layout
      style={{
        height: "100vh",
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
  const navigate = useNavigate();
  const [messageApi, contextHolder] = useMessage();

  useEffect(() => {
    const checkLogin = async () => {
      let resp = await getMe();
      if (!resp.ok) {
        await messageApi.error(`请先登录! ${resp.message}`, 1);
        navigate("/login");
        return;
      }
    };
    checkLogin();
  }, [navigate]);
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      {contextHolder}
      <Header className="header">Book Store</Header>
      <Content>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <div>电子书城 SE2321 2025</div>
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
