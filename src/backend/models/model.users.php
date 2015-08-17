<?php

class UsersModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getAllUsers() {

        $sql = "SELECT * FROM users ORDER BY username ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        return $results;
    }

    public function getUser($username) {

        $sql = "SELECT * FROM users WHERE username = '" . $this->db->secure($username) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;

    }
}

?>