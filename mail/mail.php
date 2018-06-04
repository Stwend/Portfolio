<?php

$subject = filter_input(INPUT_GET,"subject",FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_GET,"message",FILTER_SANITIZE_STRING);
$contact = filter_input(INPUT_GET,"contact",FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_GET,"name",FILTER_SANITIZE_STRING);
$mode = filter_input(INPUT_GET,"mode",FILTER_SANITIZE_STRING);

function sendMail($s, $m, $mo)
{
    
    if ($mo=="error")
    {
        $to = "your_error@email.com"; 
    } else if ($mo=="default")
    {
        $to = "your_default@email.com";
    } else 
    {return;}
    

    
    mail($to, $s, $m, "From: info@yourdomain.de");
    
    
}

sendMail($subject,"From: ".$name." (".$contact.")\n\n\n".$message,$mode);
