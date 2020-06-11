import React from "react";

import {
  BadgeBlock,
} from "./styles";


const  Badge = ({ value, isBlue, isGreen, colors }) => <BadgeBlock colors={colors} isBlue={isBlue}>{value}</BadgeBlock>

Badge.defaultProps = {
  value: '',
  colors: null,
  isBlue: false
};

export default Badge;
