//Since global vars often need to be passed as references, they are put into objects, always as a "data"
var github_store = {data: "ayy"};


//code & args are passed to php, after receiving the php data callback is called, option to store data in a variable object.
//request.responseText can also be used inside the callback code.
function call_php(code,args,callback,storeob=null)
{  
    var request =  (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // XMLHttpRequest instance
  
    request.onload = function() {
            if (storeob != null)
            {
                storeob.data = request.responseText;
            }
            eval(callback);
            
    };
    request.open("GET", "php/phpfunctions.php?f=" + code + "&args=" + args, false);
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
    document.documentElement.style.setProperty('--contentHeight',document.body.scrollHeight-100);
}


function get_repos()
{

    call_php("get_repos","",'document.write(github_store.data);',github_store);

}

function get_skills()
{  
    call_php("get_skills","",'write_skills(request.responseText);');

}

function write_skills(s)
{
    document.getElementById("list_software").innerHTML = "<div class='skills_list_item'><div class='skills_list_item_text'>Maya</div><div class='skills_list_item_stars'>asd</div></div>";
    
}