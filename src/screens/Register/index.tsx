import React, { useCallback, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from "./styles";

import { CategorySelect, Category } from "../CategorySelect";

import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

type FormDataProps = {
  name: string;
  amount: number;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Adicione o nome"),
  amount: Yup.number()
    .typeError("Valor precisa ser numérico")
    .positive("Valor precisa ser positivo")
    .required("Adicione o valor"),
});

export const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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

  const handleRegister = useCallback(
    (form: FormDataProps) => {
      if (!transactionType) {
        return Alert.alert("Ops", "Selecione o tipo da transação");
      }

      if (!selectedCategory) {
        return Alert.alert("Ops", "Selecione a categoria da transação");
      }

      const { name, amount } = form;

      const formData = {
        name,
        amount,
        transaction_type: transactionType,
        category: selectedCategory,
      };

      console.log(formData);
    },
    [transactionType, selectedCategory]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar animated translucent barStyle={"light-content"} />

        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCorrect={false}
              autoCapitalize="sentences"
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Valor"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
    </TouchableWithoutFeedback>
  );
};
