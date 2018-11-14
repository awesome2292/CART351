<?php
//connect to database
        class usersOnline {

            var $timeout = 300;
            var $count = 0;
            var $error;
            var $i = 0;

            function usersOnline () {
                $this->timestamp = time();
                $this->ip = $this->ipCheck();
                $this->new_user();
                $this->delete_user();
                $this->count_users();
                }

            function ipCheck() {
                if (getenv('HTTP_CLIENT_IP')) {
                    $ip = getenv('HTTP_CLIENT_IP');
                    }
                elseif (getenv('HTTP_X_FORWARDED_FOR')) {
                    $ip = getenv('HTTP_X_FORWARDED_FOR');
                    }
                elseif (getenv('HTTP_X_FORWARDED')) {
                    $ip = getenv('HTTP_X_FORWARDED');
                    }
                elseif (getenv('HTTP_FORWARDED_FOR')) {
                    $ip = getenv('HTTP_FORWARDED_FOR');
                    }
                elseif (getenv('HTTP_FORWARDED')) {
                    $ip = getenv('HTTP_FORWARDED');
                    }
                else {
                    $ip = $_SERVER['REMOTE_ADDR'];
                    }
                return $ip;
                }
            function new_user() {
                $cekIP = "SELECT ip FROM useronline WHERE ip='$this->ip'";
                $resultCekIp=mysql_query($cekIP);
                $countCekIp=mysql_num_rows($resultCekIp);
                if($countCekIp>0){
                    $insert1 = mysql_query ("UPDATE useronline SET timestamp='$this->timestamp', date=NOW(), ip='', distinct_ip='$this->ip'");
                    if (!$insert1) {
                        $this->error[$this->i] = "Unable to record new visitor\r\n";
                        $this->i ++;
                        }
                    }
                else{
                    $insert2 = mysql_query ("INSERT INTO useronline (timestamp, date, ip, distinct_ip) VALUES ('$this->timestamp',NOW(), '$this->ip', '$this->ip')");
                    if (!$insert2) {
                        $this->error[$this->i] = "Unable to record new visitor\r\n";
                        $this->i ++;
                        }
                    }
                }
            function delete_user() {
                $delete = mysql_query ("DELETE FROM useronline WHERE timestamp < ($this->timestamp - $this->timeout)");
                if (!$delete) {
                    $this->error[$this->i] = "Unable to delete visitors";
                    $this->i ++;
                    }
                }
            function count_users() {
                if (count($this->error) == 0) {
                    $count = mysql_num_rows ( mysql_query("SELECT DISTINCT ip FROM useronline"));
                    return $count;
                    }
                }
            }
        ?>
