<?php

$file = $_GET['file'];

$str = file_get_contents('uploads/'.$file);
$json = json_decode($str, true);

// Get data with groupId 1
$groupOne = array_filter($json['groups'], function($ar) {
                return ($ar['groupId'] == 1);
            });

$output = [];

// interate through peak data
foreach($groupOne[0]['peaks'] as $sample)
{
    $sampleSize = count($sample['eic']['rt']);

    $new_array = [];
    $final_array = [];

    //Map intensity and rt corresponding to index value for 2d array
    $new_array = array_map(function($array1_val,$array2_val){  
                    return [$array1_val, $array2_val];
                },$sample['eic']['rt'],$sample['eic']['intensity']);

    $final_array['name'] = $sample['sampleName'];
    $final_array['data'] = $new_array;

    array_push($output, $final_array);
}

echo json_encode($output);
?>