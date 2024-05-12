import { Sidebar } from "@/components/Sidebar";
import { PropsWithChildren } from "react";
import { CoreLayoutProps } from "react-admin";
import { BiHome } from "react-icons/bi";

export const Layout: React.FC<PropsWithChildren> = ({
  title,
  children,
}: CoreLayoutProps) => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col flex-grow">
        <div className="w-full navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="sidebar"
              aria-label="Open sidebar"
              className="btn btn-square btn-ghost"
            >
              <BiHome className="inline-block w-6 h-6 stroke-current" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">{title}</div>
        </div>
        <div className="flex flex-row flex-grow">
          <div className="flex flex-col grow p-4">{children}</div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};
