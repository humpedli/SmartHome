<?php

class AutomationModel extends Model {

    var $db;

    public function __construct() {

        $this->db = $this->DBInit();

    }

    public function getRelayOperations() {

        $sql = "SELECT * FROM relay_operations ORDER BY operationid ASC;";
        $this->db->query($sql);
        $results = $this->db->results();

        return $results;
    }

    public function getRelayOperation($operationid) {

        $sql = "SELECT * FROM relay_operations WHERE operationid = '" . intval($operationid) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }

    public function addRelayOperation($relayid, $operation) {

        if(isset($relayid) && isset($operation)) {
            try {
                $sql = "
                    INSERT INTO relay_operations
                    SET relay_operations.relayid = '" . intval($relayid) . "',
                        relay_operations.operation = '" . $this->db->secure($operation) . "'
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

    public function editRelayOperation($operationid, $relayid, $operation) {

        if(isset($relayid) && isset($operation)) {
            try {
                $sql = "
                    UPDATE relay_operations
                    SET relay_operations.relayid = '" . intval($relayid) . "',
                        relay_operations.operation = '" . $this->db->secure($operation) . "'
                    WHERE operationid = '" . intval($operationid) . "';
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

    public function deleteRelayOperation($operationid) {

        try {
            $sql = "
                DELETE FROM relay_operations
                WHERE operationid = '" . intval($operationid) . "';
            ";
            $this->db->query($sql);

            $sql2 = "
                DELETE FROM relay_conditions
                WHERE operationid = '" . intval($operationid) . "';
            ";
            $this->db->query($sql2);

            return true;
        }
        catch(Exception $e) {
            return $e->getMessage();
        }

    }

    public function getRelayConditions() {

            $sql = "SELECT * FROM relay_conditions ORDER BY conditionid ASC;";
            $this->db->query($sql);
            $result = $this->db->results();

            return $result;
        }

    public function getRelayConditionsByOperation($operationid) {

        $sql = "SELECT * FROM relay_conditions WHERE operationid = '" . intval($operationid) . "'
                ORDER BY conditionid ASC;";
        $this->db->query($sql);
        $result = $this->db->results();

        return $result;
    }

    public function getRelayCondition($conditionid) {

        $sql = "SELECT * FROM relay_conditions WHERE conditionid = '" . intval($conditionid) . "';";
        $this->db->query($sql);
        $result = $this->db->result();

        return $result;
    }

    public function addRelayCondition($operationid, $type, $cond, $value1, $value2) {

        if(isset($operationid) && isset($type) && isset($value1)) {
            try {
                $sql = "
                    INSERT INTO relay_conditions
                    SET relay_conditions.operationid = '" . intval($operationid) . "',
                        relay_conditions.type = '" . $this->db->secure($type) . "',
                        relay_conditions.cond = '" . $this->db->secure($cond) . "',
                        relay_conditions.value1 = '" . $this->db->secure($value1) . "',
                        relay_conditions.value2 = '" . $this->db->secure($value2) . "'
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

    public function editRelayCondition($conditionid, $operationid, $type, $cond, $value1, $value2) {

        if(isset($operationid) && isset($type) && isset($value1)) {
            try {
                $sql = "
                    UPDATE relay_conditions
                    SET relay_conditions.operationid = '" . intval($operationid) . "',
                        relay_conditions.type = '" . $this->db->secure($type) . "',
                        relay_conditions.cond = '" . $this->db->secure($cond) . "',
                        relay_conditions.value1 = '" . $this->db->secure($value1) . "',
                        relay_conditions.value2 = '" . $this->db->secure($value2) . "'
                    WHERE conditionid = '" . intval($conditionid) . "';
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

    public function deleteRelayCondition($conditionid) {

        try {
            $sql = "
                DELETE FROM relay_conditions
                WHERE conditionid = '" . intval($conditionid) . "';
            ";
            $this->db->query($sql);

            return true;
        }
        catch(Exception $e) {
            return $e->getMessage();
        }

    }

    public function getAutomation() {

        $data = array();
        $relaysModel = new RelaysModel();
        $sensorsModel = new SensorsModel();

        $operations = $this->getRelayOperations();
        if(is_array($operations) && count($operations) > 0) {
            foreach($operations as $operation) {
                $conditions = $this->getRelayConditionsByOperation($operation['operationid']);
                $conditionData = array();

                if(count($conditions) > 0) {
                    foreach($conditions as $condition) {
                        $oneCondition = array(
                            'conditionid' => $condition['conditionid'],
                            'conditionType' => $condition['type'],
                            'condition' => $condition['cond'],
                            'conditionValue1' => $condition['value1'],
                            'conditionValue2' => $condition['value2'],
                        );

                        if($condition['type'] == 'TEMP') {
                            $oneCondition['conditionValue1'] = $sensorsModel->getSensor($condition['value1']);
                        }
                        if($condition['type'] == 'RELAY') {
                            $oneCondition['conditionValue1'] = $relaysModel->getRelay($condition['value1']);
                        }

                        $conditionData[] = $oneCondition;
                    }
                }

                $operation['subConditions'] = $conditionData;
                $operation['relay'] = $relaysModel->getRelay($operation['relayid']);
                unset($operation['relayid']);
                $data[] = $operation;
            }
        }

        return $data;
    }

    public function saveAutomation($dtoList) {

        $processedOperations = array();
        $processedConditions = array();

        for($i = 0; $i < count($dtoList); $i++) {
            $operation = $dtoList[$i]['dto'];
            $operationid = (isset($operation['operationid']) ? $operation['operationid'] : null);

            if(isset($operation['relay']) && isset($operation['relay']['relayid']) && isset($operation['operation'])) {
                if($operationid == null) {
                    $this->addRelayOperation($operation['relay']['relayid'], $operation['operation']);
                    $operationid = $this->db->lastID();
                } else {
                    $this->editRelayOperation($operationid, $operation['relay']['relayid'], $operation['operation']);
                }

                $processedOperations[] = $operationid;
            } else {
                return 'Invalid parameters!';
            }

            for($j = 0; $j < count($operation['subConditions']); $j++) {
                $condition = $operation['subConditions'][$j]['dto'];
                $conditionid = (isset($condition['conditionid']) ? $condition['conditionid'] : null);

                if(isset($condition['conditionType']) && isset($condition['conditionValue1'])) {
                    if($condition['conditionType'] == 'TEMP') {
                        if(isset($condition['conditionValue2']) &&
                            isset($condition['conditionValue1']['sensorid']) &&
                            isset($condition['condition'])) {
                                if($conditionid == null) {
                                    $this->addRelayCondition($operationid, $condition['conditionType'],
                                        $condition['condition'], $condition['conditionValue1']['sensorid'],
                                        $condition['conditionValue2']);
                                    $conditionid = $this->db->lastID();
                                } else {
                                    $this->editRelayCondition($conditionid, $operationid,
                                        $condition['conditionType'], $condition['condition'],
                                        $condition['conditionValue1']['sensorid'], $condition['conditionValue2']);
                                }

                                $processedConditions[] = $conditionid;
                        } else {
                            return 'Invalid parameters!';
                        }
                    } else if($condition['conditionType'] == 'RELAY') {
                        if(isset($condition['conditionValue2']) &&
                            isset($condition['conditionValue1']['relayid'])) {
                                if($conditionid == null) {
                                    $this->addRelayCondition($operationid, $condition['conditionType'],
                                        $condition['condition'], $condition['conditionValue1']['relayid'],
                                        $condition['conditionValue2']);
                                    $conditionid = $this->db->lastID();
                                } else {
                                    $this->editRelayCondition($conditionid, $operationid,
                                        $condition['conditionType'], $condition['condition'],
                                        $condition['conditionValue1']['relayid'], $condition['conditionValue2']);
                                }

                                $processedConditions[] = $conditionid;
                        } else {
                            return 'Invalid parameters!';
                        }
                    } else {
                        if(isset($condition['condition'])) {
                            if($conditionid == null) {
                                $this->addRelayCondition($operationid, $condition['conditionType'],
                                    $condition['condition'], $condition['conditionValue1'],
                                    $condition['conditionValue2']);
                                $conditionid = $this->db->lastID();
                            } else {
                                $this->editRelayCondition($conditionid, $operationid, $condition['conditionType'],
                                    $condition['condition'], $condition['conditionValue1'],
                                    $condition['conditionValue2']);
                            }

                            $processedConditions[] = $conditionid;
                        } else {
                            return 'Invalid parameters!';
                        }
                    }
                }
            }
        }

        $this->clearUnusedOperationsAndConditions($processedOperations, $processedConditions);

        return true;

    }

    public function clearUnusedOperationsAndConditions($usedOperations, $usedConditions) {

        $operations = $this->getRelayOperations();
        if(is_array($operations) && count($operations) > 0) {
            foreach($operations as $operation) {
                if(!in_array($operation['operationid'], $usedOperations)) {
                    $this->deleteRelayOperation($operation['operationid']);
                }
            }
        }

        $conditions = $this->getRelayConditions();
        if(is_array($conditions) && count($conditions) > 0) {
            foreach($conditions as $condition) {
                if(!in_array($condition['conditionid'], $usedConditions)) {
                    $this->deleteRelayCondition($condition['conditionid']);
                }
            }
        }

        return true;

    }


}

?>
