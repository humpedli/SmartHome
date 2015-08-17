<?php

class SensorsModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getAllSensors() {

        $sql = "SELECT * FROM sensors ORDER BY position ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        return $results;
    }

    public function getSensor($sensorid) {

        $sql = "SELECT * FROM sensors WHERE sensorid = '" . intval($sensorid) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
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