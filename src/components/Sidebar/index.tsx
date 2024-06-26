import Image from "next/image";
import { NavLink } from "react-router-dom";

import {
  ResourceDefinition,
  useGetResourceLabel,
  useResourceDefinitions,
} from "ra-core";

import { useRedirect, Logout, useLogout } from "react-admin";
import { BiHome, BiLogOut } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { RiHome5Fill } from "react-icons/ri";

import { Box, useMediaQuery } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import BookIcon from "@mui/icons-material/Book";
import { ReactNode } from "react";

export const Sidebar = () => {
  const logout = useLogout();
  const redirect = useRedirect();

  return (
    <nav className="text-black bg-white space-y-3 px-10">
      <Image
        src={"/svg/logo.svg"}
        alt=""
        height={90}
        width={70}
        className="py-4"
      />

      <ul className="space-y-4">
        <SidebarItem
          // name="الرئيسية"
          name="لوحة القيادة"
          to={""}
          leftIcon={<RiHome5Fill className="text-[#31C0CC]" size={24} />}
        />
        <SidebarItem
          name="الدورات"
          to={"courses"}
          leftIcon={<BookIcon className="text-[#31C0CC]" />}
        />
        <SidebarItem
          name="تعديل الملف الشخصي"
          to="edit-profile"
          leftIcon={<FaCircleUser size={24} className="text-[#31C0CC]" />}
        />
        <li>
          <button onClick={() => logout()} className="gap-3 flex items-center">
            <BiLogOut className="text-[#31C0CC]" size={24} /> تسجيل خروج
          </button>
        </li>
      </ul>
    </nav>
  );
};

const SidebarItem = ({
  to,
  name,
  leftIcon,
}: {
  to: string;
  name: string;
  leftIcon: ReactNode;
}) => {
  return (
    <li className="text-[#383450] ">
      <NavLink to={`${to}`} className="gap-3 flex items-center">
        {leftIcon}
        <span>{name}</span>{" "}
      </NavLink>
    </li>
  );
};
