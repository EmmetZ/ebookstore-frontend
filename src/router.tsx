import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import BookPage from "./page/book";
import CartPage from "./page/cart";
import CheckoutPage from "./page/checkout"; // Add this import
import HomePage from "./page/home";
import DefaultLayout from "./page/layout";
import LoginPage from "./page/login";
import NotFound from "./page/notfound";
import OrderPage from "./page/order";
import ProfilePage from "./page/profile";
import RankPage from "./page/rank";

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
          <Route path="rank" element={<RankPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
