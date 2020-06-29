// global variable (Map) that has keys from 0-80 and values of the color in each cell (value is "" if there is no color)
var colorMap = {};

// global variable (Array) that holds a 2D Array of the pencilmarks for each cell in the grid
var pmArray = [];

// global variable (Array) that holds 81 boolean values indicating which cells are currently being selected
var selectArray = [];

// global variable (Array) that holds a stack of all moves made by the user (used for undo functionality)
var history = [];

// global variable (number) that indicates the intended size of "history" 
var historyIndex = 0;

// global variable (number) that counts the number of pencilmarks added to the grid when fillAllPms() is called
var autoFillCount = 0;

// global variable (number) that indicates how many seconds the Sudoku has been played
var timeElapsed = 0;

// global variable that initializes the timer
var timer;

// global variable (String) that indicates the most recent focused cell in the grid
var curId = null;

// global variable (boolean) for if the user is currently selecting multiple cells, either through shifting and using arrow keys, shifting and clicking different cells, or dragging
var isSelectMultiple = false;

// global variable (boolean) for if the user is currently clicking "SHIFT"
var isShift = false;

// global variable (boolean) for if the user is currently dragging with the mouse
var drag = false;

// global variable (boolean) for if the mode is "Normal" (true) or "Pencilmarks" (false)
var isNormal = true;

// global variable (boolean) for if the mode of "Colors" is on/off
var isColor = false;

// global variable (boolean) for if the option of automatically deleting pencilmarks is on/off
var isDeletePms = false;

// global variable (boolean) for if the option of highlighting same digits is on/off
var isHighlightNums = false;

// global variable (boolean) for if the option of highlight row, box, column is on/off
var isHighlightRcb = false;

// global variable (boolean) for if the option of automatically filling pencilmarks is on/off
var isAutoFill = false;

// global variable (boolean) that indicates if the instructions message should be opened or closed
var showInstructions = true;

// global variable (boolean) that indicates if the about message should be opened or closed
var showAbout = true;

// global variable (String) for the number that the user just inputted through the keyboard or numbers table
var lastNumEntered = "";

// global variable (String) for the current color being used
var currentColor = "";

// global variable (Element) that represents the highest HTML element in the document tree
var root = document.documentElement;

// global variable (boolean) that indicates if the current grid is solved
var solved = $('#my-data').data().name;

// global variables (String) that hold the CSS colors for different themes
var color1 = root.style.getPropertyValue('--color1');
var color2 = root.style.getPropertyValue('--color2');
var color3 = root.style.getPropertyValue('--color3');
var color4 = root.style.getPropertyValue('--color4');
var color5 = root.style.getPropertyValue('--color5');
var color6 = root.style.getPropertyValue('--color6');
var color7 = root.style.getPropertyValue('--color7');
var color8 = root.style.getPropertyValue('--color8');
var color9 = root.style.getPropertyValue('--color9');

// global variable (String) for the HTML table for inputting a number
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

// global variable (String) for the HTML table for adding a color
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


