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
  amount: number;
  formatted_amount: string;
  category: Category;
  date: Date;
  formatted_date: string;
}

interface TransactionCardProps {
  data: TransactionCardDataProps;
}

export const TransactionCard: React.FC<TransactionCardProps> = (props) => {
  const { type, name, formatted_amount, category, formatted_date } = props.data;

  const [matchedCategory] = categories.filter(
    (item) => item.key === category.key
  );

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "outcome" && "- "}
        {formatted_amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={matchedCategory.icon} />
          <CategoryName>{matchedCategory.name}</CategoryName>
        </Category>
        <Date>{formatted_date}</Date>
      </Footer>
    </Container>
  );
};
