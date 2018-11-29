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
$xval = rand(300, 1400);
$yval = rand(200, 600);
$sql_select="SELECT COUNT(username) FROM userInfo WHERE username = '$uname'";

$result = $db->query($sql_select);
if (!$result) die("Cannot execute query.");
while($row = $result->fetchArray(SQLITE3_NUM))
{
  //echo($row[0]);
  if($row[0] === 0)
  {

    //echo($xval);
    $queryInsert ="INSERT INTO userInfo(username,xCoord,yCoord)VALUES ('$uname','$xval','$yval')";

  // again we do error checking when we try to execute our SQL statement on the db
	 $ok1 = $db->exec($queryInsert);
  // NOTE:: error messages WILL be sent back to JQUERY success function .....
	if (!$ok1) {
    die("Cannot execute statement.");
    exit;
    }
    //send back success...
  //  echo("insertion complete");

  //  echo($uAmnt);
  //  exit;

  }
  //echo("already taken");
  $uAmnt = "SELECT username,xCoord,yCoord FROM userInfo";
  $result = $db->query($uAmnt);
      if (!$result) die("Cannot execute query.");

      // get a row...
      // MAKE AN ARRAY::
      $res = array();
      $i=0;
      while($row = $result->fetchArray(SQLITE3_ASSOC))
      {
        // note the result from SQL is ALREADy ASSOCIATIVE
        $res[$i] = $row;
        $i++;
      }//end while
      // endcode the resulting array as JSON
      $myJSONObj = json_encode($res);
      echo $myJSONObj;
      exit;

}
 exit;
}//POST
?>
