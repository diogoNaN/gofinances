import React from "react";
import { ColorValue } from "react-native";
import { categories } from "../../utils/categories";

import {
  Container,
  Title,
  Icon,
  Amount,
  Footer,
  Category,
  CategoryName,
  Date,
} from "./styles";

interface Category {
  key: string;
  name: string;
  icon: string;
  color: ColorValue;
}

export interface TransactionCardDataProps {
  type: "income" | "outcome";
  name: string;
  amount: string;
  category: Category;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardDataProps;
}

export const TransactionCard: React.FC<TransactionCardProps> = (props) => {
  const { type, name, amount, category, date } = props.data;

  const [matchedCategory] = categories.filter(
    (item) => item.key === category.key
  );

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "outcome" && "- "}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={matchedCategory.icon} />
          <CategoryName>{matchedCategory.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
