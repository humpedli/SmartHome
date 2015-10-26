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

?>
