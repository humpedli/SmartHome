<?php

define('DEBUG', true);

define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_USER', 'otthon');
define('DB_PASS', 'yQtu5YhtERFrMVTS');
define('DB_NAME', 'otthon');

define('SECRET_KEY', '6zydPRWoBG1pb85h7lf9vlNskwyHwE');

if(DEBUG) {
    ini_set('display_errors', true);
    error_reporting(-1);
}

?>