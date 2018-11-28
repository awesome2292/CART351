<?php

class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('db/smallUniverse.db');
      }
   }

try
{
   $db = new MyDB();
   echo ("Opened or created data base successfully<br \>");
   $theQuery = 'CREATE TABLE userInfo (smID INTEGER PRIMARY KEY NOT NULL, username TEXT, xCoord INTEGER, yCoord INTEGER, name TEXT, favColor TEXT)';
   $ok = $db ->exec($theQuery);
	// make sure the query executed
	if (!$ok)
	die($db->lastErrorMsg());
	// if everything executed error less we will arrive at this statement
	echo "Table userInfo created successfully<br \>";
}
catch(Exception $e)
{
   die($e);
}
?>
