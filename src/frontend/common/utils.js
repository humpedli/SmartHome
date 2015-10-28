'use strict';

angular.module('smartHome')
	.factory('Utils', Utils);

function Utils() {

	return {
		getTemplateUrl: getTemplateUrl,
		capitalizeFirstLetter: capitalizeFirstLetter
	};

	/**
	 * Convert camelcase to dashed
	 * @param str
	 */
	function camelCaseToDashed(str) {
		var dashed = str.replace(/([A-Z])/g, function ($1) {
			return '-' + $1.toLowerCase();
		});

		//Remove '-' if it's the first character of the string
		return (dashed.charAt(0) === '-') ? dashed.substr(1, dashed.length) : dashed;
	}

	/**
	 * Generate a template url using the viewName
	 * @param viewName
	 */
	function getTemplateUrl(viewName) {
		return 'views/' + camelCaseToDashed(viewName) + '.tpl.html';
	}

	/**
	 * Capitalize first letter
	 */
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

}

/**
 * Check if value is undefined or null
 * @param value
 */
angular.isUndefinedOrNull = function (value) {
	return angular.isUndefined(value) || value === null;
};
