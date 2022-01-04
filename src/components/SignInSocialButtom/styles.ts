import styled from "styled-components/native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton).attrs<RectButtonProps>({
  activeOpacity: 0.7,
})`
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;

  padding: ${RFValue(16)}px;

  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const Title = styled.Text`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;
