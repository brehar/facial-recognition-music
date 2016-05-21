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

app.controller('getphotoCtrl', function($scope) {
    $(document).ready(function() {
        $('#getMood').on('click', getEmotions);
    });

    $scope.take_snapshot = function() {
        Webcam.snap(function(data_uri) {
            document.getElementById('results').innerHTML = '<img id="base64image" src="'+data_uri+'"/>';
            $scope.SaveSnap();
        });
    };

    function ShowCam(){
        Webcam.set({
            width: 320,
            height: 240,
            image_format: 'jpeg',
            jpeg_quality: 100
        });
        Webcam.attach('#my_camera');
    }

    $scope.SaveSnap = function(){
        document.getElementById("loading").innerHTML="Saving, please wait...";
        var file =  document.getElementById("base64image").src;
        var formdata = new FormData();
        formdata.append("base64image", file);
        console.log(formdata);
        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", function(event) { uploadcomplete(event);}, false);
        ajax.open("POST", "/facial-recognition/html/upload.php");
        ajax.send(formdata);
    };

    function uploadcomplete(event){
        document.getElementById("loading").innerHTML="";
        var image_return=event.target.responseText;
        var showup=document.getElementById("uploaded").src='http://bretthartman.net/facial-recognition/uploads/mypic.png';
    }

    function getEmotions() {
        var apiKey = "1dd1f4e23a5743139399788aa30a7153";
        var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

        var file = '';

        CallAPI(file,apiUrl,apiKey);
    }

    function CallAPI(file, apiUrl, apiKey) {
        $.ajax({
            url: apiUrl,
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
            },
            type: "POST",
            data: "{\"url\": \"http://bretthartman.net/facial-recognition/uploads/mypic.png\"}"
        })
            .done(function (response) {
                $('#response').html(response);
                console.log(response[0])
            })
            .fail(function (error) {
                console.log(error.getAllResponseHeaders());
            });
    }

    window.onload= ShowCam();
});