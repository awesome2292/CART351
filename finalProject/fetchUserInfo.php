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
}
catch(Exception $e)
{
    die($e);
}

//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
$uname= $_POST['u_name'];
$sql_select="SELECT COUNT(username) FROM userInfo WHERE username = '$uname'";
$result = $db->query($sql_select);
if (!$result) die("Cannot execute query.");
while($row = $result->fetchArray(SQLITE3_NUM))
{
  echo($row[0]);
  if($row[0] === 0)
  {
    $queryInsert ="INSERT INTO userInfo(username)VALUES ('$uname')";
    $uAmnt = $_GET["userAmount"];
    $uAmnt = "SELECT userInfo(username)VALUES ('$uname')";
    echo('$uAmnt');

  // again we do error checking when we try to execute our SQL statement on the db
	 $ok1 = $db->exec($queryInsert);
  // NOTE:: error messages WILL be sent back to JQUERY success function .....
	if (!$ok1) {
    die("Cannot execute statement.");
    exit;
    }


    //send back success...
    echo("insertion complete"); //COMMENT OUT
    exit; //COMMENT OUT

  }
  echo("already taken");//COMMENT OUT

}
// DO QUERY NUMBER 2 :: GET ALL USERS

 exit;
}//POST
?>
