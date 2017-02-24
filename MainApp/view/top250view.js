import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image } from 'react-native';
import Dimensions from 'Dimensions';

import Network from '../model/network';

var {width, height} = Dimensions.get('window');

class TopMovieCell extends Component {
  //<Image source={{ }} style={styles.cellImage} />
  render() {
    return (
      <View style={styles.item} >
        <View style={styles.cellImageCon}>
          <Image
            source={{ uri: this.props.movie.images.large }}
            style={styles.container}>
            <Text style={styles.rating}>
              {this.props.movie.rating.average}
            </Text>
          </Image>
        </View>
        <Text>{this.props.movie.title}</Text>
        <Text>{this.props.movie.year}</Text>
      </View>
    );
  }
}

export default class Top250View extends Component {

  static title = "Top250";

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows([]),
      title: "Top250"
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
          enableEmptySections={true}
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
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  cellImageCon: {
    width: (width / 3) - 3,
    height: ((width / 3) - 3) * 1.53,
  },
  rating: {
    fontSize: 20,
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: 'grey'
  }
});

