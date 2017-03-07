import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import NavigatorView from './navigatorView';
import Top250View from './top250view';
import InTheaters from './inTheaters';
import SubjectView from './subjectview';

export default class MainApp extends Component {

  constructor(props) {
    super(props);
    var firstScene = InTheaters;
    this.state = { 
      selectedTab: firstScene.title,
      showTabBar: true,
    };
  }

  toggleTabBarVisibility(isShowTabBar) {
    this.setState(state => ({
      showTabBar: isShowTabBar
    }));
  }

  render() {
    var firstScene = InTheaters;
    var secondScene = Top250View;
    var thirdScene = SubjectView;

    let tabBarStyle = {};
    let sceneStyle = {};
    if (!this.state.showTabBar) {
      tabBarStyle.height = 0;
      tabBarStyle.overflow = 'hidden';
      sceneStyle.paddingBottom = 0;
    }
    return (
      <TabNavigator tabBarStyle={tabBarStyle} sceneStyle={sceneStyle}>
        <TabNavigator.Item
          selected={this.state.selectedTab === firstScene.title}
          title={firstScene.title}
          renderIcon={() => <Image source={require('../resources/theater.png')} />}
          renderSelectedIcon={() => <Image source={require('../resources/theaters.png')} />}
          onPress={() => this.setState({ selectedTab: firstScene.title })}>
          {<NavigatorView rootScene={firstScene} showTabBar={this.toggleTabBarVisibility.bind(this)}/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === secondScene.title}
          title={secondScene.title}
          renderIcon={() => <Image source={require('../resources/top.png')} />}
          renderSelectedIcon={() => <Image source={require('../resources/tops.png')} />}
          onPress={() => this.setState({ selectedTab: secondScene.title })}>
          {<NavigatorView rootScene={secondScene} showTabBar={this.toggleTabBarVisibility.bind(this)}/>}
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === thirdScene.title}
          title={thirdScene.title}
          renderIcon={() => <Image source={require('../resources/want.png')} />}
          renderSelectedIcon={() => <Image source={require('../resources/wants.png')} />}
          onPress={() => this.setState({ selectedTab: thirdScene.title })}>
          {<NavigatorView rootScene={thirdScene} showTabBar={this.toggleTabBarVisibility.bind(this)}/>}
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
