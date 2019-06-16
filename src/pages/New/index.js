import React, { Component } from "react";
import api from "../../services/api";
import ImagePicker from "react-native-image-picker";

import {
  Container,
  SelectButton,
  SelectButtonText,
  Preview,
  Input,
  ShareButton,
  ShareButtonText
} from "./styles";

export default class New extends Component {
  static navigationOptions = {
    headerTitle: "Nova publicação"
  };

  state = {
    preview: null,
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Selecionar imagem"
      },
      upload => {
        if (upload.error) {
          console.log("Error");
        } else if (upload.didCancel) {
          console.log("User canceled");
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split(".");
            ext = ext.toLowerCase() === "heic" ? "jpg" : ext;
          } else {
            prefix = new Date().getTime();
            ext = "jpg";
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`
          };

          this.setState({ preview, image });
        }
      }
    );
  };

  handleSubmit = async () => {
    const { navigation } = this.props;

    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    navigation.navigate("Feed");
  };

  render() {
    const { preview, author, place, description, hashtags } = this.state;

    return (
      <Container>
        <SelectButton onPress={this.handleSelectImage}>
          <SelectButtonText>Selecionar imagem</SelectButtonText>
        </SelectButton>

        {preview && <Preview source={preview} />}

        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Autor do post"
          placeholderTextColor="#999"
          value={author}
          onChangeText={author => this.setState({ author })}
        />
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local do post"
          placeholderTextColor="#999"
          value={place}
          onChangeText={place => this.setState({ place })}
        />
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descrição do post"
          placeholderTextColor="#999"
          value={description}
          onChangeText={description => this.setState({ description })}
        />
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Hashtags do post"
          placeholderTextColor="#999"
          value={hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />

        <ShareButton onPress={this.handleSubmit}>
          <ShareButtonText>Compartilhar</ShareButtonText>
        </ShareButton>
      </Container>
    );
  }
}
