<?php

class Helper {

    public static function compare($variable1, $variable2, $operator) {

        switch($operator) {
            case '==':
                return $variable1 == $variable2;
            case '!=':
                return $variable1 != $variable2;
            case '>=':
                return $variable1 >= $variable2;
            case '<=':
                return $variable1 <= $variable2;
            case '>':
                return $variable1 > $variable2;
            case '<':
                return $variable1 < $variable2;
            default:
                return false;
        }

    }

    public static function determineCurrentDay($input, $operator) {

        switch(strtolower($input)) {
            case 'sunday':
                $output = (date('w') == 0);
                break;
            case 'monday':
                $output = (date('w') == 1);
                break;
            case 'tuesday':
                $output = (date('w') == 2);
                break;
            case 'wednesday':
                $output = (date('w') == 3);
                break;
            case 'thursday':
                $output = (date('w') == 4);
                break;
            case 'friday':
                $output = (date('w') == 5);
                break;
            case 'saturday':
                $output = (date('w') == 6);
                break;
            case 'weekday':
                $output = (date('w') > 0 && date('w') < 6);
                break;
            case 'weekend':
                $output = (date('w') == 0 || date('w') == 6);
                break;
            default:
                $output = false;
                break;
        }

        if($operator == '==') {
            return $output;
        } else {
            return !$output;
        }

    }
}

?>
