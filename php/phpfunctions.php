<?php


$f = filter_input(INPUT_GET,"f",FILTER_SANITIZE_STRING);
$args = filter_input(INPUT_GET,"args",FILTER_SANITIZE_STRING);

$whitelist = ["get_projects","get_header","get_footer","get_repos"];
if (in_array($f,$whitelist))
{
    if (function_exists($f))
    {
        echo $f($args);
    } else 
    {
        echo "Function not found.";
    }
}



function get_projects()
{
    $ar = array_filter(glob(dirname( dirname(__FILE__) )."\\projects\\*"),"is_dir");
    $ar2 = array();
    foreach ($ar as $item)
    {
        $ar2[] = basename($item);
    }
    return implode("|",$ar2);
}

function get_header($menu_item){
    
    $pre_item = '<div class="header"><a href="index.html"><div class="title">STEFAN WENDLING</div></a><div class="menu_container"><div class="menu_spacer_left"></div>';
    $post_item =  '<div class="menu_spacer_right"></div>
                <div class="menu_spacer_invis"></div>
                <a target="_blank" href="https://www.artstation.com/stefanwendling"><div class="icon_item" id="icon_artst"></div></a>
                <div class="menu_spacer_invis"></div>
                <a target="_blank" href="https://github.com/Stwend"><div class="icon_item" id="icon_git"></div></a>
                <div class="menu_spacer_invis"></div>
                <a target="_blank" href="https://www.xing.com/profile/Stefan_Wendling4"><div class="icon_item" id="icon_xing"></div></a>
                <div class="menu_spacer_invis"></div>
                <a target="_blank" href="https://www.linkedin.com/in/stefanwendling/"><div class="icon_item" id="icon_linked"></div></a>
                <div class="menu_spacer_invis"></div>
                <a href="mailto:stefan-wendling@web.de"><div class="icon_item" id="icon_mail"></div></a>
                <div class="menu_spacer_invis"></div>
                <div class="menu_spacer_fin"></div>
                </div>
                </div>';
    
    $item = '';
    
    if ($menu_item == 'work')
    {
        $item = '<a href="index.html"><div class="menu_item_active">&nbsp 3D &nbsp</div></a>
                <div class="menu_spacer"></div>
                <a href="experience.html"><div class="menu_item_inactive">&nbsp PROGRAMMING &nbsp</div></a>
                <div class="menu_spacer"></div>
                <a href="about.html"><div class="menu_item_inactive">&nbsp ABOUT &nbsp</div></a>';
        
    } else if ($menu_item == 'exp')
    {
        
        $item = '<a href="index.html"><div class="menu_item_inactive">&nbsp 3D &nbsp</div></a>
                <div class="menu_spacer"></div>
                <a href="experience.html"><div class="menu_item_active">&nbsp PROGRAMMING &nbsp</div></a>
                <div class="menu_spacer"></div>
                <a href="about.html"><div class="menu_item_inactive">&nbsp ABOUT &nbsp</div></a>';
        
    } else
    {
        
        $item = '<a href="index.html"><div class="menu_item_inactive">&nbsp 3D &nbsp</div></a>
                <div class="menu_spacer"></div>
                <a href="experience.html"><div class="menu_item_inactive">&nbsp PROGRAMMING &nbsp</div></a>
                <div class="menu_spacer"></div>
                <a href="about.html"><div class="menu_item_active">&nbsp ABOUT &nbsp</div></a>';
        
    }
    
    
    return $pre_item.$item.$post_item;
    
}






function get_footer(){
    
    
    return '<div class="footer_wrapper">ayy lmao</div>';
    
    
}


function get_repos()
{
    
    $opts  = array('http' => array('user_agent' => 'Stwend'));
    
    $context = stream_context_create($opts);
    
    $res = json_decode(file_get_contents("https://api.github.com/users/stwend/repos",false,$context),true);
    
    $projects = [];
    
    foreach ($res as $project)
    {
        
        $projects[] = $project['name'];
        
    }
    
    return implode(', ',$projects);
    
    
}
