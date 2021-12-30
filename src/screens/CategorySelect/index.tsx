import React, { useCallback } from "react";
import { ColorValue, FlatList } from "react-native";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";
import { Button } from "../../components/Form/Button";

import { categories } from "../../utils/categories";

export type Category = {
  key: string;
  name: string;
  icon: string;
  color: ColorValue;
};

type Props = {
  selected?: Category;
  onChange: (category: Category) => void;
  onClose: () => void;
};

export const CategorySelect: React.FC<Props> = (props) => {
  const { selected, onChange, onClose } = props;

  const handleSelectCategory = useCallback((category: Category) => {
    onChange(category);
  }, []);

  const handlePressSelect = useCallback(() => {
    onClose();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            selected={selected?.key === item.key}
            onPress={() => handleSelectCategory(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={handlePressSelect} />
      </Footer>
    </Container>
  );
};
