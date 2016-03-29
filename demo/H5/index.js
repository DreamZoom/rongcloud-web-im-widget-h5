var demo = angular.module("demo", ["RongCloudkefu"]);

demo.controller("main", ["$scope","RongKefu", function($scope,RongKefu) {
  $scope.title="asdf";
  RongKefu.init({
        appkey:"3argexb6r934e",//selfe
        token:"I8zRoTYOdtHug+ox4s7HapUnU/cREmEFuMhOJuGv5bP+dl6CkOlF+WuQPPbm30kCrX6ygPNSBvlJzwuiv72NPw==",//selfe kefu
        kefuId:"KEFU145914839332836",//selfe
        position:RongKefu.KefuPostion.left,
        onSuccess:function(e){
          console.log(e);
        }
  })
    $scope.show = function() {
      RongKefu.show();
    }

    $scope.kefu=function(){
        RongKefu.show();
    }

    $scope.hidden = function() {
      RongKefu.hidden();
    }
}]);
