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
var isShift = false;
var showInstructions = true;
var showAbout = true;
var lastNumEntered = "";
var redirect = "check";
var root = document.documentElement;
var solved = $('#my-data').data().name;
var currentColor = "yellow";

var color1 = root.style.getPropertyValue('--color1');
var color2 = root.style.getPropertyValue('--color2');
var color3 = root.style.getPropertyValue('--color3');
var color4 = root.style.getPropertyValue('--color4');
var color5 = root.style.getPropertyValue('--color5');
var color6 = root.style.getPropertyValue('--color6');
var color7 = root.style.getPropertyValue('--color7');
var color8 = root.style.getPropertyValue('--color8');
var color9 = root.style.getPropertyValue('--color9');

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
            <td><button type="button" id="color1" class="colors" type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="color2" class="colors" style="background-color: color2;" type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="color3" class="colors" style="background-color: color3;" type="button" onclick="setColor(this.id)"> </button></td>
        </tr>
        <tr>
            <td><button type="button" id="color4" class="colors" style="background-color: color4;" type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="color5" class="colors" tyle="background-color: color5;" type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="color6" class="colors" style="background-color: color6;" type="button" onclick="setColor(this.id)"> </button></td>
        </tr>
        <tr>
            <td><button type="button" id="color7" class="colors" style="background-color: color7;" type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="color8" class="colors" style="background-color: color8;" type="button" onclick="setColor(this.id)"> </button></td>
            <td><button type="button" id="color9" class="colors" style="background-color: color9;" type="button" onclick="setColor(this.id)"> </button></td>
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

        if (isColor && e.keyCode >= 49 && e.keyCode <= 57) {
            var inter = "color" + (e.keyCode - 48).toString();
            for (var i = 0; i < 81; i++) {
                if (selectArray[i]) {
                    currentColor = root.style.getPropertyValue('--' + inter);
                    colorMap[i] = currentColor;
                    document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--'+inter);
                }
            }
            document.getElementById(document.activeElement.id).style.backgroundColor = root.style.getPropertyValue('--'+inter);
            e.preventDefault();
        }
        if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81) {
            // Delete
            if (e.keyCode == 8 && document.activeElement.id != "") {
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
            
            // Numbers
            else if (48 < e.keyCode && e.keyCode < 58) {
                lastNumEntered = String.fromCharCode(e.keyCode);
                if (document.getElementById(document.activeElement.id).className.includes("readonly") == false) {
                    addToArray(document.activeElement.id);
                }
                for (var i = 0; i < 81; i++) {
                    if (selectArray[i] && i != document.activeElement.id && document.getElementById(i).className.includes("readonly") == false) {
                        console.log(i);
                        addToArray(i);
                    }
                }
            }

            // Shift
            else if (e.keyCode == 16) {
                document.getElementById("shiftIndication").style.backgroundColor = root.style.getPropertyValue('--shiftIndication');

                isSelectMultiple = true;
                selectArray[document.activeElement.id] = true;
                if (document.activeElement.id != "pencilmarks") {
                    document.getElementById(document.activeElement.id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
                }
                isShift = true;
            }

            if (document.activeElement.id != null) {
                curId = document.activeElement.id;
            }
        }

        // Escape
        if (e.keyCode == 27) {
            isShift = false;
            isSelectMultiple = false;
            document.getElementById("shiftIndication").style = "background-color: none";

            for (var i = 0; i < 81; i++) {
                if (selectArray[i]) {
                    if (colorMap[i] == "") {
                        document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');
                    }
                    else {
                        document.getElementById(i).style.backgroundColor = colorMap[i];
                    }
                    selectArray[i] = false;
                }
            }
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
        // Control/Command 'Z'
        else if (((e.keyCode == 90 && e.ctrlKey) || (e.keyCode == 90 && e.metaKey))) {
            undo();
        }
        
        // Control/Command 'A'
        else if ((e.keyCode == 65 && e.ctrlKey) || (e.keyCode == 65 && e.metaKey)) {
            document.getElementById("shiftIndication").style.backgroundColor = root.style.getPropertyValue('--shiftIndication');
            for (var i = 0; i < 81; i++) {
                selectArray[i] = true;
                document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
            }
        }
        
        // If arrow key was pressed
        if (keypressed == true && document.activeElement.id != "") {
            document.getElementById(nextId).focus();
        }

        if (isNormal && document.getElementById(document.activeElement.id) != null) {
            document.getElementById(document.activeElement.id).select();
        }
    }
        
);


$(document).keyup(
    function (e) {
        if (e.keyCode == 16) {
            isSelectMultiple = false;
            isShift = false;
        }
        else if (e.keycode == 32) { }
    }
);


$(document).mousedown(
    function () {
        if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81 && !isShift) {
            drag = true;
            isSelectMultiple = false;
        }
    }
);