$(document).keydown(
    /**
    * Event handling function for the keydown event 
    * @param {Event} e  Keyboard event object handler
    */
    function (e) {
        
        // true if one of the arrow keys is pressed; false otherwise
        var arrowKeyPressed = false;

        // if in "Colors" mode, prevent "Normal" or "Pencilmarks" numbers from being inputted and use the numbers as colors instead
        if (isColor && e.keyCode >= 49 && e.keyCode <= 57) {
            var inter = "color" + (e.keyCode - 48).toString();

            // loop through all 81 cells
            for (var i = 0; i < 81; i++) {

                // if the cell is selected
                if (selectArray[i]) {

                    // get the current color and set the value of "colorMap" to that color
                    currentColor = root.style.getPropertyValue('--' + inter);
                    colorMap[i] = currentColor;

                    // set the background color of the cell
                    document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--' + inter);
                }
            }

            // if the active element is a cell, change its background color to the corresponding color
            if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81) {
                document.getElementById(document.activeElement.id).style.backgroundColor = root.style.getPropertyValue('--' + inter);
            }

            // prevent the user from inputting a number if in the "Colors" mode
            e.preventDefault();
        }
        
        // if the active element is one of the 81 cells
        if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81) {

            // if the key is "DELETE/BACKSPACE" and the element is not a starting number
            if (e.keyCode == 8 && document.activeElement.id != "" && document.getElementById(document.activeElement.id).className.includes("readonly") == false) {

                // set the focused cell's value and pencilmark array to empty states
                document.getElementById(document.activeElement.id).value = "";
                pmArray[document.activeElement.id] = [];

                // add the deleted element to the history array (for a single selection)
                if (document.getElementById(document.activeElement.id).className.includes("txt-input")) {
                    history[historyIndex] = [document.activeElement.id, document.getElementById(document.activeElement.id).value, "normal"];
                }
                else {
                    history[historyIndex] = [document.activeElement.id, document.getElementById(document.activeElement.id).value, "pencilmarks"];
                }
                historyIndex++;

                // add the deleted element to the history array (for multiple selections)
                for (var i = 0; i < 81; i++) {
                    if (selectArray[i] && document.activeElement.id != i && document.getElementById(i).className.includes("readonly") == false) {
                        document.getElementById(i).value = [];
                        pmArray[i] = [];
                        if (document.getElementById(i).className.includes("txt-input")) {
                            history[historyIndex] = [i, document.getElementById(i).value, "normal"];
                        }
                        else {
                            history[historyIndex] = [i, document.getElementById(i).value, "pencilmarks"];
                        }
                        historyIndex++;
                    }
                }

                // ensure the grid is in the correct mode
                changeClassName();
            }

            // else if the key is the "RIGHT ARROW", move the focus to the cell after it
            else if (e.keyCode == 39) {
                currentId = document.activeElement.id;
                if (currentId != 80) {
                    nextId = parseInt(currentId) + 1;
                }
                arrowKeyPressed = true;
            }
            
            // else if the key is the "LEFT ARROW", move the focus to the cell before it
            else if (e.keyCode == 37) {
                currentId = document.activeElement.id;
                if (currentId != 0) {
                    nextId = parseInt(currentId) - 1;
                }
                arrowKeyPressed = true;
            }

            // else if the key is the "DOWN ARROW", move the focus to the cell below it
            else if (e.keyCode == 40) {
                currentId = document.activeElement.id;
                if (currentId < 72) {
                    nextId = parseInt(currentId) + 9;
                }
                else if (currentId != 80) {
                    nextId = parseInt(currentId) - 71;
                }
                arrowKeyPressed = true;
            }

            // else if the key is the "UP ARROW", move the focus to the cell above it
            else if (e.keyCode == 38) {
                currentId = document.activeElement.id;
                if (currentId > 8) {
                    nextId = parseInt(currentId) - 9;
                }
                else if (currentId != 0) {
                    nextId = parseInt(currentId) + 71;
                }
                arrowKeyPressed = true;
            }

            // else if the key is one of the "NUMBER" keys
            else if (48 < e.keyCode && e.keyCode < 58) {

                // get the corresponding number associated with the key
                lastNumEntered = String.fromCharCode(e.keyCode);

                // input the number pressed to the grid (for a single selection)
                if (document.getElementById(document.activeElement.id).className.includes("readonly") == false) {
                    addToArray(document.activeElement.id);
                }
                
                // input the number pressed to the grid (for multiple selections)
                for (var i = 0; i < 81; i++) {
                    if (selectArray[i] && i != document.activeElement.id && document.getElementById(i).className.includes("readonly") == false) {
                        addToArray(i.toString());
                    }
                }
            }

            // else if the key is "SHIFT"
            else if (e.keyCode == 16) {

                // turn on the shift indication circle next to the home icon
                document.getElementById("shiftIndication").style.backgroundColor = root.style.getPropertyValue('--shiftIndication');

                // make the global variable that indicates if multiple elements are selected true
                isSelectMultiple = true;

                // make the focused cell true in the "selectArray" variable
                selectArray[document.activeElement.id] = true;

                // change the background color of the focused cell to the "shiftColor" CSS variable
                if (document.activeElement.id != "pencilmarks") {
                    document.getElementById(document.activeElement.id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
                }
                isShift = true;
            }

            // if the active element's id is not null, update the global variable "curId"
            if (document.activeElement.id != null) {
                curId = document.activeElement.id;
            }
        }

        // if the key is "ESCAPE"
        if (e.keyCode == 27) {

            // make the global variables "isShift" and "isSelectMultiple" false because the user is done selecting multiple items
            isShift = false;
            isSelectMultiple = false;
            document.getElementById("shiftIndication").style = "background-color: none";

            // loop through the entire grid; for all items that were selected, revert the background color to either the item background or its associated color in the "colorMap" variable
            for (var i = 0; i < 81; i++) {

                // if the cell is selected
                if (selectArray[i]) {

                    // if there is no color on that cell, set its background color back to the item background
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

        // if the key is "SPACE"
        else if (e.keyCode == 32) {

            // change modes between "Normal", "Pencilmarks", and "Colors" in order
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
        
        // if the key is "CONTROL + Z" or "COMMAND + Z"
        else if (((e.keyCode == 90 && e.ctrlKey) || (e.keyCode == 90 && e.metaKey))) {
            undo();
        }

        // if the key is "CONTROL + A" or "COMMAND + A"
        else if ((e.keyCode == 65 && e.ctrlKey) || (e.keyCode == 65 && e.metaKey)) {
            
            // turn on the shift indication circle next to the home icon
            document.getElementById("shiftIndication").style.backgroundColor = root.style.getPropertyValue('--shiftIndication');
            for (var i = 0; i < 81; i++) {

                // add all the grid items to "selectArray" and change the background color of all grid items to the shift color
                selectArray[i] = true;
                document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
            }
        }

        // if one of the "ARROW" keys was pressed, focus on the cell that was set by "nextId"
        if (arrowKeyPressed == true && document.activeElement.id != "") {
            document.getElementById(nextId).focus();
        }

        // if in "Normal" mode, select the active element so a number can be inputted
        if (isNormal && document.getElementById(document.activeElement.id) != null && document.activeElement.id >= 0 && document.activeElement.id < 81) {
            document.getElementById(document.activeElement.id).select();
        }
    }
);

$(document).keyup(

    /**
    * Event handling function for the keyup event
    * @param {Event} e  Keyboard event object handler
    */
    function (e) {

        // if the key is "SHIFT"
        if (e.keyCode == 16) {

            // set "isSelectMultiple" and "isShift" to false because the user has stopped selecting multiple cells
            isSelectMultiple = false;
            isShift = false;
        }
    }
);

$(document).mousedown(

    /**
    * Event handling function for the mousedown event
    */
    function () {
        if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81 && !isShift) {

            // make the global variable "drag" true in case the user starts to drag with the mouse
            drag = true;

            // keep isSelectMultiple false since the user may not be selecting multiple elements yet
            isSelectMultiple = false;
        }
    }
);

$(document).mouseup(

    /**
    * Event handling function for the mouseup event
    */
    function () {

        // make the global variable "drag" false in order to stop adding to selectArray since user is done dragging
        drag = false;
    }
);

document.onreadystatechange = function () {
    /**
    * Alter the class of the body once the window has finished loading
    */
    if (document.readyState === "complete") {
        document.getElementById("body").className = "all-loaded";

        // keep the same time if the user clicks "Check"
        if (window.localStorage.getItem("time") != null) {
            timeElapsed = window.localStorage.getItem("time");
            tick();
        }
    }
}

/**
 * Initializes global array/map variables during body onload
 */
function createArray() {
    for (var i = 0; i < 81; i++) {
        pmArray[i] = [];
        selectArray[i] = false;
        colorMap[i] = "";
    }
}

/**
 * Changes the mode between "Normal", "Pencilmarks", and "Colors" and changes the CSS of the div to indicate what mode is focused
 * @param {String} modeId  The id (either "normal", "pencilmarks", or "colors") of the mode div that called the function
 */
function changeMode(modeId) {
    if (modeId == "pencilmarks") {

        // change the mode to "Pencilmarks" and not "Normal" or "Colors"
        isNormal = false;
        isColor = false;

        // change the class name of the mode div to make it appear focused
        document.getElementById("pencilmarks").className = "modefocus";
        document.getElementById("normal").className = "modedivs";
        document.getElementById("colors").className = "modedivs";

        // change the table container to the numbers table, instead of the colors table
        document.getElementById("tablecontainer").innerHTML = numbersTable;

    }

    else if (modeId == "colors") {

        // change the mode to "Colors" and not "Normal" or "Pencilmarks"
        isColor = true;
        isNormal = false;

        // change the class name of the mode div to make it appear focused
        document.getElementById("colors").className = "modefocus";
        document.getElementById("pencilmarks").className = "modedivs";
        document.getElementById("normal").className = "modedivs";

        // change the table container to the colors table, instead of the numbers table
        document.getElementById("tablecontainer").innerHTML = colorsTable;

        // set the background color of the buttons in the colors table to the appropriate CSS variable for that theme
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
        // change the mode to "Normal" and not "Colors" or "Pencilmarks"
        isNormal = true;
        isColor = false;

        // change the class name of the mode div to make it appear focused
        document.getElementById("pencilmarks").className = "modedivs";
        document.getElementById("normal").className = "modefocus";
        document.getElementById("colors").className = "modedivs";

        // change the table container to the numbers table, instead of the colors table
        document.getElementById("tablecontainer").innerHTML = numbersTable;
    }

    // if in "Normal" or "Pencilmarks" mode, call changeClassName
    if (!isColor) {
        changeClassName();
    }

    // after changing modes, focus back on to the last valid grid item
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
}

/**
 * Changes the class name and maxlength of all the grid items that are not readonly when the mode changes
 */
function changeClassName() {

    // loop through all 81 items in the grid
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            // if the class name of the cell does not include readonly and the cell is not empty
            if (((document.getElementById(i * 9 + j)).className != "txt-input readonly")
                && (document.getElementById(i * 9 + j).value == "")) {

                // if in "Normal" mode, change the class name of the cell to a normal text input and makes the maxlength for the input one
                if (isNormal) {
                    document.getElementById(i * 9 + j).className = "txt-input";
                    if (document.getElementById(i * 9 + j).className != "pm-input") {
                        document.getElementById(i * 9 + j).maxLength = 1;
                    }
                }

                // else (in "Pencilmarks" mode), change the class name of the cell to a pencilmarks input and makes the maxlength for the input one
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

/**
 * Sorts the pencilmarks array at the specified id and writes the array into the grid
 * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 * @param {Array} pmCellArray  The array that should be turned into a string and written into the cell
 */
function sortAndWriteCellValue(id, pmCellArray) {

    // if the length of the array to be added is 0, set "pmArray" at the passed id to a blank array and set the value of the input to a blank string
    if (pmCellArray.length == 0) {
        document.getElementById(id).value = "";
        pmArray[id] = pmCellArray;
    }

    // sort the array, turn it into a string, and change the value of the input to that string
    else {
        pmArray[id] = pmCellArray;
        pmCellArray.sort();
        var idValue = "";
        for (var i = 0; i < pmCellArray.length; i++) {
            idValue += pmCellArray[i];
        }
        document.getElementById(id).value = idValue;
    }
}

/**
 * Deletes both instances of a number in the 2D pencilmarks array if a duplicate number is added to that cell
 * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 * @param {String} diff  The number that was just added to the element
 * @return {Array}  The updated array with the number deleted if it was duplicated
 */
function delPmArrayInput(id, diff) {
    var pmCellArray = pmArray[id].concat(diff);
    var firstIndex = pmCellArray.indexOf(diff);

    // if "pmArray" at the specified id already included the number, eliminate both instances of the number
    if (pmArray[id].includes(diff)) {
        pmCellArray.pop();
        pmCellArray.splice(firstIndex, 1);
    }
    return pmCellArray;
}

/**
 * Inputs a pencilmark onto the grid after deleting duplicates, sorting the array, and joining it into a string
 * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 */
function pmInput(id) {
    var prevPmCellArray = pmArray[id];
    var pmCellArray = prevPmCellArray.concat(lastNumEntered);

    // check if any duplicates can be deleted from "pmCellArray"
    if (pmCellArray.length != 0) {
        pmCellArray = delPmArrayInput(id, lastNumEntered);
    }
    // sort "pmCellArray" and write it into the input
    sortAndWriteCellValue(id, pmCellArray);

    // add the new pencilmark action to the undo stack
    var idValue = pmCellArray.join("");
    history[historyIndex] = [id, idValue, "pencilmarks"];
    historyIndex++;

    // if "isAutoFill" is true, increase the count of "autoFillCount"
    if (isAutoFill) {
        autoFillCount++;
    }
}

/**
 * Inputs a normal number onto the grid
 * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 */
function normalInput(id) {

    // clear the pmArray for that id
    pmArray[id] = [];

    // turn the cell at that id into a normal text input with a maxlength of one and input the last number entered as the value
    document.getElementById(id).className = "txt-input";
    document.getElementById(id).maxLength = 1;
    document.getElementById(id).value = lastNumEntered;

    // add the new normal number to the undo stack
    history[historyIndex] = [id, lastNumEntered, "normal"];
    historyIndex++;

    // if "isDeletePms" is true, call the deletePms function to auto delete pencilmarks
    if (isDeletePms) {
        deletePms(id);
    }

    // if "isHighlightNums" is true, call the highlightNums function to highlight all instances of that number
    if (isHighlightNums) {
        highlightNums();
    }
}

/**
 * Calls pmInput or normalInput depending on the mode set by the "isNormal" boolean
 * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 */
function addToArray(id) {

    // if not in "Colors" mode
    if (!isColor) {
        
        // if in "Pencilmarks" mode and if the cell is not already a normal text input
        if (isNormal == false && document.getElementById(id).className != "txt-input") {
            pmInput(id);
        }

        // else if in "Normal" mode
        else if (isNormal == true) {
            normalInput(id);
        }
    }
}

/**
 * Inputs the number that was selected from the numbers table
  * @param {String} num  The number that should be added
 */
function tableInput(num) {

    // focus onto "curId" if it is valid
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }

    // set the global variable "lastNumEntered" to num
    lastNumEntered = num;

    // if the active element is a cell and does not have a class name of readonly, call addToArray
    if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81) {
        if (document.getElementById(document.activeElement.id).className.includes("readonly") == false) {
            addToArray(document.activeElement.id);
        }
    }
    

    // loop through all 81 cells
    for (var i = 0; i < 81; i++) {

        // if the cell is selected and does not have a class name of readonly, call addToArray
        if (selectArray[i] && i != document.activeElement.id && document.getElementById(i).className.includes("readonly") == false) {
            addToArray(i.toString());
        }
    }
}

/**
 * Undoes the last move made by the user; recursive if the history encounters the String "autofill"
 */
function undo() {

    // focus onto "curId" if it is valid
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }

    // if "historyIndex" is 0, exit the function
    if (historyIndex == 0) {
        return;
    }

    // decrement historyIndex by 1
    historyIndex--;

    // store the very last change in "history" as "lastChange"
    var lastChange = history[historyIndex];

    // if "lastChange" is "autofill start", all the autofill steps have been undone and can exit the function after one more recursive call
    if (lastChange == "autofill start") {
        undo();
        return;
    }

    // if "lastChange" includes "autofill end", call undo() recursively until all the autofill steps have been undone
    else if (lastChange[0] == "autofill end") {
        for (var i = 0; i < lastChange[1]; i++) {
            undo();
        }
    }

    // else if "lastChange" does not include anything with autofill
    else {

        // store the id of the last change in "history" as "id"
        var id = lastChange[0];

        // focus onto the element of id "id"
        document.getElementById(id).focus();

        // loop through the entirety of "history" in reverse
        for (var i = historyIndex - 1; i >= 0; i--) {

            // if there is a previous change in "history" with the same id as "id"
            if (history[i][0] == id) {

                // if the previous change was conducted in "normal" mode, change the attributes of the cell to reflect "normal" mode
                if (history[i][2] == "normal") {
                    document.getElementById(id).className = "txt-input";
                    document.getElementById(id).maxLength = 1;
                    pmArray[id] = [];
                }

                // if the previous change was conducted in "pencilmarks" mode, change the attributes of the cell to reflect "pencilmarks" mode
                else {
                    document.getElementById(id).className = "pm-input";
                    document.getElementById(id).maxLength = 10;
                    pmArray[id] = history[i][1].split("");
                }

                // set the value of the cell to the previous changed value in "history"
                document.getElementById(id).value = history[i][1];

                // exit the function
                return;
            }
        }

        // set the pencilmark array and value of the cell to blank
        pmArray[id] = [];
        document.getElementById(id).value = "";
    }
}

/**
 * Inputs all possible pencilmarks into each cell in the grid
 */
function fillAllPms() {

    changeMode("pencilmarks");

    // set "isAutoFill" to true and start a new count of "autoFillCount"
    isAutoFill = true;
    autoFillCount = 0;

    // indicate in "history" that autofill has started
    history[historyIndex] = "autofill start";
    historyIndex++;

    // loop through all 81 cells and input all possible pencilmarks
    for (var cell = 0; cell < 81; cell++) {

        // reset pmArray in each cell position to overwrite current pencilmarks
        pmArray[cell] = [];

        // create an array of all cells that the focused cell "sees"
        var conflictArray = createConflictArray(cell);

        // create an array that holds all the "normal" and starting numbers within the cells inside "conflictArray"
        var normalList = [];

        // loop through all cells in "conflictArray" and add the number to "normalList" if the cell has a "normal" or starting number
        for (var i = 0; i < conflictArray.length; i++) {
            if (document.getElementById(conflictArray[i]).className != "pm-input") {
                normalList.push(document.getElementById(conflictArray[i]).value)
            }
        }

        // loop through all digits 1-9 and if the digit does not appear in "normalList", input that digit to the cell as a pencilmark
        for (var num = 1; num < 10; num++) {
            if (!normalList.includes(num.toString())) {
                if (document.getElementById(cell).className == "pm-input") {
                    lastNumEntered = num.toString();
                    addToArray(cell);
                }

            }
        }
    }

    // indicate in "history" that autofill has ended
    history[historyIndex] = ["autofill end", autoFillCount];
    historyIndex++;

    // indicate that autofill has finished
    isAutoFill = false;
}

/**
 * Gives the focused cell the shift background color if "isSelectMultiple" is true
  * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 */
function selectFocus(id) {
    curId = id;

    // if the highlightRcb and/or highlightNums options are on, call the respective function
    if (isHighlightRcb) {
        highlightRcb();
    }
    if (isHighlightNums) {
        highlightNums();
    }

    // if the user is focusing and "isSelectMultiple" is true, change the background color to the shift color for that cell
    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
    }
}

