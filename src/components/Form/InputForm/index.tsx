import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import { Container, Error } from "./styles";

type Props = TextInputProps & {
  name: string;
  control: Control;
  error: string;
};

export const InputForm: React.FC<Props> = (props) => {
  const { name, control, error, ...rest } = props;

  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input value={value} onChangeText={onChange} {...rest} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
