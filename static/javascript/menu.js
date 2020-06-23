var showMessages = true;

// function revertChangePlay() {
//     document.getElementById("changetheme").innerHTML = `
//     <div onclick="playOption()">Change Theme</div>`;
// }

function playOption() {
    document.getElementById("playcontainer").innerHTML = `
    <button class="playbutton" onclick="chooseOption()">Choose a Sudoku</button>
    <button class="playbutton" onclick="location.href='/input_play'">Input a Sudoku</button>
    `;
}

function chooseOption() {
    document.getElementById("playcontainer").innerHTML = `
    <form action="/play" method="POST">
    <button id="easy" name="easy" value="easy" type="submit" class="difficultybutton">Easy</button>
    <button id="medium" name="medium" value="medium" type="submit" class="difficultybutton">Medium</button>
    <button id="hard" name="hard" value="hard" type="submit" class="difficultybutton">Hard</button>
    <button id="expert" name="expert" value="expert" type="submit" class="difficultybutton">Expert</button>
    </form>
    `;
    // < !-- < button id = "clear" formaction = "/play" formmethod = "POST" type = "submit"
    // class="buttons" > Restart</button > -->
}

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
    let root = document.documentElement;
    var themeid = window.localStorage.getItem("storedTheme");

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

        root.style.setProperty('--color1', "#FFCCCC");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        document.getElementById("playimage").style.backgroundImage = "url(/static/css/images/tan_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/images/tan_solve.png)";


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

        root.style.setProperty('--color1', "#990000");
        root.style.setProperty('--color2', "#CC6600");
        root.style.setProperty('--color3', "#009900");
        root.style.setProperty('--color4', "#009999");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "darkslategrey");
        root.style.setProperty('--color7', "mediumpurple");
        root.style.setProperty('--color8', "#999900");
        root.style.setProperty('--color9', "#CC0066");

        document.getElementById("playimage").style.backgroundImage = "url(/static/css/images/dark_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/images/dark_solve.png)";


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
        root.style.setProperty('--messageTextColor', "#e43a19");
        root.style.setProperty('--focusText', "#F3ECE7");
        root.style.setProperty('--highlightOpacity', "brightness(75%)");
        root.style.setProperty('--shiftIndication', "#e43a19");

        root.style.setProperty('--color1', "#FFCCCC");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");

        document.getElementById("playimage").style.backgroundImage = "url(/static/css/images/retro_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/images/retro_solve.png)";

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

        root.style.setProperty('--color1', "#FF9999");
        root.style.setProperty('--color2', "lightsalmon");
        root.style.setProperty('--color3', "#99FF99");
        root.style.setProperty('--color4', "#99FFFF");
        root.style.setProperty('--color5', root.style.getPropertyValue('--itemBackground'));
        root.style.setProperty('--color6', "#99CCFF");
        root.style.setProperty('--color7', "#CC99FF");
        root.style.setProperty('--color8', "lightsteelblue");
        root.style.setProperty('--color9', "#FF99CC");
        
        document.getElementById("playimage").style.backgroundImage = "url(/static/css/images/light_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/images/light_solve.png)";

        window.localStorage.setItem("storedTheme", "light");
    }
}

$(window).load(function () {
    $("body").addClass('all-loaded');
});

function messagesDisplay() {
    // debugger;
    if (showMessages) {
        document.getElementById("playimage").style.display = "none";
        document.getElementById("solveimage").style.display = "none";
        document.getElementById("menuinstructionsdisplay").style.display = "block";
        document.getElementById("menuaboutdisplay").style.display = "block";
        document.getElementById("messages").innerHTML = "Close Instructions<br>and About";
        showMessages = false;
    }
    else {
        document.getElementById("menuinstructionsdisplay").style.display = "none";
        document.getElementById("menuaboutdisplay").style.display = "none";
        document.getElementById("playimage").style.display = "block";
        document.getElementById("solveimage").style.display = "block";
        document.getElementById("messages").innerHTML = "Instructions<br>and About";
        showMessages = true;
    }
}