import React, { Component } from 'react';

const doubanHost = "http://api.douban.com/v2/";
const testHost = "http://localhost:12345/v2/";

export const URLS = {
  top: 'movie/top250',
  in_theaters: 'movie/in_theaters',
};

export default class Network {

    requestNetwork(url, para, update) {
        var requestUrl = testHost+url;
        return fetch(requestUrl)
            .then((response) => {
                console.log('responseJson:' + response);
                return response.json()
            })
            .then((responseJson) => {
                console.log('responseJson:' + JSON.stringify(responseJson));
                return responseJson;
            })
            .then(update)
            .catch((error) => {
                console.error("Douban Movie Network Error:"+error);
            });
    }

    fetchTop250(index, update){
        var para = {"start":index, "count":10};
        this.requestNetwork(URLS.top,para,update);
    }

    fetchTheaters(index, update){
        var para = {"start":index, "count":10};
        this.requestNetwork(URLS.in_theaters,para,update);
    }
}