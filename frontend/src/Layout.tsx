import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

export interface LayoutProps {
  theme: "light" | "dark";
}

export const Layout = ({ theme }: LayoutProps) => (
  <main data-theme={theme}>
    <Header />
    <div className="container">
      <Outlet />
    </div>
  </main>
);
