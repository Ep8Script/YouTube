<?php
	session_start();
    require_once("connect.php");
	if(!isset($_POST['url']) || !isset($_POST['title'])) {
		http_response_code(403);
		exit();
	}
    $ip = $_SERVER['REMOTE_ADDR'];
	$url = htmlspecialchars($_POST['url'],ENT_QUOTES);
	$title = trim($_POST['title']);
	$title = htmlspecialchars($title,ENT_QUOTES);
	date_default_timezone_set("Australia/Melbourne");
	$time = date("Y-m-d H:i:s");
	if($ip !== "::1") {
		mysqli_query($ytconnect,"INSERT INTO `history` (`ip`,`url`,`title`,`time`) values ('$ip','$url','$title','$time')");
	}
?>