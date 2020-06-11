import styled from "styled-components/native";

export const PatientFullName = styled.Text`
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: 800;
  line-height: 30px;
`;

export const PatientContainer = styled.View`
  padding: 25px;
  background: #fff;
`;

export const PatientButtons = styled.View`
  flex-direction: row;
  padding: 20px 0;
`;

export const PatientWrapper = styled.View`
  flex: 1;
  background: #f8fafd;
`;

export const PatientAppointments = styled.View`
  flex: 1;
  padding: 20px;
`;

export const PatientAppointmentsCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

export const PatientAppointmentsCard = styled.View`
  background: #fff;
  padding: 12.5px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  shadow-radius: 4.5px;
  shadow-opacity: 0.99;
  elevation: 5;
`;

export const PatientAppointmentsCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 7.5px 0 7.5px 0;
`;

export const PatientAppointmentsCardTextBold = styled.Text`
  font-weight: bold;
`;

export const PatientAppointmentsTitle = styled.Text`
  flex: 1;
  background: #f8fafd;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 0;
  font-size: 20px;
  font-weight: bold;
`;
