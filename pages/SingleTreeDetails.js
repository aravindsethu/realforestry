import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ScrollView,
  Image,
} from 'react-native';

export default class SingleTreeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeid: this.props.navigation.state.params.treeId,
      details: {},
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
  }
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
        this.setState({details: responseJson});
        console.log(this.state.details);
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
      {id: 'Tree id', value: this.state.details.id},
      {id: 'Tree species', value: this.state.details.treeName},
      {id: 'Height of tree(Meter)', value: this.state.details.treeHeightInM},
      {
        id: 'Diameter of tree at tree height(CentiMeter)',
        value: this.state.details.treeDiameterInCM,
      },
      {
        id: 'Calculated diameter of tree(Meter)',
        value: this.state.details.treeDiameterInM,
      },
      {id: 'Cicumference of tree', value: this.state.details.treeCircumference},
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
