<?php

function sendMail($mode="default", $subject, $message)
{
    
    if (mode=="error")
    {
        $to = "your_error@email.com"; 
    } else if (mode=="default")
    {
        $to = "your_default@mail.com";
    } else 
    {return;}
    
    
    mail($to, $subject, $message);
    
    
}
