import React, { useCallback, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import LogoSvg from "../../assets/logo.svg";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";

import { useAuth } from "../../Hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButtom";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { useTheme } from "styled-components";

export const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const { signInWithGoogle, signInWithApple } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Falha ao utilizar conta Google");
      setLoading(false);
    }
  }, [signInWithGoogle]);

  const handleSignInWithApple = useCallback(async () => {
    try {
      setLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Falha ao utilizar conta Apple");
      setLoading(false);
    }
  }, [signInWithApple]);

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"}
          uma das opções abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}

          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
        </FooterWrapper>

        {loading && <ActivityIndicator color={colors.shape} size={"large"} />}
      </Footer>
    </Container>
  );
};
