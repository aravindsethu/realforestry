/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/*This is an Example of React Native Map*/
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Icon,
  Image,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.003;
export default class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 9.47972222,
        longitude: 77.53861111,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      maptype: 'standard',
      treeLocations: [],
      marker: null,
      pressed: false,
      newtreestatus: false,
    };
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#006400',
    },
    headerTintColor: '#fff',
    title: 'Grove Gaming',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  getLocation = () => {
    var that = this;
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Real Forest',
            message: 'Real Forest wants to access your location ',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          Geolocation.getCurrentPosition(
            position => {
              that.success(position);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 20000},
          );
        } else {
          console.log('location permission denied');
          alert('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestLocationPermission();
  };
  success = position => {
    const initialRegion = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    console.log(position);
    this.setState({initialPosition: initialRegion});
  };
  getTreeDetails = () => {
    fetch('https://krishhortus.com/app/getTreeLocations.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({treeLocations: responseJson});
        for (let i = 0; i < this.state.treeLocations.length; i++) {
          console.log(this.state.treeLocations[i]);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  componentDidMount() {
    this.getLocation();
    this.getTreeDetails();
  }
  // componentWillMount() {
  //   this.getTreeDetails();
  // }
  render() {
    const {navigate} = this.props.navigation;
    var markers = [];
    for (let i = 0; i < this.state.treeLocations.length; i++) {
      const key = this.state.treeLocations[i].id;
      const coordinates = {
        latitude: parseFloat(this.state.treeLocations[i].latitude),
        longitude: parseFloat(this.state.treeLocations[i].longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      markers.push(
        <Marker
          key={key}
          coordinate={coordinates}
          image={{uri: this.state.treeLocations[i].imgurl}}
          onPress={() => {
            navigate('ShowGroveGamingDetails', {
              treeId: key,
              email: this.props.navigation.getParam('email', 'NO-USER'),
            });
          }}
        />,
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.initialPosition}
          mapType={this.state.maptype}
          zoomEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsBuildings={true}
          zoomControlEnabled={true}>
          <Marker
            draggable
            image={require('../Images/rsz_1rsz_marker.png')}
            coordinate={this.state.initialPosition}
            onDragEnd={e => this.setState({x: e.nativeEvent.coordinate})}
          />
          {markers}
        </MapView>
        <View style={styles.btncontainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({maptype: 'standard'});
            }}
            style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({maptype: 'hybrid'});
            }}
            style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Hybrid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({maptype: 'satellite'});
            }}
            style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Satellite</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 0,
  },
  btncontainer: {
    flexDirection: 'row',
    height: '6%',
    width: '20%',
    marginTop: 20,
    marginLeft: 10,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
  },
});
