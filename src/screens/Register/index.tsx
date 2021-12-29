import React, { useCallback, useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from "./styles";

export const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState<
    "income" | "outcome"
  >();

  const handlePressTransactionTypeSelect = useCallback(
    (type: "income" | "outcome") => {
      setTransactionType(type);
    },
    []
  );

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />

          <TransactionType>
            <TransactionTypeButton
              title="Income"
              type="income"
              selected={transactionType === "income"}
              onPress={() => handlePressTransactionTypeSelect("income")}
            />

            <TransactionTypeButton
              title="Outcome"
              type="outcome"
              selected={transactionType === "outcome"}
              onPress={() => handlePressTransactionTypeSelect("outcome")}
            />
          </TransactionType>

          <CategorySelect title={"Categoria"} />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
