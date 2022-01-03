import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import {
  addMonths,
  format,
  getMonth,
  getYear,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Container,
  Header,
  Title,
  Content,
  MonthSelect,
  MonthSelectButtom,
  MonthSelectIcon,
  Month,
  ChartContainer,
  LoadContainer,
} from "./styles";

import { HistoryCard } from "../../components/HistoryCard";
import { TransactionCardDataProps } from "../../components/TransactionCard";

import { collections } from "../../utils/collections";
import { categories } from "../../utils/categories";

type TransactionProps = TransactionCardDataProps & {
  id: string;
};

type TotalByCategoryProps = {
  key: string;
  name: string;
  amount: number;
  formatted_amount: string;
  color: string;
  percent: string;
  x: string;
  y: number;
};

export const Resume: React.FC = () => {
  const { colors } = useTheme();

  const [loading, setIsLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(startOfMonth(new Date()));
  const [totalByCategories, setTotalByCategories] = useState<
    TotalByCategoryProps[]
  >([]);

  const loadTransactions = useCallback(async () => {
    setIsLoading(true);

    const { transactionsKey } = collections;

    const result = await AsyncStorage.getItem(transactionsKey);

    const transactions: TransactionProps[] = result ? JSON.parse(result) : [];

    const outcomes = transactions.filter(
      (item) =>
        item.type === "outcome" &&
        getMonth(new Date(item.date)) === getMonth(selectedMonth) &&
        getYear(new Date(item.date)) === getYear(selectedMonth)
    );

    const totalByCategories: TotalByCategoryProps[] = [];

    const outcomeSum = outcomes.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    categories.forEach((category) => {
      let categorySum = 0;

      outcomes.forEach((outcome) => {
        if (outcome.category.key === category.key) {
          categorySum += outcome.amount;
        }
      });

      if (categorySum > 0) {
        const formatted_amount = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / outcomeSum) * 100).toFixed(0)}%`;

        totalByCategories.push({
          key: category.key,
          name: category.name,
          amount: categorySum,
          formatted_amount,
          color: category.color,
          percent,
          x: percent,
          y: categorySum,
        });
      }
    });

    setTotalByCategories(totalByCategories);
    setIsLoading(false);
  }, [selectedMonth]);

  const handleMonthChange = useCallback((action: "prev" | "next") => {
    switch (action) {
      case "prev": {
        setSelectedMonth((state) => subMonths(state, 1));
        break;
      }
      case "next": {
        setSelectedMonth((state) => addMonths(state, 1));
        break;
      }
      default: {
        break;
      }
    }
  }, []);

  const month = useMemo(() => {
    return format(selectedMonth, "MMMM, yyyy", { locale: ptBR });
  }, [selectedMonth]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [selectedMonth])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {loading ? (
        <LoadContainer>
          <ActivityIndicator color={colors.primary} size={"large"} />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 20,
          }}
        >
          <MonthSelect>
            <MonthSelectButtom onPress={() => handleMonthChange("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButtom>

            <Month>{month}</Month>

            <MonthSelectButtom onPress={() => handleMonthChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButtom>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((item) => item.color)}
              labelRadius={100}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: colors.shape,
                },
              }}
            />
          </ChartContainer>

          {totalByCategories.map((category) => (
            <HistoryCard
              key={category.key}
              title={category.name}
              amount={category.formatted_amount}
              color={category.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};
