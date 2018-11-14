<?php

$files = [];
$dir = 'uploads/';

//Get all files in a directory (ignore "." and "..")
$files = array_values(array_diff(scandir($dir), array('..', '.')));

echo json_encode($files);

?>