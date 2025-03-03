import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";
import Router from "./router";
import "./style/index.css";

const App: React.FC = () => {
  const theme: ThemeConfig = {
    token: {
      colorPrimary: "#141414",
    },
    components: {
      Layout: {
        headerBg: "white",
      },
    },
  };
  return (
    <ConfigProvider theme={theme}>
      <Router />
    </ConfigProvider>
  );
};

export default App;
