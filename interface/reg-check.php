<?php
 include('./conn.php');

 $username = $_REQUEST['username'];
 $password = $_REQUEST['password'];
 $phone = $_REQUEST['phone'];

 $sql = "select * from user where user_name = '$username'";

 $result = $mysqli->query($sql);

 if($result->num_rows>0){ //判断当前用户名是否已经被注册
  echo "用户名重复，请重新注册";
  $mysqli->close();
  die;
 }
 $insertInfo = "insert into user(user_name,user_pass,user_phone)values('$username','$password','$phone')";

 $insertR = $mysqli->query($insertInfo);

 if($insertR){
   echo "注册成功";
 }

 $mysqli->close();

?>