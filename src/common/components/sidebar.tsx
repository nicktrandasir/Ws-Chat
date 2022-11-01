import React from "react";

interface IProps {}

export const Sidebar = (props: IProps) => {
  return (
    <article className={"flex flex-col bg-black text-white h-full w-90 px-24 py-12"}>
      <div>User photo</div>
      <div className={"flex h-full flex-col justify-between"}>
        <nav className={"flex flex-col"}>
          <a href="">Главная</a>
          <a href="">Чат</a>
          <a href="">История</a>
          <a href="">Кабинет</a>
          <a href="">Настройки</a>
        </nav>

        <a href="">Выход</a>
      </div>
    </article>
  );
};
