import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';

import Top250View from './top250view';
import InTheaters from './inTheaters';
import FavoriteMovie from './favoriteView'
import SubjectView from './subjectview';

const TheaterScreen = StackNavigator({
  InTheaters: { screen: InTheaters },
  Subject: { screen: SubjectView },
});

TheaterScreen.navigationOptions = {
  tabBar: ({ state }) => ({
    label: '正在上映',
    icon: ({ focused, tintColor }) => (
      focused == true ?
        <Image source={require('../resources/theaters.png')} /> :
        <Image source={require('../resources/theater.png')} />
    ),
  })
};

const TopScreen = StackNavigator({
  Top: { screen: Top250View },
  Subject: { screen: SubjectView },
});

TopScreen.navigationOptions = {
  title: 'Top250',
  tabBar: ({ state }) => ({
    label: '经典250',
    icon: ({ focused, tintColor }) => (
      focused == true ?
        <Image source={require('../resources/tops.png')} /> :
        <Image source={require('../resources/top.png')} />
    ),
  })
};

const FavoriteScreen = StackNavigator({
  Favorite: { screen: FavoriteMovie },
  Subject: { screen: SubjectView },
});

FavoriteScreen.navigationOptions = {
  title: '收藏',
  tabBar: ({ state }) => ({
    label: '收藏',
    icon: ({ focused, tintColor }) => (
      focused == true ?
        <Image source={require('../resources/wants.png')} /> :
        <Image source={require('../resources/want.png')} />
    ),
  })
};

const MainApp = TabNavigator({
  InTheaters: { screen: TheaterScreen },
  Top: { screen: TopScreen },
  Favorite: { screen: FavoriteScreen },
});

export default MainApp;

