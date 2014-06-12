
app.directive('loadCustomHtmlTemplateDirective', function () {
    return {
        link: function ($scope, $elem, $attr) {
            if (!$scope.operation) {
                $scope.operation = 'Edit';
            }
            if (!!$scope.ngDisabled) {
                $scope.operation = 'View';
            }
        },
        restrict: 'A',
        require: ['^ngModel'],
        scope: {
            ngModel: '=',
            ngDisabled: '=',
            text: '@'
        },
        template: '<div ng-include src="\'./Content/templates/DisplayTemplate.html\'"></div>'
    }
})