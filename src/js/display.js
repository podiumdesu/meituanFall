/**
 * Created by petnakanojo on 06/09/2017.
 */
require('../css/common.css');

var video = document.getElementById('video');
video.addEventListener("touchend",function(){
    video.play();
},false);