app.controller("mainController", function($scope, $http){

    $scope.apiKey = "2a509bcab23c777eb1879d45278b7ef7"
    $scope.results = [];
    $scope.filterText = null;
    $scope.availableGenres = [];
    $scope.genreFilter = null;
    $scope.init = function() {
    	// API requires a start date
    	var today = new Date();
    	// Create the date string 
    	var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
    	$http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data) {
    		// format the data
    		// get the episodes for each day
    		angular.forEach(data, function(value, index) {
    			// API stores the full date separately from each episode
    			var date = value.date;
    			// for each episodes, add it to the array
    			angular.forEach(value.episodes, function(tvshow, index) {
    				// create a date string from the timestamp so we can filter using it
    				tvshow.date = date; // attach the full date to each episode
    				$scope.results.push(tvshow);
                    //
                    //Loop through the genres of tv shows
                    angular.forEach(tvshow.show.genres, function(genre, index) {
                        // only add to the availableGenres array if it doesn't already exist
                        var exists = false;
                        angular.forEach($scope.availableGenres, function(avGenre, index) {
                            if (avGenre == genre) {
                                exists = true;
                            }
                        });
                        if (exists === false) {
                            $scope.availableGenres.push(genre);
                        }
                    });
    			});
    		});
    	}).error(function(error) {

    	});

    };

});

