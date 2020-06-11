import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { MoreButtonBlock } from "./styles";

const MoreButton = ({onPress}) => (
  <MoreButtonBlock onPress={onPress}>
    <MaterialIcons name="more-vert" size={24} color="gray" />
  </MoreButtonBlock>
);

export default MoreButton;
