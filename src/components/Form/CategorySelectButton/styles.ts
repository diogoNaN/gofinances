import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type CategoryProps = {
  isSelected: boolean;
};

export const Container = styled(TouchableOpacity).attrs<TouchableOpacityProps>({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  padding: 18px 16px;
`;

export const Category = styled.Text<CategoryProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.text_dark : theme.colors.text};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
