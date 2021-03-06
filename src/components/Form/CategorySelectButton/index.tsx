import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Icon, Category } from "./styles";

export type TransactionTypes = "income" | "outcome";

type Props = TouchableOpacityProps & {
  title: string;
  isSelected: boolean;
};

export const CategorySelectButton: React.FC<Props> = (props) => {
  const { title, isSelected, ...rest } = props;

  return (
    <Container {...rest}>
      <Category isSelected={isSelected}>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
