import { i18nProvider } from "@/i18nProvider";
import React, { useEffect, useState } from "react";
import {
  CoreAdminContext,
  CoreAdminUI,
  CustomRoutes,
  DataProvider,
  Resource,
} from "react-admin";
import { ApolloProvider } from "@apollo/client";

import { Dashboard } from "../dashboard";
import buildProvider, { client } from "@/buildprovider";
import authProvider from "@/authProvider";
import Login from "../Login";
import { Layout } from "../Layout";
import ActivateAccount from "../ActivateAccount";
import Courses from "../Courses";
import EditProfile from "../EditProfile";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import { Route } from "react-router-dom";
import CreateCourse from "../CreateCourse";

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
          </CustomRoutes>
          <CustomRoutes noLayout>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/activate-account/:id" element={<ActivateAccount />} />
            <Route path="/reset-password/:id" element={<ResetPassword />} />
          </CustomRoutes>
        </CoreAdminUI>
      </CoreAdminContext>
    </ApolloProvider>
  );
};

export default CustomAdmin;
