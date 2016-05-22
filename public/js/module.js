'use strict';

var app = angular.module('musicApp', ['ui.router', 'spotify']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: 'homeCtrl'
    }).state('musicresults', {
        url: '/musicresults',
        templateUrl: '/html/musicresults.html',
        controller: 'musicresultsCtrl'
    }).state('getphoto', {
        url: '/getphoto',
        templateUrl: '/html/getphoto.html',
        controller: 'getphotoCtrl'
    });

    $urlRouterProvider.otherwise('/');
});

app.config(function(SpotifyProvider) {
    SpotifyProvider.setClientId('b52dc91988324fd697d1f2db77378d46');
    SpotifyProvider.setAuthToken('BQBR1duimRH3wtIkaT0XpK706sZNM5tuk4Wyq1mth5MsFK9s3nhFZE4zZ833Zv8rCh1xBb4EaeXdxm_7LAbjzhVIKYfsr52ME4O0y9kCzNK_BgOK87ELI9AvryKPWDErcytOdg_FUEgKr3KcQt0');
});
