<?php

class SensorsModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getSensors() {

        $sql = "SELECT * FROM sensors ORDER BY position ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        return $results;
    }

    public function getSensor($sensorid) {

        $sql = "SELECT * FROM sensors WHERE sensorid = '" . $this->db->secure($sensorid) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }

    public function addSensor($sensorid, $name) {

        if(isset($name)) {
            try {
                $this->getSensors();
                $position = $this->db->numRows() + 1;

                $sql = "
                    INSERT INTO sensors
                    SET sensors.sensorid = '" . $this->db->secure($sensorid) . "',
                        sensors.name = '" . $this->db->secure($name) . "',
                        sensors.position = '" . intval($position) . "',
                        sensors.lastvalue = 0,
                        sensors.lasttime = NOW();
                ";
                $this->db->query($sql);

                return true;
            }
            catch(Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 'Invalid parameters!';
        }

    }

    public function editSensor($sensorid, $name, $position) {

        if(isset($name) && isset($position)) {
            try {
                $sql = "
                    UPDATE sensors
                    SET sensors.name = '" . $this->db->secure($name) . "',
                        sensors.position = '" . intval($position) . "'
                    WHERE sensorid = '" . $this->db->secure($sensorid) . "';
                ";
                $this->db->query($sql);

                return true;
            }
            catch(Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 'Invalid parameters!';
        }

    }

    public function deleteSensor($sensorid) {

        try {
            $sql = "
                DELETE FROM sensors 
                WHERE sensorid = '" . $this->db->secure($sensorid) . "';
            ";
            $this->db->query($sql);

            return true;
        }
        catch(Exception $e) {
            return $e->getMessage();
        }

    }

    public function graph($callback, $start, $end) {

        $range = $end - $start;
        $startTime = gmstrftime('%Y-%m-%d %H:%M:%S', $start / 1000);
        $endTime = gmstrftime('%Y-%m-%d %H:%M:%S', $end / 1000);

        if ($range < 2 * 24 * 3600 * 1000) {
            $groupBy = 'MINUTE(time)'; // minute
        } elseif ($range < 31 * 24 * 3600 * 1000) {
            $groupBy = 'HOUR(time)'; // hour
        } elseif ($range < 15 * 31 * 24 * 3600 * 1000) {
            $groupBy = 'DAY(time)'; // day
        } else {
            $groupBy = 'MONTH(time)'; // month
        }

        $sql = "
            SELECT 
                UNIX_TIMESTAMP(time) * 1000 AS time
            FROM graph 
            WHERE time BETWEEN '$startTime' AND '$endTime'
            GROUP BY DATE(time), $groupBy
            ORDER BY time
            LIMIT 0, 5000;  
        ";

        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }
}

?>