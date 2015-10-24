'use strict';

angular.module('smartHome')
	.controller('SettingsRelaysTabController', SettingsRelaysTabController);

/**
 * Controller for settings relays tab
 */
/*@ngInject*/
function SettingsRelaysTabController($modal, $log, RelayDataService, SocketDataService, Utils) {

	// controllerAs with vm
	var vm = this;

	// Wired functions
	vm.getRelaysList = getRelaysList;
	vm.addRelay = addRelay;
	vm.editRelay = editRelay;
	vm.removeRelay = removeRelay;
	vm.moveRelay = moveRelay;
	vm.switchRelayState = switchRelayState;
	vm.switchRelayStatus = switchRelayStatus;

	/**
	 * Constructor, initialize
	 */
	function init() {
		getRelaysList();
	}
	init();

	/**
	 * Gets all relay data from backend
	 */
	function getRelaysList() {
		RelayDataService.query(function(data) {
			vm.relays = data;
			$log.debug('Relay list loaded');
		});
	}

	/**
	 * Check if relay is already added or not
	 */
	function checkIfRelayIsAlreadyAdded(formData) {
		if(angular.isDefined(formData.relayid)) {
			for (var i = 0; i < vm.relays.length; i++) {
				if (vm.relays[i].relayid === parseInt(formData.relayid)) {
					$modal({
						title: 'Hiba!',
						content: 'Ez a relé már létezik!',
						templateUrl: Utils.getTemplateUrl('ModalWithoutFooter')
					});
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Opens the new relay popup and calls backend endpoint
	 */
	function addRelay() {
		var modal = $modal({
			title: 'Új relé hozzáadása',
			templateUrl: Utils.getTemplateUrl('SettingsAddRelayModal')
		});

		// modal ViewModel data
		modal.$scope.vm = {
			formData: {},
			addRelay: function (formData) {
				if(!checkIfRelayIsAlreadyAdded(formData)) {
					RelayDataService.save(formData).$promise.then(function () {
						getRelaysList();

						$log.debug('Relay added: ' + formData.relayid);
						modal.hide();
					});
				} else {
					modal.hide();
				}
			}
		};
	}

	/**
	 * Edits relay name (called by ng-change)
	 * @param relay - relay DTO object
	 */
	function editRelay(relay) {
		if (angular.isDefined(relay) && angular.isDefined(relay.name)) {
			relay.$save();
			$log.debug('Relay edited: ' + relay.relayid);
		}
	}

	/**
	 * Opens the remove relay popup and calls backend endpoint
	 * @param relay - relay DTO object
	 */
	function removeRelay(relay) {
		if(angular.isDefined(relay)) {
			var modal = $modal({
				title: 'Relé eltávolítása',
				templateUrl: Utils.getTemplateUrl('SettingsRemoveRelayModal')
			});

			// modal ViewModel data
			modal.$scope.vm = {
				relay: relay,
				removeRelay: function () {
					relay.$remove().then(function () {
						getRelaysList();

						$log.debug('Relay deleted: ' + relay.relayid);
						modal.hide();
					});
				}
			};
		}
	}

	/**
	 * Moves relay position in the list and calls backend endpoint
	 * @param relay - relay DTO object
	 * @param direction - up/down position change
	 */
	function moveRelay(relay, direction) {
		if(angular.isDefined(relay) && angular.isDefined(direction)) {
			// declare variables
			var currentRelay = relay;
			var currentRelayIndex = vm.relays.indexOf(relay);
			var tempRelay = angular.copy(currentRelay); // copy without binding
			var otherRelay; // initial value: undefined

			// determine other relay based on direction
			if (currentRelayIndex > 0 && direction === 'up') {
				otherRelay = vm.relays[currentRelayIndex - 1];
			} else if (currentRelayIndex < vm.relays.length && direction === 'down') {
				otherRelay = vm.relays[currentRelayIndex + 1];
			}

			// this block only runs if there are switchable relay positions
			if (angular.isDefined(otherRelay)) {
				// determine other relay index
				var otherRelayIndex = vm.relays.indexOf(otherRelay);

				// switch position between the two relays
				currentRelay.position = otherRelay.position;
				otherRelay.position = tempRelay.position;

				// switch the two relays in the array (this will fix index problem)
				vm.relays[currentRelayIndex] = otherRelay;
				vm.relays[otherRelayIndex] = currentRelay;

				// backend save
				currentRelay.$save();
				otherRelay.$save();

				$log.debug('Relay position changed: ' + relay.relayid);
			}
		}
	}

	/**
	 * Switches relay state
	 * @param relay - relay DTO object
	 */
	function switchRelayState(relay) {
		if(angular.isDefined(relay)) {
			RelayDataService.save({
				relayid: relay.relayid,
				subfunction: 'state',
				state: relay.state
			}).$promise.then(function () {
					SocketDataService.emit('Relays::change', relay);
				});
		}
	}

	/**
	 * Switches relay status
	 * @param relay - relay DTO object
	 */
	function switchRelayStatus(relay) {
		if(angular.isDefined(relay)) {
			RelayDataService.save({
				relayid: relay.relayid,
				subfunction: 'status',
				status: relay.status
			}).$promise.then(function () {
					SocketDataService.emit('Relays::change', relay);
				});
		}
	}

}
