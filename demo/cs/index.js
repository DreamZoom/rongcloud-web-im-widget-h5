var demo = angular.module("demo", ["RongWebIMWidget"]);

demo.controller("main", ["$scope","RongCustomerService", function($scope, RongCustomerService) {

    $scope.customerServiceId = "KEFU145914839332836";

    RongCustomerService.init({
        appkey:"3argexb6r934e",//selfe
        token:"I8zRoTYOdtHug+ox4s7HapUnU/cREmEFuMhOJuGv5bP+dl6CkOlF+WuQPPbm30kCrX6ygPNSBvlJzwuiv72NPw==",//selfe kefu
        customerServiceId:$scope.customerServiceId,//selfe
        position:RongCustomerService.Postion.left,
        onSuccess:function(e){
            console.log(e);
        }
    });
    $scope.show = function() {
       RongCustomerService.show();
    }
}]);
