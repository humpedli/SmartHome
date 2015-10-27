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

        $forecast = new Forecast($settings['FORECAST_APIKEY']);

        // Get current weather
        $response = $forecast->getData($settings['CITY_LATITUDE'], $settings['CITY_LONGITUDE'], null, 'si');
        $currently = $response->getCurrently();

        $currentlyData = array(
            'timeid' => 't',
            'tempcurrent' => number_format($currently->getTemperature(), 1),
            'tempapparent' => number_format($currently->getApparentTemperature(), 1),
            'tempmin' => '',
            'tempmax' => '',
            'humidity' => number_format($currently->getHumidity() * 100, 2),
            'windspeed' => number_format($currently->getWindSpeed(), 1),
            'precipprobability' => number_format($currently->getPrecipProbability() * 100, 2),
            'weathertype' => Helper::removeDayNight($currently->getIcon()),
            'sunrise' => '',
            'sunset' => '',
            'datatime' => date('Y-m-d H:i:s', $currently->getTime())
        );

        $isWeatherExists = $this->getWeather($currentlyData['timeid']);
        if($isWeatherExists) {
            $this->db->massiveUpdate('weather', array_slice($currentlyData, 1), array_slice($currentlyData, 0, 1));
        } else {
            $this->db->massiveInsert('weather', $currentlyData);
        }

        // Get daily weather for today, tomorrow and tomorrow after
        foreach($response->getDaily() as $key => $day) {
            if($key > 2) {
                break;
            }

            switch($key) {
                case 0:
                    $timeid = 'today';
                    break;
                case 1:
                    $timeid = 'tomorrow';
                    break;
                case 2:
                    $timeid = 'tomorrow_after';
                    break;
            }

            $dailyData = array(
                'timeid' => $timeid,
                'tempcurrent' => '',
                'tempapparent' => '',
                'tempmin' => number_format($day->getTemperatureMin(), 1),
                'tempmax' => number_format($day->getTemperatureMax(), 1),
                'humidity' => number_format($day->getHumidity() * 100, 2),
                'windspeed' => number_format($day->getWindSpeed(), 1),
                'precipprobability' => number_format($day->getPrecipProbability() * 100, 2),
                'weathertype' => Helper::removeDayNight($day->getIcon()),
                'sunrise' => date('Y-m-d H:i:s', $day->getSunriseTime()),
                'sunset' => date('Y-m-d H:i:s', $day->getSunsetTime()),
                'datatime' => date('Y-m-d H:i:s', $day->getTime())
            );

            $isWeatherExists = $this->getWeather($dailyData['timeid']);
            if($isWeatherExists) {
                $this->db->massiveUpdate('weather', array_slice($dailyData, 1), array_slice($dailyData, 0, 1));
            } else {
                $this->db->massiveInsert('weather', $dailyData);
            }
        }

        // Get weather for next 12 hours
        foreach($response->getHourly() as $key => $hour) {
            if($key > 12) {
                break;
            }

            $hourlyData = array(
                'timeid' => 't' . $key,
                'tempcurrent' => number_format($hour->getTemperature(), 1),
                'tempapparent' => number_format($hour->getApparentTemperature(), 1),
                'tempmin' => '',
                'tempmax' => '',
                'humidity' => number_format($hour->getHumidity() * 100, 2),
                'windspeed' => number_format($hour->getWindSpeed(), 1),
                'precipprobability' => number_format($hour->getPrecipProbability() * 100, 2),
                'weathertype' => Helper::removeDayNight($hour->getIcon()),
                'sunrise' => '',
                'sunset' => '',
                'datatime' => date('Y-m-d H:i:s', $hour->getTime())
            );

            if($key != 0) {
                $isWeatherExists = $this->getWeather($hourlyData['timeid']);
                if($isWeatherExists) {
                    $this->db->massiveUpdate('weather', array_slice($hourlyData, 1), array_slice($hourlyData, 0, 1));
                } else {
                    $this->db->massiveInsert('weather', $hourlyData);
                }
            }
        }

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
