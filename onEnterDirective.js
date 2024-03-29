﻿
app.directive('onEnterDirective', function () {
    return {
        link: function(scope, element, attrs) {
            element.bind("keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.onEnterDirective);
                    });
                    event.preventDefault();
                }
            });
        }
    }
});