/**
 * Gives the selected cell the shift background color if "isSelectMultiple" is true
  * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 */
function selectClick(id) {

    // focus onto "curId" if it is valid
    curId = id;
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }

    // if the user is selecting and "isSelectMultiple" is true, change the background color to the shift color for that cell
    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
    }
    
    // else the user is done with shift clicking and wants to stop selecting multiple elements
    else {

        // loop through all 81 cells
        for (var i = 0; i < 81; i++) {

            // if the cell is currently selected
            if (selectArray[i]) {
                
                // if no color is set for that cell
                if (colorMap[i] == "") {

                    // change the background color to the normal item background
                    document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');
                }
                
                // else revert that cell's background color to its value in the "colorMap"
                else {
                    document.getElementById(i).style.backgroundColor = colorMap[i];
                }
                
                // deselect the cell
                selectArray[i] = false;
            }
        }
        
        // reset the shift indicator and set "isShift" to false
        document.activeElement.focus();
        document.getElementById("shiftIndication").style = "background-color: none";
        isShift = false;
    }
    
    // focus onto "curId" if it is valid
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
}

/**
 * Gives the moused over cell the shift background color if "drag" is true
 * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 */
function selectDrag(id) {

    // if the global variable drag is true and the user is mousing over a grid item
    if (drag && document.activeElement.id != "" && id != null) {

        // turn on the shift indication circle next to the home icon, make "isSelectMultiple" true, and change the id of the active element in selectArray to true because the user is selecting multiple through dragging
        document.getElementById("shiftIndication").style.backgroundColor = root.style.getPropertyValue('--shiftIndication');
        isSelectMultiple = true;
        selectArray[document.activeElement.id] = true;
        document.getElementById(document.activeElement.id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = root.style.getPropertyValue('--shiftColor');

        // change the focus on the board to the cells being dragged over to make it clear to the user where on the board they are
        curId = id;
        if (document.getElementById(curId) != null) {
            document.getElementById(curId).focus();
        }

    }
}

/**
 * Sets the background color of the selected cells to the color chosen by the user in the "colorsTable"
 * @param {String} colorId  An id from the table input (color1, color2, etc.)
 */
function setColor(colorId) {

    // get the color that the user selected
    var color = document.getElementById(colorId).style.backgroundColor;

    // focus onto "curId" if it is valid
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }

    // set the global variable "curentColor" to the selected colo
    currentColor = color;

    // loop through all 81 cells
    for (var i = 0; i < 81; i++) {

        // if the cell is in "selectArray"
        if (selectArray[i]) {

            // change the cell's background color and set the value in the "colorMap"
            document.getElementById(i).style.backgroundColor = currentColor;
            colorMap[i] = currentColor;
        }
    }

    // if the active element is a cell, change its background color and set the value in the "colorMap"
    if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81) {
        document.getElementById(document.activeElement.id).style.backgroundColor = currentColor;
        colorMap[document.activeElement.id] = currentColor;
    }
}

