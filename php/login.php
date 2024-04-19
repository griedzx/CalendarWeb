<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
  die("连接失败: " . $conn->connect_error);
}

$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
  echo "数据库创建成功";
} else {
  echo "创建数据库错误: " . $conn->error;
}

$conn->select_db($dbname);

$sql = "CREATE TABLE IF NOT EXISTS Users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(30) NOT NULL,
password VARCHAR(30) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
  echo "Users表存在";
} else {
  echo "创建用户表错误: " . $conn->error;
}

//插入测试账户和密码
$sql = "SELECT * FROM Users WHERE username = 'test'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
  // 如果没有找到测试账户，那么插入新的测试账户
  $sql = "INSERT INTO Users (username, password) VALUES ('test', '123456')";

  if ($conn->query($sql) === TRUE) {
    echo "测试账户创建成功";
  } else {
    echo "创建测试账户错误: " . $conn->error;
  }
}

$post_username = $_POST['username'];
$post_password = $_POST['password'];

// 从数据库中检索用户的账号和密码
$sql = "SELECT password FROM Users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $post_username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();


if ($row && $row['password'] == $post_password) {
  echo "登录成功";
  header("Location: /CalendarWeb/calendar.html");
} else {
  echo "登录失败";
}

$conn->close();
?>