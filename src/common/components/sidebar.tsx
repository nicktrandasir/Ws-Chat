import React from "react";

interface IProps {}

export const Sidebar = (props: IProps) => {
  return (
    <article className={"flex flex-col bg-black text-white h-full w-90 px-24 py-12"}>
      <div className={"flex flex-col py-24"}>
        {/*<img src="" alt="" />*/}
        <span>Иван Иванов</span>
      </div>
      <div className={"flex h-full flex-col justify-between"}>
        <nav className={"flex flex-col py-12"}>
          <a href="/">Главная</a>
          <a href={"/chat"}>Чат</a>
          <a href={"/users"}>Друзья</a>
          <a href={"/cabinet"}>Кабинет</a>
          <a href={"/config"}>Настройки</a>
        </nav>

        <a href="" className={"text-red"}>
          Выход
        </a>
      </div>
    </article>
  );
};
