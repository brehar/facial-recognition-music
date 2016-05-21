'use strict';

var app = angular.module('musicApp');

app.controller('homeCtrl', function() {
    
});

app.controller('musicresultsCtrl', function($scope, Spotify) {
    var moods = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'];
    var mood = moods[Math.floor(Math.random() * moods.length)];

    Spotify.search(mood, 'playlist').then(res => {
        var uri = res.playlists.items[0].uri;
        var uriArr = uri.split(':');
        var userId = uriArr[2];
        var playlistId = res.playlists.items[0].id;

        return Spotify.getPlaylistTracks(userId, playlistId);
    }).then(res => {
        $scope.songs = res.items;
    });

    $scope.playSong = function(song) {
        var audio = new Audio(song);
        audio.play();
    };
});