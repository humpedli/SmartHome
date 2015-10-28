<?php

$app->get('/settings', function() use ($app) {
    $response = array();

    $settingsModel = new SettingsModel();
    $data = $settingsModel->getSettings();
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->get('/settings/:settingid', function($settingid) use ($app) {
    $response = array();

    $settingsModel = new SettingsModel();
    $data = $settingsModel->getSetting($settingid);
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->post('/settings', function() use ($app) {
    $response = array();

    $jsonParams = json_decode($app->request->getBody(), true);
    $params = $jsonParams;

    $settingsModel = new SettingsModel();
    $data = $settingsModel->saveSettings($params);

    if($data === true) {
        $response = null;
        echoResponse(200, $response);
    } else {
        $response["message"] = $data;
        echoResponse(400, $response);
    }
});

?>
