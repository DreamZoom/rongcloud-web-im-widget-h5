var demo = angular.module("demo", ["RongWebIMWidget"]);

demo.controller("main", ["$scope", "WebIMWidget", function($scope,
  WebIMWidget) {

  $scope.show = function() {
    WebIMWidget.show();
  }

  $scope.hidden = function() {
    WebIMWidget.hidden();
  }

  $scope.server = WebIMWidget;
  $scope.targetType=1;

  $scope.setconversation=function(){
    WebIMWidget.setConversation(Number($scope.targetType), $scope.targetId, "自定义:"+$scope.targetId);
  }
  $scope.kefu=function(){
    WebIMWidget.show();
  }

  angular.element(document).ready(function() {

    WebIMWidget.init({
      appkey: "3argexb6r934e",
      token:"VhacL/Ce3JZIThG+x6ROS4T92+VsUe7ien9j+5OQOOAr3b5rMhsC12kcZq0ahpXqfTf+RYbzEFi4lSO5xHmpaQ==",
      displayConversationList:true,
      onError:function(error){
        console.log("error:"+error);
      },
      onSuccess:function(){
        // WebIMWidget.show();
      }
    });

    //WebIMWidget.show();

    WebIMWidget.setUserInfoProvider(function(targetId,obj){
        obj.onSuccess({name:"陌："+targetId});
    });

    WebIMWidget.onClose=function(){
      console.log("已关闭");
    }

  });

}]);
