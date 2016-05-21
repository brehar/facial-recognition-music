'use strict';

app.service('Mood', function() {
    this.setMood = function(mood) {
        this.photoMood = mood;
    };

    this.getMood = function() {
        return this.photoMood;
    };
});
