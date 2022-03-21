import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import TreeMap from './TreeMap';
import ListTree from './ListTree';

const TabScreen = createMaterialTopTabNavigator(
  {
    TreeMap: {screen: TreeMap},
    ListTree: {screen: ListTree},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#006400',
      inactiveTintColor: '#6b8e23',
      style: {
        backgroundColor: '#fff',
        fontWeight: 'bold',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
      },
    },
  },
);
export default createAppContainer(TabScreen);
