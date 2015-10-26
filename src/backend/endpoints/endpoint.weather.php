<?php

$app->get('/weather', function() use ($app) {
    $response = array();

    $weatherModel = new WeatherModel();
    $data = $weatherModel->getWeathers();
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->get('/weather/:timeid', function($timeid) use ($app) {
    $response = array();

    $weatherModel = new WeatherModel();
    $data = $weatherModel->getWeather($timeid);
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

?>
