import styled from "styled-components/native";

const resolveColors = ({ isBlue, colors }) => {
  if (isBlue) {
    return {color: "#fff", background: "#2A86FF"};
  }

  if (colors) {
    return {color: colors.text, background: colors.background};
  }

  return {color: "#4294ff", background: "#e9f5ff"};
};

export const BadgeBlock = styled.Text`
  height: 32px;
  padding: 0 20px;
  color: ${ props => resolveColors(props).color};
  background: ${props => resolveColors(props).background};
  border-radius: 18px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 32px;
`;
