//Since global vars often need to be passed as references, they are put into objects, always as a "data".
var github_store = {data: "ayy"};
var local_repo_store = {data: "ayy"};
var skills_store = {data: "ayy"};


//code & args are passed to php, after receiving the php data callback is called, option to store data in a variable object.
//request.responseText can also be used inside the callback code.
function call_php(code,args,callback,async=false,storeob=null)
{  
    
    
    var request =  (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // XMLHttpRequest instance
  
    request.onload = function() {
            if (storeob != null)
            {
                storeob.date = new Date();
                storeob.data = request.responseText;   
            }
            eval(callback);
            return;
            
    };
    request.open("GET", "php/phpfunctions.php?f=" + code + "&args=" + args, async);
    request.send();
}


function calc_contentgrid()
{
    var num = Math.round((document.body.clientWidth-250)/363);
    document.documentElement.style.setProperty('--col_num_Content', num);
}


function get_header(hlitem)
{
    //call_php("get_header",hlitem,"document.write(request.responseText);");
    
    
    var pre_item = '<div class="header"><a href="index.html"><div class="title">STEFAN WENDLING</div></a><div class="menu_container"><div class="menu_spacer_left"></div>';
    
    var post_item =  '<div class="menu_spacer_right"></div>'
                +'<div class="menu_spacer_invis"></div>'
                +'<a target="_blank" href="https://www.artstation.com/stefanwendling"><div class="icon_item" id="icon_artst"></div></a>'
                +'<div class="menu_spacer_invis"></div>'
                +'<a target="_blank" href="https://github.com/Stwend"><div class="icon_item" id="icon_git"></div></a>'
                +'<div class="menu_spacer_invis"></div>'
                +'<a target="_blank" href="https://www.xing.com/profile/Stefan_Wendling4"><div class="icon_item" id="icon_xing"></div></a>'
                +'<div class="menu_spacer_invis"></div>'
                +'<a target="_blank" href="https://www.linkedin.com/in/stefanwendling/"><div class="icon_item" id="icon_linked"></div></a>'
                +'<div class="menu_spacer_invis"></div>'
                +'<a href="mailto:stefan-wendling@web.de"><div class="icon_item" id="icon_mail"></div></a>'
                +'<div class="menu_spacer_invis"></div>'
                +'<div class="menu_spacer_fin"></div>'
                +'</div></div>';
    
    var item = '';
    
    if (hlitem == 'work')
    {
        item = '<a href="index.html"><div class="menu_item_active">&nbsp 3D &nbsp</div></a>'
                +'<div class="menu_spacer"></div>'
                +'<a href="experience.html"><div class="menu_item_inactive">&nbsp PROGRAMMING &nbsp</div></a>'
                +'<div class="menu_spacer"></div>'
                +'<a href="about.html"><div class="menu_item_inactive">&nbsp ABOUT &nbsp</div></a>';
        
    } else if (hlitem == 'exp')
    {
        
        item = '<a href="index.html"><div class="menu_item_inactive">&nbsp 3D &nbsp</div></a>'
                +'<div class="menu_spacer"></div>'
                +'<a href="experience.html"><div class="menu_item_active">&nbsp PROGRAMMING &nbsp</div></a>'
                +'<div class="menu_spacer"></div>'
                +'<a href="about.html"><div class="menu_item_inactive">&nbsp ABOUT &nbsp</div></a>';
        
    } else
    {
        
        item = '<a href="index.html"><div class="menu_item_inactive">&nbsp 3D &nbsp</div></a>'
                +'<div class="menu_spacer"></div>'
                +'<a href="experience.html"><div class="menu_item_inactive">&nbsp PROGRAMMING &nbsp</div></a>'
                +'<div class="menu_spacer"></div>'
                +'<a href="about.html"><div class="menu_item_active">&nbsp ABOUT &nbsp</div></a>';
        
    }
    
    
    document.write(pre_item + item + post_item);
    
}

function get_footer()
{
    document.write('<div class="footer_wrapper">ayy lmao</div>');
    update_height();
}


async function get_repos()
{

    
    //initialize loader animations
    
    var git = document.getElementById("git_entry");
    var other = document.getElementById("other_entry");
    
    git.innerHTML = '<div class="content_loader_wrapper">' 
                  + '<div class="content_loader"></div>'
                  + '<div class="content_loader_text">Fetching repositories...</div>'  
                  + '</div>';
          
    other.innerHTML = git.innerHTML;
    
    call_php("get_repos_local","",'write_callback(local_repo_store.data,"other_entry",true)',true, local_repo_store);
    call_php("get_repos","",'write_callback(github_store.data,"git_entry",true)',true, github_store);
    

}


function write_callback(data,id,replace = true)
{
    
    var elem = document.getElementById(id);
    if (replace)
    {
        elem.innerHTML = data;
    } else
    {
        elem.innerHTML += data;
    }
    update_height();
    
}


async function get_skills()
{  
    call_php("get_skills","",'write_callback(skills_store.data, "skills_ip", true)',true,skills_store);

}


function info_popup(obj)
{
    var obj2 = document.createElement('div');
    obj2.className = 'skills_list_item_infowrapper';
    obj2.innerHTML = "Did: <div class='skills_info_item_sub'>" + obj.getAttribute("descr") + "</div>";
    
    var used = obj.getAttribute("rel");
    
    if(used != "")
    {
        
        obj2.innerHTML += "<br> Used: <div class='skills_info_item_sub'>" + used + "</div>"
        
    }
    
    obj.appendChild(obj2);
    
}

function hide_info(obj)
{
    
    obj.innerHTML = "<div style='width:20px;height:20px;'></div>";
    
}


function update_height()
{
    
    document.documentElement.style.setProperty('--contentHeight',document.body.scrollHeight-100);
    
}