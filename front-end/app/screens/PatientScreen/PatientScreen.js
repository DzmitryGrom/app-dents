import React, { useState, useEffect } from "react";
import GrayText from "../../components/GrayText";
import { SimpleLineIcons, Ionicons, Foundation } from "@expo/vector-icons";
import { Linking, ScrollView, TouchableWithoutFeedback } from "react-native";

import { patientsApi } from "../../utils";

import { Tooltip } from "../../components/Tooltip";
import { PlusButton } from "../../components/PlusButton";
import Button from "../../components/Button";
import Spiner from "../../components/Spiner";
import MoreButton from "../../components/MoreButton";
import Badge from "../../components/Badge";

import {
  PatientContainer,
  PatientFullName,
  PatientButtons,
  PatientAppointments,
  PatientAppointmentsTitle,
  PatientWrapper,
  PatientAppointmentsCardLabel,
  PatientAppointmentsCardRow,
  PatientAppointmentsCard,
  PatientAppointmentsCardTextBold
} from "./styles";

export const PatientScreen = ({ route, navigation }) => {
  const {
    patient: { fullName, phone, _id }
  } = route.params;
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowTooltip, setIsShowTooltip] = useState(false);

  useEffect(() => {
    patientsApi
      .show(_id)
      .then(({ data }) => {
        setAppointments(data.data.appointments);
        setIsLoading(false);
      })
      .catch(err => setIsLoading(false));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setIsShowTooltip(false)}>
      <PatientWrapper>
        <PatientContainer>
          <PatientFullName>{fullName}</PatientFullName>
          <GrayText value={phone} />
          <PatientButtons>
            <Button onPress={() => navigation.navigate('FormulaDents')} margin={"margin-right: 15px"}>Формула зубов</Button>
            <Button
              onPress={() => Linking.openURL(`tel:${phone}`)}
              isChangeGrow={true}
              isCircle={true}
              color="green"
            >
              <SimpleLineIcons name="phone" size={20} color="white" />
            </Button>
          </PatientButtons>
        </PatientContainer>
        <ScrollView>
          <PatientAppointmentsTitle>Приемы</PatientAppointmentsTitle>
          <PatientAppointments>
            {isLoading ? (
              <Spiner />
            ) : (
              appointments.map(appointment => (
                <PatientAppointmentsCard key={appointment._id}>
                  <MoreButton onPress={() => setIsShowTooltip(true)} />
                  {isShowTooltip && (
                    <Tooltip
                      navigate={navigation.navigate}
                      item={appointment}
                    />
                  )}
                  <PatientAppointmentsCardRow>
                    <Ionicons name="md-medical" size={16} color="gray" />
                    <PatientAppointmentsCardLabel>
                      Зуб:{" "}
                      <PatientAppointmentsCardTextBold>
                        {appointment.dentNumber}
                      </PatientAppointmentsCardTextBold>
                    </PatientAppointmentsCardLabel>
                  </PatientAppointmentsCardRow>

                  <PatientAppointmentsCardRow>
                    <Foundation name="clipboard-notes" size={24} color="gray" />
                    <PatientAppointmentsCardLabel>
                      Диагноз:{" "}
                      <PatientAppointmentsCardTextBold>
                        {appointment.diagnosis}
                      </PatientAppointmentsCardTextBold>
                    </PatientAppointmentsCardLabel>
                  </PatientAppointmentsCardRow>

                  <PatientAppointmentsCardRow
                    style={{ justifyContent: "space-between" }}
                  >
                    <Badge
                      isBlue={true}
                      value={appointment.date + " - " + appointment.time}
                    />
                    <Badge
                      colors={{
                        background: "rgba(132, 210, 105, 0.21)",
                        text: "#61bb42"
                      }}
                      value={appointment.price + " P"}
                    />
                  </PatientAppointmentsCardRow>
                </PatientAppointmentsCard>
              ))
            )}
          </PatientAppointments>
        </ScrollView>
        <PlusButton
          path="AddAppointment"
          id={_id}
          navigate={navigation.navigate}
        />
      </PatientWrapper>
    </TouchableWithoutFeedback>
  );
};
