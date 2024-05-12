// components/ProtectedRoute.js

import router, { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuthState } from "react-admin";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoading, authenticated } = useAuthState();

  if (isLoading) {
    <p>Loading auth...</p>;
  }

  // Listen for route changes to trigger redirection
  useEffect(() => {
    const handleRouteChange = () => {
      // Check if the user is not authenticated and redirect to the login page
      if (!authenticated) {
        router.push("/#/login"); // Adjust the login route as per your setup
      }
    };

    // Add the event listener
    router.events.on("routeChangeStart", handleRouteChange);

    // Remove the event listener on component unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [authenticated]);

  return <>{children}</>;
};

export default ProtectedRoute;
