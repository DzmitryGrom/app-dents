import styled from "styled-components/native";


export const ItemWrapper = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px 0;
  margin: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

export const ItemTextContainer = styled.View`
  flex: 1;
`;

export const FullName = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export const AvatarText = styled.Text`
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
`;

export const Avatar = styled.View`
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50px;
`;