function selectDrag(id) {
    if (drag && document.activeElement.id != "" && id != null) {
        document.getElementById("shiftIndication").style.backgroundColor = root.style.getPropertyValue('--shiftIndication');
        isSelectMultiple = true;
        selectArray[document.activeElement.id] = true;
        document.getElementById(document.activeElement.id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');

        curId = id;
        if (document.getElementById(curId) != null) {
            document.getElementById(curId).focus();
        }

    }
}

$(document).mouseup(
    function () {
        drag = false;
    }
);


function changeMode(id) {
    if (id == "pencilmarks") {
        isNormal = false;
        isColor = false;
        document.getElementById("pencilmarks").className = "modefocus";
        document.getElementById("normal").className = "modedivs";
        document.getElementById("colors").className = "modedivs";

        document.getElementById("tablecontainer").innerHTML = numbersTable;
        
    }
    else if (id == "colors") {
        isColor = true;
        isNormal = false;
        document.getElementById("colors").className = "modefocus";
        document.getElementById("pencilmarks").className = "modedivs";
        document.getElementById("normal").className = "modedivs";

        document.getElementById("tablecontainer").innerHTML = colorsTable;
        document.getElementById("color1").style.backgroundColor = root.style.getPropertyValue("--color1");
        document.getElementById("color2").style.backgroundColor = root.style.getPropertyValue("--color2");
        document.getElementById("color3").style.backgroundColor = root.style.getPropertyValue("--color3");
        document.getElementById("color4").style.backgroundColor = root.style.getPropertyValue("--color4");
        document.getElementById("color5").style.backgroundColor = root.style.getPropertyValue("--color5");
        document.getElementById("color6").style.backgroundColor = root.style.getPropertyValue("--color6");
        document.getElementById("color7").style.backgroundColor = root.style.getPropertyValue("--color7");
        document.getElementById("color8").style.backgroundColor = root.style.getPropertyValue("--color8");
        document.getElementById("color9").style.backgroundColor = root.style.getPropertyValue("--color9");        
    }
    else {
        isNormal = true;
        isColor = false;
        document.getElementById("pencilmarks").className = "modedivs";
        document.getElementById("normal").className = "modefocus";
        document.getElementById("colors").className = "modedivs";

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
    var firstIndex = pmCellArray.indexOf(diff);
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

function pmInput(id) {
    var prevPmCellArray = pmArray[id];
    var pmCellArray = prevPmCellArray.concat(lastNumEntered);

    // if (prevPmCellArray.length == 0) {
    //     pmCellArray = [];
    // }
    // deleting from pmCellArray
    if (pmCellArray.length != 0) {
    pmCellArray = delPmArrayInput(id, lastNumEntered);
    }
    // sort and write
    sortAndWriteCellValue(id, pmCellArray);

    // add to undo stack
    var idValue = pmCellArray.join("");

    history[historyIndex] = [id, idValue, "pencilmarks"];
    historyIndex++;
}

function normalInput(id) {
    pmArray[id] = [];
    document.getElementById(id).className = "txt-input";
    document.getElementById(id).maxLength = 1;
    document.getElementById(id).value = lastNumEntered;
    history[historyIndex] = [id, lastNumEntered, "normal"];
    historyIndex++;
    if (isDeletePms) {
        deletePms();
    }
    if (isHighlightNums) {
        highlightNums();
    }
}

function addToArray(id) {
    if (!isColor){
        if (isNormal == false && document.getElementById(id).className != "txt-input") {
            pmInput(id);
        }
        else if (isNormal == true) {
            normalInput(id);
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
    // if (redirect == "clear") {
    //     return true;
    // }
    var isStillEmpty = false;
    var isStillPm = false;
    if (document.activeElement.id != null) {
        curId = document.activeElement.id;
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (document.getElementById(i * 9 + j).value == "") {
                isStillEmpty = true;
            }
            else if (document.getElementById(i * 9 + j).className.includes("pm-input")) {
                isStillPm = true;
            }
        }
    }
    if (isStillEmpty) {
        // alert("You cannot check since there are still empty spaces on the board.");
        document.getElementById("checkoverlay").innerHTML = `
        <div id="checkcenter">
        You cannot check since there are still empty spaces on the board.
        <br>
        <div onclick="
        document.getElementById('checkoverlay').style.display = 'none';
        document.getElementById('grid-container').style.display = 'grid';
        " class="optiondivs" id="close">Close</div>
        </div>
        `;
        document.getElementById("checkoverlay").style.display = "block";
        document.getElementById("grid-container").style.display = "none";
        return false;
    }
    else if (isStillPm) {
        // alert("You cannot check since there are still pencilmarks on the board.");
        document.getElementById("checkoverlay").innerHTML = `
        <div id="checkcenter">
        You cannot check since there are still pencilmarks on the board.
        <br>
        <div onclick="
        document.getElementById('checkoverlay').style.display = 'none';
        document.getElementById('grid-container').style.display = 'grid';
        " class="optiondivs" id="close">Close</div>
        </div>
        `;
        document.getElementById("checkoverlay").style.display = "block";
        document.getElementById("grid-container").style.display = "none";
        return false;
    }
    return true;
}

function selectFocus(id) {
    curId = id;
    if (isHighlightRcb) {
        highlightRcb();
    }
    if (isHighlightNums) {
        highlightNums();
    }

    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
    }
}

function selectClick(id) {
    curId = id;
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
    }
    else {
        for (var i = 0; i < 81; i++) {
            if (selectArray[i]) {
                if (colorMap[i] == "") {
                    document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');
                }
                else {
                    document.getElementById(i).style.backgroundColor = colorMap[i];
                }
                selectArray[i] = false;
            }
        }
        document.activeElement.focus();
        document.getElementById("shiftIndication").style = "background-color: none";
        isShift = false;
    }
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    // document.activeElement.select();
}

function tableInput(num) {
    
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    lastNumEntered = num;
    if (document.getElementById(document.activeElement.id).className.includes("readonly") == false) {
        addToArray(document.activeElement.id);
    }
    for (var i = 0; i < 81; i++) {
        if (selectArray[i] && i != document.activeElement.id && document.getElementById(i).className.includes("readonly") == false) {
            addToArray(i);
        }
    }
}

function checkAlert() {
    if (solved != "None") {
        if (solved == "True") {
            document.getElementById("checkoverlay").innerHTML = `
                <div id="checkcenter">
                You successfully finished the sudoku!
                <br>
                <div onclick="
                document.getElementById('checkoverlay').style.display = 'none';
                document.getElementById('grid-container').style.display = 'grid';
                " class="optiondivs" id="close">Close</div>
                </div>
                `;
            document.getElementById("checkoverlay").style.display = "block";
            document.getElementById("grid-container").style.display = "none";
        }
        else {
            document.getElementById("checkoverlay").innerHTML = `
                <div id="checkcenter">
                Your answer is incorrect. The errors have been highlighted red.
                <br>
                <div onclick="
                document.getElementById('checkoverlay').style.display = 'none';
                document.getElementById('grid-container').style.display = 'grid';
                " class="optiondivs" id="close">Close</div>
                </div>
                `;
            document.getElementById("checkoverlay").style.display = "block";
            document.getElementById("grid-container").style.display = "none";
        }
    }
}





function pageRedirect(id) {
    redirect = id;
}

function createConflictArray() {
    if (isNaN(document.activeElement.id)) {
        return [];
    }
    var id = parseInt(document.activeElement.id);
    var conflictArray = [];
    for (var i = id - id % 9; i < (9 - id % 9) + id; i++) {
        conflictArray.push(parseInt(i));
    }
    for (var i = 0; i < 81; i++) {
        if (i % 9 == id % 9) {
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
            if (conflictArray.includes(9 * listMR[i] + listMC[j]) == false) {
                conflictArray.push(parseInt(9 * listMR[i] + listMC[j]));
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
    // debugger;
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    if (isDeletePms) {
        isDeletePms = false;
        document.getElementById("deletepms").className = "optiondivs";
    }
    else {
        isDeletePms = true;
        document.getElementById("deletepms").className = "focusdivs";
    }
}

function highlightNums() {
    var conflictArray = []
    if (isHighlightRcb) {
        conflictArray = createConflictArray();
    }
    var num = document.activeElement.value;
    for (var i = 0; i < 81; i++) {
        if (conflictArray.includes(i) == false) {
            document.getElementById(i).style.filter = "brightness(100%)";
            
        }
        if (document.getElementById(i).value.includes(num)) {
            if (num != "" && (document.activeElement.className.includes("txt-input") || document.activeElement.className.includes("readonly"))) {
                document.getElementById(i).style.filter = root.style.getPropertyValue('--highlightOpacity');
                
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
        document.getElementById("highlightnums").className = "optiondivs";
        for (var i = 0; i < 81; i++) {
            document.getElementById(i).style.filter = "brightness(100%)";
        }
        if (isHighlightRcb) {
            highlightRcb();
        }
    }
    else {
        isHighlightNums = true;
        document.getElementById("highlightnums").className = "focusdivs";
        highlightNums();
    }
}

function highlightRcb() {
    var conflictArray = createConflictArray();
    for (var i = 0; i < 81; i++) {
        document.getElementById(i).style.filter = "brightness(100%)";
    }
    for (var i = 0; i < conflictArray.length; i++) {
        document.getElementById(conflictArray[i]).style.filter = root.style.getPropertyValue('--highlightOpacity');
    }
    if (isHighlightNums) {
        highlightNums();
    }
}

function toggleHighlightRcb() {
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    if (isHighlightRcb) {
        isHighlightRcb = false;
        document.getElementById("highlightrcb").className = "optiondivs";
        for (var i = 0; i < 81; i++) {
            document.getElementById(i).style.filter = "brightness(100%)";
        }
        if (isHighlightNums) {
            highlightNums();
        }
    }
    else {
        isHighlightRcb = true;
        document.getElementById("highlightrcb").className = "focusdivs";
        highlightRcb();
    }
}


function restart() {
    for (var i = 0; i < 81; i++) {
        selectArray[i] = true;
        document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
    }

    document.getElementById(document.activeElement.id).value = [];
    pmArray[document.activeElement.id] = [];
    for (var i = 0; i < 81; i++) {
        if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false) {
            document.getElementById(i).value = [];
            pmArray[i] = [];
        }
    }
    changeClassName();

    isSelectMultiple = false;
    for (var i = 0; i < 81; i++) {
        if (selectArray[i]) {
            if (colorMap[i] == "") {
                document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');
            }
            else {
                document.getElementById(i).style.backgroundColor = colorMap[i];
            }
            selectArray[i] = false;
        }
        document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');
    }
    history = [];
    historyIndex = 0;

    document.getElementById("shiftIndication").style = "background-color: none";
    isShift = false;
}

function revertChangeTheme() {
    document.getElementById("changetheme").innerHTML = `
    <div id="themebutton" onclick="themeOption()">Change Theme</div>`;
}

function themeOption() {
    document.getElementById("changetheme").innerHTML = `
    <div id="themescontainer">
    <div class="themes" id="dark" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    <div class="themes" id="tan" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    <div class="themes" id="light" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    <div class="themes" id="retro" onclick="window.localStorage.setItem('storedTheme', this.id); changeTheme(); revertChangeTheme()"></div>
    </div>
    `;
}

function changeTheme() {
    let root = document.documentElement;

    var oldThemeColorMap = {};
    for (var i = 0; i < 81; i++) {
        if (colorMap[i] != "" && colorMap[i] != undefined && colorMap[i] != null) {
            for (var j = 1; j < 10; j++) {
                var val = root.style.getPropertyValue('--color' + j);
                if (val.includes(colorMap[i])) {
                    oldThemeColorMap[i] = "color" + j;
                    break;
                }
                else {
                    oldThemeColorMap[i] = "";
                }
            }
        }
    }

    var themeid = window.localStorage.getItem("storedTheme");

    document.getElementById("shiftIndication").style = "background-color: none";
    
    if (themeid == "tan") {
        root.style.setProperty('--primaryColor', "#d2b48c");
        root.style.setProperty('--itemBackground', "#f6f0e8");
        root.style.setProperty('--textColor', "#a87b00");
        root.style.setProperty('--readOnlyColor', "#533e2d");
        root.style.setProperty('--tableColor', "#ac8048");
        root.style.setProperty('--headerColor', "#ffffff");
        root.style.setProperty('--tableItemBackground', "#f6f0e8");
        root.style.setProperty('--buttonBackground', "#f6f0e8");
        root.style.setProperty('--buttonText', "#a87b00");
        root.style.setProperty('--shiftColor', "#fce17a");
        root.style.setProperty('--messageTextColor', "#533e2d");
        root.style.setProperty('--focusText', "#f6f0e8");
        root.style.setProperty('--highlightOpacity', "brightness(90%)");
        root.style.setProperty('--shiftIndication', "#533e2d");
        root.style.setProperty('--linkColor', "white");

        root.style.setProperty('--color1', "#FFCCCC");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeTan.png)";

        window.localStorage.setItem("storedTheme", "tan");

    }
    else if (themeid == "dark") {
        root.style.setProperty('--primaryColor', "#1b262c");
        root.style.setProperty('--itemBackground', "#226897");
        root.style.setProperty('--textColor', "#bbe1fa");
        root.style.setProperty('--readOnlyColor', "#000000");
        root.style.setProperty('--tableColor', "#3282b8");
        root.style.setProperty('--headerColor', "#3282b8");
        root.style.setProperty('--tableItemBackground', "#a1c4db");
        root.style.setProperty('--buttonBackground', "#305a75");
        root.style.setProperty('--buttonText', "#bbe1fa");
        root.style.setProperty('--shiftColor', "#6f818a");
        root.style.setProperty('--messageTextColor', "#bbe1fa");
        root.style.setProperty('--focusText', "#226897");
        root.style.setProperty('--highlightOpacity', "brightness(75%)");
        root.style.setProperty('--shiftIndication', "#bbe1fa");
        root.style.setProperty('--linkColor', "orange");

        root.style.setProperty('--color1', "#990000");
        root.style.setProperty('--color2', "#CC6600");
        root.style.setProperty('--color3', "#009900");
        root.style.setProperty('--color4', "#009999");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "darkslategrey");
        root.style.setProperty('--color7', "mediumpurple");
        root.style.setProperty('--color8', "#999900");
        root.style.setProperty('--color9', "#CC0066");

        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeDark.png)";

        window.localStorage.setItem("storedTheme", "dark");
    }
    else if (themeid == "retro") {
        root.style.setProperty('--primaryColor', "#111f4d");
        root.style.setProperty('--itemBackground', "#F3ECE7");
        root.style.setProperty('--textColor', "#e43a19");
        root.style.setProperty('--readOnlyColor', "#020205");
        root.style.setProperty('--tableColor', "#e43a19");
        root.style.setProperty('--headerColor', "#e43a19");
        root.style.setProperty('--tableItemBackground', "#f2f4f7");
        root.style.setProperty('--buttonBackground', "#e43a19");
        root.style.setProperty('--buttonText', "#020205");
        root.style.setProperty('--shiftColor', "#fce17a");
        root.style.setProperty('--messageTextColor', "#f6f0e8");
        root.style.setProperty('--focusText', "#F3ECE7");
        root.style.setProperty('--highlightOpacity', "brightness(75%)");
        root.style.setProperty('--shiftIndication', "#e43a19");
        root.style.setProperty('--linkColor', "#e43a19");

        root.style.setProperty('--color1', "#FFCCCC");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeRetro.png)";

        window.localStorage.setItem("storedTheme", "retro");
    }
    else {
        root.style.setProperty('--primaryColor', "#add2c9");
        root.style.setProperty('--itemBackground', "#f1ebeb");
        root.style.setProperty('--textColor', "#5ea3a3");
        root.style.setProperty('--readOnlyColor', "#28595c");
        root.style.setProperty('--tableColor', "#28595c");
        root.style.setProperty('--headerColor', "#28595c");
        root.style.setProperty('--tableItemBackground', "#62a7a1");
        root.style.setProperty('--buttonBackground', "#4db492");
        root.style.setProperty('--buttonText', "#d2fff0");
        root.style.setProperty('--shiftColor', "#fce17a");
        root.style.setProperty('--messageTextColor', "#1b4857");
        root.style.setProperty('--focusText', "#28595c");
        root.style.setProperty('--highlightOpacity', "brightness(90%)");
        root.style.setProperty('--shiftIndication', "#28595c");
        root.style.setProperty('--linkColor', "#b266ff");

        root.style.setProperty('--color1', "#FF9999");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeLight.png)";

        window.localStorage.setItem("storedTheme", "light");
    }

    if (curId != null) {
        document.getElementById(curId).focus();
        if (isHighlightRcb) {
            highlightRcb();
        }
        if (isHighlightNums) { 
            highlightNums();           
        }
        
    }


    for (var i = 0; i < 81; i++) {
        if (oldThemeColorMap[i] != "" && oldThemeColorMap[i] != undefined && oldThemeColorMap[i] != null) {
            for (var j = 1; j < 10; j++) {
                if (oldThemeColorMap[i].includes(j)) {
                    colorMap[i] = root.style.getPropertyValue('--color' + j);
                }
            }
        }
    }
    
    if (isColor) {
        changeMode("colors");
    }
    
    for (var i = 0; i < 81; i++) {
        selectArray[i] = true;
    }

    isSelectMultiple = false;
    for (var i = 0; i < 81; i++) {
        if (selectArray[i]) {
            if (colorMap[i] == "") {
                document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');
            }
            else {
                document.getElementById(i).style.backgroundColor = colorMap[i];
            }
            selectArray[i] = false;
        }
    }

}

// Overlays
function instructionsDisplay() {
    if (showAbout) {
        if (showInstructions) {
            document.getElementById("instructionsdisplay").style.display = "block";
            document.getElementById("grid-container").style.display = "none";
            document.getElementById("instructions").innerHTML = "Close Instructions";
            showInstructions = false;
        }
        else {
            document.getElementById("instructionsdisplay").style.display = "none";
            document.getElementById("grid-container").style.display = "grid";
            document.getElementById("instructions").innerHTML = "Instructions";
            showInstructions = true;
        }
    }
}
function aboutDisplay() {
    if (showInstructions) {
        if (showAbout) {
            document.getElementById("aboutdisplay").style.display = "block";
            document.getElementById("grid-container").style.display = "none";
            document.getElementById("about").innerHTML = "Close About";
            showAbout = false;
        }
        else {
            document.getElementById("aboutdisplay").style.display = "none";
            document.getElementById("grid-container").style.display = "grid";
            document.getElementById("about").innerHTML = "About";
            showAbout = true;
        }
    }
}

$(window).load(function () {
    $("body").addClass('all-loaded');
});

function setColor(id) {
    color = document.getElementById(id).style.backgroundColor;
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