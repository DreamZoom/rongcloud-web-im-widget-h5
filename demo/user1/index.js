var demo = angular.module("demo", ["RongWebIMWidget"]);
demo.controller("main", ["$scope", "WebIMWidget", function($scope,
    WebIMWidget) {

    $scope.targetType = 1; //1：私聊 更多会话类型查看http://www.rongcloud.cn/docs/api/js/global.html#ConversationType
    $scope.targetId = 'hbb';

    $scope.setconversation = function() {
        WebIMWidget.setConversation($scope.targetType, $scope.targetId, "用户:" + $scope.targetId);
    }
    $scope.show = function () {
        WebIMWidget.show();
    }

    WebIMWidget.init({
        appkey: "3argexb6r934e",
        token:"A0ckJpwkrLzAI5Wn0HQR23ryPPkHsvRwWZV8SVI5ICeBkq6dLI3Sli8MD2OhF50iP6J2J91ucdI=",
        displayConversationList:true
    });

    WebIMWidget.setUserInfoProvider(function(targetId,obj){
        obj.onSuccess({name:"用户："+targetId});
    });
}]);
