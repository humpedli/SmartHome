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

    describe('Unit: input-directives#only-real-number', function () {

        var defaultScope = {
            ngModel: null,
            resetToZero: null
        };

        compileDirective(defaultScope, '<input type="text" ng-model="ngModel" reset-to-zero="resetToZero" ' +
            'only-real-number>');

        // empty test
        it('should return empty string, if input value is empty', function () {
            element.val('').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('');
        });

        // space test
        it('should return numerical string without spaces, if input value contains spaces', function () {
            element.val('0 123 456 789').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('0123456789');
        });

        // normal test
        it('should return numerical string, if input value is numerical', function () {
            element.val('0123456789').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('0123456789');
        });

        // float test
        it('should return float string with 1 decimals, if input value is float with 1 decimals', function () {
            element.val('32.5').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('32.5');
        });

        // float test 2
        it('should return float string with 2 decimals, if input value is float with 2 decimals', function () {
            element.val('32.54').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('32.54');
        });

        // float test 2
        it('should return float string with 2 decimals, if input value is float with 2 or more decimals', function () {
            element.val('16.54432').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('16.54');
        });

        // not number char test
        it('should return empty string, if input value contains only not number chars', function () {
            element.val('!+.°"[]{}()@/|%=:?,_#&§*÷\<>’abcdefghijklmnopqrstuvwxyz').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('');
        });

        // not number char test 2
        it('should return numerical string, if input value contains special chars too', function () {
            element.val('!+-234°"[]{}asd_#&§*lol÷\<>’').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('-234');
        });

        // negative test
        it('should return -34, if input value is -34', function () {
            element.val('-34').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('-34');
        });

        // negative test 2
        it('should return -50.32, if input value is -50.32', function () {
            element.val('-50.32').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('-50.32');
        });

        // starting with dot
        it('should return 23, if input value is .23', function () {
            element.val('.23').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('23');
        });

        // contain more dots
        it('should return 40.33, if input value is 40.3.3', function () {
            element.val('40.3.3').triggerHandler('input');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('40.33');
        });

        // ends with dot
        it('should return 50, if input value is "50." and blur called', function () {
            element.val('50.').triggerHandler('input').triggerHandler('blur');
            scope.$apply();

            expect(scope.$eval(element.attr('ng-model'))).toBe('50');
        });

        // reset-to-zero test 1
        it('should return empty string, if reset-to-zero is null and input value is empty', function () {
            element.val('').triggerHandler('input').triggerHandler('blur');
            scope.$apply();

            expect(scope.$eval(element.attr('reset-to-zero'))).toBeNull();
            expect(scope.$eval(element.attr('ng-model'))).toBe('');
        });

        // reset-to-zero test 2
        it('should return empty string, if reset-to-zero is undefined and input value is empty', function () {
            scope.resetToZero = undefined;
            scope.$apply();

            element.val('').triggerHandler('input').triggerHandler('blur');
            scope.$apply();

            expect(scope.$eval(element.attr('reset-to-zero'))).toBeUndefined();
            expect(scope.$eval(element.attr('ng-model'))).toBe('');
        });

        // reset-to-zero test 3
        it('should return empty string, if reset-to-zero is false and input value is empty', function () {
            scope.resetToZero = false;
            scope.$apply();

            element.val('').triggerHandler('input').triggerHandler('blur');
            scope.$apply();

            expect(scope.$eval(element.attr('reset-to-zero'))).toBeFalsy();
            expect(scope.$eval(element.attr('ng-model'))).toBe('');
        });

        // reset-to-zero test 4
        it('should return 0, if reset-to-zero is true and input value is empty', function () {
            scope.resetToZero = true;
            scope.$apply();

            element.triggerHandler('focus').val('').triggerHandler('input').triggerHandler('blur');
            scope.$apply();

            expect(scope.$eval(element.attr('reset-to-zero'))).toBeTruthy();
            expect(scope.$eval(element.attr('ng-model'))).toBe('0');
        });

        // reset-to-zero test 5
        it('should return 0, if reset-to-zero is set and input value is empty', function () {
            scope.resetToZero = '32abc';
            scope.$apply();

            element.val('').triggerHandler('input').triggerHandler('blur');
            scope.$apply();

            expect(scope.$eval(element.attr('reset-to-zero'))).toBeTruthy();
            expect(scope.$eval(element.attr('ng-model'))).toBe('0');
        });

        // reset-to-zero test 6
        it('should return numerical value, if reset-to-zero is set and input value is not null', function () {
            scope.resetToZero = true;
            scope.$apply();

            element.val('45232asd&?@').triggerHandler('input').triggerHandler('blur');
            scope.$apply();

            expect(scope.$eval(element.attr('reset-to-zero'))).toBeTruthy();
            expect(scope.$eval(element.attr('ng-model'))).toBe('45232');
        });

    });

});
