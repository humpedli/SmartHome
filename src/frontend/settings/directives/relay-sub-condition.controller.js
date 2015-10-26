'use strict';

angular.module('smartHome')
	.controller('RelaySubCondition', RelaySubCondition);

/**
 * Controller for relay sub condition directive
 */
/*@ngInject*/
function RelaySubCondition($scope, CONDITIONS, CONDITION_TYPES, DAY_OPTIONS, OPERATIONS, WEATHER_TIMES, WEATHER_TYPES,
						   WEATHER_CHARACTERISTICS) {

	// controllerAs with vm
	var vm = this;

	vm.weatherTypeIsDayFilter = weatherTypeIsDayFilter;
	vm.weatherTypeTimeFilter = weatherTypeTimeFilter;
	vm.resetModelValue = resetModelValue;

	/**
	 * Constructor, initialize
	 */
	function init() {
		vm.conditions = CONDITIONS;
		vm.conditionTypes = CONDITION_TYPES;
		vm.dayOptions = DAY_OPTIONS;
		vm.operations = OPERATIONS;
		vm.weatherTimes = WEATHER_TIMES;
		vm.weatherTypes = WEATHER_TYPES;
		vm.weatherCharacteristics = WEATHER_CHARACTERISTICS;
		vm.relays = $scope.$parent.vm.relays;
		vm.sensors = $scope.$parent.vm.sensors;
	}
	init();

	/**
	 * Helps filtering in weather type select
	 */
	function weatherTypeIsDayFilter(weatherType) {
		if(!angular.isUndefinedOrNull(vm.ngModel.conditionValue1)) {
			var isDay;

			for(var i = 0; i < vm.weatherTimes.length; i++) {
				if(vm.weatherTimes[i].id === vm.ngModel.conditionValue1) {
					isDay = vm.weatherTimes[i].day;
				}
			}

			if(angular.isDefined(isDay)) {
				return (weatherType.onlyDaily === isDay ||
				weatherType.onlyHourly !== isDay);
			}
		}

		return true;
	}

	/**
	 * Helps filtering in weather condition select
	 */
	function weatherTypeTimeFilter() {
		if(!angular.isUndefinedOrNull(vm.ngModel.conditionValue1)) {
			var isPast, isFuture;

			for(var i = 0; i < vm.weatherTimes.length; i++) {
				if(vm.weatherTimes[i].id === vm.ngModel.conditionValue1) {
					isPast = vm.weatherTimes[i].past;
					isFuture = vm.weatherTimes[i].future;
				}
			}

			if(angular.isDefined(isPast) && isPast) {
				return 'PAST';
			} else if(angular.isDefined(isFuture) && isFuture) {
				return 'FUTURE';
			} else {
				return 'NORMAL';
			}
		}

		return 'NORMAL';
	}

	/**
	 * Resets specified ngModel attributes value
	 */
	function resetModelValue(valueFrom) {
		var maxModelValueCount = 3;
		if(valueFrom > 0 && valueFrom <= maxModelValueCount) {
			for(var i = valueFrom; i <= maxModelValueCount; i++) {
				vm.ngModel['conditionValue' + i] = null;
				console.log(vm.ngModel);
			}
		}
	}

}
