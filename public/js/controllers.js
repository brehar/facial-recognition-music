'use strict';

var app = angular.module('musicApp');

app.controller('homeCtrl', function() {
    
});

app.controller('musicresultsCtrl', function($scope, Spotify) {
    var moods = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'];
    var mood = moods[Math.floor(Math.random() * moods.length)];

    Spotify.search(mood, 'playlist').then(res => {
        var rand = Math.floor(Math.random() * res.playlists.items.length);

        var uri = res.playlists.items[rand].uri;
        var uriArr = uri.split(':');
        var userId = uriArr[2];
        var playlistId = res.playlists.items[rand].id;

        return Spotify.getPlaylistTracks(userId, playlistId);
    }).then(res => {
        $scope.songs = res.items;
    });

    $scope.playSong = function(song) {
        var audio = new Audio(song);
        audio.play();
    };
});