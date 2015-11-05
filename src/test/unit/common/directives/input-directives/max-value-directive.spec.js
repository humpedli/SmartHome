'use strict';

describe('Unit: input-directives', function () {
    beforeEach(angular.mock.module('smartHome'));
    beforeEach(module(function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    // Global variables
    var scope, element;

    function compileDirective(defaultScope, template) {
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            angular.extend(scope, defaultScope);
            element = angular.element(template);
            $compile(element)(scope);
            scope.$digest();
        }));
    }

    describe('Unit: input-directives#max-value', function () {

        var defaultScope = {
            ngModel: null,
            maxValue: null
        };

        compileDirective(defaultScope, '<input type="text" ng-model="ngModel" max-value="maxValue">');

        // null test
        it('should return same value, if max-value is null', function () {
            element.val('10').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBeNull();
            expect(scope.$eval(element.attr('ng-model'))).toBe('10');
        });

        // undefined test
        it('should return same value, if max-value is undefined', function () {
            scope.maxValue = undefined;
            scope.$apply();

            element.val('20').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBeUndefined();
            expect(scope.$eval(element.attr('ng-model'))).toBe('20');
        });

        // 0 test
        it('should return 0, if max-value is 0', function () {
            scope.maxValue = 0;
            scope.$apply();

            element.val('30').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(0);
            expect(scope.$eval(element.attr('ng-model'))).toBe('0');
        });

        // negative test
        it('should return -5, if max-value is -5', function () {
            scope.maxValue = -5;
            scope.$apply();

            element.val('40').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(-5);
            expect(scope.$eval(element.attr('ng-model'))).toBe('-5');
        });

        // normal test
        it('should return 10, if max-value is 10', function () {
            scope.maxValue = 10;
            scope.$apply();

            element.val('50').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(10);
            expect(scope.$eval(element.attr('ng-model'))).toBe('10');
        });

        // test if value is float
        it('should return 40, if max-value is 40', function () {
            scope.maxValue = 40;
            scope.$apply();

            element.val('70.34').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(40);
            expect(scope.$eval(element.attr('ng-model'))).toBe('40');
        });

        // test if max-value is float
        it('should return 26.34, if max-value is 26.34', function () {
            scope.maxValue = 26.34;
            scope.$apply();

            element.val('60').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(26.34);
            expect(scope.$eval(element.attr('ng-model'))).toBe('26.34');
        });

        // test if everything is float
        it('should return 52.81, if max-value is 52.81', function () {
            scope.maxValue = 52.81;
            scope.$apply();

            element.val('104.99').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(52.81);
            expect(scope.$eval(element.attr('ng-model'))).toBe('52.81');
        });

        // test if max-value is greater than the value
        it('should return 45.3, if max-value is 86.12', function () {
            scope.maxValue = 86.12;
            scope.$apply();

            element.val('45.3').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(86.12);
            expect(scope.$eval(element.attr('ng-model'))).toBe('45.3');
        });

        // test if value cannot be parsed as float
        it('should return "Only alphabet chars here" text, if value cannot be parsed as float', function () {
            scope.maxValue = 77.1;
            scope.$apply();

            element.val('Only alphabet chars here').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('max-value'))).toBe(77.1);
            expect(scope.$eval(element.attr('ng-model'))).toBe('Only alphabet chars here');
        });

    });

});
