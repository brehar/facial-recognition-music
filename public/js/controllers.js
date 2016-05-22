'use strict';

var app = angular.module('musicApp');

app.controller('musicresultsCtrl', function ($scope, Spotify, Mood) {
    var moods = Mood.getMood();
    moods = moods.scores;

    var arr = Object.keys(moods).map(function (key) {
        return moods[key];
    });

    var max = Math.max.apply(null, arr);

    for (var prop in moods) {
        if (moods.hasOwnProperty(prop)) {
            if (moods[prop] === max) {
                var mood = prop;
            }
        }
    }

    $scope.currentMood = mood;

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

    $scope.playSong = function (song) {
        var audio = new Audio(song);
        audio.play();
    };
});

app.controller('getphotoCtrl', function ($scope, $state, Mood) {
  console.log('get photos')
    $(document).ready(function () {
        $('#getMood').on('click', getEmotions);
    });

    $scope.take_snapshot = function () {
        Webcam.snap(function (data_uri) {
            document.getElementById('results').innerHTML = '<img id="base64image" src="' + data_uri + '"/>';
            $scope.SaveSnap();
        });
    };

    function ShowCam() {
        Webcam.set({
            width: 320,
            height: 240,
            image_format: 'jpeg',
            jpeg_quality: 100
        });
        Webcam.attach('#my_camera');
    }

    $scope.SaveSnap = function () {
        document.getElementById("loading").innerHTML = "Saving, please wait...";
        var file = document.getElementById("base64image").src;
        var formdata = new FormData();
        formdata.append("base64image", file);
        console.log(formdata);
        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", function (event) {
            uploadcomplete(event);
        }, false);
        ajax.open("POST", "/facial-recognition/html/upload.php");
        ajax.send(formdata);
    };

    function uploadcomplete(event) {
        document.getElementById("loading").innerHTML = "";
        var image_return = event.target.responseText;
        var showup = document.getElementById("uploaded").src = 'http://bretthartman.net/facial-recognition/html/mypic.png';
    }

    function getEmotions() {
        var apiKey = "1dd1f4e23a5743139399788aa30a7153";
        var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

        var file = '';

        CallAPI(file, apiUrl, apiKey);
    }

    function CallAPI(file, apiUrl, apiKey) {
        $.ajax({
            url: apiUrl,
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
            },
            type: "POST",
            data: "{\"url\": \"http://bretthartman.net/facial-recognition/html/mypic.png\"}"
        })
            .done(function (response) {
                $('#response').html(response);
                console.log(response[0]);
                Mood.setMood(response[0]);
                $state.go('musicresults');
            })
            .fail(function (error) {
                console.log(error.getAllResponseHeaders());
            });
    }

    window.onload = ShowCam();
});

app.controller('homeCtrl', function ($scope, $state) {
    $scope.mymood1='hey';
    console.log('home controller!')

    $scope.getFacialExpressionScore = function () {
        console.log('getFacialExpressionScore');
        var apiKey = "1dd1f4e23a5743139399788aa30a7153";
        var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";
        console.log('image upload click!!!');
        var file = document.getElementById('filename').files[0];

        CallAPI(file, apiUrl, apiKey)


    };

    function CallAPI(file, apiUrl, apiKey) {
      console.log($state)

        $.ajax({
            url: apiUrl,
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
            },
            type: "POST",
            data: file,
            processData: false
        })
            .done(function (response) {
                $('#response').html(response);
                console.log(response[0]);
                var moodData = response[0].scores;
                var moodArray = [];
                var arr = Object.keys(response[0].scores).map(function(key) {
                var thisScore = response[0].scores[key];
                thisScore = 1/Number(thisScore);
                thisScore = thisScore.toString().split('.');
                var len =thisScore[0].length;
                var finalScore = 10-len;
                moodArray.push([finalScore,key])
                $scope.mymood1=moodArray;
                return response[key];

              });
              console.log(moodArray)
              console.log('state:', $state)
              console.log('scope', $scope)

              //setScope()

           })

            .fail(function (error) {
                console.log(error.getAllResponseHeaders());
            });
            //$scope.myMoods='great'
            function setScope(){
              console.log($scope.mymood1)

            }
    }




});
