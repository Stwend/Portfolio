var embed_youtube = {pre:`<iframe width="1280" height="720" src="https://www.youtube.com/embed/`,post:`?rel=0&amp;showinfo=0;autoplay=1;controls=0;disablekb=1;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`};
var gallery_info = {active: false, current: null, target: null, background: null, arrowL: null, arrowR: null, maxWidth: window.innerWidth-200, maxHeight: window.innerHeight-50};


document.addEventListener("keydown", function(e) {checkKey(e);});


function openGallery(start_element)
{
    disableScroll();
    
    gallery_info.active = true;
    gallery_info.current = start_element;
    
    var div_blocker = document.createElement("div");
    div_blocker.className = "g_blocker";
    div_blocker.id = "gallery-blocker";
    
    //Pass click target to close function
    div_blocker.addEventListener("click", function(e) {closeGallery(e);});
    
    gallery_info.background = div_blocker;
    
    document.body.appendChild(div_blocker);
    
    var div_content = document.createElement("div");
    div_content.className = "g_content";
    
    div_blocker.appendChild(div_content);
    
    gallery_info.target = div_content;
    
    var div_arrowL = document.createElement("div");
    div_arrowL.className = "g_arrowR g_arrowTurn";
    div_arrowL.addEventListener("click", function() {gallerySwitch(gallery_info.current.previousSibling);});
    
    gallery_info.arrowL = div_arrowL;
    
    
    var div_arrowR = document.createElement("div");
    div_arrowR.className = "g_arrowR";
    div_arrowR.addEventListener("click", function() {gallerySwitch(gallery_info.current.nextSibling);});
    
    gallery_info.arrowR = div_arrowR;
    
    div_blocker.appendChild(div_arrowL);
    div_blocker.appendChild(div_arrowR);
    
    
    
    
    
    reloadContent();
    
    
    
    
}


function closeGallery(e,override = false)
{
    //Only close if background is clicked or on override
    if ((e.target == gallery_info.background)||override)
    {
        document.getElementById("gallery-blocker").remove();
        enableScroll();
        gallery_info.active = false;
        gallery_info.current = null;
    }
    
}


function reloadContent()
{
    
    clearTarget();
    
    if(gallery_info.current.classList.contains("content_project"))
    {
        var v_code = gallery_info.current.getAttribute("info_video");
        gallery_info.target.innerHTML = embed_youtube.pre + v_code + embed_youtube.post;
        
        
    } else 
    {
        
        var imagename = grabBGImage(gallery_info.current);
        
        imagename = imagename.slice(0,-10) + ".png";
        
        var img = document.createElement("img");
        img.src = imagename;
        img.style.display = "none";
        
        
        img.onload = function() {
            
            var size = 1;
            
            if (img.width > gallery_info.maxWidth)
            {
                
                size = gallery_info.maxWidth/img.width;
                
            }
            
            
            if (img.height > gallery_info.maxHeight)
            {
                
                size = Math.min(size, gallery_info.maxHeight/img.height);
                
            }
 
            img.width *= size;
            img.style.display = "block";
            
        };
        
        gallery_info.target.appendChild(img);
        
    }
    
    placeArrows();
    
}



function gallerySwitch(elem)
{
    
    if(elem.classList.contains("g_elem"))
    {
        gallery_info.current = elem;
    
        reloadContent();
    }
    
}


function clearTarget()
{
    
    while (gallery_info.target.firstChild) {
    gallery_info.target.removeChild(gallery_info.target.firstChild);
}
    
}

function placeArrows()
{
    
    gallery_info.arrowL.style.display = "none";
    gallery_info.arrowR.style.display = "none";
    
    var next = gallery_info.current.nextSibling;
    var prev = gallery_info.current.previousSibling;
    
    if(next != null && next.classList.contains("g_elem"))
    {
        gallery_info.arrowR.style.display = "block";
         
    }
    
    if(prev != null && prev.classList.contains("g_elem"))
    {
        gallery_info.arrowL.style.display = "block";
         
    }
    
    
    
}


function grabBGImage(elem)
{
    
    var url = elem.style.backgroundImage;
    
    url = url.slice(4, -1).replace(/["']/g, "");
    
    return url;
    
}




function disableScroll()
{
    
    document.body.style.overflow = "hidden";
    
}

function enableScroll()
{
    
    document.body.style.overflow = "auto";
    
}




function checkKey(e) {

    if (gallery_info.active)
    {

        e = e || window.event;

        if(e.keyCode == '37') {
            gallerySwitch(gallery_info.current.previousSibling);
        } else if (e.keyCode == '39') {
            gallerySwitch(gallery_info.current.nextSibling);   
        } else if (e.keyCode == '27') {
            closeGallery("null",true);  
        }
    }
    
}