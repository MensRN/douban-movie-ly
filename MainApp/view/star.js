import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

export default class Star extends Component {


    renderList() {
        var starList = new Array(5);
        console.log("-------------------------------------------------");
        var rating = Math.floor(this.props.rating);
        for (var i = 1; i <= 5; i++) {
            if (rating >= 2 * i) {
                starList[i] = 2;
            } else if ((rating < 2 * i)&&(rating > 2 * (i-1))) {
                starList[i] = 1;
            } else {
                starList[i] = 0;
            }
            console.log("index:" + i + " item:", rating + " i*2:" + i * 2 + " starList:" + starList[i]);
        }

        return starList.map((item, i) => this.renderItem(item, i));
    }

    renderItem(item, i) {
        if (item == 2) {
            return <Image key={i} source={require('../resources/star.png')} />;
        }
        else if (item == 1) {
            return <Image key={i} source={require('../resources/starHalf.png')} />;
        }
        else {
            return <Image key={i} source={require('../resources/starEmpty.png')} />;
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', }}>
                <Text style={{ paddingRight: 3 }}>
                    {this.props.rating}
                </Text>
                <View style={{ flexDirection: 'row', }}>
                    {this.renderList()}
                </View>
            </View>
        );
    }
}