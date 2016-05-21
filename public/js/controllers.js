'use strict';

var app = angular.module('musicApp');

app.controller('homeCtrl', function() {
    console.log('home controller!')
});

app.controller('musicresultsCtrl', function($scope, Music) {
  console.log('music controller!')
    var moods = ['angry', 'powerful', 'revolted', 'scared', 'happy', 'chillout', 'sad', 'energetic'];
    var mood = moods[Math.floor(Math.random() * moods.length)];

    Music.getMusicFromMood(mood).then(res => {
        $scope.songs = res.data.root.tracks.track;
    });
});
