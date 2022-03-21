/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';

class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.buttonPress = this.buttonPress.bind(this);
  }

  buttonPress() {
    this.props.navigation.navigate('ProfileScreen');
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.buttonPress}>
          <ImageBackground
            source={require('../Images/user.png')}
            style={{
              backgroundColor: '#006400',
              width: 40,
              height: 40,
              borderWidth: 2,
              borderColor: '#006400',
              borderRadius: 50,
              marginRight: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(ProfileImage);
