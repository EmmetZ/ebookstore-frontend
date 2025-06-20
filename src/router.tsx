import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AdminBookPage from "./page/admin/book";
import AdminOrderPage from "./page/admin/order";
import AdminUserPage from "./page/admin/user";
import BookPage from "./page/book";
import CartPage from "./page/cart";
import CheckoutPage from "./page/checkout";
import HomePage from "./page/home";
import DefaultLayout, { AdminLayout } from "./page/layout";
import LoginPage from "./page/login";
import NotFound from "./page/notfound";
import OrderPage from "./page/order";
import ProfilePage from "./page/profile";
import RegisterPage from "./page/register";

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
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout/:timestamp" element={<CheckoutPage />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
          <Route path="book/:bookId" element={<BookPage />} />
          <Route
            path="admin"
            element={<AdminLayout />}
            errorElement={<div>error</div>}
          >
            <Route index element={<Navigate to="/admin/book" replace />} />
            <Route path="book" element={<AdminBookPage />} />
            <Route path="user" element={<AdminUserPage />} />
            <Route path="order" element={<AdminOrderPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
