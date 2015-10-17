<?php

class AutomationModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getAutomation() {

        // ToDo: implementation

    }

    public function saveAutomation($params) {

        echo $params;
        // ToDo: implementation

    }

}

?>
