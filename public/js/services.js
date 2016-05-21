'use strict';

app.service('Music', function($http) {
    this.getMusicFromMood = mood => {
        return $http.get(`http://musicovery.com/api/playlist.php?fct=tagseed&apikey=123_1&tag=${mood}&format=json`);
    };
});
