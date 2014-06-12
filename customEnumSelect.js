
app.directive('customEnumSelect', ['$rootScope', function ($rootScope) {
    return {
        link: function ($scope, $elem, $attr) {

            $scope.Items = [];
            $scope.radioSelect = $attr.radioSelect;

            var multiselectInit = function (oldVal, newVal) {
                if (!oldVal && !!$scope.ngModel) {
                    for (var i = 0; i < $scope.Items.length; i++) {
                        $scope.Items[i].Selected = false;
                        for (var j = 0; j < $scope.ngModel.length; j++) {
                            if ($scope.Items[i].Id == $scope.ngModel[j]) {
                                $scope.Items[i].Selected = true;
                            }
                        }
                    }
                }
            }

            $rootScope.$on($attr.broadcastName, function (sc, items) {
                $scope.Items = items;

                if (!!$scope.radioSelect) {
                    if (!!$scope.Items && $scope.Items.length > 0) {
                        select($scope.Items[0]);
                    }
                }
                else {
                    if ($scope.Items == null || $scope.ngModel == null) {
                        $scope.$watch('ngModel', multiselectInit);
                    }
                    else {
                        multiselectInit();
                    }
                }
            });

            var toggle = function (item) {
                item.Selected = !item.Selected;

                if ($scope.ngModel == null)
                    return;

                //If selected, deselect and return
                for (var i = 0; i < $scope.ngModel.length; i++) {
                    if ($scope.ngModel[i] == item.Id) {
                        $scope.ngModel.splice(i);
                        return;
                    }
                }
                //else select item
                $scope.ngModel.push(item.Id);
            }

            var select = function (item) {
                for (var i = 0; i < $scope.Items.length; i++) {
                    $scope.Items[i].Selected = ($scope.Items[i].Id == item.Id);
                }
                $scope.ngModel = null;
                $scope.ngModel = item;
            }

            $scope.itemClicked = function (item) {
                if (!!$scope.radioSelect) {
                    select(item);
                }
                else {
                    toggle(item);
                }
            }
        },
        restrict: 'A',
        require: '^ngModel',
        scope: {
            ngModel: '=',
            ngDisabled: '='
        },
        template: '<div class="row enum-select"><div class="custom-checkbox button" ng-repeat="item in Items" ng-click="!ngDisabled && itemClicked(item)" ng-class="{selected: item.Selected, disabled: !!ngDisabled}" ng-cloak>{{item.Name}}</div></div>'
    }
}])