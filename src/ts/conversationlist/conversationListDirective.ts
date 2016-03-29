/// <reference path="../../../typings/tsd.d.ts"/>

var conversationListDir = angular.module("RongWebIMWidget.conversationListDirective", ["RongWebIMWidget.conversationListController"]);

conversationListDir.directive("rongConversationList", [function() {

    return {
        restrict: "E",
        templateUrl: "./src/ts/conversationlist/conversationList.tpl.html",
        controller: "conversationListController",
        link: function(scope: any, ele: angular.IRootElementService) {
            
        }
    }
}]);

conversationListDir.directive("conversationItem", ["conversationServer", "conversationListServer",
    function(conversationServer: ConversationServer, conversationListServer: conversationListServer) {
        return {
            restrict: "E",
            scope: { item: "=" },
            template: '<div class="chat_item">' +
            '<div class="static_item">' +
            '<div class="ext">' +
            '<p class="attr clearfix" ng-show="item.unreadMessageCount>0">' +
            '<span class="badge">{{item.unreadMessageCount>99?"99+":item.unreadMessageCount}}</span>' +
            '</p>' +
            '</div>' +
            '<div class="photo">' +
            '<img class="img" ng-src="{{item.portraitUri}}" err-src="../widget/images/barBg.png" alt="">' +
            '<i class="Presence Presence--stacked Presence--mainBox"></i>' +
            '</div>' +
            '<div class="info">' +
            '<h3 class="nickname">' +
            '<span class="nickname_text">{{item.title}}</span>' +
            '</h3>' +
            '</div>' +
            '</div>' +
            '<div class="delete_box">' +
            '<span class="sprite2 icon_delete" ng-click="remove($event)"></span>' +
            '</div>' +
            '</div>',
            link: function(scope: any, ele: angular.IRootElementService, attr: angular.IAttributes) {
                var item = <any>ele[0].querySelector(".chat_item");
                var deletebox = ele[0].querySelector(".delete_box");
                var start, left, width = deletebox.clientWidth;
                var Emove = function(e) {
                    var move = e.changedTouches[0].clientX - start;
                    var marginleft = left + move;
                    if (marginleft < 0 && marginleft > -width) {
                        item.style["margin-left"] = marginleft + "px";
                    } else if (marginleft > 0) {
                        item.style["margin-left"] = 0 + "px";
                    } else if (marginleft < -width) {
                        item.style["margin-left"] = -width + "px";
                    }
                }
                item.addEventListener("touchstart", function(e) {
                    width = deletebox.clientWidth;
                    start = (e.changedTouches[0].clientX);
                    item.className = "chat_item";
                    left = parseFloat(item.style["margin-left"]) || 0;
                    document.addEventListener("touchmove", Emove);
                    document.addEventListener("touchend", End);
                });

                var End = function(e) {
                    var move = e.changedTouches[0].clientX - start;
                    var marginleft = left + move;
                    if (marginleft > -width / 2) {
                        item.className = "chat_item chat_item_m normal";
                        item.style["margin-left"] = "0px";
                    } else {
                        item.className = "chat_item chat_item_m remove";
                        item.style["margin-left"] = -width + "px";
                    }
                    document.removeEventListener("touchmove", Emove);
                    document.removeEventListener("touchend", End);
                }



                ele.on("click", function() {
                    conversationServer.onConversationChangged(new WidgetModule.Conversation(scope.item.targetType, scope.item.targetId, scope.item.title))
                    RongIMLib.RongIMClient.getInstance().clearUnreadCount(scope.item.targetType, scope.item.targetId, {
                        onSuccess: function() {

                        },
                        onError: function() {

                        }
                    })
                    conversationListServer.updateConversations();
                });

                scope.remove = function(e) {
                    e.stopPropagation();

                    RongIMLib.RongIMClient.getInstance().removeConversation(scope.item.targetType, scope.item.targetId, {
                        onSuccess: function() {
                            if (conversationServer.current.targetType == scope.item.targetType && conversationServer.current.targetId == scope.item.targetId) {
                                conversationServer.onConversationChangged(new WidgetModule.Conversation());
                            }
                            conversationListServer.updateConversations();
                        },
                        onError: function(error) {
                            console.log(error);
                        }
                    });

                }
            }
        }
    }]);
