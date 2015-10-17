<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', realpath(dirname(__FILE__) . DS . '..' . DS . '..'));
define('BASE_DIR', realpath(ROOT_DIR . DS . 'src' . DS . 'backend'));

include BASE_DIR . DS . 'includes' . DS . 'api.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true'); 
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

}

$app->get('/', function() use ($app) {
    //tbc
});

$app->options('/(:anything+)', function() {
    //nothing to do, just setting the headers
});


include BASE_DIR . DS . 'endpoints' . DS . 'endpoint.auth.php';
include BASE_DIR . DS . 'endpoints' . DS . 'endpoint.sensors.php';
include BASE_DIR . DS . 'endpoints' . DS . 'endpoint.relays.php';

$app->run();

?>
