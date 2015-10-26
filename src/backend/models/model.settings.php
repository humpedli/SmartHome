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

        return $results;
    }

    public function getSetting($settingkey) {

        $sql = "SELECT * FROM settings WHERE settingkey = '" . $this->db->secure($settingkey) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }

}

?>
