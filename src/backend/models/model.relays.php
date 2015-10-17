<?php

class RelaysModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getRelays() {

        $sql = "SELECT * FROM relays ORDER BY relayid ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        return $results;
    }

    public function getRelay($relayid) {

        $sql = "SELECT * FROM relays WHERE relayid = '" . $this->db->secure($relayid) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }

    public function addRelay($name, $gpio) {

        if(isset($name) && isset($gpio)) {
            try {
                $this->getRelays();

                $sql = "
                    INSERT INTO relays
                    SET relays.name = '" . $this->db->secure($name) . "',
                        relays.gpio = '" . intval($gpio) . "'
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

    public function editRelay($relayid, $name, $gpio) {

        if(isset($name) && isset($gpio)) {
            try {
                $sql = "
                    UPDATE relays
                    SET relays.name = '" . $this->db->secure($name) . "',
                        relays.gpio = '" . intval($gpio) . "'
                    WHERE relayid = '" . $this->db->secure($relayid) . "';
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
                WHERE relayid = '" . $this->db->secure($relayid) . "';
            ";
            $this->db->query($sql);

            return true;
        }
        catch(Exception $e) {
            return $e->getMessage();
        }

    }

}

?>
