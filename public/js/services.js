'use strict';

app.service('Mood', function() {
    var photoMood;

    this.setMood = function(mood) {
        photoMood = mood;
    };

    this.getMood = function() {
        return photoMood;
    };
});