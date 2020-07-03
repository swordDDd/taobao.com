<?php
  include('./conn.php');

  $id = $_REQUEST['id'];

  $sql = "select * from product where pro_id = '$id' ";

  $res = $mysqli->query($sql);

  $temp = $res->fetch_assoc();

  $json = json_encode($temp);

  echo $json;

  $mysqli->close();
?>