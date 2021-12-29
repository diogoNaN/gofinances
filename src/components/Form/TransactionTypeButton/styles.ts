import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

import { TransactionTypes } from ".";

type ContainerProps = {
  selected: boolean;
  type: TransactionTypes;
};

type IconProps = {
  type: TransactionTypes;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ selected }) => (selected ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px 0;

  ${({ type, selected }) =>
    selected &&
    type === "income" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ type, selected }) =>
    selected &&
    type === "outcome" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === "income" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;
