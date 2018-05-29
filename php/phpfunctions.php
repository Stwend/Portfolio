<?php


include_once 'storage.php';

$f = filter_input(INPUT_GET,"f",FILTER_SANITIZE_STRING);
$args = filter_input(INPUT_GET,"args",FILTER_SANITIZE_STRING);


$whitelist = ["getProjects","getProject","getRepos","getReposLocal","getRepo","getSkills","sendMail"];


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
    $ar = array_reverse($ar);
    
    $projects = array();
    
    
    foreach ($ar as $item)
    {
        
        $project = new ProjectSummary();
        $project->link = 'projects'.explode("/projects", str_replace("\\", "/", $item))[1];
        $project->title = get_meta_tags($item.'\\project.html')["title"];
        
        array_push($projects,$project);
    }
    return json_encode($projects);
}







function getProject($project_id){
    
    return grabJSON($project_id,"projects");
    
}

function getRepo($project_id){
    
    return grabJSON($project_id,"codeprojects");
    
}



function grabJSON($project_id,$subfolder)
{
    $ar = array_filter(glob(dirname( dirname(__FILE__) )."\\".$subfolder."\\*"),"is_dir");

    $path = "";
    $tags = "";

    foreach ($ar as $item)
    {
        $path_temp = $item.'\\project.html';

        $tags = get_meta_tags($path_temp)["title"];
 
        if ($tags == $project_id)
        { 
            $path = $item;
            break;
        }
    }
    
    if ($path != "")
    {
        $tags = get_meta_tags($path_temp);
        $project = new Project();
        $project->title = $tags["title"];
        
        
        $folder_gallery = $path.'\\gallery';
        $softwarelist = json_decode(file_get_contents(dirname( dirname(__FILE__) ).'\\res\\softwarelist.json'),true);
        
        $project->software_dict = $softwarelist;
        
        $project->description = $tags["description"];
        $project->description_short = $tags["descr"];
        
        
        
        $video = json_decode($tags["video"],true);
        $software = json_decode($tags["software"],true);
        $downloads = json_decode($tags["downloads"],true);

            
        foreach($software as $s){
                
            array_push($project->software, $s);
   
        }
        
        foreach($video as $v){
                
            array_push($project->videolinks, $v);        
        }
            
        foreach($downloads as $d){
                
            array_push($project->downloads, $d);
                
        }

        
        

        if(is_dir($folder_gallery))
        { 
            $images = array_reverse(glob($folder_gallery . "\\*_thumb.jpg"));
            
            foreach($images as $img)
            {
                $imgname = substr(array_reverse(explode('\\', $img))[0],0,-10);
                array_push($project->imagelinks, $imgname);  
            }
            
            
        }
    
    }
    
    return json_encode($project); 
}





//stores the latest repos from Github in a file (formatted to neat HTML) and adds a timestamp. Only accesses GitHub if the last access was more than 1 hour ago.
//file storing/timestamping/updating should be pulled out into a set of generic functions for storage/access, also need to add failsafes (files missing etc).
function getRepos()
{  
    return file_get_contents(dirname( dirname(__FILE__) ).'\\res\\codingprojects_git.json');
}

function getReposLocal()
{
    $ar = array_filter(glob(dirname( dirname(__FILE__) )."\\codeprojects\\*"),"is_dir");
    $ar = array_reverse($ar);
    
    $projects = array();
    
    
    foreach ($ar as $item)
    {
        $project = new RepoSummary();
        $project->href = 'codeprojects'.explode("/codeprojects", str_replace("\\", "/", $item))[1]."/project.html";
        $meta = get_meta_tags($item.'\\project.html');
        $project->name = $meta["title"];
        $project->description = $meta["descr"];
        $project->languages = json_decode($meta["software"],true);
        
        array_push($projects,$project);
    }
    return json_encode($projects);
}


function getSkills()
{
    
    $skillsfile = dirname( dirname(__FILE__) ).'\\res\\skills.json';
    
    return file_get_contents($skillsfile);
    
    $skills = json_decode(file_get_contents($skillsfile),true);
    
    $sk_soft = $skills[0];
    $sk_prog = $skills[1];
    
    $rettext = '<div class="skills_list">'
                .'<div class="noselect skills_list_header">Software</div>'
                .'<div class="skills_list_body">';
    
    
    foreach ($sk_soft as $item)
    {
        $rettext = $rettext.'<div class="noselect skills_list_item"><div class="skills_list_item_text">'.$item["name"].'</div>';
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
            $rettext = $rettext.'<div class="skills_list_item_info" onmouseover="drawInfoPopupSkills(this);" onmouseout="removeInfoPopup(this);" info_descr = "'.$description.'" info_rel = "'.$related.'"></div>';
        }
            
        $rettext = $rettext.'</div>';
        
    }
    
    $rettext = $rettext.'</div></div>';
    
    $rettext = $rettext.'<div class="skills_list">'
                .'<div class="noselect skills_list_header">Languages</div>'
                .'<div class="skills_list_body">';
    
    
    foreach ($sk_prog as $item)
    {
        $rettext = $rettext.'<div class="noselect skills_list_item"><div class="skills_list_item_text">'.$item["name"].'</div>';
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
        
        $rettext = $rettext.'</div><div class="skills_list_item_info" onmouseover="drawInfoPopupSkills(this);" onmouseout="removeInfoPopup(this);" info_descr = "'.$item["description"].'" info_rel = "'.$item["related"].'"></div>';
        
        $rettext = $rettext.'</div>';
        
    }
    
    
    
    return $rettext;
    
    
}