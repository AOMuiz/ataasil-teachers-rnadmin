import authProvider from "@/authProvider";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-admin";
const AdminApp = dynamic(() => import("@/components/AdminApp"), { ssr: false });

const Admin: NextPage = () => {
  // const { isLoading, authenticated } = useAuthState();

  // if (isLoading) {
  //   <p>Loading auth...</p>;
  // }

  // // Listen for route changes to trigger redirection
  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     // Check if the user is not authenticated and redirect to the login page
  //     if (!authenticated) {
  //       router.push("/#/login"); // Adjust the login route as per your setup
  //     }
  //   };

  //   // Add the event listener
  //   router.events.on("routeChangeStart", handleRouteChange);

  //   // Remove the event listener on component unmount
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, [authenticated]);

  return <AdminApp />;
};

export default Admin;
