var youtube_pre_img = 'https://img.youtube.com/vi/'; 

document.addEventListener('contextmenu', event => event.preventDefault());






//code & args are passed to php, after receiving the php data callback is called, option to store data in a variable object.
//request.responseText can also be used inside the callback code.
async function callPhp(code,args,callback,file = "php/phpfunctions.php",async=true,storeob=null)
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
        link_prog.href = "programming.html";
        link_about.href = "about.html";
        
    } else 
    {
        
        link_work.href = "../../index.html";
        link_prog.href = "../../programming.html";
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
        
            link_back.href = "../../programming.html";
        
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
    link_mail.href = "";
    //TODO: Mail Popup
    link_mail.onclick = function(){return;}
    
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
    
    var content = document.getElementsByClassName("content_block")[0];
    
    var footer = document.createElement("div");
    
    footer.innerHTML = '<div class="footer_wrapper"><div class="footer_line"></div><div class="footer_content"><div class="noselect footer_copyright">All works (c) //your name// 2018.</div><div class="footer_contact">Contact | Imprint</div></div></div>';
    
    content.parentNode.insertBefore(footer, content.nextSibling);
    
    updateHeight();
}


function drawRepos()
{

    //initialize loader animations
    
    var git = document.getElementById("git_entry");
    var other = document.getElementById("other_entry");
    
    var wrapper = document.createElement("div");
    wrapper.className = "content_loader_wrapper";
    
    var loader = document.createElement("div");
    loader.className = "content_loader";
    
    var text = document.createElement("div");
    text.className = "content_loader_text";
    text.innerHTML = "Fetching repositories...";
    
    wrapper.appendChild(loader);
    wrapper.appendChild(text);
    
    git.appendChild(wrapper);
          
    other.innerHTML = git.innerHTML;
    
    callPhp("getReposLocal","",'buildRepos(request.responseText,"other_entry")',"php/phpfunctions.php");
    callPhp("getRepos","",'buildRepos(request.responseText,"git_entry")',"php/phpfunctions.php");

}


function buildRepos(j,parentID) {

    var parent = document.getElementById(parentID);
    
    if(j == ""){
        
        var wrapper = document.createElement("div");
        wrapper.className = "content_coding_item_error";
        
        var text = document.createElement("div");
        text.className = "content_subheadline";
        text.innerHTML = "No GitHub repositories found.";
        
        wrapper.appendChild(text);
        parent.appendChild(wrapper);
        
        return;
        
    }
    
    parent.innerHTML = "";
    
    var json = JSON.parse(j);
    
    var linktarget = (parentID == "git_entry" ? "_blank" : "_self");
    
    for (var i=0; i<json.length; i++) {
        
        var current = json[i];
        
        var link = document.createElement("a");
        link.href = current["href"];
        link.target = linktarget
        
        var wrapper = document.createElement("div");
        wrapper.className = "content_coding_item";
        
        var headline = document.createElement("div");
        headline.className = "content_headline";
        headline.innerHTML = current["name"];
        
        var subheadline = document.createElement("div");
        subheadline.className = "content_subheadline";
        subheadline.innerHTML = current["languages"];
        
        var descr = document.createElement("div");
        descr.className = "content_description";
        descr.innerHTML = current["description"];
        
        subheadline.appendChild(descr);
        wrapper.appendChild(headline);
        wrapper.appendChild(subheadline);
        link.appendChild(wrapper);
        
        parent.appendChild(link);
 
    }
    
    updateHeight(-200);
    
}



function writeToDocument(data,id,replace = true)
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


function drawSkills()
{  
    callPhp("getSkills","",'buildSkills(request.responseText)',"php/phpfunctions.php");

}


