import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import ActionBarImage from './ActionBarImage';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: '',
      // UserPassword: '',
      instanceId: '',
    };
  }
  componentDidMount() {
    this.getdeviceId();
  }
  UserLoginFunction = () => {
    const {UserEmail} = this.state;
    const {UserPassword} = this.state;
    fetch('https://krishhortus.com/app/user_login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: UserEmail,
        password: UserPassword,
        instanceid: this.state.instanceId,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson === 'Data Matched') {
          //Then open Profile activity and send user email to profile activity.
          console.log(this.state.instanceId);
          this.storeData();
        } else {
          alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  getdeviceId = () => {
    //Getting the Unique Id from here
    DeviceInfo.getInstanceId().then(instanceId => {
      this.setState({instanceId: instanceId});
      console.log(instanceId);
    });
  };
  storeData = value => {
    const {UserEmail} = this.state;
    if (UserEmail) {
      //To check the input not empty
      AsyncStorage.setItem(this.state.instanceId, UserEmail);
      //Resetting the TextInput
      this.props.navigation.navigate('FunctionalityScreen', {
        email: UserEmail,
      });
      //alert to confirm
    }
  };
  static navigationOptions = {
    title: 'Real Forest',
    headerLeft: () => <ActionBarImage />,
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#006400',
    headerTitleStyle: {
      fontFamily: 'Allura-Regular',
      fontSize: 60,
    },
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        source={require('../Images/background.jpg')}
        style={styles.container}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 8,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: '#006400',
          }}>
          <TextInput
            placeholder={'Email/Phone no.'}
            placeholderTextColor="#006400"
            keyboardType="email-address"
            onChangeText={UserEmail => this.setState({UserEmail})}
            style={styles.input}
          />
          {/* <TextInput
            placeholder={'Password'}
            placeholderTextColor="#006400"
            onChangeText={UserPassword => this.setState({UserPassword})}
            style={styles.input}
            secureTextEntry={true}
          /> */}
          <TouchableOpacity
            style={styles.login}
            onPress={this.UserLoginFunction}>
            <Text style={{color: '#fff'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.register}
            onPress={() => navigate('SecondPage')}>
            <Text>Not yet registered? Register now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fffa',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    opacity: 0.9,
  },
  register: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#006400',
    backgroundColor: '#f5fffa',
    padding: 10,
    width: 300,
    marginTop: 16,
    fontSize: 15,
  },
  login: {
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#006400',
    padding: 10,
    width: 300,
    marginTop: 16,
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#006400',
    color: '#006400',
    padding: 10,
    width: 300,
    fontSize: 15,
  },
});
