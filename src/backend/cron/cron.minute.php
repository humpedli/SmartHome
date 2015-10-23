<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', realpath(dirname(__FILE__) . DS . '..' . DS . '..'));
define('BASE_DIR', realpath(ROOT_DIR . DS . 'src' . DS . 'backend'));

include BASE_DIR . DS . 'config' . DS . 'config.php';
include BASE_DIR . DS . 'includes' . DS . 'database.php';
include BASE_DIR . DS . 'includes' . DS . 'helper.php';

class Model {

    private static $db;

    public function __construct() {

    }

    public static function DBInit() {

        if (!self::$db) {
            self::$db = new Database();
        }
        return self::$db;

    }

}

include BASE_DIR . DS . 'models' . DS . 'model.sensors.php';
include BASE_DIR . DS . 'models' . DS . 'model.relays.php';
include BASE_DIR . DS . 'models' . DS . 'model.automation.php';

function relayAutomation() {
    $automationModel = new AutomationModel();
    $relaysModel = new RelaysModel();
    $sensorsModel = new SensorsModel();

    function statusDecider($conditionsAreApplied, $operation) {
        if($conditionsAreApplied) {
            return $operation == 'on';
        } else {
            return $operation != 'on';
        }
    }

    $operations = $automationModel->getRelayOperations();

    if(is_array($operations) && count($operations) > 0) {
        $relayStates = array();

        foreach($operations as $operation) {
            $conditions = $automationModel->getRelayConditionsByOperation($operation['operationid']);

            $conditionsAreApplied = true;

            if(count($conditions) > 0) {
                foreach($conditions as $condition) {
                    if($condition['type'] == 'TEMP') {
                        $sensorData = $sensorsModel->getSensor($condition['value1']);
                        $conditionsAreApplied &= Helper::compare($sensorData['lastvalue'],
                            $condition['value2'], $condition['cond']);
                    }
                    if($condition['type'] == 'DAY') {
                        $conditionsAreApplied &= Helper::determineCurrentDay($condition['value1'], $condition['cond']);
                    }
                    if($condition['type'] == 'DATE') {
                        $setDate = new DateTime($condition['value1']);
                        $currentDate = new DateTime(date('Y-m-d'));

                        $conditionsAreApplied &= Helper::compare($currentDate,
                            $setDate, $condition['cond']);
                    }
                    if($condition['type'] == 'TIME') {
                        $setTime = intval(ltrim(str_replace(':', '', $condition['value1']), '0'));
                        $currentTime = intval(ltrim(date('Hi'), '0'));

                        $conditionsAreApplied &= Helper::compare($currentTime,
                                                    $setTime, $condition['cond']);
                    }
                    if($condition['type'] == 'RELAY') {
                        $relayData = $relaysModel->getRelay($condition['value1']);
                        if(($condition['value2'] == 'on' && $relayData['status']) ||
                            ($condition['value2'] == 'off' && !$relayData['status'])) {
                            $conditionsAreApplied &= true;
                        } else {
                            $conditionsAreApplied &= false;
                        }
                    }
                }
            }

            if(array_key_exists($operation['relayid'], $relayStates)) {
                $relayStates[$operation['relayid']] |= statusDecider($conditionsAreApplied, $operation['operation']);
            } else {
                $relayStates[$operation['relayid']] = statusDecider($conditionsAreApplied, $operation['operation']);
            }
        }

        if(count($relayStates) > 0) {
            foreach($relayStates as $key => $relayState) {
                $relayData = $relaysModel->getRelay($key);

                if($relayData['state'] == 'auto') {
                    $relaysModel->updateRelayStatus($key, $relayState);
                }
            }
        }
    }
}

relayAutomation();

?>
