import { Admin, Resource, ListGuesser, DataProvider } from "react-admin";
import { useState, useEffect } from "react";
import buildGraphQLProvider from "ra-data-graphql-simple";
import React from "react";
import authProvider from "@/authProvider";
import buildProvider from "@/buildprovider";
import { i18nProvider } from "@/i18nProvider";
import Login from "../Login";
import CoursesList from "../Course/CoursesList";
import Navbar from "../Navbar";

const AdminApp = () => {
  const [dataProvider, setDataProvider] = useState<null | DataProvider>(null);

  useEffect(() => {
    // buildGraphQLProvider({
    //   clientOptions: {
    //     uri: process.env.NEXT_PUBLIC_API_ROOT_URL,
    //     ...buildProvider,
    //   },
    // }).then((graphQlDataProvider) =>
    //   setDataProvider(() => graphQlDataProvider)
    // );

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
    <Admin
      title={"Ataasil University"}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={Login}
      basename="Ataasil"
    >
      <Resource
        name="Course"
        list={CoursesList}
        recordRepresentation="Course"
      />
      <Resource
        name="Payment"
        list={ListGuesser}
        recordRepresentation="Payment"
      />
      <Resource
        name="Student"
        list={ListGuesser}
        recordRepresentation="Student"
      />
      <Resource
        name="Teacher"
        list={ListGuesser}
        recordRepresentation="Teacher"
      />
    </Admin>
  );
};

export default AdminApp;
