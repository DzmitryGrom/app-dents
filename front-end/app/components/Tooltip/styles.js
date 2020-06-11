import styled from "styled-components/native";

export const TooltipButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  
`;

export const TooltipWrapper = styled.View`
  position: absolute;
  right: -20px;
  top: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  height: 50px;
  padding: 20px 0;
  margin: 0 20px;
  border-radius: 10px;
  overflow: hidden;
  shadow-color: #000;
  shadow-radius: 4.5px;
  shadow-opacity: 0.99;
  elevation: 5;
`;
