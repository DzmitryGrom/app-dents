import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Container, Content, Form, Item, Input, Label } from "native-base";

import { patientsApi } from "../../utils";
import Button from "../../components/Button";

import { EditPatientsButton } from "./styles";

export const EditPatientsScreen = ({ navigation, route }) => {
  const { _id, fullName, phone } = route.params;
  const [values, setValues] = useState({});
  const updatePatient = () => {
    setValues({ fullName, phone });
  };
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text
    });
  };
  const fieldsName = {
    fullName: "Имя и фамилия",
    phone: "номер телефона"
  };
  const onSubmit = () => {
    patientsApi
      .patch(_id, values)
      .then(res => {
        navigation.navigate("Patients", {lastUpdateDate: new Date()});
      })
      .catch(err => {
        if (err.response.data && err.response.data.message.length) {
          err.response.data.message.forEach(e => {
            const fieldName = e.param;
            alert(`Ошибка! Поля "${fieldsName[fieldName]}" указанно не верно`);
          });
        }
      });
  };

  useEffect(updatePatient, []);

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
          <EditPatientsButton>
            <Button onPress={onSubmit} color="#2A86FF">
              {" "}
              <MaterialIcons name="done" size={20} color="white" />
              Сохранить пациента
            </Button>
          </EditPatientsButton>
        </Form>
      </Content>
    </Container>
  );
};
