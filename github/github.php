<?php

include_once '../php/phpfunctions.php';

function run() {
    
    //technically there is no need to do anything with the payload since I just grab the entire user repo list when this method is called
    //but just to make it futureproof:
    $postBody = filter_input(INPUT_post,"payload",FILTER_SANITIZE_STRING);
    $payload = json_decode($postBody);
    
    $event = $payload["X-GitHub-Event"];
    $reactToEvents = ["push","repository"];
    
    if(in_array($event,$reactToEvents)){
        
        updateRepos();
        
    }
    
    
    
}




function updateRepos()
{
    
    $file = dirname( dirname(__FILE__) ).'\\res\\codingprojects_git.json';
    
    $summaries = array();
    
    $opts  = array('http' => array('user_agent' => 'Stwend'));
    
    $context = stream_context_create($opts);
    
    $res = json_decode(file_get_contents("https://api.github.com/users/stwend/repos",false,$context),true);
    
    
    $len = sizeof($res);
    for($i = 0; $i < $len; $i++){
        
        $temp = new Project();
        
        $item = $res[i];
        $langlist = json_decode(file_get_contents($item["languages_url"],false,$context),true);
        
        $temp->name = $item["name"];
        $temp->href = $item["html_url"];
        $temp->languages = implode(', ',array_keys($langlist));
        $temp->description = $item['description'];

        array_push($summaries, $temp);
    }

    file_put_contents ($file , json_encode($summaries));
 
    
}
