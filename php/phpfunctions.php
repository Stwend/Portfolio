<?php


$f = filter_input(INPUT_GET,"f",FILTER_SANITIZE_STRING);
$args = filter_input(INPUT_GET,"args",FILTER_SANITIZE_STRING);

$whitelist = ["getProjects","getRepos","getReposLocal","getSkills","sendMail"];
if (in_array($f,$whitelist))
{
    if (function_exists($f))
    {
        echo @$f($args);
    } else 
    {
        echo "Function not found.";
    }
}



function getProjects()
{
    $ar = array_filter(glob(dirname( dirname(__FILE__) )."\\projects\\*"),"is_dir");
    $ar2 = array();
    foreach ($ar as $item)
    {
        $ar2[] = basename($item);
    }
    return implode("|",$ar2);
}






//stores the latest repos from Github in a file (formatted to neat HTML) and adds a timestamp. Only accesses GitHub if the last access was more than 1 hour ago.
//file storing/timestamping/updating should be pulled out into a set of generic functions for storage/access, also need to add failsafes (files missing etc).
function getRepos()
{
    
    //resource files
    $file = dirname( dirname(__FILE__) ).'\\res\\repos.store';
    $datefile = dirname( dirname(__FILE__) ).'\\res\\repos.store.date';
    $langfile = dirname( dirname(__FILE__) ).'\\res\\repos.lang.store';
    
    $passed = strtotime(date('Y-m-d H:i:s')) - strtotime(file_get_contents($datefile));
    
    if(($passed/3600)>=1)
    {
        updateRepos();
    }
    
    
    //Get GitHub projects
    $content = json_decode(file_get_contents($file),true);
    $text = "";
    
    $langs = explode('*',file_get_contents($langfile));
    
    if ($content != "")
    {
        $i = 0;
        foreach ($content as $item)
        {
            $name = $item['name'];

            $cont = json_decode($langs[$i],true);

            $lang = implode(', ',array_keys($cont));

            $descr = $item['description'];
            $url = $item['html_url'];
            $text = $text.'<a target="_blank" href="'.$url.'">'
                    . '<div class="content_coding_item">'
                    . '<div class="content_headline">'
                    .$name
                    .'</div>'
                    . '<div class="content_subheadline">'
                    .$lang
                    .'<div class = "content_description">'
                    .$descr
                    .'</div>'
                    . '</div>'
                    . '</div>'
                    . '</a>'
                    . '<br>';

            $i++;

        }
    } else 
    {
        
        $text = $text.'<div class="content_coding_item_error"><div class=content_subheadline>No GitHub repositories found.</div></div>';
        
        
    }
    
    
    
    return $text;
}

function getReposLocal()
{
    
    $othersfile = dirname( dirname(__FILE__) ).'\\res\\codingprojects.store';
    
    $text2 = "";
    
    //Get other projects from JSON file
    $content = json_decode(file_get_contents($othersfile),true);
    
    foreach ($content as $item)
    {
        
        $name = $item['name'];
        
        $lang = $item['languages'];
        
        $descr = $item['description'];
        
        $url = $item['href'];
        
        $text2 = $text2.'<a target="_blank" href="'
                .$url
                .'"><div class="content_coding_item"><div class="content_headline">'
                .$name
                .'</div><div class="content_subheadline">'
                .$lang
                .'<div class = "content_description">'
                .$descr.
                '</div></div></div></a><br>';

    }
    
    
    return $text2;
    
    
}


function updateRepos()
{
    
    $file = dirname( dirname(__FILE__) ).'\\res\\repos.store';
    $langfile = dirname( dirname(__FILE__) ).'\\res\\repos.lang.store';
    $datefile = dirname( dirname(__FILE__) ).'\\res\\repos.store.date';
    
    $opts  = array('http' => array('user_agent' => 'Stwend'));
    
    $context = stream_context_create($opts);
    
    $res = file_get_contents("https://api.github.com/users/stwend/repos",false,$context);
    
    $dec = json_decode($res,true);
    
    $langlist = "";
    
    foreach ($dec as $item)
    {
        
        $langurl = $item['languages_url'];
        $langlist = $langlist.file_get_contents($langurl,false,$context).'*';
   
    }
    

    
    
    
    file_put_contents ($langfile , $langlist);
    file_put_contents ($file , $res);
    file_put_contents ($datefile , date('Y-m-d H:i:s'));
 
    
}


function getSkills()
{
    
    $skillsfile = dirname( dirname(__FILE__) ).'\\res\\skills.store';
    
    $skills = json_decode(file_get_contents($skillsfile),true);
    
    $sk_soft = $skills[0];
    $sk_prog = $skills[1];
    
    $rettext = '<div class="skills_list">'
                .'<div class="skills_list_header">Software</div>'
                .'<div class="skills_list_body">';
    
    
    foreach ($sk_soft as $item)
    {
        $rettext = $rettext.'<div class="skills_list_item"><div class="skills_list_item_text">'.$item["name"].'</div>';
        $rettext = $rettext.'<div class="skills_list_item_stars">';
        
        $numstars = intval($item["stars"]);
        $description = $item["description"];
        $related = $item["related"];
        
        for ($i=0; $i < $numstars; $i++)
        {
            
            $rettext = $rettext.'<div class="skills_star"></div>';
            
        }
        
        for ($i=0; $i < 5-$numstars; $i++)
        {
            
            $rettext = $rettext.'<div class="skills_star"><div class="skills_star_dampen"></div></div>';
            
        }
        
        $rettext = $rettext.'</div>';
        
        if (($description != "")||($related != ""))
        {
            $rettext = $rettext.'<div class="skills_list_item_info" onmouseover="drawInfoPopup(this);" onmouseout="removeInfoPopup(this);" descr = "'.$description.'" rel = "'.$related.'"></div>';
        }
            
        $rettext = $rettext.'</div>';
        
    }
    
    $rettext = $rettext.'</div></div>';
    
    $rettext = $rettext.'<div class="skills_list">'
                .'<div class="skills_list_header">Languages</div>'
                .'<div class="skills_list_body">';
    
    
    foreach ($sk_prog as $item)
    {
        $rettext = $rettext.'<div class="skills_list_item"><div class="skills_list_item_text">'.$item["name"].'</div>';
        $rettext = $rettext.'<div class="skills_list_item_stars">';
        
        $numstars = intval($item["stars"]);
        
        for ($i=0; $i < $numstars; $i++)
        {
            
            $rettext = $rettext.'<div class="skills_star"></div>';
            
        }
        
        for ($i=0; $i < 5-$numstars; $i++)
        {
            
            $rettext = $rettext.'<div class="skills_star"><div class="skills_star_dampen"></div></div>';
            
        }
        
        $rettext = $rettext.'</div><div class="skills_list_item_info" onmouseover="drawInfoPopup(this);" onmouseout="removeInfoPopup(this);" descr = "'.$item["description"].'" rel = "'.$item["related"].'"></div>';
        
        $rettext = $rettext.'</div>';
        
    }
    
    
    
    return $rettext;
    
    
}


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