import React from "react";
import { Buttom } from "../../components/Form/Buttom";
import { Input } from "../../components/Form/Input";

import { Container, Header, Title, Form, Fields } from "./styles";

export const Register: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />

          <Input placeholder="Preço" />
        </Fields>

        <Buttom title="Enviar" />
      </Form>
    </Container>
  );
};
