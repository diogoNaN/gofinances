import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Title } from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

export type TransactionTypes = "income" | "outcome";

type Props = TouchableOpacityProps & {
  type: TransactionTypes;
  title: string;
  selected: boolean;
};

export const TransactionTypeButton: React.FC<Props> = ({
  type,
  title,
  selected,
  ...rest
}) => {
  return (
    <Container type={type} selected={selected} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};
