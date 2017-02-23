import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import NavigatorView from './navigatorView';
import Top250View from './top250view';
import SubjectView from './subjectview';

export default class MainApp extends Component {

  constructor(props) {
    super(props);
    var firstScene = Top250View;
    var secondScene = SubjectView;
    this.state = { selectedTab: firstScene.title };
  }

  render() {
    var firstScene = Top250View;
    var secondScene = SubjectView;
    return (
      <TabNavigator>
        <TabNavigator.Item 
          selected={this.state.selectedTab === firstScene.title}
          title={firstScene.title}
          renderIcon={() => <Image source={require('../resources/top.png')} />}
          renderSelectedIcon={() => <Image source={require('../resources/tops.png')} />}
          onPress={() => this.setState({ selectedTab: firstScene.title })}>
          {<NavigatorView rootScene={firstScene}/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === secondScene.title}
          title={secondScene.title}
          renderIcon={() => <Image source={require('../resources/top.png')} />}
          renderSelectedIcon={() => <Image source={require('../resources/tops.png')} />}
          onPress={() => this.setState({ selectedTab: secondScene.title })}>
          {<NavigatorView rootScene={secondScene}/>}
        </TabNavigator.Item >
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 64,
    backgroundColor: '#000000',
    alignItems: 'center'
  }
});  
