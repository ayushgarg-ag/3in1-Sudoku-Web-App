var pmArray = [];
var selectArray = [];
var isNormal = true;
var isSelectMultiple = false;
var lastNumEntered = "";
var history = [];
var historyIndex = 0;

function createArray() {
    for (var i = 0; i < 81; i++) {
        pmArray[i] = [];
        selectArray[i] = false;
    }
}

$(document).keydown(
    function (e) {
        var keypressed = false;

        // Delete
        if (e.keyCode == 8) {
            document.getElementById(document.activeElement.id).value = [];
            pmArray[document.activeElement.id] = [];
            for (var i = 0; i < 81; i++) {
                if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false) {
                    document.getElementById(i).value = [];
                    pmArray[i] = [];
                }
            }
        }
        // Right Arrow
        else if (e.keyCode == 39) {
            currentId = document.activeElement.id;
            if (currentId != 80) {
                nextId = parseInt(currentId) + 1;
            }
            keypressed = true;
        }
        // Left arrow
        else if (e.keyCode == 37) {
            currentId = document.activeElement.id;
            if (currentId != 0) {
                nextId = parseInt(currentId) - 1;
            }
            keypressed = true;
        }
        // Down arrow
        else if (e.keyCode == 40) {
            currentId = document.activeElement.id;
            if (currentId < 72) {
                nextId = parseInt(currentId) + 9;
            }
            else if (currentId != 80) {
                nextId = parseInt(currentId) - 71;
            }
            keypressed = true;
        }
        // Up arrow
        else if (e.keyCode == 38) {
            currentId = document.activeElement.id;
            if (currentId > 8) {
                nextId = parseInt(currentId) - 9;
            }
            else if (currentId != 0) {
                nextId = parseInt(currentId) + 71;
            }
            keypressed = true;
        }
        // Space bar
        else if (e.keyCode == 32) {
            if (isNormal) {
                changeMode("pencilmarks");
            }
            else {
                changeMode("normal");
            }
        }
        // Shift
        else if (e.keyCode == 16) {
            isSelectMultiple = true;
            selectArray[document.activeElement.id] = true;
            if (document.activeElement.id != "pencilmarks") {
                document.getElementById(document.activeElement.id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
            }
        }
        // Escape
        else if (e.keyCode == 27) {
            isSelectMultiple = false;

            for (var i = 0; i < 81; i++) {
                if (selectArray[i]) {
                    document.getElementById(i).style.backgroundColor = "transparent";
                    selectArray[i] = false;
                }
            }
        }
        else if (48 < e.keyCode && e.keyCode < 58) {
            lastNumEntered = String.fromCharCode(e.keyCode);
        }

        if (keypressed === true) {
            document.getElementById(nextId).focus();
            // document.getElementById(document.activeElement.id).select();
        }
        if (isNormal && document.getElementById(document.activeElement.id) != null) {
            document.getElementById(document.activeElement.id).select();
        }
    }
);

$(document).keyup(
    function (e) {

        console.log("History: " + history[historyIndex - 1]);

        if (e.keyCode == 16) {
            isSelectMultiple = false;
        }
    }
);

var solved = $('#my-data').data().name;

function checkAlert() {
    if (solved == "True") {
        window.alert("You successfully finished the sudoku!");
    }
    else {
        window.alert("Your answer is incorrect. The errors have been highlighted red.")
    }
}

function changeMode(id) {
    if (id == "pencilmarks") {
        isNormal = false;
        document.getElementById("pencilmarks").className = "modefocus";
        document.getElementById("normal").className = "buttons";
    }
    else {
        isNormal = true;
        document.getElementById("pencilmarks").className = "buttons";
        document.getElementById("normal").className = "modefocus";
    }

    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (((document.getElementById(i * 9 + j)).className != "txt-input readonly")
                && (document.getElementById(i * 9 + j).value == "")) {
                if (isNormal) {
                    document.getElementById(i * 9 + j).className = "txt-input";
                    if (document.getElementById(i * 9 + j).className != "pm-input") {
                        document.getElementById(i * 9 + j).maxLength = 1;
                    }
                }
                else {
                    document.getElementById(i * 9 + j).className = "pm-input";
                    if (document.getElementById(i * 9 + j).className != "txt-input") {
                        document.getElementById(i * 9 + j).maxLength = 10;
                    }
                }
            }
        }
    }
}

