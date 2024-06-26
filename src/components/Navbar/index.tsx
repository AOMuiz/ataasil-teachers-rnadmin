import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useGetIdentity, useLogout } from "react-admin";
import HamburgerIcon from "../svg/hamburgerIcon";
import LogoutIcon from "../svg/logout";
import { BiChevronDown } from "react-icons/bi";

type IIdentity = {
  _id: string;
  email: string;
  name: string;
  isAccountActivated: boolean;
};

const Navbar = ({ title }: { title?: string }) => {
  const { data: identity } = useGetIdentity();
  const logout = useLogout();

  useEffect(() => {
    console.log({ identity });
  }, [identity]);

  return (
    <nav className="px-10 h-20 shadow-sm flex items-center justify-between bg-white">
      <div className="flex gap-12 items-center py-4 ">
        <HamburgerIcon />
      </div>
      <div className="flex items-center gap-5">
        <div className="border-e-[#D5DBE2]  py-4 flex items-center gap-2 h-full">
          <Image src={"/svg/flag.svg"} alt="flag" width={18} height={12} />
          <p>العربية</p>
          <BiChevronDown />
        </div>

        <div className="border-x-2 gap-3 flex items-center justify-center cursor-pointer  p-4">
          <Link href="/">
            <p className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-P300 text-center text-xl font-bold uppercase">
              AC
            </p>
          </Link>
          <Link href="/">
            <div className="flex items-center">
              <p className="capitalize">{identity?.fullName}</p>
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
