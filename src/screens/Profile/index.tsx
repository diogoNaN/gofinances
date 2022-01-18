import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export const Profile = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        autoCorrect={false}
        placeholder="Nome"
        value={"Nome"}
      />

      <TextInput
        testID="input-surname"
        autoCorrect={false}
        placeholder="Sobrenome"
        value={"Sobrenome"}
      />

      <Button title="Ok" onPress={() => {}} />
    </View>
  );
};