function buildSkills(j)
{
    
    function buildList(parent,items) {

        var temp = null;
        var damp = null;
        
        for (var i=0; i < items.length; i++) {
        
            var current = items[i];

            var wrapper = document.createElement("div");
            wrapper.className = "noselect skills_list_item";

            var text = document.createElement("div");
            text.className = "skills_list_item_text";
            text.innerHTML = current["name"];

            var wrapper_stars = document.createElement("div");
            wrapper_stars.className = "skills_list_item_stars";
                    
            for(var stc=0; stc < current["stars"]; stc++){

                temp = document.createElement("div");
                temp.className = "skills_star";
                wrapper_stars.appendChild(temp);

             }
        
            for(stc=0; stc < 5-current["stars"]; stc++){

               temp = document.createElement("div");
               temp.className = "skills_star";

               damp = document.createElement("div");
               damp.className = "skills_star_dampen";

               temp.appendChild(damp);

               wrapper_stars.appendChild(temp);

            }
            
            
            wrapper.appendChild(text);
            wrapper.appendChild(wrapper_stars);


            if ((current["description"] != "")||(current["related"] != "")){

                temp = document.createElement("div");
                temp.className = "skills_list_item_info";
                temp.onmouseover = function() {drawInfoPopupSkills(this);}
                temp.onmouseout = function() {removeInfoPopup(this);}
                temp.setAttribute("info_descr",current["description"]);
                temp.setAttribute("info_rel",current["related"]);

                wrapper.appendChild(temp);

            }
            parent.appendChild(wrapper); 
        }     
    }
    
    
    var entry = document.getElementById("skills_entry");
    
    var json = JSON.parse(j);
    
    var soft = json["software"];
    var prog = json["programming"];
    
    
    var wrapper_soft = document.createElement("div");
    wrapper_soft.className = "skills_list";
    var soft_title = document.createElement("div");
    soft_title.className = "noselect skills_list_header";
    soft_title.innerHTML = "Software";
    var soft_body = document.createElement("div");
    soft_body.className = "skills_list_body";
    
    wrapper_soft.appendChild(soft_title);
    wrapper_soft.appendChild(soft_body);
    
    
    
    var wrapper_prog = document.createElement("div");
    wrapper_prog.className = "skills_list";
    var prog_title = document.createElement("div");
    prog_title.className = "noselect skills_list_header";
    prog_title.innerHTML = "Programming";
    var prog_body = document.createElement("div");
    prog_body.className = "skills_list_body";
    
    wrapper_prog.appendChild(prog_title);
    wrapper_prog.appendChild(prog_body);
    

    buildList(wrapper_soft,soft);
    buildList(wrapper_prog,prog);
    
    
    entry.append(wrapper_soft);
    entry.append(wrapper_prog);
    
    updateHeight();
    
}


function drawProjects() {
    
    callPhp("getProjects","",'buildProjects(request.responseText)',"php/phpfunctions.php");

}

function buildProjects(j)
{
    
    var json = JSON.parse(j);
    
    var entry = document.getElementById("projects_entry");
    
    for (var i=0; i < json.length; i++) {
        
        var item = json[i];
        
        var rootlink = document.createElement("a");
        rootlink.href = item.link + "/project.html";
        
        
        var root = document.createElement("div");
        root.className = "content";
        root.style.backgroundImage = 'url("' + item.link + '//thumb.jpg")';
        
        var title_wrapper = document.createElement("div");
        title_wrapper.className = "content_title_wrapper";
        
        var title = document.createElement("div");
        title.className = "noselect content_title";
        title.innerHTML = item.title;
        
        title_wrapper.appendChild(title);
        
        root.appendChild(title_wrapper);
        
        rootlink.appendChild(root);
        
        entry.appendChild(rootlink);
           
    }
    

    
    
}




function drawProject()
{
    
    var title = document.getElementsByName('title')[0].getAttribute('content');
    
    
    callPhp("getProject",title,'buildProject(request.responseText)',"../../php/phpfunctions.php");
    
    
    
}

