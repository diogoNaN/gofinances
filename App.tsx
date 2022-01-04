import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";

import { AuthProvider, useAuth } from "./src/Hooks/auth";

import { Routes } from "./src/routes";

export default function App() {
  const { userIsLoading } = useAuth();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || userIsLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        animated
        translucent
        backgroundColor="transparent"
        style="light"
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
