//Since global vars often need to be passed as references, they are put into objects, always as a "data".
var github_store = {data: "ayy"};
var local_repo_store = {data: "ayy"};
var skills_store = {data: "ayy"};
var projects_store = {data: "ayy"};
var project_store = {data: "ayy"};

document.addEventListener('contextmenu', event => event.preventDefault());


//code & args are passed to php, after receiving the php data callback is called, option to store data in a variable object.
//request.responseText can also be used inside the callback code.
async function callPhp(code,args,callback,file = "php/phpfunctions.php",async=false,storeob=null)
{  
    
    
    var request =  (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // XMLHttpRequest instance
  
    request.onload = function() {
            if (storeob != null)
            {
                storeob.data = request.responseText;   
            }
            eval(callback);
            return;
            
    };
    request.open("GET", file + "?f=" + code + "&args=" + args, async);
    request.send();
}


function calcContentgrid()
{
    var num = Math.round((document.body.clientWidth-250)/363);
    document.documentElement.style.setProperty('--col_num_Content', num);
}


function drawHeader()
{
    
    var insert = document.getElementById("menu_entry");
    var active = parseInt(insert.getAttribute("data-active"));
    
    var link_header = document.createElement("a");
    link_header.href = "index.html";
    
    var div_header = document.createElement("div");
    div_header.className = "header";
    
    var div_title = document.createElement("div");
    div_header.className = "title";
    div_header.innerHTML = "STEFAN WENDLING";
    
    var div_menucontainer = document.createElement("div");
    div_menucontainer.className = "menu_container";
    
    var div_spacer_left = document.createElement("div");
    div_spacer_left.className = "menu_spacer_invis";

    div_menucontainer.appendChild(div_spacer_left);
    
    var link_work = document.createElement("a");
    
    var link_prog = link_work.cloneNode();
    
    var link_about = link_work.cloneNode();
    
    if (active < 3)
    {
        
        div_spacer_left.style.width = "195px";
        link_work.href = "index.html";
        link_prog.href = "experience.html";
        link_about.href = "about.html";
        
    } else 
    {
        
        link_work.href = "../../index.html";
        link_prog.href = "../../experience.html";
        link_about.href = "../../about.html";
        
        div_spacer_left.style.width = "95px";
        
        var div_menu_back = document.createElement("div");
        div_menu_back.className = "menu_item_back";
        div_menu_back.innerHTML = "RETURN";
        
        var link_back = document.createElement("a");
        
        
        if (active == 3)
        {
        
            link_back.href = "../../index.html";
        
        } else if (active == 4)
        {
        
            link_back.href = "../../experience.html";
        
        }
        
        var div_spacer_tiny = document.createElement("div");
        div_spacer_tiny.className = "menu_spacer_invis";
        div_spacer_tiny.style.width = "5px";
        
        
        link_back.appendChild(div_menu_back);
        
        div_menucontainer.appendChild(link_back);
        div_menucontainer.appendChild(div_spacer_tiny);
        
    }
    
    
    
    var div_work = document.createElement("div");
    div_work.className = "menu_item_disabled";
    div_work.innerHTML = "3D";
    
    var div_prog = div_work.cloneNode();
    div_prog.innerHTML = "PROGRAMMING";
    
    var div_about = div_work.cloneNode();
    div_about.innerHTML = "ABOUT";
    
    link_work.appendChild(div_work);
    link_prog.appendChild(div_prog);
    link_about.appendChild(div_about);
    
    if (active == 0)
    {
        
        div_work.className = "menu_item_active";
        
    } else if (active == 1)
    {
        
        div_prog.className = "menu_item_active";
        
    } else if (active == 2)
    {
        
        div_about.className = "menu_item_active";
        
    } else if (active == 3)
    {
        
        div_work.className = "menu_item_active_secondary";
        
    } else if (active == 4)
    {
        
        div_prog.className = "menu_item_active_secondary";
        
    }
    
    var div_spacer_small = document.createElement("div");
    div_spacer_small.className = "menu_spacer";
    div_spacer_small.style.width = "20px";
    
    
    var div_spacer_center = document.createElement("div");
    div_spacer_center.className = "menu_spacer";
    div_spacer_center.style.width = "250px";
    
    
    
    var link_artst = document.createElement("a");
    link_artst.href = "https://www.artstation.com/stefanwendling";
    link_artst.target = "blank";
    
    var link_git = link_artst.cloneNode();
    link_git.href = "https://github.com/Stwend";
    
    var link_xing = link_artst.cloneNode();
    link_xing.href = "https://www.xing.com/profile/Stefan_Wendling4";
    
    var link_lin = link_artst.cloneNode();
    link_lin.href = "https://www.linkedin.com/in/stefanwendling/";
    
    var link_mail = link_artst.cloneNode();
    link_mail.href = "mailto:stefan-wendling@web.de";
    
    var div_artst = document.createElement("div");
    div_artst.className = "icon_item";
    div_artst.id = "icon_artst";
    
    var div_git = div_artst.cloneNode();
    div_git.id = "icon_git";
    
    var div_xing = div_artst.cloneNode();
    div_xing.id = "icon_xing";
    
    var div_lin = div_artst.cloneNode();
    div_lin.id = "icon_linked";
    
    var div_mail = div_artst.cloneNode();
    div_mail.id = "icon_mail";
    
    link_artst.appendChild(div_artst);
    link_git.appendChild(div_git);
    link_xing.appendChild(div_xing);
    link_lin.appendChild(div_lin);
    link_mail.appendChild(div_mail);
    
    var div_spacer_icons = document.createElement("div");
    div_spacer_icons.className = "menu_spacer_invis";
    div_spacer_icons.style.width = "4px";
    
    var div_spacer_right = document.createElement("div");
    div_spacer_right.className = "menu_spacer";
    div_spacer_right.style.flexGrow = "1";
    div_spacer_right.style.marginRight = "80px";
    
    
    
    
    div_header.appendChild(div_title);
    link_header.appendChild(div_header);
    
    
    div_menucontainer.appendChild(link_work);
    div_menucontainer.appendChild(div_spacer_small);
    div_menucontainer.appendChild(link_prog);
    div_menucontainer.appendChild(div_spacer_small.cloneNode());
    div_menucontainer.appendChild(link_about);
    div_menucontainer.appendChild(div_spacer_center);
    div_menucontainer.appendChild(div_spacer_icons);
    div_menucontainer.appendChild(div_spacer_icons.cloneNode());
    div_menucontainer.appendChild(link_artst);
    div_menucontainer.appendChild(div_spacer_icons.cloneNode());
    div_menucontainer.appendChild(link_git);
    div_menucontainer.appendChild(div_spacer_icons.cloneNode());
    div_menucontainer.appendChild(link_xing);
    div_menucontainer.appendChild(div_spacer_icons.cloneNode());
    div_menucontainer.appendChild(link_lin);
    div_menucontainer.appendChild(div_spacer_icons.cloneNode());
    div_menucontainer.appendChild(link_mail);
    div_menucontainer.appendChild(div_spacer_icons.cloneNode());
    div_menucontainer.appendChild(div_spacer_right);

    
    
    
    
    //insert.appendChild(link_header);
    insert.appendChild(div_menucontainer);
    
    
    
}

function drawFooter()
{
    document.write('<div class="footer_wrapper"><div class="footer_line"></div><div class="footer_content"><div class="noselect footer_copyright">All works (c) Stefan Wendling 2018.</div><div class="footer_contact">Contact | Imprint</div></div></div>');
    updateHeight();
}


async function drawRepos()
{

    
    //initialize loader animations
    
    var git = document.getElementById("git_entry");
    var other = document.getElementById("other_entry");
    
    git.innerHTML = '<div class="content_loader_wrapper">' 
                  + '<div class="content_loader"></div>'
                  + '<div class="content_loader_text">Fetching repositories...</div>'  
                  + '</div>';
          
    other.innerHTML = git.innerHTML;
    
    callPhp("getReposLocal","",'writeCallback(local_repo_store.data,"other_entry",true)',"php/phpfunctions.php",true, local_repo_store);
    callPhp("getRepos","",'writeCallback(github_store.data,"git_entry",true)',"php/phpfunctions.php",true, github_store);
    

}


function writeCallback(data,id,replace = true)
{
    
    var elem = document.getElementById(id);
    if (replace)
    {
        elem.innerHTML = data;
    } else
    {
        elem.innerHTML += data;
    }
    
    updateHeight();
    
}


async function drawSkills()
{  
    callPhp("getSkills","",'writeCallback(skills_store.data, "skills_ip", true)',"php/phpfunctions.php",true,skills_store);

}


async function drawProjects()
{
    callPhp("getProjects","",'writeCallback(projects_store.data,"projects_entry",true)',"php/phpfunctions.php",true,projects_store);
    
    
}

async function drawProject()
{
    
    var title = document.getElementsByName('descr')[0].getAttribute('content');
    
    
    callPhp("getProject",title,'writeCallback(project_store.data, "project_entry", true)',"../../php/phpfunctions.php",true,project_store);
    
    
    
}



function drawInfoPopupSkills(obj)
{
    var popup = document.createElement('div');
    popup.className = 'skills_list_item_infowrapper';
    popup.innerHTML = "Did: <div class='skills_info_item_sub'>" + obj.getAttribute("info_descr") + "</div>";
    
    var used = obj.getAttribute("info_rel");
    
    if(used != "")
    {
        
        popup.innerHTML += "<br> Used: <div class='skills_info_item_sub'>" + used + "</div>"
        
    }
    
    obj.appendChild(popup);
    
}

function drawInfoPopupSoft(obj)
{
    var popup = document.createElement('div');
    popup.className = 'software_list_item_infowrapper';
    popup.innerHTML = '<nobr>' + obj.getAttribute("info_descr");
    
    obj.appendChild(popup);
    
}

function drawInfoPopup(obj)
{
    
    var popup = document.createElement('div');
    
    popup.className = 'skills_list_item_infowrapper';
    popup.innerHTML = obj.getAttribute("info_title") + "<div class='skills_info_item_sub'>" + obj.getAttribute("info_descr") + "</div>";
    
    obj.appendChild(popup);
    
}


function removeInfoPopup(obj)
{
    
    obj.innerHTML = "<div style='width:20px;height:20px;'></div>";
    
}


function updateHeight()
{
    
    document.documentElement.style.setProperty('--contentHeight',document.body.scrollHeight-100);
    
}