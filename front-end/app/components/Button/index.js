import React from "react";

import { ButtonBlock, ButtonBlockText } from "./styles";

const Button = ({
  children,
  isChangeGrow,
  isCircle,
  color,
  margin,
  onPress
}) => (
  <ButtonBlock
    onPress={onPress}
    margin={margin}
    isChangeGrow={isChangeGrow}
    isCircle={isCircle}
    color={color}
  >
    <ButtonBlockText>{children}</ButtonBlockText>
  </ButtonBlock>
);

Button.defaultProps = {
  color: "",
  isCircle: false,
  isChangeGrow: false,
  onPress: () => {}
};
export default Button;
