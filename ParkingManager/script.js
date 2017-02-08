var parkingNumber = new Array();
var timeParked = new Array();
var timeVacant = new Array();
var vacant = new Array();
var set;

function getData() {
    $.ajax({
        async: false
        , url: 'data.json'
        , data: ""
        , accepts: 'application/json'
        , dataType: 'json'
        , success: function (data) {
            var i;
            parkingNumber = [];
            timeParked = [];
            timeVacant = [];
            vacant = [];
            for (i = 0; i < data.length; i++) {
                parkingNumber.push(data[i].number);
                timeParked.push(data[i].timeparked);
                timeVacant.push(data[i].timevacant);
                vacant.push(data[i].vacant);
            }
        }
    });
}
var hoverSpot = document.querySelectorAll(".spot");
window.onload = start;
window.setInterval(changeValues, 3500);
window.setInterval(updateParking, 5000);
window.setInterval(updateTime, 1000);
window.addListeners(hoverSpot);

function addListeners(list) {
    for (var index = 0; index < list.length; index++) {
        (function (i) {
            list[i].addEventListener("mouseover", function () {
                clearInterval(set);
                set = setInterval(function () {
                    var spot = i + 1;
                    var timeV = timeVacant[i];
                    var timeP = timeParked[i];
                    document.querySelector(".display").classList.add("show");
                    document.querySelector("#spotlabel").innerHTML = spot;
                    if (vacant[i] == true) document.querySelector("#time").innerHTML = 'Vacant: ' + timeV;
                    else document.querySelector("#time").innerHTML = 'Parked: ' + timeP;
                }, 50);
            }, false);
        })(index);
    }
}

function changeValues() {
    for (var i = 0; i < 3; i++) {
        var ran = (Math.floor(Math.random() * 10));
        let _vacant = (Math.floor(Math.random() * 2));
        if (_vacant && timeVacant[ran] == 0) {
            (function () {
                console.log(document.getElementById(ran).firstChild);
                document.getElementById(ran).firstChild.innerHTML = "<--- Just Added";
                window.setTimeout(function () {
                    document.getElementById(ran).firstChild.innerHTML = "";
                }, 2000);
            })();
            timeVacant[ran] = 1;
            timeParked[ran] = 0;
            vacant[ran] = true;
        }
        else if (!_vacant && timeParked[ran] == 0) {
            timeVacant[ran] = 0;
            timeParked[ran] = 1;
            vacant[ran] = false;
        }
    }
}

function updateParking() {
    var el;
    for (var i = 1; el = document.getElementById(i); i++) {
        if (vacant[i - 1]) {
            $(el).css({
                'color': 'rgb(0,250,0)'
            });
            $(el).mouseover(function () {
                $(this).css({
                    'color': 'rgb(100,150,250)'
                    , 'font-weight': '800'
                });
            })
            $(el).mouseout(function () {
                $(this).css({
                    'color': 'rgb(0,250,0)'
                    , 'font-weight': '400'
                });
            })
        }
        else {
            $(el).css({
                'color': 'rgb(255,40,40)'
            });
            $(el).mouseover(function () {
                $(this).css({
                    'color': 'rgb(150,15,0)'
                    , 'font-weight': '800'
                });
            })
            $(el).mouseout(function () {
                $(this).css({
                    'color': 'rgb(255,40,40)'
                    , 'font-weight': '400'
                });
            })
        }
    }
}

function updateTime() {
    for (var i in timeParked) {
        if (timeParked[i] > 0) timeParked[i]++;
    }
    for (var i in timeVacant) {
        if (timeVacant[i] > 0) timeVacant[i]++;
    }
}

function start() {
    getData();
    updateParking();
}