import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./page/layout";
import LoginPage from "./page/login";
import Profile from "./page/profile";

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
          <Route index element={<div>Home</div>} />
          <Route path="profile/:userId" element={<Profile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
