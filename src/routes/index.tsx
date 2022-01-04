import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../Hooks/auth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
