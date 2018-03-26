//Since global vars often need to be passed as references, they are put into objects, always as a "data"
var github_store = {data: "ayy"};


//code & args are passed to php, after receiving the php data callback is called, option to store data in a variable object.
//request.responseText can also be used inside the callback code.
function call_php(code,args,callback,async=false,storeob=null)
{  
    var request =  (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // XMLHttpRequest instance
  
    request.onload = function() {
            if (storeob != null)
            {
                storeob.data = request.responseText;
            }
            eval(callback);
            
    };
    request.open("GET", "php/phpfunctions.php?f=" + code + "&args=" + args, false, async);
    request.send();
}


function calc_contentgrid()
{
    var num = Math.round((document.body.clientWidth-250)/363);
    document.documentElement.style.setProperty('--col_num_Content', num);
}


function get_header(hlitem)
{
    call_php("get_header",hlitem,"document.write(request.responseText);");
}

function get_footer()
{
    call_php("get_footer","","document.write(request.responseText);");
    update_height();
}


function get_repos()
{

    call_php("get_repos","",'write_callback(github_store.data,"repos_ip")',true, github_store);

}


function write_callback(data,id)
{
    
    var elem = document.getElementById(id);
    elem.innerHTML = data;
    update_height();
    
}


function get_skills()
{  
    call_php("get_skills","",'write_skills(request.responseText);');

}

function write_skills(s)
{
    document.getElementById("skills_ip").innerHTML = s;
    
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