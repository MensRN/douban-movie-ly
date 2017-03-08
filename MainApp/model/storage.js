import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';


export const Keys = {
    favoritesMovie: 'movie',
};

export default class Storage {

    static readMovie(movieId, update) {
        var movieKey = Keys.favoritesMovie + "-" + movieId;

        AsyncStorage.getItem(movieKey, (err, result) => {
            console.log(result);
            update(result);
        });
    }

    static favoriteMovie(movie, update) {
        var movieKey = Keys.favoritesMovie + "-" + movie.id;

        AsyncStorage.setItem(movieKey, JSON.stringify(movie), (err, result) => {
            if (update != undefined) {
                update(result);
            }
        });
    }

    static readAllMovie(update) {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                var values = [];
                stores.map((result, i, store) => {
                    values.push(JSON.parse(result[1]));
                });

                update(values);
            });
        });
    }
}