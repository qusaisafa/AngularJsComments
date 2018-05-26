(function(app) {
	app.service('commentsService',['$http',function($http) {

        var baseURL = 'http://jsonplaceholder.typicode.com/comments';

        this.getComments = function() {
            return $http.get(baseURL);
        };
        this.createNewComment = function(data){
            $http.post('baseURL', data, config).then(successCallback, errorCallback);
        }
        this.searchComment = function(searchData){
            $http.post('baseURL', searchData, config).then(successCallback, errorCallback);
        }
        this.updateComment = function(data){
            $http.put('baseURL'+"something", data, config).then(successCallback, errorCallback);
        }
        this.deleteComment = function(data){
            $http.delete('baseURL'+"something", data, config).then(successCallback, errorCallback);
        }
	}]);

	function successCallback(response){
	    return response.data;
    }

    function errorCallback(error){
       console.log(error);
    }

})(Comments);
