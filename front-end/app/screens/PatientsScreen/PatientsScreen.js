import React, { useState, useEffect } from "react";
import Swipeable from "react-native-swipeable-row";

import { patientsApi } from "../../utils";
import { Container, SectionTitle, SwipeViewButton } from "./styles";
import { FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input, Item as It } from "native-base";

import { Item } from "../../components/Item";
import { PlusButton } from "../../components/PlusButton";

export const PatientsScreen = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchPatients = e => setSearchValue(e.nativeEvent.text);
  const fetchPatients = () => {
    setIsLoading(true);
    patientsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(() => setIsLoading(false));
  };
  const removePatient = id => {
    Alert.alert(
      "Удалить пациента",
      "Вы действительно хотите удалить пациента?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Подтвердить",
          onPress: () => {
            patientsApi
              .remove(id)
              .then(() => fetchPatients(false))
              .catch(err => setIsLoading(false));
          }
        }
      ],
      { cancelable: false }
    );
  };
  const resultData =
    data &&
    data.filter(
      item =>
        item.fullName.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );

  useEffect(fetchPatients, [route.params]);

  useEffect(fetchPatients, []);

  return (
    <Container>
      <It
        style={{
          padding: 10,
          marginRight: 15,
          marginLeft: 15,
          marginTop: 15,
          borderRadius: 30
        }}
        regular
      >
        <Input onChange={searchPatients} placeholder="Поиск..." />
      </It>
      {data && (
        <FlatList
          data={resultData}
          onRefresh={fetchPatients}
          refreshing={isLoading}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Swipeable
              rightButtons={[
                <SwipeViewButton
                  onPress={() => navigation.navigate("EditPatient", item)}
                  style={{ backgroundColor: "#B4C1CB" }}
                >
                  <Ionicons name="md-create" size={36} color="white" />
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={() => removePatient(item._id)}
                  style={{ backgroundColor: "#F85A5A" }}
                >
                  <Ionicons name="md-close" size={36} color="white" />
                </SwipeViewButton>
              ]}
            >
              <Item
                navigate={navigation.navigate}
                item={{
                  patient: item,
                  diagnosis: item.phone
                }}
              />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      )}

      <PlusButton path="AddPatients" navigate={navigation.navigate} />
    </Container>
  );
};
