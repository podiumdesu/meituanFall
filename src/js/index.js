require('../css/index.css')
require('../css/common.css')
console.log("hello")


const recordBtn = $("#record-btn");
const submitBtn = $("#submit-btn");
const text = $("#time-record");
const waiting = $("#waiting-area");
const container = $("#container");

let t;
let c = 0;
function timedCount() {
    //console.log("Now it is starting");
    c = c + 1;
    if (c < 10) {
        text.html("00:0"+c);
    } else if (c >= 60 && c < 70) {
        text.html("01:0"+c-60);
    } else {
        text.html("00:"+c);
    }
    t = setTimeout(timedCount, 1000);
}

recordBtn.bind("touchstart",function() {
    //console.log("i am clicked");
    if (recordBtn.hasClass("toRecord") > 0){
        //console.log("This is stoped");
        recordBtn.removeClass("toRecord");
        recordBtn.html("重新录制");
        clearTimeout(t);
    } else {
        c = 0;
        recordBtn.addClass("toRecord");
        recordBtn.html("点击停止");
        timedCount();
    }
});

submitBtn.bind("touchstart",function() {
    if (c === 0) {
        text.html("请录音");
        setTimeout(function() {
            text.html("00:00");
        },2000);
    } else {
        //用户跳过停止，直接点击提交处理
        recordBtn.removeClass("toRecord");
        recordBtn.html("重新录制");
        clearTimeout(t);
        submitBtn.addClass('bounce');
        setTimeout(function () {
            submitBtn.removeClass('bounce');
            waiting.removeClass("toHide");
            $("#text-area").addClass("toFilter");
            recordBtn.attr("disabled","disabled");
            submitBtn.attr("disabled","disabled");
            //解绑事件
            recordBtn.unbind("touchstart");
            submitBtn.unbind("touchstart");
        },1000);
    }

});

