var pmArray = [];
var selectArray = [];
var history = [];
var colorMap = {};
var historyIndex = 0;
var curId = null;
var isNormal = true;
var isColor = false;
var isSelectMultiple = false;
var drag = false;
var isDeletePms = false;
var isHighlightNums = false;
var isHighlightRcb = false;
var lastNumEntered = "";
var redirect = "check";
var solved = $('#my-data').data().name;
var currentColor = "yellow";
var numbersTable = `
    <table>
        <tr>
            <td><button type="button" class="colors" onclick="tableInput('1')">1</button></td>
            <td><button type="button" class="colors" onclick="tableInput('2')">2</button></td>
            <td><button type="button" class="colors" onclick="tableInput('3')">3</button></td>
        </tr>
        <tr>
            <td><button type="button" class="colors" onclick="tableInput('4')">4</button></td>
            <td><button type="button" class="colors" onclick="tableInput('5')">5</button></td>
            <td><button type="button" class="colors" onclick="tableInput('6')">6</button></td>
        </tr>
        <tr>
            <td><button type="button" class="colors" onclick="tableInput('7')">7</button></td>
            <td><button type="button" class="colors" onclick="tableInput('8')">8</button></td>
            <td><button type="button" class="colors" onclick="tableInput('9')">9</button></td>
        </tr>
    </table>
`;
var colorsTable = `
    <table>
        <tr>
            <td><button type="button" id="lightblue" class="colors" style="background-color: lightblue;" type="button"
                    onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="lightgreen" class="colors" style="background-color: lightgreen;"
                    type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="lightcoral" class="colors" style="background-color: lightcoral;"
                    type="button" onclick="setColor(this.id)"> </button></td>
        </tr>
        <tr>
            <td><button type="button" id="lightpink" class="colors" style="background-color: lightpink;" type="button"
                    onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="#f6f0e8" class="colors"
                    style="background-color: #f6f0e8;" type="button"
                    onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="lightgrey" class="colors" style="background-color: lightgrey;" type="button"
                    onclick="setColor(this.id)"> </button></td>
        </tr>
        <tr>
            <td><button type="button" id="lightsalmon" class="colors" style="background-color: lightsalmon;"
                    type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="lightseagreen" class="colors" style="background-color: lightseagreen;"
                    type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="lightskyblue" class="colors" style="background-color: lightskyblue;"
                    type="button" onclick="setColor(this.id)"> </button></td>
        </tr>
    </table>
`;

function createArray() {
    for (var i = 0; i < 81; i++) {
        pmArray[i] = [];
        selectArray[i] = false;
        colorMap[i] = "";
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
            changeClassName();
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
            if (isNormal && !isColor) {
                changeMode("pencilmarks");
            }
            else if (!isNormal && !isColor) {
                changeMode("colors");
            }
            else if (isColor && !isNormal) {
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
                    if (colorMap[i] == "") {
                        document.getElementById(i).style.backgroundColor = "transparent";
                    }
                    else {
                        document.getElementById(i).style.backgroundColor = colorMap[i];
                    }
                    selectArray[i] = false;
                }
            }
        }
        // Numbers
        else if (48 < e.keyCode && e.keyCode < 58) {
            lastNumEntered = String.fromCharCode(e.keyCode);
        }
        // Control/Command 'A'
        else if ((e.keyCode == 65 && e.ctrlKey) || (e.keyCode == 65 && e.metaKey)) {
            for (var i = 0; i < 81; i++) {
                selectArray[i] = true;
                document.getElementById(i).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
            }
        }
        // Control/Command 'Z'
        else if (((e.keyCode == 90 && e.ctrlKey) || (e.keyCode == 90 && e.metaKey))) {
            undo();
        }

        // If arrow key was pressed
        if (keypressed == true) {
            document.getElementById(nextId).focus();
        }

        if (isNormal && document.getElementById(document.activeElement.id) != null) {
            document.getElementById(document.activeElement.id).select();
        }

        if (document.activeElement.id != null) {
            curId = document.activeElement.id;
        }
    }
);

$(document).keyup(
    function (e) {
        if (e.keyCode == 16) {
            isSelectMultiple = false;
        }
    }
);

$(document).mousedown(
    function () {
        drag = true;
        isSelectMultiple = false;
    }
);

