/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {StyleSheet, View, Text, Image} from 'react-native';

export default class ActionBarImage extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../Images/logo.jpeg')}
          style={{
            width: 47,
            height: 47,
            borderRadius: 4 / 2,
            marginLeft: 5,
          }}
        />
      </View>
    );
  }
}
