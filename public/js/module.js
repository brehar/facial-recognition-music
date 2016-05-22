'use strict';

var app = angular.module('musicApp', ['ui.router', 'spotify']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/facial-recognition/html/home.html',
        controller: 'homeCtrl'
    }).state('musicresults', {
        url: '/musicresults',
        templateUrl: '/facial-recognition/html/musicresults.html',
        controller: 'musicresultsCtrl'
    }).state('getphoto', {
        url: '/getphoto',
        templateUrl: '/facial-recognition/html/getphoto.html',
        controller: 'getphotoCtrl'
    });

    $urlRouterProvider.otherwise('/');
});

app.config(function(SpotifyProvider) {
    SpotifyProvider.setClientId('b52dc91988324fd697d1f2db77378d46');
    SpotifyProvider.setAuthToken('BQBs7wfOdARgq8jTfPJV5K57T6id19ZSIO6IJGNMjbjBbYE2bFhB-SZ6nf7PvIjRtYSiRqISEMWM2JsJnoPUw_cxtRQthqzFJh768WARwCNE_k0sR3nAN2tD4zlRvJjEJAlEWHsAUQMzMCTDG0E');
});
