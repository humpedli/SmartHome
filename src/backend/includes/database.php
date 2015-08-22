<?php

class Database {
	
	var $connection;
	var $result;
	var $count;

	public function __construct() {

		$this->connect();

	}

	public function connect() {

		$this->disconnect();
		$this->connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

		if($this->connection->connect_error) {
			throw new Exception('Nem sikerült csatlakozni az adatbázis szerverhez!\n' . $this->connection->connect_error);
			return false;
		}

		$this->connection->query("SET NAMES 'utf8';");

		return true;

	}

	public function secure($data) {

		if(is_array($data)) {
			foreach($data as $key => $val) {
				if(!is_array($val)) {
					$data[$key] = $this->connection->real_escape_string($val);
				}
			}
		} else {
			$data = $this->connection->real_escape_string($data);
		}

		return $data;
	}

	public function query($query) {

		if($this->result = $this->connection->query($query)) {
			if(is_object($this->result)) {
				$this->count = $this->result->num_rows;
			}
			return true;
		} else {
			throw new Exception('Sikertelen adatbázis kérés!\n' . $this->connection->error . " " . $query);
			return false;
		}

	}

	public function result() {
		if($this->count > 0) {
			$data = $this->result->fetch_assoc();
			// convert numeric string to the real type
			foreach ($data as &$val) {
		        if (is_numeric($val)) $val = $val + 0;
		    }
		    return $data;
		} else {
			return false;
		}
	}

	public function results() {
		if($this->count > 0) {
			$ret = array();
			while ($data = $this->result->fetch_assoc()){
				// convert numeric string to the real type
				foreach ($data as &$val) {
			        if (is_numeric($val)) $val = $val + 0;
			    }
	            $ret[] = $data;
	        }
	        return $ret;
		} else {
			return false;
		}
	}

	public function lastID() {

		return $this->connection->insert_id;

	}

	public function numRows() {

		return $this->count;

	}

	public function disconnect() {

		if($this->connection) {
			$this->connection->close();
			$this->connection = null;
		}

	}

	public function __destruct() {

		$this->disconnect();

	}

}

?>