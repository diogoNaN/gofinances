import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Container,
  Header,
  UserData,
  Avatar,
  UserInfo,
  UserGreetings,
  UserName,
  LogoutIcon,
  LogoutButton,
  HeaderWrapper,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardDataProps,
} from "../../components/TransactionCard";
import { StatusBar } from "react-native";
import { collections } from "../../utils/collections";
import { useFocusEffect } from "@react-navigation/native";

export interface DataProps extends TransactionCardDataProps {
  id: string;
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataProps[]>([]);

  // {
  //   id: String(Math.random()),
  //   type: "positive",
  //   title: "Desenvolvimento de site",
  //   amount: "R$ 12.000,00",
  //   category: {
  //     name: "Vendas",
  //     icon: "dollar-sign",
  //   },
  //   date: "10/11/2021",
  // },

  const loadTransactions = useCallback(async () => {
    const { transactionsKey } = collections;

    const result = await AsyncStorage.getItem(transactionsKey);

    const transactions: DataProps[] = result ? JSON.parse(result) : [];

    const transactionsFormatted = transactions.map((item) => {
      const amount = Number(item.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      };
    });

    setData(transactionsFormatted);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      <StatusBar animated translucent barStyle={"light-content"} />

      <Header>
        <HeaderWrapper>
          <UserData>
            <Avatar
              source={{
                uri: "https://avatars.githubusercontent.com/u/61014068?v=4",
              }}
            />

            <UserInfo>
              <UserGreetings>Olá, </UserGreetings>
              <UserName>Diogo</UserName>
            </UserInfo>
          </UserData>

          <LogoutButton onPress={() => {}}>
            <LogoutIcon name={"power"} />
          </LogoutButton>
        </HeaderWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type={"up"}
          title={"Entradas"}
          amount={"R$ 17.400,00"}
          lastTransaction={"Última entrada dia 13 de abril"}
        />
        <HighlightCard
          type={"down"}
          title={"Saídas"}
          amount={"R$ 1.259,00"}
          lastTransaction={"Última entrada dia 03 de abril"}
        />
        <HighlightCard
          type={"total"}
          title={"Total"}
          amount={"R$ 16.141,00"}
          lastTransaction={"01 à 16 de abril"}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
