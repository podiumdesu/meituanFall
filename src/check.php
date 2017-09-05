<?php
$form = (array)json_decode($HTTP_RAW_POST_DATA);
$req = $form['id'];
if($req == 1){
    if(file_exists('check.www')){
        $sta['status']='no';
    }else{
        $sta['status']='yes';
        touch('check.www');
    }
    echo json_encode($sta);
}else{
    unlink("check.www");
}
?>

