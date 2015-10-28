<?php

class SettingsModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getSettings() {

        $sql = "SELECT * FROM settings ORDER BY settingkey ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        if(count($results) > 0) {
            $reduced = array_reduce(
                $results,
                function(&$result, $item){
                    $result[$item['settingkey']] = $item['value'];
                    return $result;
                },
                array()
            );
        }

        return $reduced;

    }

    public function getSetting($settingkey) {

        $sql = "SELECT * FROM settings WHERE settingkey = '" . $this->db->secure($settingkey) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;

    }

    public function saveSettings($settings) {

        if(isset($settings)) {
            $getOldCity = $this->getSetting('CITY_NAME');

            try {
                foreach($settings as $key => $setting) {
                    $sql = "
                        UPDATE settings
                        SET settings.value = '" . $this->db->secure($setting) . "'
                        WHERE settingkey = '" . $this->db->secure($key) . "';
                    ";
                    $this->db->query($sql);

                    // resync weather if city is changed
                    if($key == 'CITY_NAME' && $getOldCity['value'] != $setting) {
                        $weatherModel = new WeatherModel();
                        $weatherModel->syncWeather();
                    }
                }

                return true;
            }
            catch(Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 'Invalid parameters!';
        }

    }

}

?>
