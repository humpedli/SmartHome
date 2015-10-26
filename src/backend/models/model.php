<?php

class Model {

    private static $db;

    public function __construct() {

    }

    public static function DBInit() {

        if (!self::$db) {
            self::$db = new Database();
        }
        return self::$db;

    }

}

?>
