/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import TypeWriter from 'react-native-typewriter';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instanceId: '',
      getValue: '',
    };
  }
  componentDidMount() {
    this.getdeviceId();
    setTimeout(() => {
      this.getValueFunction();
    }, 4500);
  }
  LoginDetails = value => {
    console.log(value);
    //alert(value);
    if (value !== null) {
      console.log('logged in');
      this.props.navigation.navigate('FunctionalityScreen', {
        email: value,
      });
    } else {
      console.log('not logged in');
      this.props.navigation.navigate('FirstPage');
    }
  };
  getValueFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem(this.state.instanceId).then(this.LoginDetails);
  };
  getdeviceId = () => {
    //Getting the Unique Id from here
    DeviceInfo.getInstanceId().then(instanceId => {
      this.setState({instanceId: instanceId});
      console.log(instanceId);
    });
  };
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../Images/log.png')} style={styles.logo} />
        <Text style={styles.name}>REAL FOREST</Text>
        <TypeWriter style={styles.slogan} typing={1} initialDelay={20}>
          Digitizing Agro Forest
        </TypeWriter>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: '100%',
    height: '70%',
  },
  name: {
    fontFamily: 'Audiowide-Regular',
    color: '#006400',
    fontSize: 40,
  },
  slogan: {
    fontFamily: 'Allura-Regular',
    color: 'gray',
    fontSize: 35,
  },
});