function delPmArrayInput(id, diff) {
    var pmCellArray = pmArray[id].concat(diff);
    var firstIndex = pmCellArray.indexOf(pmCellArray[pmCellArray.length - 1]);
    if (pmArray[id].includes(diff)) {
        pmCellArray.pop();
        pmCellArray.splice(firstIndex, 1);
    }
    return pmCellArray;
}

function sortAndWriteCellValue(id, pmCellArray) {
    if (pmCellArray.length == 0) {
        document.getElementById(id).value = "";
        pmArray[id] = pmCellArray;
    }
    else {
        pmArray[id] = pmCellArray;
        pmCellArray.sort();
        var idValue = "";
        for (i = 0; i < pmCellArray.length; i++) {
            idValue += pmCellArray[i];
        }
        document.getElementById(id).value = idValue;
    }
}

function pmInput(id, value) {
    var prevPmCellArray = pmArray[id];
    var nums = value.split("");
    var pmCellArray = prevPmCellArray.concat(lastNumEntered);

    if (nums.length == 0) {
        pmCellArray = [];
    }
    // deleting from pmCellArray
    if (pmCellArray.length != 0) {
        pmCellArray = delPmArrayInput(id, lastNumEntered);
    }
    // sort and write
    sortAndWriteCellValue(id, pmCellArray);

    // add to undo stack
    idValue = pmCellArray.join("");

    history[historyIndex] = [id, idValue, "pencilmarks"];
    historyIndex++;

    return lastNumEntered;
}

function normalInput(id) {
    pmArray[id] = [];
    document.getElementById(id).className = "txt-input";
    document.getElementById(id).maxLength = 1;
    var idValue = document.getElementById(id).value;
    for (var i = 0; i < 81; i++) {
        if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false) {
            pmArray[id] = [];
            document.getElementById(i).className = "txt-input";
            document.getElementById(i).maxLength = 1;
            document.getElementById(i).value = idValue;
        }
    }
    history[historyIndex] = [id, idValue, "normal"];
    historyIndex++;
}

function addToArray(id, value, isOnInput) {
    if (isOnInput) {
        if (isNormal === false && document.getElementById(id).className != "txt-input") {
            pmInput(id, value);

            // recursive step
            for (var i = 0; i < 81; i++) {
                if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false && document.getElementById(i).className.includes("txt-input") == false) {
                    if (i != id) {
                        addToArray(i, lastNumEntered, false);
                    }
                }
            }
        }
        else {
            // debugger;
            normalInput(id);
        }
    }
    else {
        if (isNormal === false && document.getElementById(id).className != "txt-input") {
            if (document.getElementById(id).value != null) {
                pmInput(id, document.getElementById(id).value + value);
            }
            else {
                pmInput(id, value);
            }
        }
        else {
            normalInput(id);
        }
    }
}

function undo() {
    if (historyIndex == 0) {
        return;
    }
    historyIndex--;
    history.length--;
    var lastChange = history[historyIndex];
    var id = lastChange[0];
    for (var i = historyIndex - 1; i >= 0; i--) {
        if (history[i][0] == id) {
            console.log(history[i][2]);
            if (history[i][2] == "normal") {
                document.getElementById(id).className = "txt-input";
                if (document.getElementById(id).className != "pm-input") {
                    document.getElementById(id).maxLength = 1;
                }
            }
            else {
                document.getElementById(id).className = "pm-input";
                if (document.getElementById(id).className != "txt-input") {
                    document.getElementById(id).maxLength = 10;
                }
            }
        document.getElementById(id).value = history[i][1];
        pmArray[id] = [];
        return;
        }
    }
    document.getElementById(id).value = "";
    console.log("index: " + historyIndex);
}

function validateForm() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (document.getElementById(i * 9 + j).className.includes("pm-input")) {
                alert("You cannot check since there are still pencilmarks on the board.");
                return false;
            }
            else if (document.getElementById(i * 9 + j).value == "") {
                alert("You cannot check since there are still empty spaces on the board.");
                return false;
            }
        }
    }
    return true;
}

function selectFocus(id) {
    if (isSelectMultiple) {
        selectArray[id] = true;

        document.getElementById(id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
    }
}

function selectClick(id) {
    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
    }
    else {
        for (var i = 0; i < 81; i++) {
            if (selectArray[i]) {
                document.getElementById(i).style.backgroundColor = "transparent";
                selectArray[i] = false;
            }
        }
        document.activeElement.focus();
    }
}

var solved = $('#my-data').data().name;

function checkAlert() {
    if (solved != "None") {
        if (solved == "True") {
            window.alert("You successfully finished the sudoku!");
        }
        else {
            window.alert("Your answer is incorrect.")
        }
    }
}