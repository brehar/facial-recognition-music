'use strict';

var app = angular.module('musicApp');

app.controller('homeCtrl', function($scope) {
            console.log('home controller!')

            $scope.getFacialExpressionScore = function() {
                console.log('getFacialExpressionScore');
                var apiKey = "1dd1f4e23a5743139399788aa30a7153";
                var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";
                console.log('image upload click!!!');
                var file = document.getElementById('filename').files[0];

                CallAPI(file, apiUrl, apiKey)

                function CallAPI(file, apiUrl, apiKey) {
                    $.ajax({
                            url: apiUrl,
                            beforeSend: function(xhrObj) {
                                xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apiKey);
                            },
                            type: "POST",
                            data: file,
                            processData: false
                        })
                        .done(function(response) {
                            $('#response').html(response);
                            console.log(response[0])
                            var moodData = response[0].scores;

                            renderMood(moodData);
                        })
                        .fail(function(error) {
                            console.log(error.getAllResponseHeaders());
                        });
                }
            }

                  function renderMood(moodData) {
                    // $scope.mood = moodData;
                    // console.log($scope.mood);
                  }
          });

        app.controller('musicresultsCtrl', function($scope, Music) {
            console.log('music controller!')
            var moods = ['angry', 'powerful', 'revolted', 'scared', 'happy', 'chillout', 'sad', 'energetic'];
            var mood = moods[Math.floor(Math.random() * moods.length)];

            Music.getMusicFromMood(mood).then(res => {
                $scope.songs = res.data.root.tracks.track;
            });


        });
