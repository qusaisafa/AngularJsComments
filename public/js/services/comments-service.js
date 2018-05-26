(function(app) {
	app.service('commentsService',['$http',function($http) {
        var baseURL = 'http://jsonplaceholder.typicode.com/comments';
        this.getComments = function() {
            return $http.get(baseURL);
        };
        this.createNewComment = function(data){
            // $http.post('baseURL', data, config).then(successCallback, errorCallback);
            return data;
        }
	}]);

})(Comments);
