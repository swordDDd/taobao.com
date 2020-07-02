<?php
  include('../interface/conn.php');

  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];

  $sql = "select * from user where user_name = '$username' and user_pass = '$password'";

  $res = $mysqli->query($sql);

  $info = $res->fetch_assoc();

  if($res->num_rows>0){
    echo json_encode($info);
  }else{
    echo json_encode(' ');
  }

  $mysqli->close();
?>