/**
 *
 */

var speelVeld = [];
var selected = [];

function initGame(size) {
    initVars(size);
    vulSpeelveld(size);
    // Verder aanvullen....
}

function initVars(size) {
    initSpeelVeld(size);

}

function initSpeelVeld(size) {
    speelVeld = new Array(size);
    for (var row = 0; row < size; row++) {
        speelVeld[row] = new Array(size);
        for (var column = 0; column < size; column++) {
            speelVeld[row][column] = null;
        }
    }
}

function vulSpeelveld(size) {
    getLetter = new nextLetter(size);

    for (var row = 0; row < size; row++) {
        for (var column = 0; column < size; column = column + 2) {
            var actualLetter = getLetter();
            speelVeld[row][column] = actualLetter;
            speelVeld[row][column + 1] = actualLetter;
        }
    }
    // Hier moet de code om het speelveld te vullen met de cellen
    for (var row = 0; row < size; row++) {
        var rowHTML = '<tr>';
        for (var column = 0; column < size; column++) {
            var colHTML = '<td>';
            letter = speelVeld[row][column];
            colHTML += '*';
            colHTML += '</td>';
            rowHTML += colHTML;
        }
        rowHTML += '</tr>';
        $('#speelveld').append(rowHTML);
    }


    $('#speelveld td').click(function () {
        column = this.cellIndex;
        row = this.parentNode.rowIndex;
        this.innerHTML = speelVeld[row][column];
        selected.push(this);

        if (selected.length > 1) {
            if (selected[0].innerHTML === selected[1].innerHTML) {
                selected = [];
            } else {
                time = 2000;
                var interval = setInterval(function () {
                    time = time - 1000;
                    if (time < 0) {
                        clearInterval(interval);
                        selected.forEach(function (t) {
                            t.innerHTML = '*';
                        });
                        selected = [];
                    }
                }, 1000);
            }
        }

    });
}

// TODO rest van de functionaliteit.

// nextLetter wordt gebruikt om één voor één de te gebruiken letters voor de cellen op te halen
var nextLetter = function (size) {
    var letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0, size * size).split('');
    var idx = 0;
    letterArray = shuffle(letterArray);
    return function () {
        var letter = letterArray[idx++];
        return letter;
    }
}

// de functie setColor verandert de kleur van de kaarten (functionaliteit is nog incompleet)
function setColor(stylesheetId) {
    var valueLocation = '#value' + stylesheetId.substring(3);
    console.log(valueLocation);
    var color = $(valueLocation).val();
    $(stylesheetId).css('background-color', '#' + color);
}

// knuth array shuffle
// from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

$(document).ready(function () {
    $("#opnieuw").click(function () {
        initGame($("#size").val());
    });
});
