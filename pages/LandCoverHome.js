/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Picker,
  ActivityIndicator,
} from 'react-native';

export default class LandCoverHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CrownHeight: '',
      CrownCoverNS: '',
      CrownCoverEW: '',
      TreesStrideLength: '',
      isLoading: true,
      PickerValueHolder: '',
    };
  }
  componentDidMount() {
    fetch('https://krishhortus.com/app/treeid.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            // In this block you can do something with new state.
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  static navigationOptions = {
    title: 'LAND COVER',
    headerStyle: {
      backgroundColor: '#006400',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Allura-Regular',
    },
  };
  LandRegistrationFunction = () => {
    const {CrownHeight} = this.state;
    const {CrownCoverNS} = this.state;
    const {CrownCoverEW} = this.state;
    const {TreesStrideLength} = this.state;
    const {PickerValueHolder} = this.state;
    fetch('https://krishhortus.com/app/land_registration.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        PickerValueHolder: PickerValueHolder,
        CrownHeight: CrownHeight,
        CrownCoverNS: CrownCoverNS,
        CrownCoverEW: CrownCoverEW,
        TreesStrideLength: TreesStrideLength,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <View style={{borderBottomColor: '#006400', borderBottomWidth: 2}}>
          <Picker
            selectedValue={this.state.PickerValueHolder}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({PickerValueHolder: itemValue})
            }>
            {this.state.dataSource.map((item, key) => (
              <Picker.Item label={item.id} value={item.id} key={key} />
            ))}
          </Picker>
        </View>
        <TextInput
          placeholder={'Crown height'}
          onChangeText={CrownHeight => this.setState({CrownHeight})}
          style={styles.input}
        />
        <TextInput
          placeholder={'Crown cover(NS)'}
          onChangeText={CrownCoverNS => this.setState({CrownCoverNS})}
          style={styles.input}
        />
        <TextInput
          placeholder={'Crown cover(EW)'}
          onChangeText={CrownCoverEW => this.setState({CrownCoverEW})}
          style={styles.input}
        />
        <TextInput
          placeholder={'Trees stride length'}
          onChangeText={TreesStrideLength => this.setState({TreesStrideLength})}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.login}
          onPress={this.LandRegistrationFunction}>
          <Text style={{color: '#f5fffa'}}>Add land details</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 35,
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
