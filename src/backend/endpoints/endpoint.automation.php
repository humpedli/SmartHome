<?php

$app->get('/automation', function() use ($app) {
    $response = array();

    $automationModel = new AutomationModel();
    $data = $automationModel->getAutomation();
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->post('/automation', function() use ($app) {
    $response = array();

    $normalParams = $app->request->params();
    $jsonParams = json_decode($app->request->getBody(), true);
    $params = ($jsonParams == null ? $normalParams : $jsonParams);

    $automationModel = new AutomationModel();
    $data = $automationModel->saveAutomation($params);

    if($data === true) {
        $response = null;
        echoResponse(200, $response);
    } else {
        $response["message"] = $data;
        echoResponse(400, $response);
    }
});

?>