function selectDrag(id) {
    if (drag) {
        isSelectMultiple = true;
        selectArray[document.activeElement.id] = true;
        document.getElementById(document.activeElement.id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";

        curId = id;
        if (!document.getElementById(id).className.includes("readonly") && document.getElementById(curId) != null) {
            document.getElementById(curId).focus();
        }

    }
}

$(document).mouseup(
    function () {
        drag = false;
    }
);

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
        isColor = false;
        document.getElementById("pencilmarks").className = "modefocus";
        document.getElementById("normal").className = "buttons";
        document.getElementById("colors").className = "buttons";

        document.getElementById("tablecontainer").innerHTML = numbersTable;
    }
    else if (id == "colors") {
        isColor = true;
        isNormal = false;
        document.getElementById("colors").className = "modefocus";
        document.getElementById("pencilmarks").className = "buttons";
        document.getElementById("normal").className = "buttons";

        document.getElementById("tablecontainer").innerHTML = colorsTable;
    }
    else {
        isNormal = true;
        isColor = false;
        document.getElementById("pencilmarks").className = "buttons";
        document.getElementById("normal").className = "modefocus";
        document.getElementById("colors").className = "buttons";

        document.getElementById("tablecontainer").innerHTML = numbersTable;
    }
    if (!isColor) {
        changeClassName(id);
    }
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
}

function changeClassName() {
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

function normalInput(id, value) {
    
    if (value == null) {
        pmArray[id] = [];
        document.getElementById(id).className = "txt-input";
        document.getElementById(id).maxLength = 1;
        var isMultiple = false;
        var idValue = document.getElementById(id).value;
        for (var i = 0; i < 81; i++) {
            if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false) {
                isMultiple = true;
                pmArray[id] = [];
                document.getElementById(i).className = "txt-input";
                document.getElementById(i).maxLength = 1;
                document.getElementById(i).value = idValue;
                history[historyIndex] = [i, idValue, "normal"];
                historyIndex++;
            }
        }
        if (isMultiple == false) {
            history[historyIndex] = [id, idValue, "normal"];
            historyIndex++;
        }
    }
    else {
        if (document.getElementById(id).className.includes("readonly") == false) {
            pmArray[id] = [];
            document.getElementById(id).className = "txt-input";
            document.getElementById(id).maxLength = 1;
            document.getElementById(id).value = value;
            history[historyIndex] = [id, value, "normal"];
            historyIndex++;
        }
    }
    if (isDeletePms) {
        deletePms();
    }
    if (isHighlightNums) {
        highlightNums();
    }
}

function addToArray(id, value, isOnInput) {
    if (isOnInput) {
        if (isNormal == false && document.getElementById(id).className != "txt-input") {
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
            normalInput(id, null);
        }
    }
    else {
        if (isNormal == false && document.getElementById(id).className != "txt-input") {
            if (document.getElementById(id).value != null) {
                pmInput(id, document.getElementById(id).value + value);
            }
            else {
                pmInput(id, value);
            }
        }
        else {
            normalInput(id, null);
        }
    }
}

function undo() {
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    if (historyIndex == 0) {
        return;
    }
    historyIndex--;
    var lastChange = history[historyIndex];
    var id = lastChange[0];
    for (var i = historyIndex - 1; i >= 0; i--) {
        if (history[i][0] == id) {
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
    pmArray[id] = [];
    document.getElementById(id).value = "";

}

function validateForm() {
    if (redirect == "clear") {
        return true;
    }
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
    if (isHighlightNums) {
        highlightNums();
    }
    if (isHighlightRcb) {
        highlightRcb();
    }
    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
    }
}

function selectClick(id) {
    curId = id;
    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
    }
    else {
        for (var i = 0; i < 81; i++) {
            if (selectArray[i]) {
                if (colorMap[i] == "") {
                    document.getElementById(i).style.backgroundColor = "transparent";
                }
                else {
                    document.getElementById(i).style.backgroundColor = colorMap[i];
                }
                selectArray[i] = false;
            }
        }
        document.activeElement.focus();
    }
}

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

