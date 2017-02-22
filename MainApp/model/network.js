import React, { Component } from 'react';

const httpHost = "http://localhost:12345";

export default class Network {

    requestNetwork(url, para, update) {
        return fetch(httpHost + url)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('responseJson:' + JSON.stringify(responseJson));
                return responseJson;
            })
            .then(update)
            .catch((error) => {
                console.error("Douban Movie Network Error:"+error);
            });
    }

    fetchTop250(index, update){
        var para = {"start":index, "count":10};
        this.requestNetwork("/v2/movie/top250",para,update);
    }
}