import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const FeedItem = styled.View`
  margin-top: 20px;
`;

export const FeedItemHeader = styled.View`
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View``;

export const UserInfoName = styled.Text`
  font-size: 14px;
  color: #000;
`;

export const UserInfoPlace = styled.Text`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

export const More = styled.Image``;

export const FeedImage = styled.Image`
  width: 100%;
  height: 400px;
  margin: 15px 0;
`;

export const FeedItemFooter = styled.View`
  padding: 0 15px;
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const ButtonAction = styled.TouchableOpacity`
  margin-right: 8px;
`;

export const Icon = styled.Image``;

export const Likes = styled.Text`
  margin-top: 15px;
  font-weight: bold;
  color: #000;
`;

export const Description = styled.Text`
  line-height: 18px;
  color: #000;
`;

export const Hashtags = styled.Text`
  color: #003569;
`;