/**
 * Creates an array of cell id's that are in the same row, column, and box as the passed id
  * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
  * @return {Array}  An array of cell ids
 */
function createConflictArray(id) {
    
    // convert the passed id to a number and store it as "id"
    var id = parseInt(id);
    
    // initialize an array called "conflictArray"
    var conflictArray = [];

    // loop through a series of cells in the grid that exist in the same row as "id" and add those to "conflictArray"
    for (var i = id - id % 9; i < (9 - id % 9) + id; i++) {
        conflictArray.push(parseInt(i));
    }

    // loop through a series of cells in the grid that exist in the same column as "id" and add those to "conflictArray"
    for (var i = 0; i < 81; i++) {
        if (i % 9 == id % 9) {
            conflictArray.push(parseInt(i));
        }
    }
    
    // form a series of cells that exist in the same box as "id"
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

    // from the series of id's in the same box, loop through all of them and add them to "conflictArray"
    for (var i = 0; i < listMR.length; i++) {
        for (var j = 0; j < listMC.length; j++) {
            if (conflictArray.includes(9 * listMR[i] + listMC[j]) == false) {
                conflictArray.push(parseInt(9 * listMR[i] + listMC[j]));
            }
        }
    }

    // return "conflictArray"
    return conflictArray;
}

/**
 * Deletes all pencilmark instances of a number in the same row, column, and box once a normal number is inputted
 * @param {String} id  An id from 0-80 that maps to a specific cell in the grid
 */
