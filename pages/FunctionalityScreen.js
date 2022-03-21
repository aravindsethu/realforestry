/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import ActionBarImage from './ActionBarImage';
import ProfileImage from './ProfileImage';
import Communications from 'react-native-communications';
import {SliderBox} from 'react-native-image-slider-box';

export default class FunctionalityScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.navigation.getParam('email', 'NO-USER'),
      images: [
        require('../Images/slide1.jpeg'),
        require('../Images/slide2.jpeg'),
        require('../Images/slide3.jpeg'),
        require('../Images/slide4.jpeg'),
        require('../Images/slide5.jpeg'),
        require('../Images/slide6.jpeg'),
      ],
    };
  }
  static navigationOptions = {
    title: 'Real Forest',
    headerLeft: () => <ActionBarImage />,
    headerRight: () => <ProfileImage />,
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 0,
    },
    headerTintColor: '#006400',
    headerTitleStyle: {
      fontFamily: 'Allura-Regular',
      fontSize: 55,
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.3}}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={145}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            dotColor="#fff"
            inactiveDotColor="#444"
            dotStyle={{
              borderColor: '#006400',
              borderWidth: 1.5,
              width: 15,
              height: 15,
              borderRadius: 15,
            }}
            autoplay
            circleLoop
          />
        </View>
        <View style={{flex: 0.7}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('TabScreen')}>
            <ImageBackground
              source={require('../Images/image1.jpg')}
              style={{width: '100%', height: '100%'}}>
              <Text style={{color: '#fff'}} />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('LandCoverHome')}>
            <ImageBackground
              source={require('../Images/image2.jpg')}
              style={{width: '100%', height: '100%'}}>
              <Text style={{color: '#fff'}} />
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('GroveGamingHome')}>
            <ImageBackground
              source={require('../Images/image3.jpg')}
              style={{width: '100%', height: '100%'}}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  marginTop: 30,
                  fontFamily: 'allure',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                GROVE GAMING
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => Communications.web('http://krishhortus.com/')}>
            <Text
              style={{
                marginTop: 15,
                fontWeight: 'bold',
                fontSize: 15,
                color: '#006400',
              }}>
              Visit our website at krishhortus.com
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#006400',
    width: 300,
    height: 80,
    marginTop: 16,
  },
});
