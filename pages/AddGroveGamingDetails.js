/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

export default class AddGroveGamingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeId: 0,
      LandType: '',
      SoilType: '',
      SurveyPlotNo: '',
      LandDetails: '',
      isLoading: true,
      PickerValueHolder: '',
    };
  }
  static navigationOptions = {
    title: 'Real Forest',
    backgroundColor: 'white',
    headerStyle: {
      backgroundColor: '#006400',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Allura-Regular',
      fontSize: 55,
    },
  };
  componentDidMount() {
    console.log(this.props.navigation.state.params.treeid);
    this.assignStateValues();
  }
  assignStateValues = () => {
    this.setState({
      treeId: this.props.navigation.state.params.treeid,
    });
  };
  GroveGamingFunction = () => {
    const {LandType} = this.state;
    const {SoilType} = this.state;
    const {SurveyPlotNo} = this.state;
    const {LandDetails} = this.state;
    fetch('https://krishhortus.com/app/grove_gaming.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        treeId: this.state.treeId,
        LandType: LandType,
        SoilType: SoilType,
        SurveyPlotNo: SurveyPlotNo,
        LandDetails: LandDetails,
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
    return (
      <ScrollView style={styles.container}>
        <View style={{margin: 17}}>
          <Text style={{color: '#006400', fontSize: 19, margin: 4}}>
            Tree id: {this.state.treeId}
          </Text>
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>
            Land type
          </Text>
          <TextInput
            placeholder={'Land type'}
            onChangeText={LandType => this.setState({LandType})}
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>
            Soil type
          </Text>
          <TextInput
            placeholder={'Soil type'}
            onChangeText={SoilType => this.setState({SoilType})}
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>
            Survey plot number
          </Text>
          <TextInput
            placeholder={'Survey plot no.'}
            onChangeText={SurveyPlotNo => this.setState({SurveyPlotNo})}
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>
            Land details
          </Text>
          <TextInput
            placeholder={'Land details'}
            onChangeText={LandDetails => this.setState({LandDetails})}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.login}
            onPress={this.GroveGamingFunction}>
            <Text style={{color: '#fff', fontSize: 16}}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 15,
  },
  login: {
    alignItems: 'center',
    backgroundColor: '#006400',
    padding: 5,
    marginTop: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#006400',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 15,
    borderRadius: 5,
    padding: 3,
    margin: 2,
  },
});