function deletePms(id) {

    // create an array of all cells that are in the same row, column, or box as the focused cell
    var conflictArray = createConflictArray(id);
    
    // loop through all cells in conflictArray
    for (var i = 0; i < conflictArray.length; i++) {

        // if any cell's pencilmarks array includes the number that was inputted, input that number again (essentially deleting it from the cell)
        if (pmArray[conflictArray[i]].includes(lastNumEntered)) {
            pmInput(conflictArray[i], lastNumEntered);
        }

    }
}

/**
 * Toggles on/off the option to automatically delete pencilmarks in the same row, column, and box
 */
function toggleDeletePms() {
    
    // focus onto "curId" if it is valid
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }

    // if isDeletePms is true
    if (isDeletePms) {
        isDeletePms = false;

        // change the class name of the deletepms div to indicate that it has been turned off
        document.getElementById("deletepms").className = "optiondivs";
    }

    // else isDeletePms is false
    else {
        isDeletePms = true;

        // change the class name of the deletepms div to indicate that it has been turned on
        document.getElementById("deletepms").className = "focusdivs";
    }
}

/**
 * Highlights all instances of the focused number, including pencilmarks, in the grid
 */
function highlightNums() {

    // initialize variable "conflictArray" to use only if isHighlightRcb is true
    var conflictArray = []

    // if isHighlightRcb is true, assign "conflictArray" to an array of all cells that are in the same row, column, or box as the focused cell
    if (isHighlightRcb) {
        conflictArray = createConflictArray(document.activeElement.id);
    }

    // obtain the number in the focused cell
    var num = document.activeElement.value;

    // loop through all 81 cells
    for (var i = 0; i < 81; i++) {

        // if the cell is not in "conflictArray", unhighlight the cell
        if (conflictArray.includes(i) == false) {
            document.getElementById(i).style.filter = "brightness(100%)";
        }

        // if the cell's value includes "num"
        if (document.getElementById(i).value.includes(num)) {

            // if num is not blank and the cell has a "normal" or starting number, highlight the cell
            if (num != "" && (document.activeElement.className.includes("txt-input") || document.activeElement.className.includes("readonly"))) {
                document.getElementById(i).style.filter = root.style.getPropertyValue('--highlightOpacity');

            }
        }
    }
}

