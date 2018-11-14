/*
 * A directive to enable two way binding of file field
 */
var app = angular.module('dataVisualizationWebApp');

app.directive('demoFileModel', function ($parse) {
    return {
        restrict: 'A', //the directive can be used as an attribute only
        link: function (scope, element, attrs) {
            var model = $parse(attrs.demoFileModel),
                modelSetter = model.assign; //define a setter for demoFileModel

                //Bind change event on the element
                element.bind('change', function () {
                  //Call apply on scope, it checks for value changes and reflect them on UI
                    scope.$apply(function () {
                        //set the model value
                        modelSetter(scope, element[0].files[0]);
                    });
                });
        }
    };
});