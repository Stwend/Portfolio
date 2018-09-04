<?php

$subject = filter_input(INPUT_GET,"subject",FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_GET,"message",FILTER_SANITIZE_STRING);
$contact = filter_input(INPUT_GET,"contact",FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_GET,"name",FILTER_SANITIZE_STRING);
$mode = filter_input(INPUT_GET,"mode",FILTER_SANITIZE_STRING);
$userAgent = md5(filter_input(INPUT_GET,"agent",FILTER_SANITIZE_STRING));
$auth = filter_input(INPUT_GET,"auth",FILTER_SANITIZE_STRING);


if($auth != ""){die();}


$visitor_ip = md5($_SERVER['REMOTE_ADDR']);

$cooldownTime = 300;


function loadVisitors(){
    
    $visfile = realpath('../res/visitors.dat');
    return json_decode(file_get_contents($visfile),true);
    
}

function saveVisitors($j) {
    
    $visfile = realpath('../res/visitors.dat');
    file_put_contents($visfile,json_encode($j));
    
}


function sendMail($s, $m, $mo)
{

    $headers = 'From: REPLACEME_your_maildaemon';
    
    if ($mo=="error")
    {
        $to = "REPLACEME_your_error_address"; 
    } else if ($mo=="default")
    {
        $to = "REPLACEME_your_default_address";
    } else 
    {
        $to = "REPLACEME_your_fallback_address";
    }

    mail($to, $s, $m, $headers);
    
    
}



$visitors = loadVisitors();
$found = false;
$currentTime = time();
$toDelete = [];
$loop = count($visitors);

    
for ($i = 0; $i < $loop; $i++){

    $currentVisitor = $visitors{$i};

    if($currentVisitor[0] == $visitor_ip && $currentVisitor[1] == $userAgent){

        if (($currentTime - $currentVisitor[2]) < $cooldownTime) {

            $found = true;

        }
        
        array_push($toDelete, $i);
    }    
}



$toDelete = array_reverse($toDelete);

foreach($toDelete as $currentIndex){

    unset($visitors[$currentIndex]);

}


$temp = [$visitor_ip,$userAgent,$currentTime];
array_push($visitors,$temp);
$visitors = array_values($visitors);
saveVisitors($visitors);


if($found){
    
    echo "2";
    die();
    
    
} else {

    sendMail($subject,"From: ".$name." (".$contact.")\n\n\n".$message,$mode);
    echo "1";
    die();
    
}

?>