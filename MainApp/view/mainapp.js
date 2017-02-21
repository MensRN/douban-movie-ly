import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Top250View from './top25view';

export default class MainApp extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedTab: 'home' };
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item 
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Image source={require('../resources/top.png')} />}
          renderSelectedIcon={() => <Image source={require('../resources/top.png')} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          {<View style={{flex: 1, backgroundColor:'#ffffff'}}><Text>1111111111111111111111</Text></View>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Image source={require('../resources/top.png')} />}
          renderSelectedIcon={() => <Image source={require('../resources/top.png')} />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          {<View style={{flex: 1, backgroundColor:'#ffffff'}}><Text>222222222222222222222</Text></View>}
        </TabNavigator.Item >
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 60,
    backgroundColor: '#000000',
    alignItems: 'center'
  }
});  
