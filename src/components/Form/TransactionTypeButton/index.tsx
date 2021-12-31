import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Button, Icon, Title } from "./styles";

const icons = {
  income: "arrow-up-circle",
  outcome: "arrow-down-circle",
};

export type TransactionTypes = "income" | "outcome";

type Props = RectButtonProps & {
  type: TransactionTypes;
  title: string;
  selected: boolean;
};

export const TransactionTypeButton: React.FC<Props> = (props) => {
  const { type, title, selected, ...rest } = props;

  return (
    <Container type={type} selected={selected}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title selected={selected}>{title}</Title>
      </Button>
    </Container>
  );
};
