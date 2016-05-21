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
    });
    
    $urlRouterProvider.otherwise('/');
});

app.config(function(SpotifyProvider) {
    SpotifyProvider.setClientId('b52dc91988324fd697d1f2db77378d46');
    SpotifyProvider.setAuthToken('BQA8gbVvu6O-h46lWQ2N-jt3zrRedT-YIJDf8Hj0BtYdugQVTQ-oaNBB3NaTpQPwjKFhJYT2im9N3UsWYJ71kwJL5Rq6Bh-ED-6GxHvl8UvWXc7ZDv-PnXvtECIujytWyJzEnqCBmQtbEqTpCEY');
});