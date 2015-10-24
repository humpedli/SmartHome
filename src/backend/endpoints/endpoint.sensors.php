<?php

$app->get('/sensors', function() use ($app) {
    $response = array();

    $sensorsModel = new SensorsModel();
    $data = $sensorsModel->getSensors();
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->get('/sensors/:sensorid', function($sensorid) use ($app) {
    $response = array();

    $sensorsModel = new SensorsModel();
    $data = $sensorsModel->getSensor($sensorid);
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->post('/sensors/:sensorid', function($sensorid) use ($app) {
    $response = array();

    $normalParams = $app->request->params();
    $jsonParams = json_decode($app->request->getBody(), true);
    $params = ($jsonParams == null ? $normalParams : $jsonParams);

    $sensorsModel = new SensorsModel();
    $data = $sensorsModel->getSensor($sensorid);
    if($data) {
        $data2 = $sensorsModel->editSensor($sensorid, $params['name'], $params['position']);
    } else {
        $data2 = $sensorsModel->addSensor($params['sensorid'], $params['name']);
    }
    
    if($data2 === true) {
        $response = null;
        echoResponse((isset($sensorid) ? 200 : 201), $response);
    } else {
        $response["message"] = $data2;
        echoResponse(400, $response);
    }
});

$app->delete('/sensors/:sensorid', function($sensorid) use ($app) {
    $response = array();

    $sensorsModel = new SensorsModel();
    $data = $sensorsModel->deleteSensor($sensorid);
    if($data === true) {
        $response = null;
        echoResponse(200, $response);
    } else {
        $response["message"] = $data;
        echoResponse(400, $response);
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

    if(!preg_match('/^[a-zA-Z0-9_]+$/', $callback) ||
        ($start && !preg_match('/^[0-9]+$/', $start)) ||
        ($end && !preg_match('/^[0-9]+$/', $end))) {
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
