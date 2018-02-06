var games = 0;
var sum = 0;
var num = 0;
var target = 0;
var gameOver = false;

var gameInformation = [
    {
        sum: 0,
        target: 2,
        num: 2,
        prompt: "欢迎来到数学游戏!点击按钮即可操作",
        button: [{x:1,y:1,html:"+1"},],
        names: [],
    },
    {
        sum: 0,
        target: 10,
        num: 5,
        prompt: "试试看，你一定可以成功的!",
        button: [{x:1,y:1,html:"+3"},{x:1,y:2,html:"-2"},],
        names: [],
    },
    {
        sum: 0,
        target: -1,
        num: 2,
        prompt: "试试看负数:",
        button: [{x:1,y:1,html:"-2"},{x:1,y:2,html:"+1"},],
        names: [],
    },
    {
        sum: 1,
        target: 2048,
        num: 5,
        prompt: "试试乘除法:",
        button: [{x:1,y:1,html:"X8"},{x:1,y:2,html:"/2"},],
        names: [],
    },
    {
        sum: 0,
        target: 13,
        num: 6,
        prompt: "综合练习1:",
        button: [{x:0,y:0,html:"X2"},{x:0,y:1,html:"+2"},{x:0,y:2,html:"-1"},{x:1,y:1,html:"+1"},],
        names: [],
    },
    {
        sum: 0,
        target: -100,
        num: 6,
        prompt: "综合练习2:",
        button: [{x:0,y:0,html:"X-2"},{x:0,y:1,html:"+2"},{x:0,y:2,html:"-1"},{x:1,y:1,html:"-5"},],
        names: [],
    },
    {
        sum: 0,
        target: 13,
        num: 4,
        prompt: "终极测试:",
        button: [{x:0,y:0,html:"X2"},{x:0,y:1,html:"-2"},{x:0,y:2,html:"-1"},{x:1,y:0,html:"+5"},{x:1,y:1,html:"/5"},{x:1,y:2,html:"+5"},{x:2,y:0,html:"+100"},{x:2,y:1,html:"/16384"},{x:2,y:2,html:"*0"},],
        names: [],
    },
];

for (var i = 0 ; i < gameInformation.length ; i++){
    var obj = gameInformation[i];
    for (var j = 0 ; j < obj.button.length ; j++){
        obj.names[j] = "button-" + obj.button[j].x + "-" + obj.button[j].y;
    }
    gameInformation[i] = obj;
}

setTimeout(function () {
    $("#start").fadeOut(0);
    $("#game").fadeIn(1000);

    gamesL();

},1000);

$(".button").click(function (e) {
    e.preventDefault();
    if (gameOver){
        return;
    }

    var str = $(this).html();
    // console.log(str);
    if (str !== ""){
        num--;
        var char = str.substring(0,1);
        if (char === "+"){
            sum += Number(str.substring(1));
        } else if (char === "-"){
            sum -= Number(str.substring(1));
        } else if (char === "X"){
            sum *= Number(str.substring(1));
        } else if (char === "/"){
            sum /= Number(str.substring(1));
        }
        update();
    }
});

function update() {
    $("#showSum").html(sum);
    if (parseInt(sum.toString(10).length / 4) !== 0){
        $("#showSum").css({
            "font-size": (150 / sum.toString(10).length) + parseInt(sum.toString(10).length / 4) * 10 + "px",
            "margin-top": (150 - ((150 / sum.toString(10).length) + parseInt(sum.toString(10).length / 4) * 10)) - 50 + "px"
        });
    }
    $("#n").html(num);
    $("#s").html(target);

    setTimeout(function () {
        if (sum === target){
            for (var i = 0 ; i < 5 ; i++){
                for (var j = 0 ; j < 3 ; j++){
                    var dom = $("#button-" + i + "-" + j);
                    dom.removeClass("numButton");
                    dom.addClass("nanButton");
                    dom.html("");
                }
            }
            games++;
            gamesL();
        } else if (num <= 0 && sum !== target){
            $("#showSum").html("结束");
            setTimeout(function () {
                gamesL();
            },1000);
        }
    },2000);
}

function gamesL() {
    if (games > (gameInformation.length - 1)){
        $("#showSum").html("胜利");
        for (var i = 0 ; i < 5 ; i++){
            for (var j = 0 ; j < 3 ; j++){
                $("#button-" + i + "-" + j).html("恭喜");
                $("#button-" + i + "-" + j).removeClass("nanButton");
                $("#button-" + i + "-" + j).addClass("numButton");
            }
        }
        gameOver = true;
        $("#prompt").html("恭喜通关！谢谢支持!");
        return;
    }
    $("#showSum").css({
        "font-size": "120px",
        "margin-top": "0px"
    });

    for (var i = 0 ; i < 5 ; i++){
        for (var j = 0 ; j < 3 ; j++){
            var dom = $("#button-" + i + "-" + j);
            if (dom.html() === "结束"){
                $("#showSum").html("");
            }
        }
    }

    var buttons = [];
    for (var i = 0 ; i < gameInformation[games].names.length ; i++){
        buttons[i] = $("#" + gameInformation[games].names[i]);

        buttons[i].removeClass("nanButton");
        buttons[i].addClass("numButton");
        buttons[i].html(gameInformation[games].button[i].html);
    }

    num = gameInformation[games].num;
    sum = gameInformation[games].sum;
    target = gameInformation[games].target;

    $("#prompt").html(gameInformation[games].prompt);
    $("#games").html(games + 1);

    update();
}