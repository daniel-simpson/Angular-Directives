
app.directive('customCheckboxDirective', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngDisabled: '=',
            text: "@"
        },
        template: '<div class="custom-checkbox button" ng-class="{selected: !!ngModel, disabled: !!ngDisabled}" ng-click="!ngDisabled && (ngModel = !ngModel)"><span>{{!!text ? text : !!ngModel}}</span></div>'
    }
});