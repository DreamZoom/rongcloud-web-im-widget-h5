var demo = angular.module("demo", ["RongWebIMWidget"]);
demo.controller("main", ["$scope", "WebIMWidget", function($scope,
    WebIMWidget) {

    $scope.targetType = 1; //1：私聊 更多会话类型查看http://www.rongcloud.cn/docs/api/js/global.html#ConversationType
    $scope.targetId = 'haa';

    $scope.setconversation = function() {
        WebIMWidget.setConversation($scope.targetType, $scope.targetId, "用户:" + $scope.targetId);
    }
    $scope.show = function () {
        WebIMWidget.show();
    }

    WebIMWidget.init({
        appkey: "3argexb6r934e",
        token:"VhacL/Ce3JZIThG+x6ROS4T92+VsUe7ien9j+5OQOOAr3b5rMhsC12kcZq0ahpXqfTf+RYbzEFi4lSO5xHmpaQ==",
        displayConversationList:true
    });

    WebIMWidget.setUserInfoProvider(function(targetId,obj){
        obj.onSuccess({name:"用户："+targetId});
    });
}]);