/**
 * Toggles on/off the option to highlight the row, column, and box of a given cell 
 */
function toggleHighlightNums() {

    // focus onto "curId" if it is valid
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }
    
    // if isHighlightNums is true
    if (isHighlightNums) {

        // set isHighlightNums to false to toggle off the option
        isHighlightNums = false;

        // change the class name of the highlighnums div to indicate that it has been turned off
        document.getElementById("highlightnums").className = "optiondivs";
        
        // loop through all 81 cells and unhighlight each cell
        for (var i = 0; i < 81; i++) {
            document.getElementById(i).style.filter = "brightness(100%)";
        }
        
        // if isHighlightRcb is true, call highlightRcb() to rehighlight those cells
        if (isHighlightRcb) {
            highlightRcb();
        }

    }

    // else isHighlightNums is false
    else {

        // set isHighlightNums to true to toggle on the option
        isHighlightNums = true;

        // change the class name of the highlighnums div to indicate that it has been turned on
        document.getElementById("highlightnums").className = "focusdivs";

        // call highlightNums() to see immediate highlighting 
        highlightNums();
    }
}

/**
 * Highlights the cells in the same row, column, and box as the focused cell
 */
function highlightRcb() {

    // create an array of all cells in the same row, column, and box as the focused cell
    var conflictArray = createConflictArray(document.activeElement.id);

    // loop through all 81 cells and unhighlight each cell
    for (var i = 0; i < 81; i++) {
        document.getElementById(i).style.filter = "brightness(100%)";
    }

    // loop through all cells in "conflictArray" and highlight the cell
    for (var i = 0; i < conflictArray.length; i++) {
        document.getElementById(conflictArray[i]).style.filter = root.style.getPropertyValue('--highlightOpacity');
    }
    
    // if isHighlightNums is true, call highlightNums to rehighlight those numbers
    if (isHighlightNums) {
        highlightNums();
    }
}

/**
 * Toggles on/off the option to highlight the row, column, and box of a given cell 
 */
function toggleHighlightRcb() {

    // focus onto "curId" if it is valid
    if (document.getElementById(curId) != null) {
        document.getElementById(curId).focus();
    }

    // if isHighlightRcb is true
    if (isHighlightRcb) {
        
        // set isHighlightRcb to false to toggle off the option
        isHighlightRcb = false;
        
        // change the class name of the highlighrcb div to indicate that it has been turned off
        document.getElementById("highlightrcb").className = "optiondivs";

        // loop through all 81 cells and unhighlight each cell
        for (var i = 0; i < 81; i++) {
            document.getElementById(i).style.filter = "brightness(100%)";
        }

        // if isHighlightNums is true, call highlightNums to rehighlight those numbers
        if (isHighlightNums) {
            highlightNums();
        }
    }
    
    // else isHighlightRcb is false
    else {
        
        // set isHighlightRcb to true to toggle on the option
        isHighlightRcb = true;

        // change the class name of the highlighrcb div to indicate that it has been turned on
        document.getElementById("highlightrcb").className = "focusdivs";

        // call highlightRcb() to see immediate highlighting 
        highlightRcb();
    }
}

/**
 * Changes the inner HTML of the "Change Theme" div to display the theme options the user can select from 
 */
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

/**
 * If a theme has been selected, reverts the "Change Theme" div back to its original HTML
 */
function revertChangeTheme() {
    document.getElementById("changetheme").innerHTML = `
    <div id="themebutton" onclick="themeOption()">Change Theme</div>`;
}

/**
 * Changes theme based on user specified selection
 */
