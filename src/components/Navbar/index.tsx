import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetIdentity, useLogout } from "react-admin";
import HamburgerIcon from "../svg/hamburgerIcon";
import LogoutIcon from "../svg/logout";

type IIdentity = {
  _id: string;
  email: string;
  name: string;
  isAccountActivated: boolean;
};

const Navbar = () => {
  const { data: identity } = useGetIdentity();
  const logout = useLogout();

  return (
    <nav className="px-10 h-20 shadow-sm flex items-center justify-between">
      <div className="flex gap-12 items-center py-4 ">
        <Image src={"/svg/logo.svg"} alt="" height={83} width={63} />
        <HamburgerIcon />
      </div>
      <div className="flex items-center gap-5">
        <div className="border-e-[#D5DBE2] border-e py-4 pe-4 flex items-center gap-3 h-full">
          <Image src={"/svg/flag-ar.svg"} alt="flag" width={18} height={12} />
          <p>العربية</p>
        </div>

        <div className="flex cursor-pointer items-center gap-4 pe-4 border-e-[#D5DBE2] border-e py-4">
          <Link href="/dashboard">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-P300 text-center text-xl font-bold uppercase">
              {identity?.name[0]}
            </p>
          </Link>
          <Link href="/dashboard">
            <div className="flex items-center">
              <p className="capitalize">{identity?.name}</p>
            </div>
          </Link>
        </div>
        <button onClick={() => logout()} className="flex gap-2 items-center">
          <p className="py-2">تسجيل خروج</p>
          <LogoutIcon />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
