<?php

//CLASSES
class ProjectSummary {
    
    public $link = null;
    public $title = null;
    
}

class Project {
    
    public $title = null;
    public $downloads = array();
    public $description = "";
    public $description_short = "";
    public $software = array();
    public $software_dict = null;
    public $imagelinks = array();
    public $videolinks = array();
}

class RepoSummary {
    
    public $name = "";
    public $href = "";
    public $languages = array();
    public $description = "";
    public $software_dict = null;
    public $isLocal = false;
    
}

?>
