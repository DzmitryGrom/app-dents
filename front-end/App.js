import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack";

import {
  HomeScreen,
  PatientScreen,
  PatientsScreen,
  AddPatientsScreen,
  FormulaDentsScreen,
  EditPatientsScreen,
  AddAppointmentScreen,
  EditAppointmentScreen,
} from "./app/screens";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#f3f3f3"
          },
          headerTintColor: "#2a86ff",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            title: "Журнал приемов",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Patients")}
              >
                <MaterialIcons name="people" size={24} color="#2a86ff" />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="Patient"
          component={PatientScreen}
          options={{
            title: "Пациент",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        />
        <Stack.Screen
          name="Patients"
          component={PatientsScreen}
          options={{
            title: "Пациенты",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        />
        <Stack.Screen
          name="AddPatients"
          component={AddPatientsScreen}
          options={{
            title: "Добавить пациента",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }}
        />
        <Stack.Screen
          name="EditPatient"
          component={EditPatientsScreen}
          options={{
            title: "Редактировать пациента",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }}
        />
        <Stack.Screen
          name="AddAppointment"
          component={AddAppointmentScreen}
          options={{
            title: "Добавить приема",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }}
        />
        <Stack.Screen
          name="EditAppointment"
          component={EditAppointmentScreen}
          options={{
            title: "Редактирование приема",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }}
        />
        <Stack.Screen
          name="FormulaDents"
          component={FormulaDentsScreen}
          options={{
            title: "Формула зубов",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
