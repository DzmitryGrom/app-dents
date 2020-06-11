import React, { useState, useEffect } from "react";
import Swipeable from "react-native-swipeable-row";

import { appointmentsApi } from "../../utils";
import { Container, SectionTitle, SwipeViewButton } from "./styles";
import { SectionList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Item } from "../../components/Item";
import { PlusButton } from "../../components/PlusButton";

export const HomeScreen = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAppointments = () => {
    setIsLoading(true);
    appointmentsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(() => setIsLoading(false));
  };
  const removeAppointment = id => {
    Alert.alert(
      "Удалить прием",
      "Вы действительно хотите удалить прием?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Подтвердить",
          onPress: () => {
            appointmentsApi.remove(id).then(() => fetchAppointments(false)).catch(err => setIsLoading(false));
          }
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(fetchAppointments, [route.params]);

  useEffect(fetchAppointments, []);

  return (
    <Container>
      {data && (
        <SectionList
          onRefresh={fetchAppointments}
          refreshing={isLoading}
          sections={data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <Swipeable
              rightButtons={[
                <SwipeViewButton onPress={() => navigation.navigate('EditAppointment', item)} style={{ backgroundColor: "#B4C1CB" }}>
                  <Ionicons name="md-create" size={36} color="white" />
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={() => removeAppointment(item._id)}
                  style={{ backgroundColor: "#F85A5A" }}
                >
                  <Ionicons name="md-close" size={36} color="white" />
                </SwipeViewButton>
              ]}
            >
              <Item navigate={navigation.navigate} item={item} />
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
