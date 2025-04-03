import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme, ThemeConfig } from "antd";
import React from "react";
import Router from "./router";
import "./style/index.css";

const App: React.FC = () => {
  const themeToken: ThemeConfig = {
    token: {
      colorPrimary: "#141414",
    },
    components: {
      Layout: {
        headerBg: "white",
      },
      Select: {
        optionSelectedColor: "white",
        optionSelectedBg: "#141414",
      },
    },
    algorithm: theme.defaultAlgorithm,
  };
  const queryClient = new QueryClient();

  return (
    <ConfigProvider theme={themeToken}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
