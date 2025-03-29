import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./page/home";
import DefaultLayout from "./page/layout";
import LoginPage from "./page/login";
import ProfilePage from "./page/profile";

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
        <Route
          path="/"
          element={<DefaultLayout />}
          errorElement={<div>error</div>}
        >
          <Route index element={<HomePage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
