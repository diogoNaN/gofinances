import styled from "styled-components/native";
import { ViewProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type ContainerProps = ViewProps & {
  color: string;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  border-left-width: 4px;
  border-left-color: ${({ color }) => color};

  padding: 13px 24px;
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;
