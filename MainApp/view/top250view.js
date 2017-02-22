import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image } from 'react-native';
import Dimensions from 'Dimensions';

import Network from '../model/network';

var {width, height} = Dimensions.get('window');

class TopMovieCell extends Component {
  render() {
    console.log('data:' + JSON.stringify(this.props.movie));

    return (
      <View style={styles.item} >
        <View>
          <Image source={{ uri: this.props.movie.images.large }}
            style={styles.cellImage} />
        </View>
        <Text>{this.props.movie.title}</Text>
        <Text>{this.props.movie.year}  {this.props.movie.rating.average}</Text>
      </View>
    );
  }
}

export default class Top250View extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    networkObject = new Network();

    networkObject.fetchTop250(0,
      (data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.subjects),
        });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <TopMovieCell style={styles.item} movie={rowData} ></TopMovieCell>}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    backgroundColor: '#ffffff',
    margin: 1,
    alignItems: 'center',
    width: (width / 3) - 3,
    height: ((width / 3) - 3) * 1.8
  },
  cellImage:{
    width: (width / 3) - 3, 
    height: ((width / 3) - 3) * 1.53
  }
});