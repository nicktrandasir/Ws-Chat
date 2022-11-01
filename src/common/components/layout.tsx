import { Content } from "./content";
import { ReactNode } from "react";
import { Sidebar } from "./sidebar";

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <main className={"flex h-screen"}>
      <Sidebar />
      <Content>{children}</Content>
    </main>
  );
};
