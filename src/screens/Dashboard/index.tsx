import React, { useEffect } from "react";

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

export interface DataProps extends TransactionCardDataProps {
  id: string;
}

export const Dashboard: React.FC = () => {
  const data: DataProps[] = [
    {
      id: String(Math.random()),
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "10/11/2021",
    },
    {
      id: String(Math.random()),
      type: "negative",
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "13/11/2021",
    },
    {
      id: String(Math.random()),
      type: "negative",
      title: "Aluguel apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "14/11/2021",
    },
  ];

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
