<?php

//Partly from https://www.abeautifulsite.net/forcing-file-downloads-in-php



$download = filter_input(INPUT_GET,"download",FILTER_SANITIZE_STRING);

$file = glob(dirname( dirname(__FILE__) ))[0].'\\downloads\\'.$download;


if( !file_exists($file) ) {
    die("File not found.");
}

header('Content-Disposition: attachment; filename=' . basename($file));
header("Content-Length: " . filesize($file));
header("Content-Type: application/octet-stream;");
readfile($file);