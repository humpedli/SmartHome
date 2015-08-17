<?php

include BASE_DIR . DS . 'config' . DS . 'config.php';

require ROOT_DIR . 'vendor' . DS . 'autoload.php';

// New Slim app
$app = new \Slim\Slim();

session_start();

/**
 *
 * Verifying required params posted or not
 *
 * @param array $required_fields The array to be validated
 *
 */
function verifyRequiredParams($requiredFields) {
    $error = false;
    $errorFields = "";
    $requestParams = array();
    $requestParams = $_REQUEST;

    // Handling PUT request params
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $app = \Slim\Slim::getInstance();
        parse_str($app->request()->getBody(), $requestParams);
    }
    foreach ($requiredFields as $field) {
        if (!isset($requestParams[$field]) || strlen(trim($requestParams[$field])) <= 0) {
            $error = true;
            $errorFields .= $field . ', ';
        }
    }
 
    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["messages"] = 'Required field(s) ' . substr($errorFields, 0, -2) . ' is missing or empty';
        echoResponse(400, $response);
        $app->stop();
    }
} 
 
/**
 *
 * Prints out the API response
 *
 * @param int $status_code The HTTP status code
 * @param array $response The response array
 *
 */
function echoResponse($statusCode, $response) {
    $app = \Slim\Slim::getInstance();

    // Http response code
    $app->status($statusCode);
 
    // setting response content type to json
    $app->contentType('application/json; charset=utf-8');
 
    echo json_encode($response);
}

function randomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

include BASE_DIR . DS . 'includes' . DS . 'database.php';

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

include BASE_DIR . DS . 'models' . DS . 'model.auth.php';
include BASE_DIR . DS . 'models' . DS . 'model.users.php';
include BASE_DIR . DS . 'models' . DS . 'model.sensors.php';

?>
