/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

navigator.geolocation = require('@react-native-community/geolocation');

export default class LocationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttondisable: true,
      location: '',
    };
  }
  static navigationOptions = {
    title: 'Real Forest',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#006400',
    headerTitleStyle: {
      fontFamily: 'Allura-Regular',
      fontSize: 55,
    },
  };
  geocoder() {
    Geocoder.init('AIzaSyCxhEZDfGHsWXTa5OmOvtmYnWwSN3cZCzc');
    Geocoder.from(this.state.location)
      .then(json => {
        //var location = json.results[0].geometry.location;
        console.log(json);
      })
      .catch(error => console.warn(error));
  }
  // confirmLocation = () => {

  // };
  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Type To Search And Select location "
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          keyboardAppearance={'light'}
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            this.setState(
              {buttondisable: false, location: data.place_id},
              this.geocoder(),
            );
          }}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyCxhEZDfGHsWXTa5OmOvtmYnWwSN3cZCzc',
            language: 'en', // language of the results
          }}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={true}
          currentLocationLabel="Use current location"
          nearbyPlacesAPI="GooglePlacesSearch"
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            type: 'cafe',
          }}
          GooglePlacesDetailsQuery={{
            fields: 'formatted_address',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]}
          debounce={200}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.confirmLocation}
          disabled={this.state.buttondisable}>
          <Text style={{color: '#006400', fontWeight: 'bold'}}>
            Confirm Location
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 0,
  },
});
