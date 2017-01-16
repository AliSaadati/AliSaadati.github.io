var parkingNumber = new Array();
var timeParked = new Array();
var timeVacant = new Array();
var vacant = new Array();

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
window.onload = start;
window.setInterval(changeValues, 5000);
window.setInterval(updateParking, 5000);
$(".spot").click(function () {
    var currentId = parseInt(($(this).attr('id')) - 1);
    if (parseInt(timeParked[currentId]) != 0) {
        $("#parkinginfo").html("Parking spot: " + parkingNumber[currentId] + "<br>" + "Time occupied: " + timeParked[currentId]);
    }
    else {
        $("#parkinginfo").html("Parking spot: " + parkingNumber[currentId] + "<br>" + "Time vacant: " + timeVacant[currentId]);
    }
    if (vacant[currentId]) $("#parkinginfo").append("<br> Currently Vacant")
    else $("#parkinginfo").append("<br> Currently Occupied");
});

function changeValues() {
    timeParked = [];
    timeVacant = [];
    vacant = [];
    for (let i = 0; i < parkingNumber.length; i++) {
        let _vacant = (Math.floor(Math.random() * 2));
        if (_vacant) {
            vacant.push(true);
            timeVacant.push(Math.floor(Math.random() * 10000)).toString();
            timeParked.push("0");
        }
        else {
            vacant.push(false);
            timeVacant.push("0");
            timeParked.push(Math.floor(Math.random() * 10000)).toString();
        }
    }
}

function updateParking() {
    var el;
    for (var i = 1; el = document.getElementById(i); i++) {
        if (vacant[i - 1]) {
            $(el).css({
                'color': 'green'
            });
        }
        else $(el).css({
            'color': 'red'
        });
    }
}

function start() {
    getData();
    updateParking();
}