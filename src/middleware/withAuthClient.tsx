"use client";
import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader"; 

const withAuthClient = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();

    const storedToken = typeof localStorage !== 'undefined' && localStorage.getItem("client_token");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (storedToken === null || storedToken === undefined || storedToken === "undefined") {
        router.push("/client/login");
      } else if (!storedToken) {
        router.push("/client/login");
      } else {
        setIsLoading(false);
      }
    }, [storedToken, router]);

    if (isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(Component)})`;

  return WithAuthComponent;
};

const getDisplayName = (WrappedComponent: ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withAuthClient;
