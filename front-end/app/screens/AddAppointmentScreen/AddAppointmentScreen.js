import React, { useState } from "react";
import DatePicker from "react-native-datepicker";
import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker
} from "native-base";
import { appointmentsApi } from "../../utils";
import Button from "../../components/Button";

import { AddPatientsButton, TimeRow } from "./styles";

export const AddAppointmentScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const fieldsName = {
    diagnosis: "диагноз",
    dentNumber: "номер зуба",
    price: "цена",
    date: "дата",
    time: "время"
  };
  const [values, setValues] = useState({
    diagnosis: "пульпит",
    dentNumber: 1,
    price: "",
    date: null,
    time: null,
    patient: id
  });
  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };
  const onSubmit = () => {
    appointmentsApi
      .add(values)
      .then(res => {
        navigation.navigate("Home", { lastUpdateDate: new Date() });
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

  return (
    <Container>
      <Content style={{ paddingRight: 15 }}>
        <Form>
          <Item floatingLabel>
            <Label>Номер зуба</Label>
            <Input
              onChange={handleChange.bind(this, "dentNumber")}
              style={{ marginTop: 12 }}
              autoFocus
            />
          </Item>
          <Item style={{ marginTop: 20, marginLeft: 15 }} picker>
            <Label>Диагноз</Label>
            <Picker
              mode="dropdown"
              iosIcon={<AntDesign name="down" size={24} color="black" />}
              style={{ width: undefined }}
              placeholder="Выберите диагноз"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              onValueChange={setFieldValue.bind(this, "diagnosis")}
              selectedValue={values.diagnosis}
            >
              <Picker.Item label="пульпит" value="пульпит" />
              <Picker.Item label="удаление зуба" value="удаление зуба" />
              <Picker.Item label="пульпиос" value="пульпиос" />
              <Picker.Item label="породонтоз" value="породонтоз" />
              <Picker.Item label="породонтит" value="породонтит" />
            </Picker>
          </Item>
          <Item style={{ marginTop: 20 }} floatingLabel>
            <Label>Цена</Label>
            <Input
              onChange={handleChange.bind(this, "price")}
              keyBoardType="numeric"
              dataDetectorTypes="phoneNumber"
              style={{ marginTop: 12 }}
            />
          </Item>
          <Item style={{ marginTop: 20 }}>
            <TimeRow>
              <Label>Дата</Label>
              <DatePicker
                style={{ width: "100%", marginTop: 12 }}
                date={values.date}
                mode="date"
                placeholder="Выберите дату"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Сохранить"
                cancelBtnText="Отмена"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0
                  },
                  dateText: {
                    fontSize: 16
                  }
                }}
                onDateChange={setFieldValue.bind(this, "date")}
              />
            </TimeRow>
            <TimeRow>
              <Label>Время</Label>
              <DatePicker
                style={{ width: "100%", marginTop: 12 }}
                date={values.time}
                mode="time"
                placeholder="Выберите время"
                format="HH:mm"
                minDate={new Date()}
                confirmBtnText="Сохранить"
                cancelBtnText="Отмена"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0
                  },
                  dateText: {
                    fontSize: 16
                  }
                }}
                onDateChange={setFieldValue.bind(this, "time")}
              />
            </TimeRow>
          </Item>
          <AddPatientsButton>
            <Button onPress={onSubmit} color="#87CC6F">
              <AntDesign name="plus" size={20} color="white" /> Добавить прием
            </Button>
          </AddPatientsButton>
        </Form>
      </Content>
    </Container>
  );
};
