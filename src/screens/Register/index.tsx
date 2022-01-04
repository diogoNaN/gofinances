import React, { useCallback, useState } from "react";
import { Alert, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";
import uuid from "react-native-uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType,
} from "./styles";

import { CategorySelect, Category } from "../CategorySelect";

import { useAuth } from "../../Hooks/auth";

import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import { collections } from "../../utils/collections";

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
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({ resolver: yupResolver(schema) });

  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [transactionType, setTransactionType] = useState<
    "income" | "outcome" | null
  >(null);

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
    async (form: FormDataProps) => {
      if (!transactionType) {
        return Alert.alert("Ops", "Selecione o tipo da transação");
      }

      if (!selectedCategory) {
        return Alert.alert("Ops", "Selecione a categoria da transação");
      }

      const { name, amount } = form;

      const formData = {
        id: uuid.v4(),
        name,
        amount,
        type: transactionType,
        category: selectedCategory,
        date: new Date(),
      };

      try {
        const { prefix } = collections;

        const transactionsKey = prefix + user.id + "transactions";

        const data = await AsyncStorage.getItem(transactionsKey);

        const currentData = data ? JSON.parse(data) : [];

        const transactions = [...currentData, formData];

        await AsyncStorage.setItem(
          transactionsKey,
          JSON.stringify(transactions)
        );

        resetForm();
        setTransactionType(null);
        setSelectedCategory(null);

        navigate("Listagem");
      } catch (error) {
        console.log(error);
        Alert.alert("Ops", "Não foi possível salvar");
      }
    },
    [transactionType, selectedCategory, user]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
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
