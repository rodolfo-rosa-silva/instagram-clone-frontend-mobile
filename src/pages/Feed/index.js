import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";

import { Image, TouchableOpacity, FlatList } from "react-native";

import {
  Container,
  FeedItem,
  FeedItemHeader,
  UserInfo,
  UserInfoName,
  UserInfoPlace,
  More,
  FeedImage,
  FeedItemFooter,
  Actions,
  ButtonAction,
  Icon,
  Likes,
  Description,
  Hashtags
} from "./styles";

import camera from "../../assets/camera.png";
import more from "../../assets/more.png";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png";
import send from "../../assets/send.png";

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => {
          navigation.navigate("New");
        }}
      >
        <Image source={camera} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get("posts");

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io("http://10.0.3.2:3333");

    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("postDelete", idPostDelete => {
      this.setState({
        feed: this.state.feed.filter(post => post._id !== idPostDelete)
      });
    });

    socket.on("like", likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    const { feed } = this.state;

    return (
      <Container>
        <FlatList
          data={feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <FeedItem>
              <FeedItemHeader>
                <UserInfo>
                  <UserInfoName>{item.author}</UserInfoName>
                  <UserInfoPlace>{item.place}</UserInfoPlace>
                </UserInfo>

                <More source={more} />
              </FeedItemHeader>

              <FeedImage
                source={{ uri: `http://10.0.3.2:3333/files/${item.image}` }}
              />

              <FeedItemFooter>
                <Actions>
                  <ButtonAction onPress={() => this.handleLike(item._id)}>
                    <Icon source={like} />
                  </ButtonAction>
                  <ButtonAction onPress={() => {}}>
                    <Icon source={comment} />
                  </ButtonAction>
                  <ButtonAction onPress={() => {}}>
                    <Icon source={send} />
                  </ButtonAction>
                </Actions>

                <Likes>{item.likes} curtidas</Likes>
                <Description>{item.description}</Description>
                <Hashtags>{item.hashtags}</Hashtags>
              </FeedItemFooter>
            </FeedItem>
          )}
        />
      </Container>
    );
  }
}
