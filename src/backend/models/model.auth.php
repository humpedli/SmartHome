<?php

class AuthModel extends Model {

    var $db;

	public function __construct() {

		$this->db = $this->DBInit();

    }

    public function login($username, $password) {

        if(!isset($_SESSION['token'])) {
            if(isset($username) && isset($password)) {
                $securedPass = sha1($password . SECRET_KEY);

                $sql = "
                    SELECT users.username FROM users 
                    WHERE users.username = '".$this->db->secure($username)."'
                    AND users.password = '".$this->db->secure($securedPass)."';
                ";
                $this->db->query($sql);

                if($this->db->count == 1) {

                    $token = randomString(50);

                    $sql = "
                        INSERT INTO tokens
                        SET tokens.token = '".$this->db->secure($token)."',
                            tokens.expire = (NOW() + INTERVAL 15 MINUTE),
                            tokens.username = '".$this->db->secure($username)."';
                    ";
                    $this->db->query($sql);

                    $_SESSION['token'] = $token;

                    return true;
                } else {
                    return false;
                }       
            } else {
                return false;
            }
        } else {
            return $this->validate();
        }

    }

    public function validate() {

        if(isset($_SESSION['token'])) {
            $sql = "
                SELECT tokens.token, users.* FROM tokens
                INNER JOIN users ON tokens.username = users.username
                WHERE tokens.token = '".$this->db->secure($_SESSION['token'])."'
                AND tokens.expire >= NOW();
            ";
            $this->db->query($sql);

            if($this->db->count == 1) {
                $sql = "UPDATE tokens SET expire = (NOW() + INTERVAL 15 MINUTE) WHERE token = '".$this->db->secure($_SESSION['token'])."';";
                $this->db->query($sql);

                return true;
            } else {
                unset($_SESSION['token']);
                return false;
            }
        } else {
            return false;
        }

    }

    public function logout() {

        $sql = "
            DELETE FROM tokens 
            WHERE tokens.token = '".$this->db->secure($_SESSION['token'])."';
        ";
        $this->db->query($sql);

        unset($_SESSION['token']);

    }
}

?>