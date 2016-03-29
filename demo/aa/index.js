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
      token:"A0ckJpwkrLzAI5Wn0HQR23ryPPkHsvRwWZV8SVI5ICeBkq6dLI3Sli8MD2OhF50iP6J2J91ucdI=",
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
