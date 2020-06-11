import React, { useState, useEffect } from "react";
import DatePicker from "react-native-datepicker";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

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

import { EditPatientsButton, TimeRow } from "./styles";

export const EditAppointmentScreen = ({ navigation, route }) => {
  const { patient: {_id: patient}, _id, diagnosis, dentNumber, price, date, time } = route.params;
  const fieldsName = {
    diagnosis: "диагноз",
    dentNumber: "номер зуба",
    price: "цена",
    date: "дата",
    time: "время",
    patient: "пациент"
  };

  console.log(route.params);
  const [values, setValues] = useState({
    diagnosis: "пульпит",
    dentNumber: 1,
    price: "",
    date: null,
    time: null,
    patient: patient
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
    console.log(values);
    appointmentsApi
      .patch(_id, values)
      .then(res => {
        navigation.navigate("Home", { lastUpdateDate: new Date() });
      })
      .catch(err => {
        if (err.response.data && err.response.data.message.length) {
          err.response.data.message.forEach(e => {
            const fieldName = e.param;
            console.log(fieldName);
            alert(`Ошибка! Поля "${fieldsName[fieldName]}" указанно не верно`);
          });
        }
      });
  };
  const updateAppointment = () => {
    setValues({ diagnosis, dentNumber, price, date, time,  patient});
  };

  useEffect(updateAppointment, []);

  return (
    <Container>
      <Content style={{ paddingRight: 15 }}>
        <Form>
          <Item floatingLabel>
            <Label>Номер зуба</Label>
            <Input
              value={String(values.dentNumber)}
              onChange={handleChange.bind(this, "dentNumber")}
              style={{ marginTop: 12 }}
              autoFocus
            />
          </Item>
          <Item style={{ marginTop: 20, marginLeft: 15 }} picker>
            <Label>Диагноз</Label>
            <Picker
              date={values.diagnosis}
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
              value={String(values.price)}
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
          <EditPatientsButton>
            <Button onPress={onSubmit} color="#2A86FF">
              <MaterialIcons name="done" size={20} color="white" /> Сохранить прием
            </Button>
          </EditPatientsButton>
        </Form>
      </Content>
    </Container>
  );
};
