import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { Input } from ".";

import theme from "../../../global/styles/theme";

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Component: Input", () => {
  it("must have specific border color when active", () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        active={true}
        autoCorrect={false}
        placeholder="E-mail"
        keyboardType="email-address"
      />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId("input-email");

    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention
    );
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
