var mail_info = {level: "", active: false, background: null, replaceable: null, mode: "default", name_id: null, subject_id: null, message_id: null, contact_id: null, auth: ""};


document.addEventListener("keydown", function(e) {checkKeyM(e);});


//mini version of original callPhp method to make this mail thing standalone
async function callPhpMail(name,subject,message,contact,mode,auth,callback)
{    
    var request =  (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  // XMLHttpRequest instance
  
    request.onload = function() {
            eval(callback);
            return;
            
    };
    
    
    request.open("GET", mail_info.level + "mail/mail.php?subject=" + subject + "&message=" + message + "&contact=" + contact + "&mode=" + mode + "&name=" + name + "&auth=" + auth + "&agent=" + navigator.userAgent, false);
    request.send();
}


function openMail(mode,level=0)
{

    disableScroll();
    mail_info.active = true;
    mail_info.mode = mode;
    for(var i=0; i< level; i++) {
        
       mail_info.level += "../"
       
    }
    
    var div_blocker = document.createElement("div");
    div_blocker.className = "m_blocker";
    div_blocker.id = "mail-blocker";
    div_blocker.onkeydown = checkKeyM;
    
    //Pass click target to close function
    div_blocker.addEventListener("click", function(e) {closeMail(e);});
    
    mail_info.background = div_blocker;
    
    document.body.appendChild(div_blocker);
    
    var div_content = document.createElement("div");
    div_content.className = "m_content";
    
    
    var div_wrapper = document.createElement("div");
    div_wrapper.className = "m_wrapper";
    mail_info.replaceable = div_wrapper;
    
    var text_name = document.createElement("input");
    text_name.placeholder = "Name";
    mail_info.name_id = text_name;
    
    var text_subject = document.createElement("input");
    text_subject.placeholder = "Subject";
    mail_info.subject_id = text_subject;
    
    var text_contact = document.createElement("input");
    text_contact.placeholder = "Contact E-Mail";
    mail_info.contact_id = text_contact;
    
    var text_message = document.createElement("textarea");
    text_message.placeholder = "Your message";
    text_message.className = "m_bottomspace";
    mail_info.message_id = text_message;
    
    var text_auth = document.createElement("input");
    text_auth.className = "auth";
    text_auth.placeholder = "Authentification";
    mail_info.auth = text_auth;

    var tip = document.createElement("div");
    tip.className = "m_tip";
    tip.innerHTML = "Clicking on the background will close this window.";
    
    var button = document.createElement("div");
    button.className = "m_button";
    button.onclick = function() {sendMail();}
    button.innerHTML = "Pronto!";


    div_wrapper.appendChild(text_name);
    div_wrapper.appendChild(text_contact);
    div_wrapper.appendChild(text_subject);
    div_wrapper.appendChild(text_message);
    div_wrapper.appendChild(tip);
    div_wrapper.appendChild(button);
    div_content.appendChild(div_wrapper);
    div_blocker.appendChild(div_content);
    
    
}


function sendMail() {
    
    var bMailCheck = false;
    
    if (mail_info.contact_id.value != "") {
        if (mail_info.contact_id.value.includes(".") && mail_info.contact_id.value.includes("@")) {
            
            bMailCheck = true;
            
        }
    }
    
    if (!bMailCheck) {
        
        window.confirm("E-Mail Address is invalid!");
        return;
        
    }
    
    
    
    
    //check if all fields are filled out
    if(mail_info.name_id.value != "" && mail_info.subject_id.value != "" && mail_info.message_id.value != "" && bMailCheck) {
        
        callPhpMail(mail_info.name_id.value,mail_info.subject_id.value,mail_info.message_id.value,mail_info.contact_id.value,mail_info.mode.value,mail_info.auth.value,"mailSuccess(request.responseText);");
        
    } else {
        
        window.confirm("Not all required fields are filled out.");
        return;
        
    }
    
    
}


function mailSuccess(text){

    if(text=="1") {
        
        mail_info.replaceable.innerHTML = "Mail sent successfully.<br><br>"; 
        
    } else if (text=="2"){
        
        mail_info.replaceable.innerHTML = "It seems you're sending a lot of mails. If you are a bot, shame on you.<br><br>"; 
        
    } else {
        
        mail_info.replaceable.innerHTML = text+"<br><br>";
        
    }
      
}


function closeMail(e=null,override = false)
{
    //Only close if background is clicked or on override
    if ((e.target == mail_info.background)||override)
    {
        document.getElementById("mail-blocker").remove();
        enableScroll();
        mail_info.active = false;
    }
    
}



function disableScroll()
{
    
    document.body.style.overflow = "hidden";
    
}

function enableScroll()
{
    
    document.body.style.overflow = "auto";
    
}




function checkKeyM(e) {

    if (mail_info.active)
    {

        e = e || window.event;

        if(e.keyCode == '27') {
            closeMail("null",true); 
        }
    }
}
