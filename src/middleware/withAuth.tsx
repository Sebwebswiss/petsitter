"use client";
import React, { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader"; 

const withAuth = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();

    const storedToken = typeof localStorage !== 'undefined' && localStorage.getItem("user_token");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (storedToken === null) {
        router.push("/dashboard/login");
      } else if (!storedToken) {
        router.push("/dashboard/login");
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

export default withAuth;
