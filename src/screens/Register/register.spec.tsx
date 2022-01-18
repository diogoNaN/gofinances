import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import { Register } from ".";

import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Screen: Register", () => {
  it("should be open category modal when press button", async () => {
    //comment navigation on register screen

    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const modalCategory = getByTestId("modal-category");
    const buttonCategory = getByTestId("buttom-category_select");

    fireEvent.press(buttonCategory);

    //handle asynchronous tasks
    await waitFor(() => {
      expect(modalCategory.props.visible).toBeTruthy();
    });
  });
});
