import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export const Button: React.FC<Props> = (props) => {
  const { title, ...rest } = props;

  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};
