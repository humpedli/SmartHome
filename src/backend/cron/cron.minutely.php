<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', realpath(dirname(__FILE__) . DS . '..' . DS . '..'));
define('BASE_DIR', realpath(ROOT_DIR . DS . 'src' . DS . 'backend'));

include BASE_DIR . DS . 'config' . DS . 'config.php';
include BASE_DIR . DS . 'includes' . DS . 'database.php';
include BASE_DIR . DS . 'includes' . DS . 'helper.php';

include BASE_DIR . DS . 'models' . DS . 'model.php';
include BASE_DIR . DS . 'models' . DS . 'model.automation.php';

$automationModel = new AutomationModel();
$automationModel->runAutomation();

?>
