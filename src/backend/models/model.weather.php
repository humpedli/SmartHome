<?php

class WeatherModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getWeathers() {

        $sql = "SELECT * FROM weather ORDER BY timeid ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        return $results;
    }

    public function getWeather($timeid) {

        $sql = "SELECT * FROM weather WHERE timeid = '" . $this->db->secure($timeid) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }

    public function syncWeather() {
        require_once BASE_DIR . DS . 'libraries' . DS . 'ForecastTools' . DS . 'Forecast.php';

        $settingsModel = new SettingsModel();
        $settings = $settingsModel->getSettings();

        $forecast  = new Forecast($settings['FORECAST_APIKEY']);
        $response = $forecast->getData($settings['CITY_LATITUDE'], $settings['CITY_LONGITUDE'], null, 'si');
        $currently = $response->getCurrently();
        $time = date("H:i:s", $currently->getTime());
        $temp = number_format($currently->getTemperature(), 1);
        echo "Temperature in the Castro at $time: $temp&#8457;<br />\n";

        echo "<pre>";
        var_dump($response->getRawData());
        echo "</pre>";

        /*
        $requests = array();
        for ($i = 12; $i > 0; $i--) {
          $requests[] = array(
            'latitude'  => $latitude,
            'longitude' => $longitude,
            'time'      => strtotime("-$i hours"),
            'units'     => 'si'
          );
        }
        for ($i = 0; $i <= 12; $i++) {
          $requests[] = array(
            'latitude'  => $latitude,
            'longitude' => $longitude,
            'time'      => strtotime("+$i hours"),
            'units'     => 'si'
          );
        }

        $responses = $forecast->getData($requests);

        foreach ($responses as $response) {
          if ($currently = $response->getCurrently()) {
            $time = date("Y-m-d H", $currently->getTime());
            $temp = $currently->getTemperature()
                    ? number_format($currently->getTemperature(), 1) . 'C'
                    : "unknown";
            echo "$time:00 órakkor: $temp<br />\n";
          }
        }*/

    }

}

?>
