/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instanceId: '',
      userdetails: {},
      usertreedetails: {},
    };
  }
  static navigationOptions = {
    //headerShown: false,
    title: 'Real Forest',
    headerRight: () => (
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: '#006400', fontWeight: 'bold', fontSize: 20}}>
            edit
          </Text>
        </TouchableOpacity>
      </View>
    ),
    headerTintColor: '#006400',
    headerTitleStyle: {
      fontFamily: 'Allura-Regular',
      fontSize: 55,
    },
  };
  componentDidMount() {
    this.getdeviceId();
  }
  getdeviceId() {
    //Getting the Unique Id from here
    DeviceInfo.getInstanceId().then(instanceId => {
      this.setState({instanceId: instanceId}, () => {
        this.getUserPersonalInfo();
        this.getUserTreeDetails();
      });
    });
  }
  getUserPersonalInfo = () => {
    fetch('https://krishhortus.com/app/userpersonaldetails.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instanceid: this.state.instanceId,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({userdetails: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
  };
  getUserTreeDetails = () => {
    fetch('https://krishhortus.com/app/usertreedetails.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instanceid: this.state.instanceId,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({usertreedetails: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
  };
  handleLogout = () => {
    fetch('https://krishhortus.com/app/userlogout.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instanceid: this.state.instanceId,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson === "loggedout") {
          try {
            AsyncStorage.removeItem(this.state.instanceId);
          } catch (exception) {
            return false;
          }
          this.props.navigation.navigate('FirstPage');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.halfHeight, {alignItems: 'center'}]}>
          <Image
            source={require('../Images/avatar.png')}
            style={styles.image}
          />
          <Text style={{fontWeight: 'bold', fontSize: 30, color: '#404040'}}>
            {this.state.userdetails.name}
          </Text>
        </View>
        <View style={[styles.midHeight, {backgroundColor: 'white'}]}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Total tree
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {this.state.usertreedetails.usertreecount}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Total tree mass
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {this.state.usertreedetails.usertreemass}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Total CO2e
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {this.state.usertreedetails.usertotalkgtree}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Phone
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {this.state.userdetails.phone}
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Sex
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Male/Female
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Height
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              0
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Average step length
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              2.5/2.2 feet(76.2/67.1 cms)
            </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: '#f2f2f2',
                paddingLeft: 10,
                color: '#006400',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Role
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                color: '#404040',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Land owner/ Farmer / Green walkers
            </Text>
          </View>
        </View>
        <View style={[styles.bottomHeight, {alignItems: 'center'}]}>
          <TouchableOpacity
            onPress={this.handleLogout}
            style={[
              styles.button,
              {
                alignItems: 'center',
                backgroundColor: '#006400',
                width: '100%',
                marginTop: 5,
              },
            ]}>
            <Text style={{color: 'white', fontSize: 25}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  halfHeight: {
    flex: 0.5,
    backgroundColor: 'white',
  },
  midHeight: {
    flex: 0.42,
    backgroundColor: 'white',
  },
  bottomHeight: {
    flex: 0.08,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    marginRight: 3,
    backgroundColor: 'white',
    padding: 2,
  },
  image: {
    width: 200,
    height: 200,
  },
});