function changeTheme() {

    // if grid contains colors, obtain the position and color and store it in a map named "oldThemeColorMap"
    var oldThemeColorMap = {};

    // loop through all 81 cells
    for (var i = 0; i < 81; i++) {
        
        // if a color exists in the cell position
        if (colorMap[i] != "" && colorMap[i] != undefined && colorMap[i] != null) {

            // loop through all 9 colors
            for (var j = 1; j < 10; j++) {
                
                var val = root.style.getPropertyValue('--color' + j);
                
                // if the color matches with the cell position, add it to "oldthemColorMap" along with its position
                if (val.includes(colorMap[i])) {
                    oldThemeColorMap[i] = "color" + j;
                    break;
                }

                // else set the position to in the map to "", indicating that there is no color at that position
                else {
                    oldThemeColorMap[i] = "";
                }
            }
        }
    }

    // obtain the theme in cache and assign it to "themeid"
    var themeid = window.localStorage.getItem("storedTheme");

    // reset the shift indicator
    document.getElementById("shiftIndication").style = "background-color: none";

    // if the desired theme change is "tan", change CSS variables to the corresponding color palette
    if (themeid == "tan") {

        // change document CSS colors
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

        // change table colors
        root.style.setProperty('--color1', "#FFCCCC");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        // change home icon color
        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeTan.png)";

        // store the theme "tan" in local cache
        window.localStorage.setItem("storedTheme", "tan");

    }

    // else if the desired theme change is "dark", change CSS variables to the corresponding color palette
    else if (themeid == "dark") {

        // change document CSS colors
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

        // change table colors
        root.style.setProperty('--color1', "#990000");
        root.style.setProperty('--color2', "#CC6600");
        root.style.setProperty('--color3', "#009900");
        root.style.setProperty('--color4', "#009999");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "darkslategrey");
        root.style.setProperty('--color7', "mediumpurple");
        root.style.setProperty('--color8', "#999900");
        root.style.setProperty('--color9', "#CC0066");

        // change home icon color
        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeDark.png)";

        // store the theme "dark" in local cache
        window.localStorage.setItem("storedTheme", "dark");
    }
    
    // else if the desired theme change is "retro", change CSS variables to the corresponding color palette
    else if (themeid == "retro") {

        // change document CSS colors
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
        root.style.setProperty('--highlightOpacity', "brightness(80%)");
        root.style.setProperty('--shiftIndication', "#e43a19");
        root.style.setProperty('--linkColor', "#e43a19");

        // change table colors
        root.style.setProperty('--color1', "#FFCCCC");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        // change home icon color
        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeRetro.png)";

        // store the theme "retro" in local cache
        window.localStorage.setItem("storedTheme", "retro");
    }

    // else the desired theme change is "light", change CSS variables to the corresponding color palette
    else {

        // change document CSS colors
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

        // change table colors
        root.style.setProperty('--color1', "#FF9999");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        // change home icon color
        document.getElementById("homesquare").style.backgroundImage = "url(/static/css/images/homeLight.png)";

        // store the theme "light" in local cache
        window.localStorage.setItem("storedTheme", "light");
    }

    
    // if "curId" is valid
    if (curId != null) {

        // focus onto "curId"
        document.getElementById(curId).focus();
        
        // if the highlightRcb toggle is on, call it
        if (isHighlightRcb) {
            highlightRcb();
        }

         // if the highlightNums toggle is on, call it
        if (isHighlightNums) {
            highlightNums();
        }

    }

    // loop through all cells
    for (var i = 0; i < 81; i++) {

        // if there is a color in the cell position
        if (oldThemeColorMap[i] != "" && oldThemeColorMap[i] != undefined && oldThemeColorMap[i] != null) {
            
            // loop through all 9 colors and change the color based on the changed theme
            for (var j = 1; j < 10; j++) {
                if (oldThemeColorMap[i].includes(j)) {
                    colorMap[i] = root.style.getPropertyValue('--color' + j);
                }
            }
            
        }
    }

    // if "isColor", change the mode to "colors" to immediately see the table colors change
    if (isColor) {
        changeMode("colors");
    }

    // select all cells
    for (var i = 0; i < 81; i++) {
        selectArray[i] = true;
    }
    
    // indicate that selecting has finished
    isSelectMultiple = false;
    
    // loop through all 81 cells
    for (var i = 0; i < 81; i++) {

        // if the cell is selected
        if (selectArray[i]) {

            // if there is no color in the cell, then set the background color to the default
            if (colorMap[i] == "") {
                document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');
            }

            // else set the color to the correct color based on the changed theme
            else {
                document.getElementById(i).style.backgroundColor = colorMap[i];
            }

            // deselect the cell
            selectArray[i] = false;
        }
    }

}

/**
 * Displays "Instructions" message
 */
