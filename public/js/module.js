'use strict';

var app = angular.module('musicApp', ['ui.router']);

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
