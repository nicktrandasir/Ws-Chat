import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./modules/main";
import { routes } from "./common/constants/routes";
import { Chat } from "./modules/chat";
import { Cabinet } from "./modules/cabinet";
import { Config } from "./modules/config";
import { History } from "./modules/history";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.main} element={<Main />} />
        <Route path={routes.chat} element={<Chat />} />
        <Route path={routes.history} element={<History />} />
        <Route path={routes.cabinet} element={<Cabinet />} />
        <Route path={routes.config} element={<Config />} />
      </Routes>
    </BrowserRouter>
  );
};
