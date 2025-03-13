import { Card, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router";
import { useUser } from "../hook/user";

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
  const { data, refetch, isLoading } = useUser();
  const user = data ?? null;
  // console.log(user);

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header className="header">Book Store</Header>
      <Content>
        <Card style={{ margin: "20px" }}>
          <Outlet />
        </Card>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <div>电子书城 SE2321 2025</div>
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
