import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export const Button: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};
