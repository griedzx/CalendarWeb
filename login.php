<?php
// 连接到MySQL数据库
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("连接失败: " . $conn->connect_error);
}

// 从POST请求中获取用户名和密码
$post_username = $_POST['username'];
$post_password = $_POST['password'];

// 从数据库中检索用户的账号和密码
$sql = "SELECT password FROM Users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $post_username);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// 验证密码
if ($row && $row['password'] == $post_password) {
  echo "登录成功";
} else {
  echo "登录失败";
}

$conn->close();
?>