import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Container, ImageContainer, Title } from "./styles";

type Props = RectButtonProps & {
  title: string;
  svg: React.FC<SvgProps>;
};

export const SignInSocialButton: React.FC<Props> = (props) => {
  const { title, svg: Svg, ...rest } = props;

  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Title>{title}</Title>
    </Container>
  );
};
