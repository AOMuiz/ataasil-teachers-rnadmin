import { i18nProvider } from "@/i18nProvider";
import React, { useEffect, useState } from "react";
import {
  CoreAdminContext,
  CoreAdminUI,
  CustomRoutes,
  DataProvider,
  defaultTheme,
} from "react-admin";
import { ApolloProvider } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Dashboard } from "../dashboard";
import buildProvider, { client } from "@/buildprovider";
import authProvider from "@/authProvider";
import Login from "../Login";
import ActivateAccount from "../ActivateAccount";
import Courses from "../Courses";
import EditProfile from "../EditProfile";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import { Route } from "react-router-dom";
import CourseSections from "../Courses/CourseSections";
import CreateCourse from "../Courses/CreateCourse";
import CreateCourseSection from "../Courses/CreateSections";
import { almarai } from "@/utils/helpers";
import { Layout } from "../Layout";

const myTheme = createTheme({
  ...defaultTheme,
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#31c0cc",
    },
    error: {
      main: "#f44336", // red color for error
    },
  },
  typography: {
    fontFamily: `${almarai.style.fontFamily}`,
  },
});

const CustomAdmin = () => {
  const [dataProvider, setDataProvider] = useState<null | DataProvider>(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const reactAdminDataProvider = await buildProvider();
      setDataProvider(() => ({ ...reactAdminDataProvider }));
    };

    buildDataProvider();
  }, []);

  if (!dataProvider) {
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={myTheme}>
      <ApolloProvider client={client}>
        <CoreAdminContext
          authProvider={authProvider}
          dataProvider={dataProvider}
          i18nProvider={i18nProvider}
          basename="Ataasil"
        >
          <CoreAdminUI
            loginPage={Login}
            dashboard={Dashboard}
            layout={Layout}
            title={"Ataasil University"}
          >
            <CustomRoutes>
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/create" element={<CreateCourse />} />
              <Route
                path="/courses/:course_id/sections"
                element={<CourseSections />}
              />
              <Route
                path="/courses/:course_id/sections/create"
                element={<CreateCourseSection />}
              />
            </CustomRoutes>
            <CustomRoutes noLayout>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/activate-account/:id"
                element={<ActivateAccount />}
              />
              <Route path="/reset-password/:id" element={<ResetPassword />} />
            </CustomRoutes>
          </CoreAdminUI>
        </CoreAdminContext>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default CustomAdmin;
