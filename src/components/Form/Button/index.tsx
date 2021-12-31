import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title } from "./styles";

type Props = RectButtonProps & {
  title: string;
  onPress: () => void;
};

export const Button: React.FC<Props> = (props) => {
  const { title, onPress, ...rest } = props;

  return (
    <Container {...rest} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};
