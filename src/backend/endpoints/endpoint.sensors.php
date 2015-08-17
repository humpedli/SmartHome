<?php

$app->get('/sensors', function() use ($app) {
    $response = array();

    $sensorsModel = new SensorsModel();
    $data = $sensorsModel->getAllSensors();
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->get('/sensors/graph', function() use ($app) {
    $response = array();

    $normalParams = $app->request->params();
    $jsonParams = json_decode($app->request->getBody(), true);
    $params = ($jsonParams == null ? $normalParams : $jsonParams);

    

    $callback = @$params['callback'];
    $start = @$params['start'];
    $end = @$params['end'];
    $missing = false;

    if(!preg_match('/^[a-zA-Z0-9_]+$/', $callback) || ($start && !preg_match('/^[0-9]+$/', $start)) || ($end && !preg_match('/^[0-9]+$/', $end))) {
        $missing = true;
    }
    if(!$end) $end = time() * 1000;

    if($missing) {
        $response["message"] = "Missing or invalid parameters";
        echoResponse(401, $response);
    } else {
        $sensorsModel = new SensorsModel();
        $data = $sensorsModel->graph($callback, $start, $end);
        if($data) {
            $response = $data;
            echoResponse(200, $response);
        } else {
            $response["message"] = 'No data';
            echoResponse(404, $response);
        }
    }
});

?>