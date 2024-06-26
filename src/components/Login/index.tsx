import Image from "next/image";
import { useLogin, useNotify, Notification } from "react-admin";
import { useForm } from "react-hook-form";
import CtaButton from "../CtaButton";
import { almarai } from "@/utils/helpers";

export interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const login = useLogin();
  const notify = useNotify();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ILoginForm>();

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

        <form
          onSubmit={handleSubmit((values) => {
            login({
              email: values?.email,
              password: values?.password,
            }).catch(() => notify("Invalid email or password"));
          })}
          className="space-y-5 mt-4"
        >
          <label className="flex flex-col gap-2">
            <p className="font-bold text-sm">
              البريد الإلكتروني / الهوية الوطنية *
            </p>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="البريد الإلكتروني / الهوية الوطنية *"
              className="rounded border-2 bg-[#F9F9F9] px-2 py-3 text-gray-G30 placeholder:py-1 placeholder:text-neutral-400 w-full"
            />
            {errors.email && (
              <p className="text-red-400">This field is required</p>
            )}
          </label>
          <label className="flex flex-col gap-2">
            <p className="font-bold text-sm">كلمة المرور *</p>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="البريد الإلكتروني / الهوية الوطنية *"
              className="rounded border-2 w-full bg-[#F9F9F9] px-2 py-3 text-gray-G30 placeholder:py-1 placeholder:text-neutral-400"
            />{" "}
            {errors.password && (
              <p className="text-red-400">This field is required</p>
            )}
          </label>

          <CtaButton
            disabled={isLoading}
            className="w-full rounded-md font-bold disabled:bg-gray-500"
            type="submit"
          >
            {isLoading ? "loading..." : " تسجيل الدخول"}
          </CtaButton>
        </form>
      </div>
    </main>
  );
}

// Login.noLayout = true;

// export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
//   const { authenticated, redirectTo } = await authProvider.check(context);

//   // const translateProps = await serverSideTranslations(context.locale ?? "ar", [
//   //   "common",
//   // ]);

//   if (authenticated) {
//     return {
//       props: {},
//       redirect: {
//         destination: redirectTo ?? "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
