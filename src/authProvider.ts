import { AuthProvider } from "react-admin";
import nookies from "nookies";
import { client } from "./buildprovider";
import { AUTHENTICATE_ADMIN, AUTHENTICATE_TEACHER } from "./graphql/mutations";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const data = await client.mutate({
        mutation: AUTHENTICATE_TEACHER,
        variables: {
          email,
          password,
        },
      });
      if (data) {
        console.log({ data });
        nookies.set(null, "auth", JSON.stringify(data), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          strict: true,
        });
        return Promise.resolve();
      }
    } catch (error: any) {
      console.log({ loginError: error });
      return Promise.reject();
    }
  },
  logout: async () => {
    nookies.destroy(null, "auth");
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: async (ctx: any) => {
    const cookies = nookies.get(ctx);
    if (cookies["auth"]) {
      const user = JSON.parse(cookies.auth);
      return user;
    } else {
      return Promise.reject();
    }
  },
  getIdentity: () => {
    try {
      const auth = nookies.get()["auth"];
      console.log({ auth });

      if (auth) {
        const { data } = JSON.parse(auth);
        const { _id, username, email } = data.teacher_login.data;
        return Promise.resolve({
          id: _id,
          fullName: username,
          email,
        });
      }
      return Promise.reject({ redirectTo: "/#/login" });
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },
  checkError: (error) => {
    const { status, body } = error;
    if (status === 401 || status === 403) {
      nookies.destroy(null, "auth");
      return Promise.reject();
    } else if (status === 400) {
      throw new Error(body.error);
    }

    return Promise.resolve(error);
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
