import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";

type Props = TextInputProps & {
  active?: boolean;
};

export const Input: React.FC<Props> = (props) => {
  const { active = false, ...rest } = props;

  return <Container active={active} {...rest} />;
};
