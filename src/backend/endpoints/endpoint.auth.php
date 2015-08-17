<?php

$app->get('/auth', function() use ($app) {
    $response = array();

    $authModel = new AuthModel();
    if(!$authModel->validate()) {
        $response["message"] = "Invalid session";
        echoResponse(401, $response);
    } else {
        $response["message"] = 'Authenticated';
        echoResponse(200, $response);
    }

});

$app->post('/auth', function() use ($app) {
	$response = array();

	$normalParams = $app->request->params();
    $jsonParams = json_decode($app->request->getBody(), true);
    $params = ($jsonParams == null ? $normalParams : $jsonParams);

    $authModel = new AuthModel();
    if(!$authModel->login($params['username'], $params['password'])) {
        $response["message"] = "Invalid credentials";
        echoResponse(401, $response);
    } else {
        $response["message"] = 'Logged in';
        echoResponse(200, $response);
    }        
});

$app->delete('/auth', function() use ($app) {
    $response = array();

    $authModel = new AuthModel();
    $authModel->logout();

    $response["message"] = 'Logged out';
    echoResponse(200, $response);
});

?>