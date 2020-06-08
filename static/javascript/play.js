var pmArray = [];

function createArray() {
    for (var i = 0; i < 81; i++) {
        pmArray[i] = [];
    }
}

var isNormal = true;

// if (document.getElementById()
// document.getElementById("0").addEventListener("keyup", addToArray());

$(document).keydown(
    function (e) {
        var keypressed = false;

        if (isNormal) {
            document.getElementById(document.activeElement.id).select();

        }

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
            // document.getElementById(document.activeElement.id).select();
        }
        // console.log(document.getElementById(document.activeElement.id).className);
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
                        document.getElementById(i * 9 + j).maxLength = 9;
                    }
                }
            }
        }
    }

}

function addToArray(id, value, e) {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        if (isNormal == false && document.getElementById(id).className != "txt-input") {
            prevPmCellArray = pmArray[id];
            pmCellArray = [];
            nums = value.split("");
            firstIndex = nums.indexOf(nums[nums.length - 1]);
            for (i = 0; i < nums.length; i++) {
                pmCellArray.push(nums[i]);
            }
            if ((prevPmCellArray.length != pmCellArray.length)
                && (prevPmCellArray.includes(nums[nums.length - 1]))) {
                pmCellArray.pop();
                pmCellArray.splice(firstIndex, 1);
            }
            pmCellArray.sort();
            pmArray[id] = pmCellArray;
            idValue = "";
            for (i = 0; i < pmCellArray.length; i++) {
                idValue += pmCellArray[i];
            }
            document.getElementById(id).value = idValue;
        }
        else {
            pmArray[id] = [];
            document.getElementById(id).className = "txt-input";
            document.getElementById(id).maxLength = 1;
        }
    }
}

function validateForm() {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
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