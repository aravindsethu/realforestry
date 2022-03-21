/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

class Search extends Component {
  constructor(props) {
    super(props);
    this.buttonPress = this.buttonPress.bind(this);
  }

  buttonPress() {
    this.props.navigation.navigate('LocationSearch');
  }
  render() {
    return (
      <TouchableOpacity onPress={this.buttonPress}>
        <Text style={{color: '#fff', marginRight: 10, fontWeight: 'bold'}}>
          Search
        </Text>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(Search);
