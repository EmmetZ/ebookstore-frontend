import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./page/layout";
import LoginPage from "./page/login";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DefaultLayout />,
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
// ]);

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}></Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
