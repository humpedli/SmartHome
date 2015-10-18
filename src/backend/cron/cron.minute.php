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

    $operations = $automationModel->getRelayOperations();

    if(is_array($operations) && count($operations) > 0) {
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
                }
            }

            echo $operation['relayid'] . ': ' . ($conditionsAreApplied ? 'true' : 'false');
            echo date('w');
        }
    }
}

relayAutomation();

?>
