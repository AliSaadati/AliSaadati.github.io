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
window.setInterval(updateParking, 500);
window.setInterval(updateTime, 1000);
window.addListeners(hoverSpot);

function addListeners(list) {
    for (var index = 0; index < list.length; index++) {
        (function (i) {
            list[i].addEventListener("click", function () {
                clearInterval(set);
                set = setInterval(function () {
                    var spot = i + 1;
                    var timeV = timeVacant[i];
                    var timeP = timeParked[i];
                    document.querySelector(".display").classList.add("show");
                    document.querySelector("#spotlabel").innerHTML = spot;
                    if (vacant[i] == true) setClock(timeV);
                    else setClock(timeP);
                }, 50);
            }, false);
        })(index);
    }
}


function setClock(time) {
    let onesSeconds = time % 10;
    let tensSeconds = Math.floor((time % 60)/10);
    
    let minutes = (time/60) % 60;
    let onesMinutes = Math.floor(minutes%10);
    let tensMinutes = Math.floor(minutes/10);
    
    let hours = (time/3600) % 24;
    let onesHours = Math.floor(hours%10);
    let tensHours = Math.floor(hours/10);
    
    let days = Math.floor(time / 86400);
    
    document.querySelector(".o-sec").innerHTML = onesSeconds;
    document.querySelector(".t-sec").innerHTML = tensSeconds;
    document.querySelector(".o-min").innerHTML = onesMinutes;
    document.querySelector(".t-min").innerHTML = tensMinutes;
    document.querySelector(".o-hour").innerHTML = onesHours;
    document.querySelector(".t-hour").innerHTML = tensHours;
    document.querySelector(".days").innerHTML = days;

    
}
function changeValues() {
    for (var i = 0; i < 3; i++) {
        var ran = (Math.floor(Math.random() * 20));
        var ranID = ran + 1;
        let _vacant = (Math.floor(Math.random() * 2));
        if (_vacant && timeVacant[ran] == 0) {
//            (function () {
//                document.getElementById(ranID).firstElementChild.classList.add("popup");
//                (function (idd) {
//                    window.setTimeout(function () {
//                        document.getElementById(idd).firstElementChild.classList.remove("popup");
//                    }, 1500);
//                })(ranID);
//            })();
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
            $(el).click(function () {
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
            $(el).click(function () {
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