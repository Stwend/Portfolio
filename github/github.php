<?php

include_once '../php/phpfunctions.php';
$secret = 'testing';

$rawPayload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];
$signature_check = 'sha1=' . hash_hmac('sha1',$rawPayload,$secret);

if ($signature_check !== $signature) {
    
    die($signature.' COMPARED TO '.$signature_check);
   
} 

updateRepos();



function updateRepos()
{
    
    $file = realpath('../res/codingprojects_git.json');
    
    $summaries = array();
    
    $opts  = array('http' => array('user_agent' => 'Stwend'));
    
    $context = stream_context_create($opts);
    
    $res = json_decode(file_get_contents("REPLACEME_link_to_your_repos",false,$context),true);
    
    
    $len = sizeof($res);
    for($i = 0; $i < $len; $i++){
        
        $temp = new RepoSummary();
        
        $item = $res[$i];
        $langlist = json_decode(file_get_contents($item["languages_url"],false,$context),true);
        
        $temp->name = $item["name"];
        $temp->href = $item["html_url"];
        $temp->languages = implode(', ',array_keys($langlist));
        $temp->description = $item['description'];

        array_push($summaries, $temp);
    }

    file_put_contents ($file , json_encode($summaries));
 
    
}

?>