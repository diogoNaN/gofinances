import React, { useCallback, useState } from "react";
import { Modal, StatusBar } from "react-native";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from "./styles";

import { CategorySelect, Category } from "../CategorySelect";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

export const Register: React.FC = () => {
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [transactionType, setTransactionType] = useState<
    "income" | "outcome"
  >();

  const handlePressTransactionTypeSelect = useCallback(
    (type: "income" | "outcome") => {
      setTransactionType(type);
    },
    []
  );

  const handleOpenCategoriesModal = useCallback(() => {
    setShowCategoriesModal(true);
  }, []);

  const handleCloseCategoriesModal = useCallback(() => {
    setShowCategoriesModal(false);
  }, []);

  return (
    <Container>
      <StatusBar animated translucent barStyle={"light-content"} />

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

          <CategorySelectButton
            isSelected={!!selectedCategory}
            title={selectedCategory ? selectedCategory.name : "Categoria"}
            onPress={handleOpenCategoriesModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal
        statusBarTranslucent
        visible={showCategoriesModal}
        animationType="slide"
      >
        <CategorySelect
          selected={selectedCategory ? selectedCategory : undefined}
          onChange={setSelectedCategory}
          onClose={handleCloseCategoriesModal}
        />
      </Modal>
    </Container>
  );
};
