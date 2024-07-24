import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { almarai, inter } from "@/utils/helpers";
import { PropsWithChildren } from "react";
import { CoreLayoutProps } from "react-admin";

const Layout: React.FC<PropsWithChildren> = ({ children }: CoreLayoutProps) => {
  return (
    <div
      className={`scroll-smooth drawer lg:drawer-open min-h-screen ${almarai.className} ${almarai.variable} ${inter.variable}`}
    >
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col flex-grow">
        <Navbar />
        <main className="flex flex-row flex-grow min-h-dvh overflow-scroll p-10 bg-[#F9F9F9]">
          <div className="flex flex-col grow p-4">{children}</div>
        </main>
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
