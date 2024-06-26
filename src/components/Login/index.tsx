import Image from "next/image";
import {
  useLogin,
  useNotify,
  Notification,
  defaultTheme,
  Link,
} from "react-admin";
import { Button, Card, CircularProgress, TextField } from "@mui/material";
import CtaButton from "../CtaButton";
import { almarai } from "@/utils/helpers";
import { FormEventHandler, useState } from "react";
import Box from "@mui/material/Box";
export interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    login({ email, password }).catch(() => {
      setLoading(false);
      notify("Invalid credentials", { type: "error" });
    });
  };

  return (
    <main
      className={`grid place-items-center h-screen font-almarai ${almarai.variable}`}
      dir="rtl"
    >
      <div>
        <div className="mb-4 flex items-center justify-center">
          <Image src={"/svg/logo.svg"} alt="" height={100} width={200} />
        </div>
        <div className="text-center">
          <h1 className="font-bold text-2xl">تسجيل الدخول</h1>
          <h3 className="text-gray-G30">
            لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة
            وتمجيد
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <label className="flex flex-col gap-2">
            <p className="font-bold text-sm">
              البريد الإلكتروني / الهوية الوطنية *
            </p>
            <input
              required
              id="email"
              name="email"
              type="email"
              placeholder="البريد الإلكتروني / الهوية الوطنية *"
              className="rounded border-2 bg-[#F9F9F9] px-2 py-3 text-gray-G30 placeholder:py-1 placeholder:text-neutral-400 w-full"
            />
          </label>
          <label className="flex flex-col gap-2">
            <p className="font-bold text-sm">كلمة المرور *</p>
            <input
              required
              id="password"
              name="password"
              type="password"
              placeholder="كلمة المرور*"
              className="rounded border-2 w-full bg-[#F9F9F9] px-2 py-3 text-gray-G30 placeholder:py-1 placeholder:text-neutral-400"
            />
          </label>
          <CtaButton
            disabled={loading}
            className="w-full rounded-md font-bold disabled:bg-gray-500"
            type="submit"
          >
            {loading ? <CircularProgress size={25} /> : "تسجيل الدخول"}
          </CtaButton>
        </form>
        <Box mt={2} textAlign="center">
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
              color: "#90caf9",
            }}
          >
            نسيت كلمة المرور؟
          </Link>
        </Box>
        <Notification />
      </div>
    </main>
  );
}