function instructionsDisplay() {

    // close check message if it is open
    if (document.getElementById("checkoverlay").style.display != "none") {
        document.getElementById("checkoverlay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
    }

    // close "About Us" message if it is open
    if (!showAbout) {
        document.getElementById("aboutdisplay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
        document.getElementById("about").innerHTML = "About";
        showAbout = true;
    }

    // display "Instructions" message
    if (showInstructions) {
        document.getElementById("instructionsdisplay").style.display = "block";
        document.getElementById("grid-container").style.display = "none";
        document.getElementById("instructions").innerHTML = "Close Instructions";
        showInstructions = false;
    }

    // close "Instructions" message
    else {
        document.getElementById("instructionsdisplay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
        document.getElementById("instructions").innerHTML = "Instructions";
        showInstructions = true;
    }
}

/**
 * Displays "About Us" message
 */
function aboutDisplay() {
    
    // close check message if it is open
    if (document.getElementById("checkoverlay").style.display != "none") {
        document.getElementById("checkoverlay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
    }

    // close "Instructions" message if it is open 
    if (!showInstructions) {
        document.getElementById("instructionsdisplay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
        document.getElementById("instructions").innerHTML = "Instructions";
        showInstructions = true;
    }

    // display "About Us" message
    if (showAbout) {
        document.getElementById("aboutdisplay").style.display = "block";
        document.getElementById("grid-container").style.display = "none";
        document.getElementById("about").innerHTML = "Close About Us";
        showAbout = false;
    }
    
    // close "About Us" message
    else {
        document.getElementById("aboutdisplay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
        document.getElementById("about").innerHTML = "About Us";
        showAbout = true;
    }
}

/**
 * Increases one second to the timer and rewrites the HTML of the timer
 */
function tick() {

    // add one second to the timer
    timeElapsed++;

    // convert "timeElapsed" to seconds, minutes, and hours
    var seconds = timeElapsed % 60;
    var minutes = parseInt(timeElapsed / 60);
    var hours = 0;

    // if minutes is greater than or equal to 60, add one to hour and reset minutes to 0
    if (minutes >= 60) {
        hours++;
        minutes = 0;
    }

    // ensure that there is a leading zero if only a single digit
    seconds = seconds.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

    // if "hours" is 0, forego the addition of the hour indication in HTML
    if (hours == 0) {
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    }

    // else add an hour indication to the timer because the "timeElapsed" exceeds past minutes
    else {
        hours = hours.toString();
        document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds;
    }
}

/**
 * Begins timing the user
 */
function startTimer() {
    if (solved != "True") {
        timer = setInterval(tick, 1000);
    }
}

/**
 * Validates the form when the user clicks "Check"
 * @return {boolean}  True if the form passes all validation; false otherwise
 */
function validateForm() {

    // store the "timeElapsed" in local cache
    window.localStorage.setItem("time", timeElapsed);

    // close "Instructions" message if it is open 
    if (!showInstructions) {
        document.getElementById("instructionsdisplay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
        document.getElementById("instructions").innerHTML = "Instructions";
        showInstructions = true;
    }

    // close "About Us" message if it is open
    if (!showAbout) {
        document.getElementById("aboutdisplay").style.display = "none";
        document.getElementById("grid-container").style.display = "grid";
        document.getElementById("about").innerHTML = "About Us";
        showAbout = true;
    }

    // initialize two local variable booleans to test if the grid is still empty or if it still contains pencilmarks
    var isStillEmpty = false;
    var isStillPm = false;

    // set the curId
    if (document.activeElement.id != null) {
        curId = document.activeElement.id;
    }

    // loop through all 81 cells
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            // if the cell is empty, set "isStillEmpty" to true
            if (document.getElementById(i * 9 + j).value == "") {
                isStillEmpty = true;
            }

            // else if the cell contains pencilmarks, set "isStillPm" to true
            else if (document.getElementById(i * 9 + j).className.includes("pm-input")) {
                isStillPm = true;
            }
        }
    }

    // if "isStillEmpty" is true
    if (isStillEmpty) {

        // change the innerHTML to the appropriate error message
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

        // hide the grid and display the message
        document.getElementById("checkoverlay").style.display = "block";
        document.getElementById("grid-container").style.display = "none";
        return false;
    }

    // else if "isStillPm" is true
    else if (isStillPm) {

        // change the innerHTML to the appropriate error message
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

        // hide the grid and display the message
        document.getElementById("checkoverlay").style.display = "block";
        document.getElementById("grid-container").style.display = "none";
        return false;
    }
    return true;
}

/**
 * Notifies user if they successfully finished the Sudoku
 */
function checkAlert() {

    // if the user has clicked "Check"
    if (solved != "None") {

        // if the sudoku is correctly solved
        if (solved == "True") {
            console.log("hello");

            // stop the timer
            clearInterval(timer);

            // change the innerHTML of the grid to display a message of success
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

        // else the sudoku is not correctly solved
        else {

            // change the innerHTML of the grid to display a message of failure
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

/**
 * Resets the grid back to its original state with only the starting numbers
 */
function restart() {

    // reset the timer
    document.getElementById("timer").innerHTML = "00:00";
    timeElapsed = 0;

    // loop through all 81 cells
    for (var i = 0; i < 81; i++) {

        // select the cell
        selectArray[i] = true;
        document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--shiftColor');

    }

    // delete the focused element's value 
    document.getElementById(document.activeElement.id).value = "";

    // reset the pencilmarks array at the focused element
    pmArray[document.activeElement.id] = [];

    // loop through all 81 cells 
    for (var i = 0; i < 81; i++) {

        // if the cell is selected and is not a starting number
        if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false) {

            // delete the value and reset the pencilmarks array at the selected cell
            document.getElementById(i).value = "";
            pmArray[i] = [];

        }
    }

    // ensure grid is in the correct mode
    changeClassName();

    // reset each cell's background color to the default color and deselect all cells

    // indicate that cells are no longer being selected
    isSelectMultiple = false;

    // loop through all 81 cells
    for (var i = 0; i < 81; i++) {

        // set each cell's background color to the default
        document.getElementById(i).style.backgroundColor = root.style.getPropertyValue('--itemBackground');

        // deselect each cell
        selectArray[i] = false;
    }

    // reset "history"
    history = [];
    historyIndex = 0;

    // reset the shift indicator
    document.getElementById("shiftIndication").style = "background-color: none";

    // indicate that shift is not pressed
    isShift = false;
}