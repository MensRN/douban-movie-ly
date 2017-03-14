import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default class Star extends Component {


    renderList() {
        var starList = new Array(5);
        for (var i = 1; i <= 5; i++) {
            ratingSplit = this.props.rating - 2 * i;
            starList[i-1] = ratingSplit;
        }
        return starList.map((item,i) => this.renderItem(item,i));
    }

    renderItem(item, i) {
        if (item >= 0) {
            return <Image key={i} source={require('../resources/star.png')} />;
        }
        else if (item > -2) {
            return <Image key={i} source={require('../resources/starHalf.png')} />;
        }
        else {
            return <Image key={i} source={require('../resources/starEmpty.png')} />;
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', }}>
                <Text style={{paddingRight:3}}>
                    {this.props.rating}
                </Text>
                <View style={{ flexDirection: 'row', }}>
                    {this.renderList()}
                </View>
            </View>
        );
    }
}