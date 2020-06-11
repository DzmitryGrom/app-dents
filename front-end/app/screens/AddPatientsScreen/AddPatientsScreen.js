import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Container, Content, Form, Item, Input, Label } from "native-base";

import { patientsApi } from "../../utils";
import Button from "../../components/Button";

import { AddPatientsButton } from "./styles";

export const AddPatientsScreen = ({ navigation }) => {
  const [values, setValues] = useState({});
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text
    });
  };
  const onSubmit = () => {
    patientsApi
      .add(values)
      .then(res => {
        navigation.navigate("Home");
      })
      .catch(err => console.log("err", err));
  };

  return (
    <Container>
      <Content style={{ paddingRight: 15 }}>
        <Form>
          <Item floatingLabel>
            <Label>Имя и Фамилия</Label>
            <Input
              onChange={handleChange.bind(this, "fullName")}
              value={values.fullName}
              style={{ marginTop: 12 }}
              autoFocus
            />
          </Item>
          <Item style={{ marginTop: 20 }} floatingLabel>
            <Label>Номер телефона</Label>
            <Input
              onChange={handleChange.bind(this, "phone")}
              value={values.phone}
              keyBoardType="numeric"
              dataDetectorTypes="phoneNumber"
              style={{ marginTop: 12 }}
            />
          </Item>
          <AddPatientsButton>
            <Button onPress={onSubmit} color="#87CC6F">
              {"  "}
              <AntDesign name="plus" size={20} color="white" /> Добавить
              пациента
            </Button>
          </AddPatientsButton>
        </Form>
      </Content>
    </Container>
  );
};
