import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";

import { Container } from "./styles";

type Props = TextInputProps & {
  name: string;
  control: Control;
};

export const InputForm: React.FC<Props> = (props) => {
  const { name, control, ...rest } = props;

  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input value={value} onChangeText={onChange} {...rest} />
        )}
      />
    </Container>
  );
};
