function revertChangeTheme() {
    document.getElementById("changetheme").innerHTML = `
    <div onclick="themeOption()">Change Theme</div>`;
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
    var themeid = window.localStorage.getItem("storedTheme");
    let root = document.documentElement;
    console.log(themeid);
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
        root.style.setProperty('--shiftColor', "#978522");
        root.style.setProperty('--messageTextColor', "#bbe1fa");
        root.style.setProperty('--focusText', "#226897");
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
        root.style.setProperty('--shiftColor', "#4ac286");
        root.style.setProperty('--messageTextColor', "#e43a19");
        root.style.setProperty('--focusText', "#F3ECE7");
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
        root.style.setProperty('--shiftColor', "#a36f5e");
        root.style.setProperty('--messageTextColor', "#1b4857");
        root.style.setProperty('--focusText', "#28595c");

        root.style.setProperty('--color1', "#a36f5e");
        root.style.setProperty('--color2', "#a3925e");
        root.style.setProperty('--color3', "#805ea3");
        root.style.setProperty('--color4', "#5e5ea3");
        root.style.setProperty('--color5', "#5ea35e");
        root.style.setProperty('--color6', "#348a8a");
        root.style.setProperty('--color7', "#a36f5e");
        root.style.setProperty('--color8', "black");
        root.style.setProperty('--color9', "grey");

        window.localStorage.setItem("storedTheme", "light");
    }
}

function validate() {
    var grid = [];
    for (i = 0; i < 9; i++) {
        var gridRow = [];
        for (j = 0; j < 9; j++) {
            if (document.getElementById(i * 9 + j).value == "") {
                gridRow.push(0);
            }
            else {
                gridRow.push(parseInt(document.getElementById(i * 9 + j).value));
            }
        }
        grid.push(gridRow);
    }
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
            var listR = grid[x];
            var listC = [];
            var listMR = [];
            var listMC = [];
            for (i = 0; i < 9; i++) {
                listC.push(grid[i][y])
            }
            var listB = [];
            var modR = (x + 1) % 3;
            var modC = (y + 1) % 3;
            if (modR == 0) {
                var listMR = [x, x - 1, x - 2];
            }
            else if (modR == 1) {
                listMR = [x, x + 1, x + 2];
            }
            else {
                list_mr = [x - 1, x, x + 1];
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
            num = grid[x][y];
            var countR = 0;
            var countC = 0;
            var countB = 0;
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
            if (countR > 1 || countC > 1 || countB > 1) {
                alert("The board you inputted is invalid.");
                return false;
            }
        }
    }
    return true;
}

$(document).keydown(
    function (e) {
        var keypressed = false;
        if (document.activeElement.id >= 0 && document.activeElement.id < 81) {
            document.getElementById(document.activeElement.id).select();

            if (event.keyCode == 39) {
                currentId = document.activeElement.id;
                if (currentId != 80) {
                    nextId = parseInt(currentId) + 1;
                }
                keypressed = true;
            }
            if (e.keyCode == 37) {
                currentId = document.activeElement.id;
                if (currentId != 0) {
                    nextId = parseInt(currentId) - 1;
                }
                keypressed = true;
            }
            if (e.keyCode == 40) {
                currentId = document.activeElement.id;
                if (currentId < 72) {
                    nextId = parseInt(currentId) + 9;
                }
                else if (currentId != 80) {
                    nextId = parseInt(currentId) - 71;
                }
                keypressed = true;
            }
            if (e.keyCode == 38) {
                currentId = document.activeElement.id;
                if (currentId > 8) {
                    nextId = parseInt(currentId) - 9;
                }
                else if (currentId != 0) {
                    nextId = parseInt(currentId) + 71;
                }
                keypressed = true;
            }
            if (keypressed) {
                document.getElementById(nextId).focus();
            }
        }
    }
);

$(window).load(function () {
    $("body").addClass('all-loaded');
});