<?php

// Check if the form was submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Check if file was uploaded without errors
    if(isset($_FILES["file"]) && $_FILES["file"]["error"] == 0){
        $filename = $_FILES["file"]["name"];
        $filetype = $_FILES["file"]["type"];
        $filesize = $_FILES["file"]["size"];
        
        // Verify file size - 5MB maximum
        $maxsize = 5 * 1024 * 1024;
        if($filesize > $maxsize) die("Error: File size is larger than the allowed limit.");
    
        if(file_exists("uploads/" . $filename)){
            echo $filename . " is already exists.";
        } else{
            move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $filename);
            echo "Your file was uploaded successfully.";
        } 
    } else{
        echo "Error: " . $_FILES["file"]["error"];
    }
}
?>