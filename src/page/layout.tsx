import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header className="header">Book Store</Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        <div>电子书城 SE2321 2025</div>
      </Footer>
    </Layout>
  );
};

const DefaultLayout: React.FC = () => {
  return (
    <div>
      <h1>Default Layout</h1>
      <div>{import.meta.env.VITE_BACKEND_ENDPOINT}</div>
    </div>
  );
};

export default DefaultLayout;
