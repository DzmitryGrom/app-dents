import React from "react";

import {getAvatarColor} from '../../utils';

import {
  ItemWrapper,
  Avatar,
  FullName,
  ItemTextContainer,
  AvatarText
} from "./styles";

import Badge from "../Badge";
import GrayText from "../GrayText";

export const Item = ({ item, navigate }) => {
  const {
    diagnosis,
    time,
    active,
    patient: { fullName }
  } = item;
  const patientSymbol = fullName.charAt(0).toUpperCase();
  const colors = getAvatarColor(patientSymbol);
  return (
    <ItemWrapper onPress={() => navigate("Patient", item)}>
      <Avatar style={{backgroundColor: colors.background}}><AvatarText style={{color: colors.color}}>{patientSymbol}</AvatarText></Avatar>
      <ItemTextContainer>
        <FullName>{fullName}</FullName>
        <GrayText value={diagnosis} />
      </ItemTextContainer>
      {time && <Badge isBlue={active} value={time} />}
    </ItemWrapper>
  );
};

Item.defaultProps = {
  item: {},
  navigate: () => {}
};
