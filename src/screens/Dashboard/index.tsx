import React, { useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
import { collections } from "../../utils/collections";
import { useAuth } from "../../Hooks/auth";

export interface TransactionProps extends TransactionCardDataProps {
  id: string;
}

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const loadTransactions = useCallback(async () => {
    const { prefix } = collections;

    const transactionsKey = prefix + user.id + "transactions";

    const result = await AsyncStorage.getItem(transactionsKey);

    const transactions: TransactionProps[] = result ? JSON.parse(result) : [];

    const transactionsFormatted = transactions.map((item) => {
      const formattedAmount = Number(item.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const formattedDate = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount: item.amount,
        formatted_amount: formattedAmount,
        type: item.type,
        category: item.category,
        date: item.date,
        formatted_date: formattedDate,
      };
    });

    setTransactions(transactionsFormatted);
  }, []);

  const getLastTransaction = useCallback(
    (transactions: TransactionProps[], type: "income" | "outcome" | "all") => {
      const filteredTransactions: TransactionProps[] = [];

      if (type === "all") {
        filteredTransactions.push(...transactions);
      } else {
        const filtered = transactions.filter((item) => item.type === type);
        filteredTransactions.push(...filtered);
      }

      if (filteredTransactions.length === 0) {
        return null;
      }

      const transactionDates = filteredTransactions.map((item) =>
        new Date(item.date).getTime()
      );

      const lastTransactionDate = Math.max.apply(Math, transactionDates);

      return format(
        isFinite(lastTransactionDate)
          ? new Date(lastTransactionDate)
          : new Date(),
        "dd 'de' MMMM",
        { locale: ptBR }
      );
    },
    []
  );

  const highLightValues = useMemo(() => {
    const incomeTransactions = transactions.filter(
      (item) => item.type === "income"
    );

    const outcomeTransactions = transactions.filter(
      (item) => item.type === "outcome"
    );

    const lastIncomeTransaction = getLastTransaction(
      incomeTransactions,
      "income"
    );

    const lastOutcomeTransaction = getLastTransaction(
      outcomeTransactions,
      "outcome"
    );

    const lastTransaction = getLastTransaction(transactions, "all");

    const total = transactions
      .map((item) => item.amount)
      .reduce((acc, curr) => acc + curr, 0);

    const totalIcomes = incomeTransactions
      .map((item) => item.amount)
      .reduce((acc, curr) => acc + curr, 0);

    const totalOutcomes = outcomeTransactions
      .map((item) => item.amount)
      .reduce((acc, curr) => acc + curr, 0);

    return {
      total: total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      total_incomes: totalIcomes.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      total_outcomes: totalOutcomes.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      last_income_transaction: lastIncomeTransaction,
      last_outcome_transaction: lastOutcomeTransaction,
      total_transaction_period: lastTransaction
        ? `01 à ${lastTransaction}`
        : "Não há transações",
    };
  }, [transactions]);

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
      <Header>
        <HeaderWrapper>
          <UserData>
            <Avatar
              source={{
                uri: user.photo,
              }}
            />

            <UserInfo>
              <UserGreetings>Olá, </UserGreetings>
              <UserName>{user.name}</UserName>
            </UserInfo>
          </UserData>

          <LogoutButton onPress={signOut}>
            <LogoutIcon name={"power"} />
          </LogoutButton>
        </HeaderWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type={"up"}
          title={"Entradas"}
          amount={highLightValues.total_incomes}
          lastTransaction={
            highLightValues.last_income_transaction
              ? `Última entrada dia ${highLightValues.last_income_transaction}`
              : "Não há transações"
          }
        />
        <HighlightCard
          type={"down"}
          title={"Saídas"}
          amount={highLightValues.total_outcomes}
          lastTransaction={
            highLightValues.last_outcome_transaction
              ? `Última saída dia ${highLightValues.last_outcome_transaction}`
              : "Não há transações"
          }
        />
        <HighlightCard
          type={"total"}
          title={"Total"}
          amount={highLightValues.total}
          lastTransaction={highLightValues.total_transaction_period}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
