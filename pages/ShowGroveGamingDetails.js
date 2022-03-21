/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class SingleTreeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeid: this.props.navigation.state.params.treeId,
      details: {},
      groveGamingDetails: {},
      instanceId: '',
      userdetails: {},
    };
  }
  static navigationOptions = {
    title: 'Real Forest',
    backgroundColor: 'white',
    headerStyle: {
      backgroundColor: '#006400',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Allura-Regular',
      fontSize: 55,
    },
  };
  componentDidMount() {
    this.getTreeDetails();
    this.getGroveGamingDetails();
    this.getdeviceId();
  }
  getdeviceId() {
    //Getting the Unique Id from here
    DeviceInfo.getInstanceId().then(instanceId => {
      this.setState({instanceId: instanceId}, () => {
        this.getUserPersonalInfo();
        console.log(this.state.instanceId);
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
        this.setState({userdetails: responseJson}, () =>
          console.log(this.state.userdetails),
        );
      })
      .catch(error => {
        console.error(error);
      });
  };
  getTreeDetails = () => {
    fetch('https://krishhortus.com/app/getTreeDetails.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.treeid,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({details: responseJson}, () =>
          console.log(this.state.details),
        );
      })
      .catch(error => {
        console.error(error);
      });
  };
  getGroveGamingDetails = () => {
    fetch('https://krishhortus.com/app/getGroveGamingDetails.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.treeid,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({groveGamingDetails: responseJson}, () =>
          console.log(this.state.groveGamingDetails),
        );
        //console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };
  FlatListItemSeparator = () => {
    return <View style={{height: 2, width: '100%', backgroundColor: '#fff'}} />;
  };
  render() {
    var A = [
      {id: 'Tree id', value: this.state.groveGamingDetails.treeid},
      {id: 'Land Type', value: this.state.groveGamingDetails.LandType},
      {id: 'Soil Type', value: this.state.groveGamingDetails.SoilType},
      {
        id: 'Survey plot number',
        value: this.state.groveGamingDetails.SurveyPLotNo,
      },
      {
        id: 'Land details',
        value: this.state.groveGamingDetails.LandDetails,
      },
    ];
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
          <Image
            style={{
              width: '96%',
              height: 170,
              borderRadius: 10,
              alignSelf: 'center',
              borderWidth: 4,
              borderColor: '#ddd',
              marginTop: 3,
            }}
            source={{uri: this.state.details.imgurl}}
          />
        </View>
        {this.state.groveGamingDetails == 'notavailable' ? (
          <View style={{alignItems: 'center', margin: 25, marginTop: 90}}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../Images/info.png')}
            />
            <Text style={{fontSize: 17}}>
              Grove gaming details not available for this tree
            </Text>
            {this.state.details.uid == this.state.userdetails.id ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AddGroveGamingDetails', {
                    treeid: this.state.treeid,
                  })
                }
                style={{
                  backgroundColor: '#ff6961',
                  padding: 10,
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                }}>
                <Text style={{color: '#000', fontSize: 17}}>
                  Add Grove Gaming Details
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : (
          <View>
            <SectionList
              ItemSeparatorComponent={this.FlatListItemSeparator}
              sections={[{title: 'Tree Details', data: A}]}
              renderSectionHeader={({section}) => console.log()}
              renderItem={({item}) => (
                // Single Comes here which will be repeatative for the FlatListItems
                <View style={{marginLeft: 10}}>
                  <Text
                    style={[
                      styles.SectionListItemStyle,
                      {fontWeight: 'bold', fontSize: 18},
                    ]}>
                    {item.id}
                  </Text>
                  <Text
                    style={[
                      styles.SectionListItemStyle,
                      {fontWeight: 'normal', fontSize: 17, color: '#000'},
                    ]}>
                    {item.value}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
            {this.state.details.uid == this.state.userdetails.id ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('EditGroveGamingDetails', {
                    groveGamingDetails: this.state.groveGamingDetails,
                  })
                }
                style={{
                  backgroundColor: '#006400',
                  padding: 10,
                  marginTop: 5,
                  borderWidth: 2,
                  borderColor: '#006400',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 17}}>Edit</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  SectionHeaderStyle: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,
    color: '#006400',
    fontWeight: 'bold',
  },
  SectionListItemStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    padding: 5,
    color: '#006400',
  },
});
