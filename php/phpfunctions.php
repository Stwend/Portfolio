<?php


$f = filter_input(INPUT_GET,"f",FILTER_SANITIZE_STRING);
$args = filter_input(INPUT_GET,"args",FILTER_SANITIZE_STRING);


$whitelist = ["getProjects","getProject","getRepos","getReposLocal","getSkills","sendMail"];


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


//CLASSES
class ProjectSummary {
    
    public $link = '';
    public $tags = null;
    
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
        $project->tags = get_meta_tags($item.'\\project.html')["descr"];
        
        array_push($projects,$project);
    }
    return json_encode($projects);
}


function getProject($project_id)
{
    
    $ar = array_filter(glob(dirname( dirname(__FILE__) )."\\projects\\*"),"is_dir");

    $path = "";
    
    
    
    foreach ($ar as $item)
    {
        
        $path_temp = $item.'\\project.html';

        
        $tags = get_meta_tags($path_temp);
 
        if ($tags["descr"] == $project_id)
        {
            
            $path = $item;
            break;
            
        }
        
    }
    
    
    $txt = "";
    
    if ($path != "")
    {
        
        $folder_gallery = $path.'\\gallery';
        $file_cfg = json_decode(file_get_contents($path.'\\config.json'),true);
        $video = $file_cfg["video"];
        $software = $file_cfg["software"];
        
        $txt .= '<div class="project_title">'
                .'<div class="project_title_text">'
                .$project_id
                .'</div>'
                .'<div class="project_title_descr">'
                .'<div class="project_title_descr_wrapper">';
                
        if (software != "")
        {
            
            $soft_dict = ["blender"=>"Blender","sdesigner"=>"Substance Designer","spainter"=>"Substance Painter","maya"=>"Autodesk Maya","ue4"=>"Unreal Engine 4","unity"=>"Unity3D","krita"=>"Krita","ink"=>"Inkscape","mari"=>"Mari"];
            
            foreach($software as $s)
            {
                
                $txt .= '<div class="project_title_descr_icon" onmouseover="drawInfoPopupSoft(this);" onmouseout="removeInfoPopup(this);" info_descr = "'.$soft_dict[$s].'" style=\'background-image: url("../../images/sft_'.$s.'.png");\'>'    
                        .'</div>';
                
            }
            
        }
        
        
        $txt .= '</div></div></div>';
        
        
        if(video != "")
        {
            
            $youtube_pre = 'https://img.youtube.com/vi/';   
            
            foreach($video as $v)
            {
                
                $txt .= '<div class="g_elem content_project" info_video="'.$v.'" onclick ="openGallery(this);" style=\'background-image: url("'.$youtube_pre.$v.'/hqdefault.jpg");\'>'
                        .'<div class="project_video_img"></div>'
                        . '</div>';
                
                
                
            }
            
            
        }
        
        

        if(is_dir($folder_gallery))
        {
            
            $images = array_reverse(glob($folder_gallery . "\\*_thumb.jpg"));
            
            foreach($images as $img)
            {
                

                $imgname = array_reverse(explode('\\', $img))[0];
                
                $txt .= '<div class="g_elem content" onclick="openGallery(this)" style=\'background-image: url("gallery/'.$imgname.'");\'></div>';

                
                
            }
            
            
        }
        
        
        
        
        
    }
    
    return $txt;
    
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

            $languages_list = json_decode($langs[$i],true);
            
            $text = $text.'<a target="_blank" href="'.$item['html_url'].'">'
                    . '<div class="content_coding_item">'
                    . '<div class="content_headline">'
                    .$item['name']
                    .'</div>'
                    . '<div class="content_subheadline">'
                    .implode(', ',array_keys($languages_list))
                    .'<div class = "content_description">'
                    .$item['description']
                    .'</div></div></div></a><br>';

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
        
        $text2 = $text2.'<a target="_blank" href="'
                .$item['href']
                .'"><div class="content_coding_item"><div class="content_headline">'
                .$item['name']
                .'</div><div class="content_subheadline">'
                .$item['languages']
                .'<div class = "content_description">'
                .$item['description'].
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