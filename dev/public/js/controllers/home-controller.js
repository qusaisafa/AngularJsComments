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
        $scope.showCreateCommentForm = function(event){
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

        $scope.createComment = function() { //dummy create
            var data = {id:0, name: $scope.name, body: $scope.body, email: $scope.email}; // comment obj
            var createResponce = commentsService.createNewComment(data); // handled in this way since we hve no post api at BE
            if (createResponce != null) {
                data.id = allComments.length + 1;
                allComments.push(data);
                $scope.comments = allComments;

                //initialize fields
                $scope.id = "";
                $scope.name = "";
                $scope.body = "";
                $scope.email = "";

                //close form
                $scope.cancel();
            }
        }

        //---------------update------------//
        // update comment record / save changes
        // retrieve record to fill out the form
        $scope.showUpdateCommentForm = function(data){
            // TODO:when update get object data from BE and not from $scop
            // commentsService.readOneProduct(data).then(function successCallback(response){

                // put the values in form
                $scope.id = data.id;
                $scope.name = data.name;
                $scope.body = data.body;
                $scope.email = data.email;

                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: '../../partials/update_comment.template.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    fullscreen: true
                }).then(
                    function(){},
                    function() {
                        // clear modal content
                        $scope.id = "";
                        $scope.name = "";
                        $scope.body = "";
                        $scope.email = "";
                    }
                );

            // }, function errorCallback(response){
            //     $scope.showToast("Unable to retrieve record.");
            // });
        }

        $scope.updateComment = function(){
            // TODO: call service update method to send update request to server
            $scope.cancel();
        }

        //Search
        var searchData = [];
        $scope.searchComments = function(){
            // TODO: search request to BE
            // commentsService.searchComment($scope.comment_search_keywords).then(function successCallback(response){
            //     $scope.products = response.data;
            // }, function errorCallback(response){
            //     $scope.showToast("Unable to read record.");
            // });

            for (i = 0; i < $scope.comments.length; i++) {
                if(($scope.comments[i].email).includes($scope.comment_search_keywords))
                    searchData.push($scope.comments[i]);
            }
        }
        $scope.comments = searchData;

        // cofirm comment deletion
        $scope.confirmDeleteComment = function(event, id){
            // set id of record to delete
            $scope.id = id;
            // dialog settings
            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .textContent('comment will be deleted.')
                .targetEvent(event)
                .ok('Yes')
                .cancel('No');

            // show dialog
            $mdDialog.show(confirm).then(
                // 'Yes' button
                function() {
                    // if user clicked 'Yes', delete Comment record
                    // $scope.deleteComment(); TODO: send request to Delete record
                },
                // 'No' button
                function() {
                    // hide dialog
                }
            );
        }
    }]);
})(Comments);
