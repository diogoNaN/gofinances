import styled from "styled-components/native";
import { TextInput, TextInputProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = TextInputProps & {
  active: boolean;
};

export const Container = styled(TextInput)<ContainerProps>`
  width: 100%;
  padding: 16px 18px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  border-width: 3px;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.attention : "transparent"};

  margin-bottom: 8px;
`;
