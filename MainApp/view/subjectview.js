import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

import Network from '../model/network';

var {width, height} = Dimensions.get('window');

export default class SubjectView extends Component {

  static title = "Detail";

  constructor(props) {
    super(props);
    const genresDsConst = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const directorsDsConst = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const castsDsConst = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      movie: null,
      genresDS: genresDsConst.cloneWithRows([]),
      directorsDs: directorsDsConst.cloneWithRows([]),
      castsDs: castsDsConst.cloneWithRows([]),
    };
  }

  getGenres(genres) {
    var string = null;
    for (index in genres) {
      if (string == null) {
        string = genres[index];
      } else {
        string = string + "，" + genres[index];
      }
    }
    return string;
  }

  getDirectors(directors) {
    var string = null;
    for (index in directors) {
      if (string == null) {
        string = directors[index].name;
      } else {
        string = string + "，" + directors[index].name;
      }
    }
    return string;
  }

  loadData() {
    Network.fetchDeatil(this.props.movie.id,
      (data) => {
        if (data != null) {
          this.setState({
            movie: data
          });
        }
      });
  }

  componentDidMount() {
    this.setState({
      movie: this.props.movie
    });
    this.loadData();
  }

  render() {
    if (this.state.movie != null) {
      return (
        <ScrollView>
          <View style={styles.topViewContainer}>
            <View style={styles.imageCon}>
              <Image
                source={{ uri: this.state.movie.images.large }}
                style={styles.container}>
              </Image>
            </View>
            <View style={styles.textCon}>
              <Text style={styles.titleChinese}>
                {this.state.movie.title}
              </Text>
              <Text style={styles.titleOriginal}>
                {this.state.movie.original_title}
              </Text>
              <Text style={styles.titleDirectors}>
                导演：{this.getDirectors(this.state.movie.directors)}
              </Text>
              <Text style={styles.titleGenres}>
                {this.getGenres(this.state.movie.genres)}
              </Text>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (<View></View>);
    }
  }
}

var styles = StyleSheet.create({
  topViewContainer: {
    flexDirection: 'row',
    margin: 10
  },
  titleChinese: {
    fontSize: 17,
  },
  titleOriginal: {
    fontSize: 12,
  },
  titleDirectors: {
    fontSize: 12,
    color: 'gray'
  },
  titleGenres: {
    fontSize: 12,
    color: 'gray'
  },
  textCon: {
    marginLeft: 10
  },
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  imageCon: {
    width: (width / 3) - 3,
    height: ((width / 3) - 3) * 1.53
  }
});