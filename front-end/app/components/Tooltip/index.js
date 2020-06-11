import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { appointmentsApi } from "../../utils";
import { TooltipWrapper, TooltipButton } from "./styles";

export const Tooltip = ({navigate, item}) => {
  const {_id, patient} = item;
  const removeAppointment = () => {
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
            appointmentsApi.remove(_id).then(() => fetchAppointments(false)).catch(err => setIsLoading(false));
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
  <TooltipWrapper >
    <TooltipButton style={{ backgroundColor: "#B4C1CB" }} onPress={() => navigate('EditAppointment', {...item, patient: {_id: patient}})}>
      <Ionicons name="md-create" size={36} color="white" />
    </TooltipButton>
    <TooltipButton  style={{ backgroundColor: "#F85A5A" }} onPress={removeAppointment}>
      <Ionicons name="md-close" size={36} color="white" />
    </TooltipButton>
  </TooltipWrapper>
)};
