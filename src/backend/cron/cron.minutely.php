<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', realpath(dirname(__FILE__) . DS . '..' . DS . '..'));
define('BASE_DIR', realpath(ROOT_DIR . DS . 'src' . DS . 'backend'));

include BASE_DIR . DS . 'config' . DS . 'config.php';
include BASE_DIR . DS . 'includes' . DS . 'database.php';
include BASE_DIR . DS . 'includes' . DS . 'helper.php';

include BASE_DIR . DS . 'models' . DS . 'model.php';
include BASE_DIR . DS . 'models' . DS . 'model.auth.php';
include BASE_DIR . DS . 'models' . DS . 'model.users.php';
include BASE_DIR . DS . 'models' . DS . 'model.sensors.php';
include BASE_DIR . DS . 'models' . DS . 'model.relays.php';
include BASE_DIR . DS . 'models' . DS . 'model.automation.php';
include BASE_DIR . DS . 'models' . DS . 'model.weather.php';
include BASE_DIR . DS . 'models' . DS . 'model.settings.php';

$automationModel = new AutomationModel();
$automationModel->runAutomation();

?>
