import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image } from 'react-native';

export default class SubjectView extends Component {

  static title = "Detail";

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Detail</Text>
      </View>
    )
  }
}