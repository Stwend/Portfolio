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


//stores the latest repos from Github in a file (formatted to neat HTML) and adds a timestamp. Only accesses GitHub if the last access was more than 1 hour ago.
//file storing/timestamping/updating should be pulled out into a set of generic functions for storage/access, also need to add failsafes (files missing etc).
function get_repos()
{
    
    //resource files
    $file = dirname( dirname(__FILE__) ).'\\res\\repos.store';
    $othersfile = dirname( dirname(__FILE__) ).'\\res\\codingprojects.store';
    $datefile = dirname( dirname(__FILE__) ).'\\res\\repos.store.date';
    $langfile = dirname( dirname(__FILE__) ).'\\res\\repos.lang.store';
    
    $passed = strtotime(date('Y-m-d H:i:s')) - strtotime(file_get_contents($datefile));
    
    if(($passed/3600)>=1)
    {
        update_repos();
    }
    
    
    //Get GitHub projects
    $content = json_decode(file_get_contents($file),true);
    $text = '<div class = "content_coding">'
            . '<div class = "content_coding_header_img">'
            . '<img src = "images/git_big.png">'
            . '</div>'
            . '<div class = "content_coding_header">'
            . 'GitHub Projects'
            . '</div>'
            . '<div class = "menu_spacer_submenu">'
            . '</div>';
    
    $langs = explode('*',file_get_contents($langfile));
    
    
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
    
    $text2 = '<div class = "content_coding">'
            . '<div class = "content_coding_header_img">'
            . '<img src = "images/coding_other_big.png">'
            . '</div>'
            . '<div class = "content_coding_header">'
            . 'Other Projects'
            . '</div>'
            . '<div class = "menu_spacer_submenu">'
            . '</div>';
    
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
    
    
    
    
    $text= $text.'</div><br><br><br>'.$text2.'</div><br><br><br>';
    
    return $text;
}


function update_repos()
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
