var embed_youtube = {pre:`<iframe width="1280" height="720" src="https://www.youtube.com/embed/`,post:`?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`}


function openGallery(start_element)
{
    disableScroll();
    var div_blocker = document.createElement("div");
    div_blocker.className = "g_blocker";
    div_blocker.id = "gallery-blocker";
    div_blocker.onclick = closeGallery;
    
    document.body.appendChild(div_blocker);
    
    var div_content = document.createElement("div");
    div_content.className = "g_content";
    
    
    if(start_element.classList.contains("content_project"))
    {
        
        var v_code = start_element.getAttribute("info_video");
        div_content.innerHTML = embed_youtube.pre + v_code + embed_youtube.post;
        
        
    }
    
    div_blocker.appendChild(div_content);
    
    
    
}


function closeGallery()
{
    
    document.getElementById("gallery-blocker").remove();
    enableScroll();
    
}


function disableScroll()
{
    
    document.body.style.overflow = "hidden";
    
}

function enableScroll()
{
    
    document.body.style.overflow = "auto";
    
}