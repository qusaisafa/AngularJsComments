(function(app) {
    app.controller('HomeController', ['$scope', 'commentsService', '$mdDialog', '$mdToast', function($scope, commentsService, $mdDialog, $mdToast) {

        var allComments = [];
            // use comments service
        commentsService.getComments().then(function successCallback(response){
                $scope.comments = response.data;
                allComments = response.data;
            }, function errorCallback(response){
                $scope.showToast("Unable to read record.");
            });

        // show 'create comment form' in dialog box
        $scope.showCreateProductForm = function(event){
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '../../partials/create_comment.template.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                scope: $scope,
                preserveScope: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            });
        }

        function DialogController($scope, $mdDialog) {
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }

        $scope.createComment = function() {                                          //dummy create
            var data = {id:0, name: $scope.name, body: $scope.body, email: $scope.email}; // comment obj
            var createResponce = commentsService.createNewComment(data); // handled in this way since we hve no post api at BE
            if (createResponce != null) {
                data.id = allComments.length + 1;
                allComments.push(data);

                $scope.comments = allComments;

                $scope.id = "";
                $scope.name = "";
                $scope.body = "";
                $scope.email = "";

                $scope.cancel();
            }
        }

    }]);
})(Comments);
