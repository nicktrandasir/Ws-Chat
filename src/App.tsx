import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./modules/main";
import { routes } from "./common/constants/routes";
import { Users } from "./modules/users";
import { Posts } from "./modules/posts";
import { Addresses } from "./modules/addresses";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.main} element={<Main />} />
        <Route path={routes.users} element={<Users />} />
        <Route path={routes.posts} element={<Posts />} />
        <Route path={routes.addresses} element={<Addresses />} />
      </Routes>
    </BrowserRouter>
  );
};
