import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { almarai, inter } from "@/utils/helpers";
import { PropsWithChildren } from "react";
import { CoreLayoutProps } from "react-admin";

export const Layout: React.FC<PropsWithChildren> = ({
  title,
  children,
}: CoreLayoutProps) => {
  return (
    <div
      dir="rtl"
      className={`scroll-smooth drawer lg:drawer-open min-h-screen ${almarai.className} ${almarai.variable} ${inter.variable}`}
    >
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col flex-grow">
        <Navbar />
        <main className="flex flex-row flex-grow min-h-dvh overflow-scroll">
          <div className="flex flex-col grow p-4">{children}</div>
        </main>
      </div>
      <Sidebar />
    </div>
  );
};
