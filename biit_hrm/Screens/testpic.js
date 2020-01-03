import * as React from 'react';
import { Button, Image, View, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    noteArray: [],
    temp: '',
  };
  addNote = () => {
    this.state.noteArray.push({

      'pic': this.state.temp,

    });

    this.setState({ dialogVisible: false });

    fetch('http://10.0.2.2//fypAPI/api/users/AddBook', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'

      }, body: JSON.stringify(this.state.noteArray[0])
    }).then((Response) => Response.json()).then((responseData) => {
      alert(responseData)
      this.componentDidMount()
    })
    //this.showAlertDialog()

  }
  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Text>Now display</Text>
        <Image source={{ uri: 'http://'+ global.IP +'/fypAPI/Images/1028.png' }}
          style={{ width: 40, height: 40 }} />
        <TouchableOpacity
          onPress={this.addNote}>
          <Text>Add Employee</Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //All,Images,Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    this.setState({ temp: result.base64 })
    console.log('ye ha' + this.state.temp);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}