function tableInput(num) {
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    var isMultiple = false;
    if (!isColor) {
        for (var i = 0; i < 81; i++) {
            if (selectArray[i]) {
                isMultiple = true;
                if (isNormal) {
                    normalInput(i, num);
                }
                else {
                    lastNumEntered = num;
                    pmInput(i, num);
                }
            }
        }
        if (isMultiple == false) {
            if (isNormal) {
                normalInput(document.activeElement.id, num);
            }
            else {
                lastNumEntered = num;
                pmInput(document.activeElement.id, num);
            }
        }
    }
}

function setColor(color) {
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    currentColor = color;
    for (var i = 0; i < 81; i++) {
        if (selectArray[i]) {
            document.getElementById(i).style.backgroundColor = currentColor;
            colorMap[i] = currentColor;
        }
    }
    document.getElementById(document.activeElement.id).style.backgroundColor = currentColor;
    colorMap[document.activeElement.id] = currentColor;
}

function pageRedirect(id) {
    redirect = id;
}


function createConflictArray() {
    var id = parseInt(document.activeElement.id);
    var conflictArray = [];
    for (var i = id - id%9; i < (9-id%9) + id; i++) {
        conflictArray.push(parseInt(i));
    }
    for (var i = 0; i < 81; i++) {
        if (i%9 == id%9) {
            conflictArray.push(parseInt(i));
        }
    }
    var x = parseInt(id / 9);
    var y = id % 9;
    var listMR = [];
    var listMC = [];
    var modR = (x + 1) % 3;
    var modC = (y + 1) % 3;
    if (modR == 0) {
        listMR = [x, x - 1, x - 2];
    }
    else if (modR == 1) {
        listMR = [x, x + 1, x + 2];
    }
    else {
        listMR = [x - 1, x, x + 1];
    }

    if (modC == 0) {
        listMC = [y, y - 1, y - 2];
    }
    else if (modC == 1) {
        listMC = [y, y + 1, y + 2];
    }
    else {
        listMC = [y - 1, y, y + 1];
    }
    for (var i = 0; i < listMR.length; i++) {
        for (var j = 0; j < listMC.length; j++) {
            if (conflictArray.includes(9*listMR[i] + listMC[j]) == false) {
                conflictArray.push(parseInt(9*listMR[i]+listMC[j]));
            }
        }
    }
    return conflictArray;
}

function deletePms() {
    var conflictArray = createConflictArray();
    for (var id = 0; id < conflictArray.length; id++) {
        if (pmArray[conflictArray[id]].includes(lastNumEntered)) {
            pmInput(conflictArray[id], lastNumEntered);
        }
    }
}

function toggleDeletePms() {
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    if (isDeletePms) {
        isDeletePms = false;
        document.getElementById("deletepms").className = "buttons";
    }
    else {
        isDeletePms = true;
        document.getElementById("deletepms").className = "modefocus";
    }
}

function highlightNums() {
    var num = document.activeElement.value;
    for (var i = 0; i < 81; i++) {
        document.getElementById(i).style.filter = "brightness(100%)";
        if (document.getElementById(i).value.includes(num)) {
            if (num != "" && (document.activeElement.className.includes("txt-input") || document.activeElement.className.includes("readonly"))) {
                document.getElementById(i).style.filter = "brightness(85%)";
            }
        }
    }
}

function toggleHighlightNums() {
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    if (isHighlightNums) {
        isHighlightNums = false;
        document.getElementById("highlightnums").className = "buttons";
        for (var i = 0; i < 81; i++) {
            document.getElementById(i).style.filter = "brightness(100%)";
        }
    }
    else {
        isHighlightNums = true;
        document.getElementById("highlightnums").className = "modefocus";
        highlightNums();
    }
}

function highlightRcb() {
    var conflictArray = createConflictArray();
    for (var i = 0; i < 81; i++) {
        document.getElementById(i).style.filter = "brightness(100%)";
    }
    for (var i = 0; i < conflictArray.length; i++) {
        document.getElementById(conflictArray[i]).style.filter = "brightness(85%)";
    }
}

function toggleHighlightRcb() {
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    if (isHighlightRcb) {
        isHighlightRcb = false;
        document.getElementById("highlightrcb").className = "buttons";
        for (var i = 0; i < 81; i++) {
            document.getElementById(i).style.filter = "brightness(100%)";
        }
    }
    else {
        isHighlightRcb = true;
        document.getElementById("highlightrcb").className = "modefocus";
        highlightRcb();
    }
}