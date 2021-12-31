import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import { TransactionTypes } from ".";

type ContainerProps = {
  selected: boolean;
  type: TransactionTypes;
};

type IconProps = {
  type: TransactionTypes;
};

type TextProps = {
  selected: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ type, selected }) =>
    selected &&
    type === "income" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ type, selected }) =>
    selected &&
    type === "outcome" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  padding: 16px 0;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text<TextProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.title : theme.colors.text};
`;
