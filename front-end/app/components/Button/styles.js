import styled from "styled-components/native";

export const ButtonBlock = styled.TouchableOpacity`
  flex:  ${props => (props.isChangeGrow ? '0 1 auto' : "1")};
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 40px;
  width: ${props => (props.isCircle ? "40px" : "auto")};
  ${props => (props.margin && props.margin)};
  background: ${props => (props.color ? props.color : "#2A86FF")};
  border-radius: 100px;
  color: #fff;
`;

export const ButtonBlockText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;