<?php

class RelaysModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getRelays() {

        $sql = "SELECT * FROM relays ORDER BY position ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        return $results;
    }

    public function getRelay($relayid) {

        $sql = "SELECT * FROM relays WHERE relayid = '" . intval($relayid) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }

    public function addRelay($relayid, $name) {

        if(isset($relayid) && isset($name)) {
            try {
                $this->getRelays();
                $position = $this->db->numRows() + 1;

                $sql = "
                    INSERT INTO relays
                    SET relays.relayid = '" . intval($relayid) . "',
                        relays.name = '" . $this->db->secure($name) . "',
                        relays.position = '" . intval($position) . "';
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

    public function editRelay($relayid, $name, $position) {

        if(isset($name) && isset($position)) {
            try {
                $sql = "
                    UPDATE relays
                    SET relays.name = '" . $this->db->secure($name) . "',
                        relays.position = '" . intval($position) . "'
                    WHERE relayid = '" . intval($relayid) . "';
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

    public function deleteRelay($relayid) {

        try {
            $sql = "
                DELETE FROM relays
                WHERE relayid = '" . intval($relayid) . "';
            ";
            $this->db->query($sql);

            $automationModel = new AutomationModel();
            $automationModel->deleteRelayOperationByRelay($relayid);
            $automationModel->deleteRelayConditionByRelay($relayid);

            return true;
        }
        catch(Exception $e) {
            return $e->getMessage();
        }

    }

    public function updateRelayState($relayid, $state) {

        if($state == 'manual' || $state == 'auto') {
            try {
                $sql = "
                    UPDATE relays
                    SET relays.state = '" . $this->db->secure($state) . "'
                    WHERE relayid = '" . intval($relayid) . "';
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

    public function updateRelayStatus($relayid, $status) {

        if(isset($status)) {
            try {
                $sql = "
                    UPDATE relays
                    SET relays.status = '" . intval($status) . "'
                    WHERE relayid = '" . intval($relayid) . "';
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

}

?>
