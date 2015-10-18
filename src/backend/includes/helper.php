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

        $output = false;

        switch(lowercase($input)) {
            case 'sunday':
                $output = (date('w') == 0)
            case 'monday':
                $output = (date('w') == 1)
            case 'tuesday':
                $output = (date('w') == 2)
            case 'wednesday':
                $output = (date('w') == 3)
            case 'thursday':
                $output = (date('w') == 4)
            case 'friday':
                $output = (date('w') == 5)
            case 'saturday':
                $output = (date('w') == 6)
            case 'weekday':
                $output = (date('w') > 0 && date('w') < 6)
            case 'weekend':
                $output = (date('w') == 0 || date('w') == 6)
            default:
                $output = false;
        }

        if($operator == '==') {
            return $output;
        } else {
            return !$output;
        }

    }
}

?>
