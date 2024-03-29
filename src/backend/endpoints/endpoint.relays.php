<?php

$app->get('/relays', function() use ($app) {
    $response = array();

    $relaysModel = new RelaysModel();
    $data = $relaysModel->getRelays();
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->get('/relays/:relayid', function($relayid) use ($app) {
    $response = array();

    $relaysModel = new RelaysModel();
    $data = $relaysModel->getRelay($relayid);
    if($data) {
        $response = $data;
        echoResponse(200, $response);
    } else {
        $response["message"] = 'No data';
        echoResponse(404, $response);
    }
});

$app->post('/relays/:relayid(/:subfunction)', function($relayid, $subfunction = null) use ($app) {
    $response = array();

    $normalParams = $app->request->params();
    $jsonParams = json_decode($app->request->getBody(), true);
    $params = ($jsonParams == null ? $normalParams : $jsonParams);

    $relaysModel = new RelaysModel();
    $data = $relaysModel->getRelay($relayid);
    if($data) {
        if($subfunction == 'state') {
            $data2 = $relaysModel->updateRelayState($relayid, $params['state']);
        } else if($subfunction == 'status') {
            $data2 = $relaysModel->updateRelayStatus($relayid, $params['status']);
        } else {
            $data2 = $relaysModel->editRelay($relayid, $params['name'], $params['position']);
        }
    } else {
        $data2 = $relaysModel->addRelay($params['relayid'], $params['name']);
    }

    if($data2 === true) {
        $response = null;
        echoResponse((isset($relayid) ? 200 : 201), $response);
    } else {
        $response["message"] = $data2;
        echoResponse(400, $response);
    }
});

$app->delete('/relays/:relayid', function($relayid) use ($app) {
    $response = array();

    $relaysModel = new RelaysModel();
    $data = $relaysModel->deleteRelay($relayid);
    if($data === true) {
        $response = null;
        echoResponse(200, $response);
    } else {
        $response["message"] = $data;
        echoResponse(400, $response);
    }
});

?>
