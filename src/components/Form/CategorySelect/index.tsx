import React from "react";

import { Container, Icon, Category } from "./styles";

export type TransactionTypes = "income" | "outcome";

type Props = {
  title: string;
};

export const CategorySelect: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
