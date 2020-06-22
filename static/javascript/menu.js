var showMessages = true;

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
    let root = document.getElementsByTagName('html')[0];
    var themeid;
    if (window.localStorage.getItem("storedTheme") == null) {
        themeid = "light";
    }
    else {
        themeid = window.localStorage.getItem("storedTheme");
    }
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
        document.getElementById("playimage").style.backgroundImage = "url(/static/css/tan_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/tan_solve.png)";
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
        document.getElementById("playimage").style.backgroundImage = "url(/static/css/dark_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/dark_solve.png)";
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
        document.getElementById("playimage").style.backgroundImage = "url(/static/css/retro_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/retro_solve.png)";
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
        document.getElementById("playimage").style.backgroundImage = "url(/static/css/light_play.png)";
        document.getElementById("solveimage").style.backgroundImage = "url(/static/css/light_solve.png)";

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

$(window).load(function () {
    $("body").addClass('all-loaded');
});

function messagesDisplay() {
    debugger;
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