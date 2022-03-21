/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

export default class SecondPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserName: '',
      UserEmail: '',
      UserPhone: '',
      UserPassword: '',
    };
  }
  UserRegistrationFunction = () => {
    const {UserName} = this.state;
    const {UserEmail} = this.state;
    const {UserPhone} = this.state;
    const {UserPassword} = this.state;

    fetch(
      'https://krishhortus.com/app/user_registration.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: UserName,
          email: UserEmail,
          phone: UserPhone,
          password: UserPassword,
        }),
      },
    )
    .then((response) => response.text())
    .then((responseJson) => {
      alert(responseJson);
    })
    .catch((error) => {
      console.error(error);
      });
  };
  static navigationOptions = {
    title: 'Real Forest',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#006400',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Allura-Regular',
    },
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={require('../Images/log.png')} style={{width: 130, height: 130}} />
        <TextInput
          placeholder={'Username'}
          onChangeText={UserName => this.setState({UserName})}
          style={styles.input}
        />
        <TextInput
          placeholder={'Email'}
          keyboardType="email-address"
          onChangeText={UserEmail => this.setState({UserEmail})}
          style={styles.input}
        />
        <TextInput
          placeholder={'Phone no.'}
          keyboardType="phone-pad"
          onChangeText={UserPhone => this.setState({UserPhone})}
          style={styles.input}
        />
        {/* <TextInput
          placeholder={'Password'}
          onChangeText={UserPassword => this.setState({UserPassword})}
          style={styles.input}
          secureTextEntry={true}
        /> */}
        <TouchableOpacity
          style={styles.login}
          onPress={this.UserRegistrationFunction}>
          <Text style={{color: '#f5fffa'}}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
  login: {
    alignItems: 'center',
    backgroundColor: '#006400',
    padding: 10,
    width: 300,
    marginTop: 10,
    fontSize: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#006400',
    padding: 5,
    width: 300,
    marginTop: 10,
    fontSize: 15,
  },
});
