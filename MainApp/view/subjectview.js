import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Button } from 'react-native';

import Network from '../model/network';
import Storage from '../model/storage';

var {width, height} = Dimensions.get('window');

export default class SubjectView extends Component {

  static navigationOptions = {
    title: '电影详情',
    tabBar: ({ state, setParams }) => ({
      visible:false
    }),
  }

  constructor(props) {
    super(props);

    this.state = {
      movie: null,
      showSummary: false,
      favorited: false
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
    const { params } = this.props.navigation.state;
    Network.fetchDeatil(params.movie.id,
      (data) => {
        if (data != null) {
          this.setState({
            movie: data
          });
        }
      });

    Storage.readMovie(params.movie.id,
      (data) => {
        if (data != undefined) {
          this.setState({
            favorited: true,
          });
        } else {
          this.setState({
            favorited: false,
          });
        }
      });
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      movie: params.movie
    });
    this.loadData();
  }

  showAllSummary() {
    this.setState({
      showSummary: !this.state.showSummary
    });
  }

  favoriteMovie() {
    const { params } = this.props.navigation.state;
    Storage.readMovie(params.movie.id,
      (data) => {
        if (data != undefined) {
          Storage.removeMovie(this.state.movie.id);
          this.setState({
            favorited: false,
          });
        } else {
          Storage.favoriteMovie(this.state.movie);
          this.setState({
            favorited: true,
          });
        }
      });
  }

  render() {
    if (this.state.movie != null) {
      if (this.state.movie.countries == undefined) {
        this.state.movie.countries = [];
      }
      return (
        <ScrollView style={{ backgroundColor: '#EEE' }}>
          {/* 影片信息 */}
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
              <View style={styles.titleGenresBg}>
                {this.state.movie.genres.map((x, i) => <Text key={i} style={styles.titleGenres}>{x}</Text>)}
              </View>
              <Text style={styles.titleDirectors}>
                {this.state.movie.year}
              </Text>
              <View style={styles.titleGenresBg}>
                {this.state.movie.countries.map((x, i) => <Text key={i} style={{ fontSize: 12 }}>{x}</Text>)}
              </View>
              <View style={styles.imageLeftCon}>
                <Text style={styles.titleDirectors}>
                  评分:{this.state.movie.rating.average}
                </Text>
              </View>
              <View style={styles.imageLeftCon}>
                <Text style={styles.titleDirectors}>
                  想看:{this.state.movie.wish_count}
                </Text>
                <Text style={styles.titleDirectors}>
                  看过:{this.state.movie.reviews_count}
                </Text>
              </View>
              <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: 5 }} onPress={this.favoriteMovie.bind(this)}>
                <Text style={{ fontSize: 12 }} >{this.state.favorited ? "取消收藏" : "收藏"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* 简介 */}
          <View style={styles.summaryContainer}>
            <Text >
              影片简介：
            </Text>
            <Text numberOfLines={this.state.showSummary ? 0 : 3} style={styles.summaryText} >
              {this.state.movie.summary}
            </Text>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: 5 }} onPress={this.showAllSummary.bind(this)}>
              {this.state.showSummary ?
                <Text style={{ fontSize: 12 }}>收起</Text> :
                <Text style={{ fontSize: 12 }}>展开</Text>}
            </TouchableOpacity>
          </View>
          {/* 演职人员 */}
          <ScrollView
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            style={styles.castsViewContainers}>
            <View>
              <Text>导演：</Text>
              <View style={styles.castsViewContainers}>
                {this.state.movie.directors.map((x, i) =>
                  <View key={i} style={styles.castsViewContainer} >
                    <Image source={{ uri: x.avatars.large }} style={styles.castsImage} />
                    <Text numberOfLines={1} style={styles.castsText} >{x.name}</Text>
                  </View>)}
              </View>
            </View>
            <View>
              <Text>主演：</Text>
              <View style={styles.castsViewContainers}>
                {this.state.movie.casts.map((x, i) =>
                  <View key={i} style={styles.castsViewContainer} >
                    <Image source={{ uri: x.avatars.large }} style={styles.castsImage} />
                    <Text numberOfLines={1} style={styles.castsText} >{x.name}</Text>
                  </View>)}
              </View>
            </View>
          </ScrollView>
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
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  titleChinese: {
    fontSize: 17,
    paddingTop: 10
  },
  titleOriginal: {
    fontSize: 12,
  },
  titleDirectors: {
    fontSize: 12,
    color: 'gray',
    padding: 2,
  },
  titleGenresBg: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 2,
  },
  titleGenres: {
    fontSize: 12,
    color: 'white',
    backgroundColor: '#111',
    marginRight: 5,
    padding: 3,
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
  },
  imageLeftCon: {
    flexDirection: 'row',
  },
  imageLeftText: {
    flexDirection: 'row',
    marginRight: 2,
    fontSize: 10
  },
  castsViewContainers: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  castsViewContainer: {
    margin: 2,
  },
  castsImage: {
    width: 70,
    height: 70 * 1.53
  },
  castsText: {
    fontSize: 12,
    width: 70,
  },
  summaryContainer: {
    marginBottom: 5,
    padding: 2,
    backgroundColor: '#FFF'
  },
  summaryText: {
    fontSize: 12,
  }
});