import React, { Component } from 'react';

const userProduct = false;

export const HOST = {
    douban: 'https://api.douban.com/v2/',
    test: 'http://localhost:12345/v2/',

};

export const URLS = {
    top: 'movie/top250',
    in_theaters: 'movie/in_theaters',
    subject: 'movie/subject/',
};

export default class Network {

    static Host() {
        return userProduct ? HOST.douban : HOST.test;
    }

    static requestNetwork(url, para, update) {
        var paraString = "";
        for (var property in para) {
            if (paraString.length == 0) {
                paraString = "?" + property + "=" + para[property];
            } else {
                paraString = paraString + "&" + property + "=" + para[property];
            }
        }
        var requestUrl = Network.Host() + url + paraString;
        console.log('requestUrl:' + requestUrl);
        return fetch(requestUrl)
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                // console.log('responseJson:' + JSON.stringify(responseJson));
                return responseJson;
            })
            .then(update)
            .catch((error) => {
                console.log("Douban Movie Network Error:" + error);
            });
    }

    static fetchTop250(index, count, update) {
        var para = { "start": index, "count": count };
        this.requestNetwork(URLS.top, para, update);
    }

    static fetchTheaters(index, count, update) {
        var para = { "start": index, "count": count };
        this.requestNetwork(URLS.in_theaters, para, update);
    }

    static fetchDeatil(id, update) {
        var para = {};
        var url = URLS.subject + id; // TODO: conver to Rex
        this.requestNetwork(url, para, update);
    }
}