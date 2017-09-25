require("../css/index.css");
require("../css/animation.css");
require("../css/ball.css");
require("../css/select.css");

console.log("hello,world");


const submitBtn = $("#progress-button");
const boySel = $("#boy-sel");
const girlSel = $("#girl-sel");
const webSel = $("#web-sel");
const itSel = $("#it-sel");
const androidSel = $("#android-sel");
const iosSel = $("#ios-sel");
let name_sel_value;
let sex_sel_value;
let class_sel_value, phone_sel_value, qq_sel_value, intro_sel_value;
let team_sel_value;
let allRegData = {};

submitBtn.bind("touchstart", test);


function test() {
    submitBtn.addClass("bounce");
    setTimeout(function() {
        submitBtn.removeClass("bounce");
    }, 1000);
    name_sel_value = $("#reg-name").val();
    class_sel_value = $("#reg-class").val();
    phone_sel_value = $("#reg-phone").val();
    qq_sel_value = $("#reg-qq").val();
    intro_sel_value = $("#reg-intro").val();
    /*
    console.log(name_sel_value);
    console.log(class_sel_value);
    console.log(sex_sel_value);
    console.log(phone_sel_value);
    console.log(qq_sel_value);
    console.log(intro_sel_value);
    console.log(team_sel_value);
    */
    if (name_sel_value && class_sel_value && phone_sel_value && qq_sel_value && intro_sel_value && team_sel_value && sex_sel_value) {
        $("#form-container").addClass("toBlur");
        submitBtn.unbind("touchstart");
        submitBtn.addClass("toBlur");
        $("#waiting-area").removeClass("toHide");
        let ajax = new XMLHttpRequest();
        ajax.open("POST","/api/signup/submit",true);
        ajax.setRequestHeader("Content-type","application/json");
        ajax.onreadystatechange= function() {
            console.log(this.readyState);
            if (this.readyState === 4) {   //Todo
                console.log(this.responseText);
                if (JSON.parse(this.responseText).status === "success") {
                    alert("报名成功！！！请等待短信通知～");
                } else {
                alert("报名失败！！！！！！！！快重新报名！！！");
                }
            }
        };
                allRegData.name = name_sel_value;
                allRegData.sex = sex_sel_value;
                allRegData.class = class_sel_value;
                allRegData.phone = phone_sel_value;
                allRegData.qq = qq_sel_value;
                allRegData.intro = intro_sel_value;
                allRegData.team = team_sel_value;
                //这里要向服务器发送请求。
                ajax.send(JSON.stringify(allRegData));
                console.log(allRegData);


    } else {
        alert("你还有信息没有填写完整哦～");
    }

}


boySel.bind("touchstart", () => select(boySel, "selected") );
girlSel.bind("touchstart", () => select(girlSel,"selected") );
webSel.bind("touchstart",() => select(webSel, "selected") );
androidSel.bind("touchstart",() => select(androidSel, "selected") );
itSel.bind("touchstart",() => select(itSel, "selected") );
iosSel.bind("touchstart",() => select(iosSel, "selected") );


function select(targetSel, className) {
    if (!targetSel.hasClass(className)) {
        targetSel.addClass(className);
        if (targetSel.hasClass("sex-sel")) {
            sex_sel_value = targetSel.attr("data-id");
            console.log(sex_sel_value);
        } else {
            team_sel_value = targetSel.text();
            console.log(team_sel_value);
        }

    }
    if (targetSel.siblings().hasClass(className)) {
        targetSel.siblings().removeClass(className);
    }

 }


window.onload = function() {
    var container = document.getElementById("container");

    var cW = container.offsetWidth;
    var cH = container.offsetHeight;
    var gravity = 3.00;
    var lifespan1 = 100;
    var lifespan2 = 150;
    var ground = .3 * cH;
    var startX;
    var r = 38;
    var speedX;
    var speedYDown = 3;
    var speedYUp = 15;
    var fontSize = 30;
    if (cW > 500) {
        startX = 0.25 * cW;
        speedX = 0.005 * cW;
    } else {
        startX = 0.15 * cW;
        speedX = 0.007 * cW;
    }


    // Ball object
    var Ball = function(sLetter, index) {
        this.sLetter = sLetter;
        this.node;
        this.x = startX;
        this.y = ground - 50;
        this.index = index;
        this.r = r;
        this.jumpN = 0;
        this.speedY = speedYDown;
        this.speedX = speedX;
        this.opa = 1;
        this.create();
    }

    Ball.prototype = {
        create: function() {
            this.node = document.createElement("div");
            this.node.className = "ball";
            this.node.style.width = this.r + "px";
            this.node.style.height = this.r + "px";
            this.node.style.left = this.x + "px";
            this.node.style.top = this.y + "px";
            this.node.innerHTML = this.sLetter;
            container.appendChild(this.node);
            this.node.style.fontSize = fontSize + "px";
        },
        move: function() {
            this.y += this.speedY;
            this.x += this.speedX;

        },
        display: function() {
            //this.node.style.transform = "translate("+ this.x + "px," + this.y + "px)";
            //this.node.style.top = this.y + "px";
            //this.node.style.left = this.x + "px";
            this.node.style.top = this.y / cH * 100 + "%";
            this.node.style.left = this.x / cW * 100 + "%";
        }
    }


    // TextBall object
    var TextBalls = function(sText) {
        this.sText = sText + " ";
        this.n = sText.length + 1;
        this.balls = [];
        this.timeIntv = null;
        this.life = 0;
        this.createBalls();

    }
    TextBalls.prototype = {
        createBalls: function() {
            for (var i = 0; i < this.n; i++) {
                var ball = new Ball(this.sText[i], i);
                this.balls.push(ball);
            }
            this.balls[this.n-1].node.className = "cover";
            this.balls[this.n-1].xTarget = cW;
        },

        move: function() {
            var thisObj = this;
            this.timeIntv = setInterval(function(){
                thisObj.life++;
                if (thisObj.life < lifespan2) {
                    for (var i = 0; i < thisObj.n; i++) {
                        var ball = thisObj.balls[i];
                        if (ball.y < ground) {
                            ball.speedY += gravity;
                        } else {
                            ball.y = ground;
                            if (ball.jumpN < i || i == thisObj.n - 1) {
                                ball.jumpN++;
                                ball.speedY = - speedYUp;
                            } else {
                                ball.speedY = 0;
                                ball.speedX = 0;
                            }
                        }

                        ball.move();
                        ball.display();

                    }
                    if (thisObj.life > lifespan1) {
                        var coverB1 = thisObj.balls[thisObj.n-1];
                        coverB1.opa = coverB1.opa > 0? coverB1.opa-0.025 : 0;
                        coverB1.node.style.opacity = coverB1.opa;

                    }
                }  else {clearInterval(thisObj.timeIntv);}

            }, 50);

        }
    }

    var tb = new TextBalls("WELCOME..");
    tb.move();


}

setTimeout(function() {
    $("#container").addClass("toHide");
    setTimeout(function() {
        $("#reg-page").removeClass("toHide");
    }, 100);
},7000);
