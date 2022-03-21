/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import DeviceInfo from 'react-native-device-info';
import {RadioGroup} from 'react-native-btr';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default class AddTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instanceId: '',
      TreeName: '',
      TreeHeight: 0,
      DiameterInCm: 0,
      Circumference: 0,
      YearOfPlantation: '',
      TreeDescription: '',
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      WoodTypeSelectedIndex: 1,
      ShapeSelectedIndex: 1,
      msg: '',
      ImageSource: null,
      data: null,
      Image_TAG: '',
      image_name: '',
      btndisable: true,
      btnColor: '#b3b3b3',
      txtColor: '#006400',
      woodTypes: [
        {
          label: 'Hard wood',
          value: 0,
          checked: true,
          color: '#000',
          disabled: false,
          flexDirection: 'row',
          size: 8,
        },
        {
          label: 'Soft wood',
          value: 1,
          checked: false,
          color: '#000',
          disabled: false,
          flexDirection: 'row',
          size: 8,
        },
      ],
      shapeTypes: [
        {
          label: 'Cylindrical',
          value: 0,
          checked: true,
          color: '#000',
          disabled: false,
          flexDirection: 'row',
          size: 8,
        },
        {
          label: 'Conical',
          value: 1,
          checked: false,
          color: '#000',
          disabled: false,
          flexDirection: 'row',
          size: 8,
        },
      ],
    };
    //this.openSearchModal = this.openSearchModal.bind(this);
  }
  componentDidMount = () => {
    this.getdeviceId();
    const {navigation} = this.props;
    const treelat = parseFloat(navigation.getParam('newlatitude', 'default value'));
    const treelong = parseFloat(navigation.getParam('newlongitude', 'default value'));
    this.setState({latitude: treelat, longitude: treelong});
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  };
  getdeviceId = () => {
    //Getting the Unique Id from here
    DeviceInfo.getInstanceId().then(instanceId => {
      this.setState({instanceId: instanceId});
      console.log(instanceId);
    });
  };
  // openSearchModal() {
  //   RNGooglePlaces.openAutocompleteModal({
  //     country: 'IN',
  //     type: 'establishments',
  //   })
  //     .then(place => {
  //       this.setState({
  //         name: place.name,
  //         address: place.address,
  //         location: place.location,
  //       });
  //       console.log(place);
  //     })
  //     .catch(error => console.log(error.message));
  // }
  // handleWoodSingleIndexSelect = (index: number) => {
  //   //handle tab selection for single Tab Selection SegmentedControlTab
  //   this.setState(prevState => ({ ...prevState, WoodTypeSelectedIndex: index }));
  //   console.log(this.state.WoodTypeSelectedIndex);
  // };
  // handleShapeSingleIndexSelect = (index: number) => {
  //   //handle tab selection for single Tab Selection SegmentedControlTab
  //   this.setState(prevState => ({ ...prevState, ShapeSelectedIndex: index }));
  //   console.log(this.state.ShapeSelectedIndex);
  // };
  TreeRegistrationFunction = () => {
    const {TreeName} = this.state;
    const {TreeHeight} = this.state;
    const {DiameterInCm} = this.state;
    const {YearOfPlantation} = this.state;
    const {TreeDescription} = this.state;
    const {Circumference} = this.state;
    const imageName =
      'https://krishhortus.com/app/uploads/' + this.state.image_name;
    fetch(
      'https://krishhortus.com/app/tree_registration.php',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instanceid: this.state.instanceId,
          tname: TreeName,
          theight: parseFloat(TreeHeight),
          tdiameterincm: parseFloat(DiameterInCm),
          tcircumference: parseFloat(Circumference),
          yearofplantation: YearOfPlantation,
          treeDescription: TreeDescription,
          treeLat: this.state.latitude,
          treeLong: this.state.longitude,
          woodtypeindex: this.state.WoodTypeSelectedIndex,
          shapeindex: this.state.ShapeSelectedIndex,
          imgurl: imageName,
        }),
      },
    )
    .then((response) => response.text())
    .then((responseJson) => {
      alert(responseJson);
      this.props.navigation.navigate('TabScreen');
    })
    .catch((error) => {
      console.error(error);
      });
  };
  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 150,
      maxHeight: 150,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        this.setState(
          {
            ImageSource: source,
            data: response.data,
          },
          () => this.uploadImageToServer(),
        );
      }
    });
  };

  uploadImageToServer = () => {
    RNFetchBlob.fetch(
      'POST',
      'https://krishhortus.com/app/Upload.php',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: 'image.png',
          type: 'image/png',
          data: this.state.data,
        },
        {name: 'image_tag', data: this.state.Image_TAG},
      ],
    )
      .then((resp) => {
        var tempMSG = resp.data;
        tempMSG = tempMSG.replace(/^"|"$/g, '');
        console.log(tempMSG);
        this.setState({
          msg: 'Image uploaded',
          image_name: tempMSG,
          btnColor: '#006400',
          txtColor: 'white',
          btndisable: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  render() {
    const {latitude} = this.state;
    const {longitude} = this.state;
    const {WoodTypeSelectedIndex, ShapeSelectedIndex} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={{margin: 17}}>
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Name</Text>
          <TextInput
            placeholder={'Name of tree'}
            clearButtonMode="while-editing"
            onChangeText={TreeName => this.setState({TreeName})}
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Wood type</Text>
          <RadioGroup
            color="#006400"
            labelStyle={{fontSize: 17}}
            radioButtons={this.state.woodTypes}
            onPress={woodTypes => {
              let selectedItem = woodTypes.find(e => e.checked == true);
              selectedItem = selectedItem
                ? selectedItem.value
                : this.state.woodTypes[0].value;
                this.setState({woodTypeSelectedIndex: selectedItem});
              console.log(selectedItem);
            }}
            style={{padding: 5}}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Height</Text>
          <TextInput
            placeholder={'Height of tree'}
            keyboardType="decimal-pad"
            onChangeText={TreeHeight => {this.setState({TreeHeight}); console.log(TreeHeight);}}
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>DBH</Text>
          <TextInput
            placeholder={'Diameter of breast height(DBH centimeter/inches)'}
            keyboardType="decimal-pad"
            onChangeText={DiameterInCm => this.setState({DiameterInCm})}
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Circumference</Text>
          <TextInput
            placeholder={'Circumference of tree(meter)'}
            keyboardType="decimal-pad"
            onChangeText={Circumference => this.setState({Circumference})}
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Shape of tree</Text>
          <RadioGroup
            color="#006400"
            labelStyle={{fontSize: 17}}
            radioButtons={this.state.shapeTypes}
            onPress={shapeTypes => {
              let selectedItem = shapeTypes.find(e => e.checked == true);
              selectedItem = selectedItem
                ? selectedItem.value
                : this.state.woodTypes[0].value;
                this.setState({shapeSelectedIndex: selectedItem});
              console.log(selectedItem);
            }}
            style={{padding: 5}}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Year of plantation</Text>
          <TextInput
            placeholder={'When did you plant this tree(yyyy)?'}
            onChangeText={YearOfPlantation => this.setState({YearOfPlantation})}
            keyboardType="number-pad"
            style={styles.input}
          />
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Tree location coordinates(Latitude,Longitude)</Text>
          <TextInput
            placeholder={'Tree Location'}
            style={styles.input}>
            <Text >{latitude}, {longitude}</Text>
          </TextInput>
          <Text style={{color: '#006400', fontSize: 16, margin: 4}}>Tree description</Text>
          <TextInput
            placeholder={'Describe your tree(optional)'}
            multiline={true}
            numberOfLines={8}
            onChangeText={TreeDescription => this.setState({TreeDescription})}
            style={styles.input}
          />
          <TouchableOpacity
            style={[styles.login, {backgroundColor: '#fff'}]}
            onPress={this.selectPhotoTapped}
          >
            <Text style={{color: '#006400', fontSize: 17}}>Choose an image</Text>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>{this.state.msg}</Text>
          <TouchableOpacity
            disabled={this.state.btndisable}
            style={[styles.login,{padding: 8, backgroundColor: this.state.btnColor}]}
            onPress={this.TreeRegistrationFunction}>
            <Text style={{color: this.state.txtColor, fontSize: 16}}>Add Tree</Text>
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
  logo: {
    color: '#f08080',
    borderTopColor: '#dda0dd',
    borderBottomColor: '#afeeee',
    borderLeftColor: '#98fb98',
    borderRightColor: '#da70d6',
    borderWidth: 5,
    fontSize: 25,
    marginBottom: 30,
  },
  option: {
    marginTop: 5,
    width: 300,
  },
  tabStyle: {
    borderColor: '#006400',
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: '#006400',
  },
});
