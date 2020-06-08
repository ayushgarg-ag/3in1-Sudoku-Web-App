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
);