function buildProject(j)
{
    
    var json = JSON.parse(j);
    var entry = document.getElementById("project_entry");
    
    var description = entry.innerHTML;
    entry.innerHTML = "";
    
    
        
    var title = document.createElement("div");
    title.className = "project_title";
    
    var title_text = document.createElement("div");
    title_text.className = "project_title_text";
    title_text.innerHTML = json["title"];
    
    var title_descr = document.createElement("div");
    title_descr.className = "project_title_descr";
    
    var title_descr_wrapper = document.createElement("div");
    title_descr_wrapper.className = "project_title_descr_wrapper";
    
    var temp = null;
    
    for (var i=0; i < json["software"].length; i++) {
        
        var soft_short = json["software"][i];
        var soft = json["software_dict"][soft_short];
        
        temp = document.createElement("div");
        temp.className = "project_title_descr_icon";
        temp.style = 'background-image: url("../../images/sft_' + soft_short +'.png");';  
        temp.setAttribute("info_descr",soft);   
        temp.onmouseover = function() {drawInfoPopupSoft(this);}
        temp.onmouseout = function() {removeInfoPopup(this);}
        
        
        title_descr_wrapper.appendChild(temp);
        
    }
    
    
    
    
    title_descr.appendChild(title_descr_wrapper);
    
    title.appendChild(title_text);
    title.appendChild(title_descr);


    entry.appendChild(title);
    
    if (description.trim() != ""){
        
        temp = document.createElement("div");
        temp.className = "noselect g_elem content content_text";
        
        var inner = document.createElement("div");
        inner.className = "content_paddedText";
        inner.innerHTML = description;
        
        temp.appendChild(inner);
        
        entry.appendChild(temp);
        
    }

    var img = null;
    
    for (var i=0; i < json["videolinks"].length; i++) {
        
        var vid = json["videolinks"][i];
        
        temp = document.createElement("div");
        temp.className = "g_elem content_project";
        temp.style = 'background-image: url("' + youtube_pre_img + vid + '/hqdefault.jpg");';
        temp.setAttribute("info_video",vid);
        temp.onclick = function() {openGallery(this);}
        
        img = document.createElement("div");
        img.className = "project_video_img";
        
        temp.appendChild(img);
        
        entry.appendChild(temp);
        
    }
    
    for (var i=0; i < json["imagelinks"].length; i++) {
        
        var img = json["imagelinks"][i];
        
        temp = document.createElement("div");
        temp.className = "g_elem content";
        temp.style = 'background-image: url("gallery/' + img + '_thumb.jpg");';
        
        temp.onclick = function() {openGallery(this);}
        
        
        entry.appendChild(temp);
        
    }
    
    
    if (json["downloads"].length > 0){
        
        temp = document.createElement("div");
        temp.className = "noselect g_elem content content_download_wrapper";
        
        var current = null;
        var tempdl = null;
        var templink = document.createElement("a");
        var tempdl_c = document.createElement("div");
        tempdl_c.className = "content_download_c";
        var tempdl_icon = document.createElement("div");
        tempdl_icon.className = "download_icon";
        var tempdl_text = document.createElement("div");
        tempdl_text.className = "download_text";
        
        for (var i=0; i < json["downloads"].length; i++) {
            
            current = json["downloads"][i];
            
            tempdl = document.createElement("div");
            tempdl.className = "content_download";
            
            templink.href = "../../php/download.php?download=" + current;
            tempdl.appendChild(templink.cloneNode());
            tempdl.firstChild.appendChild(tempdl_c.cloneNode());
            tempdl.firstChild.firstChild.appendChild(tempdl_icon.cloneNode());
            tempdl_text.innerHTML = current;
            tempdl.firstChild.firstChild.appendChild(tempdl_text.cloneNode(true));
            
            temp.appendChild(tempdl);
            
        }
        
        
        
        
        entry.appendChild(temp);
        
    }
    
    
    updateHeight();
    
}


function drawRepoProject()
{
    
    var title = document.getElementsByName('title')[0].getAttribute('content');
    
    
    callPhp("getRepo",title,'buildProject(request.responseText)',"../../php/phpfunctions.php");
    
    
    
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


function updateHeight(offset= -100)
{
    
    document.documentElement.style.setProperty('--contentHeight',document.body.scrollHeight+offset);
    
}