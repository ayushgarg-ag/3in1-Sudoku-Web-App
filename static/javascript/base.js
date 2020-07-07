// global variable (boolean) that indicates if the instructions message should be opened or closed
var showInstructions = true;

// global variable (boolean) that indicates if the about message should be opened or closed
var showAbout = true;

// global variable (Element) that represents the highest HTML element in the document tree
var root = document.documentElement;


$(document).keydown(
    /**
    * Event handling function for the keydown event 
    * @param {Event} e  Keyboard event object handler
    */
    function (e) {

        // true if one of the arrow keys is pressed; false otherwise
        var arrowKeyPressed = false;

        // if the active element is valid and the id is between 0-80
        if (document.activeElement.id != "" && document.activeElement.id >= 0 && document.activeElement.id < 81) {

            // select the cell in order to easily replace the number
            document.getElementById(document.activeElement.id).select();

            // if the key is the "RIGHT ARROW", move the focus to the cell after it
            if (event.keyCode == 39) {
                currentId = document.activeElement.id;
                if (currentId != 80) {
                    nextId = parseInt(currentId) + 1;
                }
                arrowKeyPressed = true;
            }

            // if the key is the "LEFT ARROW", move the focus to the cell before it
            if (e.keyCode == 37) {
                currentId = document.activeElement.id;
                if (currentId != 0) {
                    nextId = parseInt(currentId) - 1;
                }
                arrowKeyPressed = true;
            }

            // if the key is the "DOWN ARROW", move the focus to the cell below it
            if (e.keyCode == 40) {
                currentId = document.activeElement.id;
                if (currentId < 72) {
                    nextId = parseInt(currentId) + 9;
                }
                else if (currentId != 80) {
                    nextId = parseInt(currentId) - 71;
                }
                arrowKeyPressed = true;
            }

            // if the key is the "UP ARROW", move the focus to the cell above it
            if (e.keyCode == 38) {
                currentId = document.activeElement.id;
                if (currentId > 8) {
                    nextId = parseInt(currentId) - 9;
                }
                else if (currentId != 0) {
                    nextId = parseInt(currentId) + 71;
                }
                arrowKeyPressed = true;
            }

            // if one of the "ARROW" keys was pressed, focus on the cell that was set by "nextId"
            if (arrowKeyPressed) {
                document.getElementById(nextId).focus();
            }
        }
    }
);

document.onreadystatechange = function () {
    /**
    * Alter the class of the body once the window has finished loading
    */
    if (document.readyState === "complete") {
        document.getElementById("body").className = "all-loaded";
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
    <div onclick="themeOption()">Change Theme</div>`;
}


/**
 * Changes theme based on user specified selection
 */
function changeTheme() {

    // obtain the theme in cache and assign it to "themeid"
    var themeid = window.localStorage.getItem("storedTheme");

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
        root.style.setProperty('--highlightOpacity', "brightness(75%)");
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
 * Ensures that the inputted sudoku is valid
 * @return {boolean}  True if the inputted sudoku is valid; false otherwise
 */
function validate() {

    // initialize variable "grid" as an array; this will hold all numbers from the sudoku
    var grid = [];

    // loop through 0-8; this will serve as the row number
    for (i = 0; i < 9; i++) {

        // initialize variable "gridRow" in order to create a 2D array
        var gridRow = [];

        // loop through 0-8; this will serve as the column number
        for (j = 0; j < 9; j++) {

            // if the there is no inputted value in a cell, add a 0 to "gridRow"
            if (document.getElementById(i * 9 + j).value == "") {
                gridRow.push(0);
            }

            // else add the inputted value to "gridRow"
            else {
                gridRow.push(parseInt(document.getElementById(i * 9 + j).value));
            }
        }

        // add "gridRow" to "grid"
        grid.push(gridRow);
    }

    // loop through all 81 positions in "grid" using a nested for loop
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {

            // "listR" contains all the numbers in a given row "x"
            var listR = grid[x];

            // "listC" contains all the numbers in a given column "y"
            var listC = [];
            for (i = 0; i < 9; i++) {
                listC.push(grid[i][y])
            }

            // "listB" contains all the numbers in a given cell's box
            var listB = [];
            var listMR = [];
            var listMC = [];
            var modR = (x + 1) % 3;
            var modC = (y + 1) % 3;
            if (modR == 0) {
                var listMR = [x, x - 1, x - 2];
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
            for (i = 0; i < listMR.length; i++) {
                for (j = 0; j < listMC.length; j++) {
                    listB.push(grid[listMR[i]][listMC[j]]);
                }
            }

            // obtain the number in a specific cell
            num = grid[x][y];

            // reset the counts of each list to 0
            var countR = 0;
            var countC = 0;
            var countB = 0;

            // loop through lists "listR", "listC", and "listB"; count how many times num appears in each list
            for (i = 0; i < listR.length; i++) {
                if (listR[i] != 0 && num == listR[i]) {
                    countR += 1;
                }
            }
            for (i = 0; i < listC.length; i++) {
                if (num == listC[i] && listC[i] != 0) {
                    countC += 1;
                }
            }
            for (i = 0; i < listB.length; i++) {
                if (num == listB[i] && listB[i] != 0) {
                    countB += 1;
                }
            }

            // if any count is greater than 1, the sudoku is invalid
            if (countR > 1 || countC > 1 || countB > 1) {

                // close "Instructions" message if open
                if (!showInstructions) {
                    document.getElementById("instructionsdisplay").style.display = "none";
                    document.getElementById("grid-container").style.display = "grid";
                    document.getElementById("instructions").innerHTML = "Instructions";
                    showInstructions = true;
                }

                // close "About Us" message if open
                if (!showAbout) {
                    document.getElementById("aboutdisplay").style.display = "none";
                    document.getElementById("grid-container").style.display = "grid";
                    document.getElementById("about").innerHTML = "About Us";
                    showAbout = true;
                }

                // show message that the sudoku is invalid
                document.getElementById("checkoverlay").innerHTML = `
                <div id="checkcenter">
                The board you inputted is invalid.
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
        }
    }

    // the sudoku is valid
    return true;
}